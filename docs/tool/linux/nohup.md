# 命令行使用 nohup 与 & 的区别

## 普通情况
首先编写一个简单的python程序：每隔 1s 打印一个 helloworld
```python
# test.py
import time

for i in range(100):
    print('{}-helloworld'.format(i))
    time.sleep(1)
```
然后直接运行，按下 **Ctrl+C**，程序会被直接中断

```bash
xyc@hfut:~$ python test.py
0-helloworld
1-helloworld
2-helloworld
3-helloworld
^CTraceback (most recent call last):
  File "/home/xyc/test.py", line 6, in <module>
    time.sleep(1)
KeyboardInterrupt
```
## cmd &
如果在命令后加上 & 再运行，按下 **Ctrl-C** 运行不会中断，但是关闭终端会停止运行
```bash
xyc@hfut:~$ python test.py &
[1] 87194
xyc@hfut:~$ 0-helloworld
1-helloworld
2-helloworld
3-helloworld
4-helloworld
^C
xyc@hfut:~$ 5-helloworld
6-helloworld
7-helloworld
8-helloworld
9-helloworld
```

## nohup cmd
如果在命令前加上 nohup 再运行，按下 **Ctrl-C** 运行会中断，但是关闭终端不会停止运行
```bash
xyc@hfut:~$ nohup python test.py
nohup: ignoring input and appending output to 'nohup.out'
^C
xyc@hfut:~$
```

## nohup cmd &
现在把 nohup 和 & 都加上
```sh
xyc@hfut:~$ nohup python test.py &
nohup: ignoring input and appending output to 'nohup.out'
^C
```

## 总结
```bash
nohup java -jar XXX.jar > /dev/null &
```
SIGINT
SIGHUP
