import 'dotenv/config'
import fs from 'fs'
import FormData from 'form-data'
import fetch from 'node-fetch'

async function main() {
  const apiKey = process.env.API_KEY
  const apiUrl = `${process.env.API_BASE_URL}/v1/audio/transcriptions`
  
  const formData = new FormData()
  formData.append('model', 'SenseVoiceSmall')
  formData.append('file', fs.createReadStream('./output.mp3'))
  formData.append('response_format', 'json')

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        ...formData.getHeaders()
      },
      body: formData
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('API 错误:', errorText)
      throw new Error(`API 请求失败: ${response.status}`)
    }
    
    const result = await response.json()
    console.log('转录结果:', result)
  } catch (error) {
    console.error('请求出错:', error.message)
  }
}

main().catch(console.error)