# 生成镜像
FROM nikolaik/python-nodejs:python3.9-nodejs16-slim

# 安装必要的依赖
RUN apt-get update && apt-get install curl lsof -y

# 设置工作目录
WORKDIR /app

# 将项目文件复制到容器中
#RUN touch .profile
COPY . .

# 安装 Python 依赖
RUN pip install --no-cache-dir -r backend/requirements.txt

# 安装 Node.js 依赖
RUN cd client && npm install && cd ..

# 设置容器启动命令
#ENTRYPOINT ["/bin/bash", "-c", "source .profile"]
CMD bash scripts/start.sh