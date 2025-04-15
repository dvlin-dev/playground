## Demo Web App

这个演示应用程序展示了代理之间通过 A2A 进行对话的场景。

![image](/images/a2a_demo_arch.png)

* 前端是一个 [mesop](https://github.com/mesop-dev/mesop) Web 应用程序，用于渲染终端用户和"主机代理"之间的对话内容。该应用可以渲染文本内容、思考气泡、Web 表单（代理请求输入）和图片。更多内容类型即将推出。

* [主机代理](/samples/python/hosts/multiagent/host_agent.py) 是一个 Google ADK 代理，负责将用户请求编排给远程代理。

* 每个[远程代理](/samples/python/hosts/multiagent/remote_agent_connection.py) 都是一个在 Google ADK 代理中运行的 A2AClient。每个远程代理都会获取 A2AServer 的 [AgentCard](https://google.github.io/A2A/#documentation?id=agent-card)，然后使用 A2A 代理所有请求。

## 功能

<need quick gif>

### 动态添加代理
点击 Web 应用中的机器人图标可以添加新的代理。输入远程代理的 AgentCard 地址，应用将获取该卡片并将远程代理添加到本地已知代理集合中。

### 与一个或多个代理对话
点击聊天按钮开始或继续现有对话。这个对话将发送给主机代理，然后主机代理会将请求委托给一个或多个远程代理。

如果代理返回复杂内容（如图片或 Web 表单），前端将在对话视图中渲染这些内容。远程代理将负责在 A2A 和 Web 应用的原生应用表示之间转换这些内容。

### 探索 A2A 任务
点击历史记录可以查看 Web 应用与所有代理（主机代理和远程代理）之间发送的消息。

点击任务列表可以查看来自远程代理的所有 A2A 任务更新。

## 前提条件

- Python 3.12 或更高版本
- UV
- 支持 A2A 的代理服务器（[使用这些示例](/samples/python/agents/README.md)）

## 运行示例

1. 导航到演示 UI 目录：
    ```bash
    cd demo/ui
    ```
2. 创建包含 API 密钥的环境文件：

   ```bash
   echo "GOOGLE_API_KEY=your_api_key_here" > .env
   ```

3. 运行前端示例：
    ```bash
    uv run main.py
    ```
注意：应用程序默认在 12000 端口运行
