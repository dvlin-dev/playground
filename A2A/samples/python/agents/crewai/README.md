## CrewAI 代理与 A2A 协议

本示例展示了一个使用 [CrewAI](https://www.crewai.com/open-source) 构建的简单图像生成代理，并通过 A2A 协议进行暴露。

## 工作原理

该代理利用 CrewAI 和 Google Gemini API 根据文本提示生成图像。A2A 协议使代理能够进行标准化交互，允许客户端发送请求并接收图像作为工件。

```mermaid
sequenceDiagram
    participant Client as A2A 客户端
    participant Server as A2A 服务器
    participant Agent as CrewAI 代理
    participant API as Gemini API

    Client->>Server: 发送包含文本提示的任务
    Server->>Agent: 将提示转发给图像代理
    Note over Server,Agent: 可选：模拟流式更新
    Agent->>API: 使用 Gemini 生成图像
    API->>Agent: 返回生成的图像
    Agent->>Server: 存储图像并返回 ID
    Server->>Client: 响应图像工件
```

## 主要组件

- **CrewAI 代理**：具有专门工具的图像生成代理
- **A2A 服务器**：提供与代理交互的标准化协议
- **图像生成**：使用 Gemini API 从文本描述创建图像
- **缓存系统**：存储生成的图像以供检索（内存或基于文件）

## 前提条件

- Python 3.12 或更高版本
- UV 包管理器（推荐）
- Google API 密钥（用于访问 Gemini）

## 设置与运行

1. 进入示例目录：

   ```bash
   cd samples/python/agents/crewai
   ```

2. 创建包含 API 密钥的环境文件：

   ```bash
   echo "GOOGLE_API_KEY=your_api_key_here" > .env
   ```

3. 设置 Python 环境：

   ```bash
   uv python pin 3.12
   uv venv
   source .venv/bin/activate
   ```

4. 使用所需选项运行代理：

   ```bash
   # 基本运行
   uv run .

   # 自定义主机/端口
   uv run . --host 0.0.0.0 --port 8080
   ```

5. 在另一个终端中运行 A2A 客户端：

   ```bash
   # 连接到代理（指定正确的端口）
   uv run hosts/cli --agent http://localhost:10001
   
   # 如果启动代理时更改了端口，请使用该端口
   # uv run hosts/cli --agent http://localhost:YOUR_PORT
   ```

## 功能与改进

**功能：**

- 使用 Google Gemini 进行文本到图像生成
- 支持使用参考修改现有图像
- 具有自动重试的稳健错误处理
- 可选的基于文件的缓存持久化
- 改进了从查询中提取工件 ID

**限制：**

- 没有真正的流式处理（CrewAI 本身不支持）
- 有限的代理交互（没有多轮对话）

## 了解更多

- [A2A 协议文档](https://google.github.io/A2A/#/documentation)
- [CrewAI 文档](https://docs.crewai.com/introduction)
- [Google Gemini API](https://ai.google.dev/gemini-api)
