# 阶段一：构建 Python 部分
FROM python:3.9 AS python-builder

# 设置工作目录
WORKDIR /app

# 将项目的 Python 依赖复制到容器中
COPY backend/requirements.txt .

# 安装 Python 依赖
RUN pip install --no-cache-dir -r requirements.txt

# 阶段二：构建 Node.js 部分
FROM node:16 AS node-builder

# 设置工作目录
WORKDIR /app

# 将项目的 Node.js 依赖复制到容器中
COPY client/package.json .
COPY client/package-lock.json .

# 安装 Node.js 依赖
RUN npm install

# 阶段三：生成最终镜像
FROM python:3.9

# 设置工作目录
WORKDIR /app

# 从之前的构建阶段复制 Python 依赖
COPY --from=python-builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages

# 从之前的构建阶段复制 Node.js 依赖
COPY --from=node-builder /app/node_modules /app/node_modules

RUN touch .profile

#RUN apt-get update && apt-get install lsof

# 将项目文件复制到容器中
COPY . .

# 设置容器启动命令
ENTRYPOINT ["/bin/bash", "-c"]
CMD bash scripts/start.sh