# 构建阶段
FROM node:18.19.0-alpine AS builder

WORKDIR /app

# 复制 package.json 和 package-lock.json（如果存在）
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 构建项目
RUN npm run build

# 运行阶段
FROM node:18.19.0-alpine

WORKDIR /app

# 从构建阶段复制必要文件
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# 只安装生产环境依赖
RUN npm install --production

# 暴露服务端口
EXPOSE 5100

# 启动服务
CMD ["npm", "start"] 