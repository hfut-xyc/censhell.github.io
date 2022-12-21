# Linux 常用指令总览

本文主要对 Linux 常用命令做一个分类整理，不做深入探讨

## 文件管理
- cd：切换目录
- pwd：显示当前所在目录
- ls: 列表形式展示当前目录下所有文件名
- tree：树状形式展示当前目录下所有文件名
- touch：创建一个新文件
- ln：创建一个快捷方式
- mkdir：创建一个新目录
- rmdir：删除一个空目录
- cp: 复制文件或目录
- rm: 删除文件或目录
- mv: 移动（重命名）文件或目录
- scp：在主机之间复制文件或目录
- stat：查看文件属性
- tar：
- gzip：
- unzip：
- find：在指定目录下查找文件
- locate：
- which：查找命令所在目录
- whereis：查找命令以及文档所在目录
- chmod：修改文件权限
- chown：修改文件所属用户和用户组
- chgrp：

## 文本处理
- cat：显示整个文件的内容，内容过多时不建议使用
- head：显示文件前 10 行
- tail：显示文件末尾内容，常用于查看日志文件
- more：翻页显示文件内容，按 B 翻上页，按 space 翻下页
- less：滑动显示文件内容，按上下键可滚动，按 Q 退出
- grep：正则查找文本内容
- tr：替换或删除文件中的字符
- sort：排序
- uniq：检查及删除文本文件中重复出现的行列，一般与 sort 命令结合使用
- wc：统计文件的行数、字数、字节数
- awk：
- sed：

## 系统管理
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
- nvidia-smi：查看 NVIDIA 显卡信息和显存使用情况
- nvidia-settings
- chsh
- shutdown
- reboot
- poweroff
- halt
- init
- ps
- top / htop：任务管理器
- kill
- systemctl

## 用户管理
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

## 网络工具
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

## 软件包管理
- apt
- dpkg
- yum
- rpm

## 桌面模式下常用快捷键
- Ctrl+Alt+F2：切换到桌面模式
- Ctrl+Alt+F4：切换到命令行模式
- Ctrl+Alt+T：打开终端