# Spring Bean

本文主要对 Spring IoC 的常见知识点做一个总结

## 控制反转与依赖注入

控制反转 `(Inversion of Control, IoC)` 是一种设计思想，

依赖注入 `(Dependency Injection, DI)` 是 IoC 的一种实现方式

## Bean 的声明

Bean 的声明主要有三种方式：

- 基于 XML 文件
- 基于注解
- 基于 JavaConfig 类

> 注意辨别 `Bean 的声明` 和下文中 `Bean 的注入`，声明是即便只有一个类也可以，而注入是至少要有两个类

### 通过 XML 声明

使用 XML 文件配置在 SpringBoot 时代用的已经比较少了，这一部分了解即可

假如某 Book 类的声明如下，该类包含一个 String 类型成员变量 title，现在要通过 xml 将 Book 声明为 Bean

```java
public class Book {

    private String title;

    public Book(String title) {
        this.title = title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
```

可以选择用构造函数配置

```xml
<bean id="book" class="com.demo.Book">
  <constructor-arg name="title" value="Java"/>
</bean>
```

也可以选择用 setter 配置

```xml
<bean id="book" class="com.demo.Book">
  <property name="title" value="Java"/>
</bean>
```

### 通过注解声明

将如下的注解标注在某个类上，可以将该类声明为一个 Bean

| 注解        | 含义                                       |
| ----------- | ------------------------------------------ |
| @Controller | 表明该类是一个控制层 Bean                  |
| @Service    | 表明该类是一个服务层 Bean                  |
| @Repository | 表明该类是一个持久层 Bean                  |
| @Component  | 如果一个 Bean 不属于任何层，可以使用它标注 |

```java
@Component
public class Book {
    // ...
}
```

### 通过 JavaConfig 类声明

JavaConfig 类是 Spring 的一个子项目，主要是通过 `@Configuration` 和 `@Bean` 两个注解来实现

```java
@Configuration
public class MyConfig {

    @Bean
    public Book book() {
        return new Book("Java");
    }
}
```

## Bean 的注入

Bean 实现依赖注入主要有三种方式：

- constructor 注入
- setter 注入
- field 注入

### constructor 注入

Spring 官方目前推荐使用构造函数注入

如下所示，使用 `@Autowired` 修饰构造函数即可，去掉该注解也行

```java
@Component
public class Book {

    private final Author author;

    @Autowired
    public Book(Author author) {
        this.author = author;
    }
}

@Component
public class Author {}
```

### setter 注入

使用`@Autowired` 修饰 setter 方法即可，但是和上面的构造器注入有两点不同：

- 此时注解不能去掉
- 此时需要注入的成员变量不可以用 final 修饰

```java
@Component
public class Book {

    private Author author;

    @Autowired
    public void setAuthor(Author author) {
        this.author = author;
    }
}

@Component
public class Author {}
```

### field 注入

属性注入主要通过注解 `@Autowired` 或 `@Resource` 直接修饰成员变量来实现

虽然这种方式代码简洁，但是 Spring 官方并不推荐

```java
@Component
public class Book {

    @Autowired
    private Author author;
}

@Component
public class Author {}
```

### @Autowired 和 @Resource 的区别

```java
@Target({ElementType.CONSTRUCTOR, ElementType.METHOD, ElementType.PARAMETER, ElementType.FIELD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Autowired {

	boolean required() default true;
}
```

// TODO

## Bean 的作用域

Spring Bean 的作用域有 5 种，如下表所示

| 作用域         | 含义 |
| -------------- | ---- |
| singleton      |      |
| prototype      |      |
| request        |      |
| session        |      |
| global session |      |

### 单例模式 Bean 的优缺点

Spring Bean 默认使用单例模式，有以下优点：
- 能减少创建新实例的消耗和内存占用
- 能减少 JVM 垃圾回收的消耗
- 能通过缓存快速获取 Bean

缺点也很明显：
- 如果 Bean 是有状态的，则可能会导致线程不安全

### 单例模式 Bean 如何保证线程安全

- 尽量避免使用成员变量，可以替换为局部变量
- 使用 `@Scope("prototype")` 将单例模式改为原型模式
- 使用 `ThreadLocal` 进行线程隔离

## Bean 的生命周期

## Bean 的循环依赖问题

## 参考文献

- [Spring IoC有什么好处呢？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/23277575/answer/169698662)
- [面试题：Spring为什么默认bean为单例？-CSDN博客](https://blog.csdn.net/pyycsd/article/details/102803271)
- [虾皮二面：Spring Bean 默认是单例的，如何保证并发安全? (qq.com)](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247520660&idx=1&sn=0da4972b58a15da6c84795a72433bfc5&chksm=cea1de5ff9d65749c31655eade74bb70136321b65a92ba3986475e120c5ea080d21c28a29685&scene=178&cur_album_id=1352302538565189634#rd)
-
