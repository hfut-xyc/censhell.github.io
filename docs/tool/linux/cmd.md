# Linux常用指令

## 1.速查
### 文件管理
- cd：切换目录
- ls: 打印目录及文件名
- tree：树状打印目录及文件名
- pwd：打印当前目录
- touch：创建一个新文件
- **ln：创建一个快捷方式**
- mkdir：创建一个新目录
- rmdir：删除一个空目录
- cp: 复制文件或目录
- **scp：在主机之间复制文件或目录**
- rm: 删除文件或目录
- mv: 移动（重命名）文件或目录
- stat：查看文件属性
- tar：
- gzip：
- unzip：
- find：在指定目录下查找文件
- which：查找命令所在目录
- whereis：查找命令以及文档所在目录
- **chown：修改文件所属用户和用户组**
- **chmod：修改文件权限**
- chsh：修改当前的终端

### 文本处理
- cat：显示整个文件的内容，内容过多时不建议使用
- head：显示文件前 10 行
- tail：显示文件末尾内容，常用于查看日志文件
- more：翻页显示文件内容，按 B 翻上页，按 space 翻下页
- **less：滑动显示文件内容，按上下键可滚动，按 Q 退出**
- grep：正则查找文本内容
- tr：替换或删除文件中的字符
- sort：排序
- uniq：检查及删除文本文件中重复出现的行列，一般与 sort 命令结合使用
- wc：统计文件的行数、字数、字节数
- awk：
- sed：

### 硬件管理
- df：查看各磁盘分区使用情况
- du：查看文件夹所占磁盘空间大小
- lsblk：查看磁盘分区
- fdisk：对磁盘进行分区
- mount：将磁盘分区挂载到指定目录下
- unmount：卸载磁盘分区
- free：查看内存使用情况
- lscpu：查看CPU信息
- lsusb：查看USB接口信息
- uname：查看系统信息，包括操作系统、主机名、内核等
- nvidia-smi：查看显卡信息和显存使用情况
- nvidia-settings

### 关机/重启
- shutdown
- reboot
- poweroff
- halt
- init

### 进程管理
- ps
- top / htop：任务管理器
- kill
- systemctl

### 网络工具
- ifconfig：查看网络 IP
- netstat：查看网络端口号使用情况
- hostname：查看主机名
- ping：
- route：
- traceroute：
- telnet：
- ssh：
- sftp：
- wget：
- curl：

### 用户管理
- su：切换用户
- passwd
- useradd
- userdel
- usermod
- groups：查看当前用户所属的用户组
- groupadd：添加用户组
- groupdel：删除用户组
- groupmod：修改用户组
- who
- whoami
- last：查看最近登录日志

### 软件包管理
- apt
- dpkg
- yum
- rpm

### 命令行模式与桌面模式切换
- Ctrl+Alt+F1：切换到登录页面
- Ctrl+Alt+F2：切换到桌面模式
- Ctrl+Alt+F4：切换到命令行模式
---

## 2.实战
### cat
```bash
# 合并多个 .tar.00x 文件为一个
cat test.tar.001 test.tar.002 > test.tar
```

### find
```bash
### 在home目录下查找文件
find /home -name 'word.txt'

### 使用通配符
find /home -name 'log*'

### 忽略大小写
find /home -iname 'Log*'
```
### scp
```bash
## dst host
amax@server69:/data$ sudo chmod 777 /data/Dataset
## src host
amax@server138:/data/Dataset$scp -r ./LRW-1000 amax@114.213.212.69:/data/Dataset
```

### grep
```bash
grep -c --count
grep -i --ignore-case
grep -o --only-matching 
grep -v --invert-match
```
### tr
```bash
### 将文本的所有小写字母替换为大写
cat word.txt | tr a-z A-Z

### -s --squeeze-repeats：将连续重复出现的字符当做一个字符来处理
### 比如有连续2个空格，也只会当成一个空格
cat word.txt | tr -s ' ' '\n'
```
### awk
| 内置变量 | 含义 |
|--|:--|
| FS(Field Separator) | 字段分隔符，默认为空格 |
| OFS(Output Field Separator) | 输出字段分隔符 |
| RS(Record Separator)  | 记录分隔符，默认为换行符 |
| ORS(Output Record Separator) | 输出记录分隔符，默认为换行符 |
| NF(Number for Field) | 当前行的字段数 |
| NR(Number of Record) | 当前行的行号 |

```bash
awk '{print $1, $2}' word.txt

awk '$1=="tcp" && $2==1 {print $0}' word.txt

awk '{arr[$1]++} END {for (i in arr)print i "\t" arr[i]}'
```

**练习1：统计词频**（来源：[LeetCode 192](https://leetcode-cn.com/problems/word-frequency/)
）
```bash
### 设某文件 word.txt 内容如下
the day is sunny the  the
the sunny   is is

### 要求按如下格式输出词频
the 4
is 3
sunny 2
day 1
```
```bash
cat word.txt | tr -s ' ' '\n' | sort | uniq -c | sort -r | awk '{print $2, $1}'
```
**练习2：统计 ip 访问量**
```bash
### 假设某服务器的访问日志 access.log 如下
192.168.1.104, 2013-10-29 10:26:09
192.168.1.104, 2013-10-29 11:26:09
192.168.1.102, 2013-10-29 12:26:09
192.168.1.103, 2013-10-29 13:26:09
192.168.1.104, 2013-10-29 14:26:09
192.168.1.102, 2013-10-29 15:23:09
192.168.1.103, 2013-10-29 16:28:09
192.168.1.101, 2013-10-29 17:24:09
192.168.1.104, 2013-10-29 18:26:09
192.168.1.103, 2013-10-29 19:28:09
192.168.1.105, 2013-10-29 19:37:09
192.168.1.101, 2013-10-29 19:37:09

### 要求输出访问量最大的 5 个 IP，按访问量降序排列
4 192.168.1.104 
3 192.168.1.103
2 192.168.1.102
2 192.168.1.101
1 192.168.1.105
```

```bash
awk -F, '{print $1}' access.log | sort | uniq -c | sort -nr | head -n 5
```

### 统计目录下指定文件数量
```bash
## 统计当前目录下普通文件的数量
ls -l | grep -c '^-'
ls -l | grep '^-' | wc -l

## 统计当前目录下文件夹的数量
ls -l | grep -c '^d'
ls -l | grep '^d' | wc -l
```

### 查看各磁盘存储情况
```bash
## 仅查看所有分区大小
lsblk

## 查看所有分区大小和使用情况
df -h

## 查看指定目录所占空间大小
du -sh /home/xxx/
```

### 查看显卡型号
```bash
nvidia-smi -q | greq -i 'prod'
```
### 安装显卡驱动
```bash
ubuntu-drivers devices
sudo apt upgrade
sudo ubuntu-drivers autoinstall
```