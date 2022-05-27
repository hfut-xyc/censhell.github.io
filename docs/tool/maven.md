# Maven
Maven 主要用于 Java 的项目构建、依赖管理、打包发布

## 依赖管理

### 传递依赖

### 排除依赖

### 依赖冲突
- 短路优先
- 声明优先

****
## 常用命令

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

- **jar**：默认的打包方式，添加了spring-boot-maven-plugin插件之后，运行mvn package后会打包成一个可以直接运行的 jar 文件，使用 java -jar 命令就可以直接运行
- **war**：在tomcat容器中运行需要达成war包
- **pom**：一般用于父工程或聚合工程的打包，用来定义依赖的版本，或添加某些公用的依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <packaging>pom</packaging>
  <modules>
    <module>api-eureka</module>
    <module>api-gateway</module>
    <module>api-common</module>
  </modules>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.2.2.RELEASE</version>
    <relativePath/> <!-- lookup parent from repository -->
  </parent>

  <groupId>com.demo</groupId>
  <artifactId>api</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>api</name>
  <description>Demo project for Spring Boot</description>
	
  <!--  父模块统一管理依赖版本  -->
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
