# Docker

## 安装 Docker

下面的过程用于在 Ubuntu 上安装 Docker
```bash
# 卸载旧版本
sudo apt-get remove docker docker-engine docker.io containerd runc

# 安装必要的依赖
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

# 添加 Docker 的官方 GPG 密钥
curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

# 通过搜索指纹的后8个字符，验证是否拥有带有密钥
sudo apt-key fingerprint 0EBFCD88

# 添加 docker 镜像源仓库
sudo add-apt-repository \
   "deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/ \
  $(lsb_release -cs) \
  stable"

# 更新源
sudo apt-get update

# 安装 Docker-Community Engine
sudo apt-get install docker-ce docker-ce-cli containerd.io

# 将当前用户添加到 docker 用户组，这样使用 docker 命令就不用加 sudo 
sudo gpasswd -a USERNAME docker

# 测试是否安装成功
docker -V
docker info
docker run hello-world
```

## Dokcer 镜像操作
``` bash
docker images
docker pull 
docker rmi

docker save -o IMAGE_NAME XXX.tar
docker load -i XXX.tar
```

## Docker 容器操作
```bash
docker run -p -d  
docker ps
docker exec -it 
```

## Dockerfile

## Docker-compose
