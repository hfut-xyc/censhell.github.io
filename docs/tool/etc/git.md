# Git

## 安装与配置

Win10 安装直接去官网[下载 exe 安装包](https://git-scm.com/download/win)，然后运行即可

Ubuntu 安装直接运行如下命令
```bash
sudo apt install git
```

配置个人信息
```bash
# 设置本地的用户名和邮箱
git config --global user.name YOUR_GITHUB_USERNAME
git config --global user.email YOUR_GITHUB_EMAIL

# 查看是否配置成功
git config -l
```

生成公钥和私钥对
```bash
ssh-keygen -t rsa -C "YOUR_GITHUB_EMAIL"
```
在 github 账户中添加公钥：
- Win10：使用 `C:/Users/xxx/.ssh/id_rsa.pub`
- Ubuntu：使用 `/home/xxx/.ssh/id_rsa.pub`

最后检测是否能正常连接
```bash
ssh -T git@github.com
```

## 仓库初始化

```bash
git remote add origin 'git@github.com:XXX/YYY.git'
git remote rm origin 'git@github.com:XXX/YYY.git'
git remote set-url origin 'git@github.com:XXX/YYY.git'

git config -e
```

## git log
```bash
git log --decorate --oneline --graph --all
```

## git commit


## git branch