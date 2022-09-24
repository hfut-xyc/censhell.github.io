# Git

## 安装与配置
```bash
# 安装
sudo apt install git

# 全局配置用户名和邮箱
git config --global user.name YOUR_GITHUB_USERNAME
git config --global user.email YOUR_GITHUB_EMAIL

# 查看所有配置
git config -l

# 生成公钥和私钥对
ssh-gen -t rsa -C "YOUR_GITHUB_EMAIL"
```

## git remote

```bash
git remote add origin 'git@github.com:XXX/YYY.git'
git remote rm origin 'git@github.com:XXX/YYY.git'
git remote set-url origin 'git@github.com:XXX/YYY.git'

```

## git log
```bash
git log --decorate --oneline --graph --all
```

## git commit


## git branch