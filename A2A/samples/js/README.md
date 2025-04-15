# JavaScript Samples

提供的样本是使用 [Genkit](https://genkit.dev/) 通过 Gemini API 构建的。

## Agents

- [电影代理](src/agents/movie-agent/README.md)：使用TMDB API搜索电影信息并回答问题。

- [编码代理](src/agents/coder/README.md)：生成完整的代码文件作为 artifact。

## Testing the Agents

First, follow the instructions in the agent's README file, then run `npx tsx ./cli.ts` to start up a command-line client to talk to the agents. Example:

1. Navigate to the samples/js directory:
    ```bash
    cd samples/js
    ```
2. Run npm install:
    ```bash
    npm install
    ```
3. Run an agent:
```bash
export GEMINI_API_KEY=<your_api_key>
npm run agents:coder

# in a separate terminal
npm run a2a:cli
```
---
**NOTE:** 
This is sample code and not production-quality libraries.
---
