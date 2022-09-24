# Spring AOP

## 介绍

面向切面编程（Aspect-Oriented Programming, AOP）可以看作是面向对象编程（Object-Oriented Programming, OOP）的补充

AOP 在 Java 中有两种实现方式：

- 一种是 AspectJ，它的原理是在编译期静态织入
- 另一种是 Spring AOP，本质上就是动态代理，但是在它的基础上做了一些改进

## 静态代理
```java

```

```java

```

```java

```
## JDK 动态代理

如果目标对象实现了接口，采用 JDK 动态代理来代理目标对象
```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class JdkProxyFactory {

    private Object target;
    private InvocationHandler interceptor;

    public JdkProxyFactory(Object target) {
        this.target = target;
        this.interceptor = new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println("begin transaction");
                Object result = method.invoke(target, args);
                System.out.println("commit transaction");
                return result;
            }
        };
    }

    public Object getProxyInstance() {
        return Proxy.newProxyInstance(
                target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),
                interceptor);
    }
}
```

## CGLib 动态代理

CGLib 是第三方库，使用前需要引入 maven 依赖
```xml
<dependencies>
    <dependency>
        <groupId>cglib</groupId>
        <artifactId>cglib</artifactId>
        <version>3.3.0</version>
    </dependency>
</dependencies>
```

```java
import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

public class CglibProxyFactory {

    private Object target;
    private MethodInterceptor interceptor;

    public CglibProxyFactory(Object target){
        this.target = target;
        this.interceptor = new MethodInterceptor() {
            @Override
            public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
                System.out.println("begin transaction");
                Object result = method.invoke(target, args);
                System.out.println("commit transaction");
                return result;
            }
        };
    }

    public Object getProxyInstance(){
        Enhancer en = new Enhancer();
        en.setSuperclass(target.getClass());
        en.setCallback(interceptor);
        return en.create();
    }
}
```

```java
public class App {
    
    public static void test1() {
        UserService userService = new UserServiceImpl();
        JdkProxyFactory jdkProxyFactory = new JdkProxyFactory(userService);
        UserService userProxy = (UserService) jdkProxyFactory.getProxyInstance();
        userProxy.update();
    }

    public static void test2() {
        ProductService productService = new ProductService();
        CglibProxyFactory cglibProxyFactory = new CglibProxyFactory(productService);
        ProductService productProxy = (ProductService) cglibProxyFactory.getProxyInstance();
        productProxy.update();
    }
}

```


## 手动实现 AOP

Spring AOP 内部实现依然遵循以下原则

- 如果目标对象实现了接口，采用 JDK 动态代理实现
- 如果目标对象没有实现接口，采用 CGLib 动态代理实现

## 参考文献

- [Spring AOP 扫盲](https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&mid=2247486644&idx=1&sn=bce7bcf78feb62c77e0b9bbf3893398e&chksm=ebd74db5dca0c4a3c8f5e03b754607442e77dd212f1ebe5c66f1914d6300fd418dfe849e4b10&mpshare=1&scene=23&srcid=0618FK8mRWjbZ8dyGIaGagfy&sharer_sharetime=1655565040551&sharer_shareid=3de7d51a86241055cb157f66dbfd4010#rd)
- [Spring【AOP模块】就这么简单](https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&mid=2247483954&idx=1&sn=b34e385ed716edf6f58998ec329f9867&chksm=ebd74333dca0ca257a77c02ab458300ef982adff3cf37eb6d8d2f985f11df5cc07ef17f659d4&scene=21###wechat_redirect)