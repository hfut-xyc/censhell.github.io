# Node Package Management

## npm config
```bash
npm config set key value 
 
npm config get key

npm config delete key

npm config list

npm config edit
```


## npm install
```bash
# 安装当前项目所需依赖
npm install 

# 全局安装，不写入package.json
npm install xxx -g

# 局部安装，写入package.json/dependencies
npm install xxx -S
npm install xxx --save

# 局部安装，写入 package.json/devDependencies
npm install xxx -D
npm install xxx --save-dev
```

```bash
# 初始化项目
npm init

# 
npm list -g

# 列出当前项目所有的依赖
npm list
```