# 使用Node.js官方镜像作为基础镜像
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 编译TypeScript代码
RUN pnpm run build

# 第二阶段：创建更小的生产镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 设置NODE_ENV为production
ENV NODE_ENV=production

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装pnpm
RUN npm install -g pnpm

# 只安装生产依赖
RUN pnpm install --prod

# 从构建阶段复制编译后的代码
COPY --from=builder /app/build ./build

# 复制.env文件配置（如果存在）
COPY .env* ./

# 暴露端口
EXPOSE 5101

# 定义健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:5101/health || exit 1

# 启动应用
CMD ["node", "build/index.js"] 