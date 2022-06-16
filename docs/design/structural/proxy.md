# 代理模式


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
测试类如下
```java
public class App {

    public static void test1() {
        UserService userService = new UserServiceImpl();
        JdkProxyFactory jdkProxyFactory = new JdkProxyFactory(userService);
        UserService userProxy = (UserService) jdkProxyFactory.getProxyInstance();
        userProxy.update();
    }

    public static void main(String[] args) {
        test1();
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

    public static void test2() {
        ProductService productService = new ProductService();
        CglibProxyFactory cglibProxyFactory = new CglibProxyFactory(productService);
        ProductService productProxy = (ProductService) cglibProxyFactory.getProxyInstance();
        productProxy.update();
    }

    public static void main(String[] args) {
        test2();
    }
}

```
