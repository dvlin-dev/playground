# A2A Demo UI - TypeScript 版本

这是 Agent2Agent 演示系统的 TypeScript 重写版本，使用 Next.js 和 Material UI 构建。

## 项目结构

```
ui-ts/
├── src/
│   ├── components/      # UI组件
│   ├── pages/           # 页面组件
│   ├── services/        # API服务
│   ├── state/           # 状态管理
│   ├── styles/          # 样式文件
│   └── utils/           # 工具函数
├── public/              # 静态资源
├── package.json         # 项目依赖
├── tsconfig.json        # TypeScript配置
└── next.config.js       # Next.js配置
```

## 环境变量

在根目录创建 `.env` 文件，填写以下环境变量：

```
API_URL=http://localhost:12000
GOOGLE_API_KEY=your_api_key
A2A_UI_HOST=0.0.0.0
A2A_UI_PORT=12000
```

## 运行项目

1. 安装依赖：

```bash
npm install
# 或
yarn
```

2. 开发模式运行：

```bash
npm run dev
# 或
yarn dev
```

3. 构建生产版本：

```bash
npm run build
npm run start
# 或
yarn build
yarn start
```

## 后端API

本项目需要配合原Python版本的API服务运行，请确保已启动原项目中的服务器。

## 从Python到TypeScript的转换说明

本项目是从Python版本转换而来，主要变化包括：

1. 使用 Next.js 替代 Mesop 框架
2. 使用 Material UI 替代 Mesop UI 组件
3. 使用 Zustand 进行状态管理
4. 使用 Axios 进行API调用
5. 使用 TypeScript 进行类型检查 