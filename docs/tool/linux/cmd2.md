# Linux 常用命令探微

本文主要深入介绍一些命令的详细使用

## cat
```bash
# 显示行号
cat -n data.txt

# 合并多个 .tar.00x 文件为一个
cat test.tar.001 test.tar.002 > test.tar
```

## mv

## chmod

```bash

chmod u+r
chmod g+x
```


## find
```bash
## 在home目录下查找文件
find /home -name 'word.txt'

## 使用通配符
find /home -name 'log*'

## 忽略大小写
find /home -iname 'Log*'
```
## scp
```bash
## dst host
amax@server69:/data$ sudo chmod 777 /data/Dataset
## src host
amax@server138:/data/Dataset$scp -r ./LRW-1000 amax@114.213.212.69:/data/Dataset
```

## grep
```bash
grep -c --count
grep -i --ignore-case
grep -o --only-matching 
grep -v --invert-match
```
## tr
```bash
## 将文本的所有小写字母替换为大写
cat word.txt | tr a-z A-Z

## -s --squeeze-repeats：将连续重复出现的字符当做一个字符来处理
## 比如有连续2个空格，也只会当成一个空格
cat word.txt | tr -s ' ' '\n'
```
## awk
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
## 设某文件 word.txt 内容如下
the day is sunny the  the
the sunny   is is

## 要求按如下格式输出词频
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
## 假设某服务器的访问日志 access.log 如下
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

## 要求输出访问量最大的 5 个 IP，按访问量降序排列
4 192.168.1.104 
3 192.168.1.103
2 192.168.1.102
2 192.168.1.101
1 192.168.1.105
```

```bash
awk -F, '{print $1}' access.log | sort | uniq -c | sort -nr | head -n 5
```

## 统计目录下指定文件数量
```bash
## 统计当前目录下普通文件的数量
ls -l | grep -c '^-'
ls -l | grep '^-' | wc -l

## 统计当前目录下文件夹的数量
ls -l | grep -c '^d'
ls -l | grep '^d' | wc -l
```

## 查看各磁盘存储情况
```bash
## 仅查看所有分区大小
lsblk

## 查看所有分区大小和使用情况
df -h

## 查看指定目录所占空间大小
du -sh /home/xxx/

sudo blkid

sudo mkfs
```

## 查看系统版本
```bash
uname -a

cat /etc/os-release
```

## 查看显卡型号
```bash
nvidia-smi -q | greq -i 'prod'
```

## 安装显卡驱动
```bash
ubuntu-drivers devices
sudo apt upgrade
sudo ubuntu-drivers autoinstall
```