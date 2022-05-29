# Ubuntu20.04 常用配置和软件安装 

## 介绍
本文以 **Ubuntu 20.04** 系统为例，简要介绍一下刚装好的 Linux 应该如何配置

## 更换软件源
一般来说新系统要做的第一件事就是换源，不然下载速度会很慢，首先要修改配置文件
```bash
sudo gedit /etc/apt/sources.list
```
可以换成阿里云的源
```bash
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
保存后记得更新源
```bash
sudo apt update
```


## 设置root用户密码
Ubuntu 默认是没有设置 root 用户密码的，切换 root 用户前记得先设置密码
```bash
sudo passwd root
```
## 设置双系统默认启动项
如果你是双系统，可以修改 GRUB 配置文件来选择默认开机启动项；如果你是虚拟机，可以跳过本小节
```bash
sudo vi /etc/default/grub
```
## 设置主机名
```bash
sudo vi /etc/hostname
```


## 常用软件安装
### gcc/g++
Ubuntu 默认没有安装 C/C++ 的编译环境
```bash
sudo apt install build-essential
```
### net-tools
Ubuntu 默认没有安装 net-tools，它包含了 **ifconfig、ping、netstat** 等常用的网络工具
```bash
sudo apt install net-tools
```
### openssh-server
Ubuntu 默认没有安装 openssh-server，安装之后才能用 ssh 远程访问该主机
```bash
sudo apt install openssh-server
systemctl status ssh
```
### git
```bash
sudo apt install git
```
### zsh/oh my zsh

```bash
sudo apt install zsh
cat /etc/shells
echo $SHELL
sudo chsh -s /bin/zsh
```

### Java
- 如果是虚拟机或者云服务器，可以先在 Windows 下载 [JDK1.8压缩包](https://pan.baidu.com/s/1zjriuEPC4pXF92lm1Ql0TQ) (提取码：jdk8)
- 然后将压缩包通过 [XFTP](https://www.xshell.com/zh/free-for-home-school/) 传到 /home/username 目录下
- 将压缩包解压到 /usr/local 目录下
```bash
sudo mv ~/jdk-8u241-linux-x64.tar.gz /usr/local
sudo tar -zxvf jdk-8u241-linux-x64.tar.gz
```
配置环境变量，可以选择用局部配置还是全局配置

```bash
# local
vi ~/.bashrc 

# global  
sudo vi /etc/profile 
```
在文件末尾添加如下内容
```bash
export JAVA_HOME=/usr/local/jdk1.8.0_241/
export PATH=$PATH:$JAVA_HOME/bin
```
保存退出后，记得让配置文件生效

```bash
source ~/.bashrc
```


### MySQL


### Docker


 
### 常用文件、目录
- /etc/hostname
- /etc/hosts
- /etc/passwd
- /etc/sudoers
- /etc/profile：全局环境变量
- /etc/shells
- /etc/apt


