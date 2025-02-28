import OpenAI from "openai";
import fs from "fs";
import path from "path";
 
const STEP_API_KEY =
  "xxx";
const STEP_API_MODEL = "step-tts-mini";
 
const openai = new OpenAI({
  apiKey: STEP_API_KEY,
  baseURL: "https://api.stepfun.com/v1",
});
 
async function main() {
  const speechFile = path.resolve("./speech.mp3");
  const mp3 = await openai.audio.speech.create({
    model: STEP_API_MODEL,
    voice: "shuangkuaijiejie",
    input: "杭州的风景如诗如画，西湖是其点睛之笔。湖水清澈，碧波荡漾，岸边垂柳依依，远处青山隐现。苏堤、白堤横亘湖上，游人如织。四季更替，春有繁花，夏有绿荫，秋有红叶，冬有雪景，每一处都让人流连忘返。",
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}
 
main();