import 'dotenv/config'
import fs from 'fs'

async function main() {
  const apiKey = process.env.API_KEY
  const apiUrl = `${process.env.API_BASE_URL}/v1/audio/speech`
  
  const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
          "model": "Doubao-tts",
          "input": "杭州的风景如诗如画，西湖是其点睛之笔。湖水清澈，碧波荡漾，岸边垂柳依依，远处青山隐现。苏堤、白堤横亘湖上，游人如织。四季更替，春有繁花，夏有绿荫，秋有红叶，冬有雪景，每一处都让人流连忘返。",
          "response_format": "mp3",
          "voice":"zh_female_cancan_mars_bigtts"
      }),
  })
  
  // 获取二进制数据
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  
  // 将音频数据保存为MP3文件
  const outputPath = './output.mp3'
  fs.writeFileSync(outputPath, buffer)
  console.log(`音频文件已保存到: ${outputPath}`)
}

main().catch(console.error)