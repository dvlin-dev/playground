# MCP Terminal

MCP Terminal 是一个用于与 AI 模型聊天的命令行应用。

## 安装

```bash
npm install
```

## 环境变量设置

1. 复制 `.env.example` 文件并将其重命名为 `.env`：

```bash
cp .env.example .env
```

2. 编辑 `.env` 文件并设置以下变量：

- `API_KEY`：您的 API 密钥（必填）
- `API_URL`：API 端点 URL（可选，有默认值）
- `MODEL`：AI 模型名称（可选，有默认值）

## 运行

开发模式：

```bash
npm run dev
```

生产模式：

```bash
npm run build
npm start
``` 