import { NodeSDK } from "@opentelemetry/sdk-node";
import { LangfuseSpanProcessor } from "@langfuse/otel";
import dotenv from 'dotenv';

dotenv.config();
console.debug('langfuse env :',process.env.LANGFUSE_PUBLIC_KEY, process.env.LANGFUSE_SECRET_KEY, process.env.LANGFUSE_BASE_URL);
 
const sdk = new NodeSDK({
  spanProcessors: [new LangfuseSpanProcessor({
    publicKey: process.env.LANGFUSE_PUBLIC_KEY,
    secretKey: process.env.LANGFUSE_SECRET_KEY,
    baseUrl: process.env.LANGFUSE_BASE_URL,
  })],
});
 
sdk.start();