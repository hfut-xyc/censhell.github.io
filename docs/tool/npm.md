## NPM
NPM(Node package Management) 是 JavaScript 运行时环境 Node.js 默认的包管理器
### 安装与配置
首先去官网下载安装 [Node.JS](http://nodejs.org)，然后记得换源
```bash
# 设置为阿里源
npm config set registry https://registry.npm.taobao.org
```

### 常用命令
```bash
# 查看配置文件
npm config list

# 使用编辑器修改配置文件
npm config edit

# 初始化项目
npm init

# 安装当前项目所需依赖
npm install 

# 全局安装，不写入package.json
npm install xxx -g

# 局部安装，写入package.json/dependencies
# npm install xxx --save
npm install xxx -S  

# 局部安装，写入 package.json/devDependencies
# npm install xxx --save-dev
npm install xxx -D

# 列出当前项目所有的依赖
npm ls

# 查看全局依赖
npm ls -g
```
