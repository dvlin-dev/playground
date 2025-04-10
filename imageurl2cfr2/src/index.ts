/**
 * Cloudflare Worker for downloading images from URLs and storing them in R2
 *
 * This worker:
 * 1. Accepts an image URL as a query parameter
 * 2. Downloads the image from the URL
 * 3. Stores it in a Cloudflare R2 bucket
 * 4. Returns success or error information
 */

export interface Env {
  // R2 bucket binding defined in wrangler.toml
  playground: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      // Parse request body as JSON
      let requestBody: { url?: string };
      try {
        requestBody = await request.json();
      } catch (error) {
        return new Response("Invalid JSON body", { status: 400 });
      }

      // Check if an image URL is provided in the body
      const imageUrl = requestBody.url;

      if (!imageUrl) {
        return new Response("Missing image URL in request body. Please include '{\"url\":\"https://example.com/image.jpg\"}'", {
          status: 400
        });
      }

      // Download the image from the URL
      const imageResponse = await fetch(imageUrl);

      if (!imageResponse.ok) {
        return new Response(`Failed to fetch image: ${imageResponse.statusText}`, {
          status: imageResponse.status
        });
      }

      // Check if response is an image
      const contentType = imageResponse.headers.get("content-type");
      if (!contentType || !contentType.startsWith("image/")) {
        return new Response("The URL does not point to an image", { status: 400 });
      }

      // Generate a filename based on the URL and timestamp
      const urlObj = new URL(imageUrl);
      const pathParts = urlObj.pathname.split("/");
      const originalFilename = pathParts[pathParts.length - 1];

      // Generate a unique filename with timestamp
      const timestamp = Date.now();
      const fileExtension = originalFilename.includes('.') ?
        originalFilename.substring(originalFilename.lastIndexOf('.')) : '';
      const filenameBase = originalFilename.includes('.') ?
        originalFilename.substring(0, originalFilename.lastIndexOf('.')) : originalFilename;
      const filename = `${filenameBase}-${timestamp}${fileExtension}`;

      // Clone the response so we can read its body
      const imageData = await imageResponse.arrayBuffer();

      // Upload to R2
      await env.playground.put(filename, imageData, {
        httpMetadata: {
          contentType: contentType
        }
      });
			const baseUrl = 'https://oss.playground.281000.xyz/'
      // Return success response
      return new Response(JSON.stringify({
        success: true,
        message: "Image successfully stored in R2",
        url: baseUrl + filename,
        size: imageData.byteLength,
        contentType
      }), {
        headers: {
          "Content-Type": "application/json"
        }
      });

    } catch (error: any) {
      // Return error response
      return new Response(JSON.stringify({
        success: false,
        message: `Error processing image: ${error.message}`
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  },
} satisfies ExportedHandler<Env>;
