# mcp-image-gen
图片生成 mcp

# docker
docker build --platform linux/amd64 -t mcp-image-gen -f Dockerfile .

docker tag mcp-image-gen dvlindev/mcp-image-gen
docker push dvlindev/mcp-image-gen

docker pull dvlindev/mcp-image-gen
docker stop dvlindev/mcp-image-gen
docker rm dvlindev/mcp-image-gen
docker run -d -p 0.0.0.0:5103:5100 -e API_URL=url -e API_KEY=key -e TRANSCODE_URL=x -e TRANSCODE_SECRET=x --name mcp-image-gen dvlindev/mcp-image-gen

