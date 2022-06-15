# Spring Bean

本文主要针对 Bean 的常见知识点做一个汇总

## 控制反转与依赖注入
控制反转`(Inversion of Control, IoC)` 是一种设计思想，

依赖注入`(Dependency Injection, DI)` 是 IoC 的一种实现方式

## Bean 的声明
Bean 的声明主要有 XML、注解、JavaConfig类等多种方式，目前后两种方法用得更多

### 通过 XML 声明
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

如果选择用构造函数配置
```xml
<bean id="book" class="com.demo.Book">
    <constructor-arg name="title" value="Java"/>
</bean>
```
如果选择用 setter 配置
```xml
<bean id="book" class="com.demo.Book">
    <property name="title" value="Java"/>
</bean>
```

### 通过注解声明
@Component
@Controller
@Service
@Repository

```java
@Component
public class Book {
    private String title;

    public Book() {}

    public Book(String title) {
        this.title = title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
```


### 通过 JavaConfig 类声明
JavaConfig 类是 Spring 的一个子项目，主要是通过 `@Configuration` 和 `@Bean` 两个注解来实现

``` java
@Configuration
public class MyConfig {

    @Bean
    public Book book() {
        return new Book("Java");
    }
}
```


## Bean 的注入方式
Bean 实现依赖注入的方式主要有三种：构造函数注入、setter 注入、属性注入

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {

    private Author author;

}

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Author {

}
```

### constructor 注入
Spring 官方目前推荐使用构造函数注入


```xml
<bean id="book" class="com.demo.Book">
    <constructor-arg name="author" ref="author"/>
</bean>

<bean id="author" class="com.demo.Author"></bean>
```
```java
@Component
public class Book {

    private Author author;

    public Book() {}

    public void setAuthor(Author author) {
        this.author = author;
    }
}

@Component
public class Author {}
```
### setter 注入


### field 注入
属性注入主要通过注解 `@Autowired` 或 `@Resource` 来实现

虽然这种方式代码简洁，但是 Spring 官方并不推荐，原因后面会解释

```java
@Component
public class Book {

    @Autowired
    private Author author;
}

@Component
public class Author {}
```
下面简要说一下 `@Autowired` 和 `@Resource` 的区别


## Bean 的生命周期


## Bean 的作用域
Spring 中所有的 Bean 默认都是使用单例模式

| 作用域 | 含义 |
|--|--|
| singleton |  |
| prototype |  |
| request |  |
| session |  |
| global session |  |

