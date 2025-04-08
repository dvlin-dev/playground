import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync } from 'fs';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, '../.env');

// 检查并加载.env文件
if (existsSync(envPath)) {
    dotenv.config({ path: envPath });
}

export const EXA_API_KEY = process.env.EXA_API_KEY;
export const EXA_API_BASE = "https://api.exa.ai";