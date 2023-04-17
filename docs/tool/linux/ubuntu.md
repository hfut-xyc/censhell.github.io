# Ubuntu20.04 常用配置和软件安装 

本文以 Ubuntu 20.04 系统为例，简要介绍一下刚装好的 Linux 应该如何配置

## 换源
一般来说拿到新系统首先要换源，常用源如下，选一个就行了
```bash
# USTC 源
deb https://mirrors.ustc.edu.cn/ubuntu/ focal main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ focal-security main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-security main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse

# aliyun 源
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
```

具体操作如下，先对配置文件备份，再修改这文件
```bash
# 备份后修改配置
cd /etc/apt
sudo cp sources.list sources.list.bak
sudo vi sources.list

# 复制上文的源镜像地址
# 在终端里 shift+insert 粘贴
# :wq 保存退出

# 让新配置的地址生效
sudo apt update
```

## 设置root用户密码
全新的 Ubuntu 默认是没有设置 root 用户密码的，切换 root 用户前记得先设置密码
```bash
sudo passwd root
```

## 设置主机名
修改后需要重启才能生效
```bash
sudo vi /etc/hostname
```

## 安装 gcc/g++
Ubuntu 默认没有安装 C/C++ 的编译环境
```bash
sudo apt install build-essential
```

## 安装 net-tools
Ubuntu 默认没有安装 net-tools，它包含了 `ifconfig、ping、netstat` 等常用的网络工具
```bash
sudo apt install net-tools
```

## 安装 openssh-server
Ubuntu 默认没有安装 openssh-server，安装之后才能用 ssh 远程访问该主机
```bash
sudo apt install openssh-server
systemctl status ssh
```

## 安装 oh my zsh
首先安装 zsh
```bash
sudo apt install zsh
# 检查 zsh 是否安装成功
cat /etc/shells
# 切换为 zsh
chsh -s /bin/zsh
# 检查 zsh 是否切换成功
echo $SHELL
```

再安装 oh my zsh，确保安装了 [Git](../etc/git.md)，否则会安装失败
```bash
wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh
sh install.sh
```
安装 incr 插件，可以让命令支持自动补全（可选）
```bash
cd ~/.oh-my-zsh/plugins/
mkdir incr & cd incr
wget http://mimosa-pudica.net/src/incr-0.2.zsh
# 配置 incr 插件
vim ~/.zshrc
# 添加到配置文件末尾，保存退出
source ~/.oh-my-zsh/plugins/incr/incr*.zsh
# 让配置生效
source ~/.zshrc
```

## 安装 Java
如果你的 Ubuntu 是虚拟机或者云服务器，可以先在 Windows 下载 [JDK1.8压缩包](https://pan.baidu.com/s/1zjriuEPC4pXF92lm1Ql0TQ) (提取码：jdk8)

然后将压缩包通过 [XFTP](https://www.xshell.com/zh/free-for-home-school/) 传到 /home/USERNAME 目录下
```bash
# 将压缩包解压到 /usr/local 目录下
sudo mv ~/jdk-8u241-linux-x64.tar.gz /usr/local
sudo tar -zxvf jdk-8u241-linux-x64.tar.gz

# 全局配置（和局部配置二选一）
sudo vi /etc/profile

# 局部配置
vi ~/.bashrc 

# 添加到配置文件末尾，保存退出
export JAVA_HOME=/usr/local/jdk1.8.0_241/
export PATH=$PATH:$JAVA_HOME/bin

# 让配置生效
source ~/.bashrc
```

