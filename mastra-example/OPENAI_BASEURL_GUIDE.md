# OpenAI Base URL 配置指南

本项目已经配置支持自定义 OpenAI Base URL，您可以轻松切换到不同的 OpenAI 兼容服务。

## 如何使用

### 1. 创建环境变量文件

复制 `.env.example` 文件并重命名为 `.env`：

```bash
cp .env.example .env
```

### 2. 配置环境变量

在 `.env` 文件中设置您的配置：

#### 使用官方 OpenAI API（默认）
```bash
OPENAI_API_KEY=your-openai-api-key-here
# OPENAI_BASE_URL 不设置，将使用默认的官方 API
```

#### 使用自定义 Base URL
```bash
OPENAI_API_KEY=your-api-key
OPENAI_BASE_URL=https://your-custom-api-endpoint.com/v1
```

#### 常见服务配置示例

**Azure OpenAI:**
```bash
OPENAI_API_KEY=your-azure-openai-key
OPENAI_BASE_URL=https://your-resource.openai.azure.com/openai/deployments/your-deployment
```

**DeepSeek API:**
```bash
OPENAI_API_KEY=your-deepseek-api-key
OPENAI_BASE_URL=https://api.deepseek.com/v1
```

**本地服务:**
```bash
OPENAI_API_KEY=local-key-or-empty
OPENAI_BASE_URL=http://localhost:8000/v1
```

**其他 OpenAI 兼容服务:**
```bash
OPENAI_API_KEY=your-service-api-key
OPENAI_BASE_URL=https://api.your-service.com/v1
```

### 3. 运行项目

设置完环境变量后，正常启动项目：

```bash
npm run dev
# 或
pnpm run dev
# 或
yarn dev
```

## 技术细节

项目使用 `createOpenAI` 函数创建自定义配置：

```typescript
const customOpenAI = createOpenAI({
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  apiKey: process.env.OPENAI_API_KEY,
  headers: {
    // 可以在这里添加自定义请求头
  },
});
```

这种配置方式的优点：
- 灵活性：可以轻松切换不同的 API 服务
- 向后兼容：如果不设置 `OPENAI_BASE_URL`，将使用官方 API
- 可扩展：可以添加自定义请求头和其他配置

## 故障排除

1. **API 密钥错误**：确保您的 API 密钥正确且有效
2. **Base URL 格式**：确保 URL 格式正确，通常以 `/v1` 结尾
3. **网络连接**：确保可以访问指定的 API 端点
4. **模型名称**：不同服务支持的模型名称可能不同，请根据服务文档调整

## 支持的服务

理论上支持所有 OpenAI 兼容的 API 服务，包括但不限于：
- OpenAI 官方 API
- Azure OpenAI
- DeepSeek
- 本地部署的 OpenAI 兼容服务
- 其他第三方 OpenAI 兼容服务
