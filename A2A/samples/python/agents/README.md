## 示例代理

本目录下的所有代理都是基于不同框架构建的示例，展示了不同的功能特性。每个代理都可以作为独立的 A2A 服务器运行。

每个代理都可以按照其 README 中的说明作为独立的 A2A 服务器运行。默认情况下，每个代理会在 localhost 的不同端口上运行（你可以通过命令行参数来覆盖默认设置）。

要与这些服务器进行交互，可以在主机应用程序（如 CLI）中使用 A2AClient。详情请参阅[主机应用程序](/samples/python/hosts/README.md)。

* [**Google ADK**](/samples/python/agents/google_adk/README.md)  
示例代理，用于（模拟）填写费用报告。展示了通过 A2A 进行多轮交互以及返回/回复网页表单的功能。

* [**LangGraph**](/samples/python/agents/langgraph/README.md)  
示例代理，可以使用工具进行货币转换。展示了多轮交互、工具使用和流式更新功能。

* [**CrewAI**](/samples/python/agents/crewai/README.md)  
示例代理，可以生成图像。展示了多轮交互和通过 A2A 发送图像的功能。



