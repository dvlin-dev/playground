import 'dotenv/config'
import fs from 'fs'

const texts = {
  zh: "杭州的风景如诗如画，西湖更是画龙点睛之笔。",
  en: "The scenery of Hangzhou is as poetic and picturesque as a painting, and West Lake is the finishing touch."
}

const voices = [
  "zh_female_shuangkuaisisi_moon_bigtts", // ！
  "ICL_zh_female_huoponvhai_tob",
  "ICL_zh_female_wumeiyujie_tob",
  "ICL_zh_female_xingganyujie_tob"
]

async function generateAudio(voice, text, lang) {
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
      "input": text,
      "response_format": "mp3",
      "voice": voice
    }),
  })

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  
  const outputPath = `./output_${voice}_${lang}.mp3`
  fs.writeFileSync(outputPath, buffer)
  console.log(`音频文件已保存到: ${outputPath}`)
}

async function main() {
  for (const voice of voices) {
    console.log(`正在处理声音: ${voice}`)
    // 生成中文版本
    await generateAudio(voice, texts.zh, 'zh')
    // 生成英文版本
    await generateAudio(voice, texts.en, 'en')
  }
}

main().catch(error => {
  console.error('发生错误:', error)
})

