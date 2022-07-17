# DevTool

## NPM

### 安装与配置
```bash
npm config set registry https://registry.npm.taobao.org
npm config get registry
npm install -g @vue/cli
```

### npm config
```bash
npm config set key value 
npm config get key
npm config delete key

npm config list
npm config edit
```

### npm install
```bash
# 安装当前项目所需依赖
npm install 

# 全局安装，不写入package.json
npm install xxx -g

# 局部安装，写入package.json/dependencies
npm install xxx -S  # npm install xxx --save

# 局部安装，写入 package.json/devDependencies
npm install xxx -D # npm install xxx --save-dev
```

```bash
# 初始化项目
npm init

# 
npm list -g

# 列出当前项目所有的依赖
npm ls
```

## Maven
Maven 主要用于 Java 的项目构建、依赖管理、打包发布

### 依赖管理

传递依赖
排除依赖

### 依赖冲突
- 短路优先
- 声明优先

### 常用命令

```bash
mvn -v

mvn clean

mvn complie

mvn test

mvn package

mvn install

mvn deploy
```

### package

- jar：默认的打包方式，添加了spring-boot-maven-plugin插件之后，运行mvn package后会打包成一个可以直接运行的 jar 文件，使用 java -jar 命令就可以直接运行
- war：在tomcat容器中运行需要达成war包
- pom：一般用于父工程或聚合工程的打包，用来定义依赖的版本，或添加某些公用的依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.demo</groupId>
  <artifactId>api</artifactId>
  <packaging>pom</packaging>
  <version>0.0.1-SNAPSHOT</version>

  <description>Demo project for Spring Boot</description>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.2.2.RELEASE</version>
    <relativePath/> 
  </parent>

  <modules>
    <module>api-eureka</module>
    <module>api-gateway</module>
    <module>api-common</module>
  </modules>

  <properties>
    <java.version>1.8</java.version>
    <spring-cloud.version>Hoxton.RELEASE</spring-cloud.version>
  </properties>

  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-dependencies</artifactId>
        <version>${spring-cloud.version}</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>
</project>
```

## Git

### git config
```
git config -l
git config -e

```

### git remote

```bash
git remote add origin 'git@github.com:XXX/YYY.git'
git remote rm origin 'git@github.com:XXX/YYY.git'
git remote set-url origin 'git@github.com:XXX/YYY.git'

```
### git status

### git log
```bash
git log --decorate --oneline --graph --all
```

### git commit


### git branch


## Docker

``` bash
docker images
docker pull 
docker run -d -p 
docker ps
docker exec -it 
```

### Dockerfile

### Docker-compose