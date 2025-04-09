# 搜索服务 (Search Service)

基于MCP协议的互联网搜索服务，使用Exa API提供高质量的搜索结果。

## 功能特点

- 提供网络搜索API
- 支持SSE连接与MCP协议
- 包含Docker容器化配置
- 完善的错误处理机制
- 健康检查端点

## 开发环境设置

### 前提条件

- Node.js v18+
- pnpm (推荐) 或 npm
- Exa API 密钥 (获取方式: https://exa.ai)

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

创建 `.env` 文件，添加以下内容：

```
EXA_API_KEY=your_exa_api_key_here
```

### 构建项目

```bash
pnpm run build
```

### 启动开发服务器

```bash
node build/index.js
```

## 生产环境部署

### 使用Docker

1. 构建Docker镜像

```bash
docker build --platform linux/amd64 -t search-mcp-service .     

docker tag search-mcp-service dvlindev/search-mcp-service
docker push dvlindev/search-mcp-service
```

2. 运行容器

```bash
docker run -p 5101:5101 -e EXA_API_KEY=your_api_key_here dvlindev/search-mcp-service 
```

### 使用Docker Compose

1. 设置环境变量或修改 `docker-compose.yml` 文件中的 `EXA_API_KEY`

2. 启动服务

```bash
docker-compose up -d
```

## API 端点

- `/health` - 健康检查端点
- `/sse` - SSE连接端点
- `/messages` - MCP消息传递端点

## 使用示例

1. 建立SSE连接
2. 发送搜索请求到 `/messages` 端点
3. 接收搜索结果

## 错误处理

服务包含完善的错误处理机制：

- API调用错误处理
- 网络连接错误处理
- 服务错误日志

## 许可证

MIT 