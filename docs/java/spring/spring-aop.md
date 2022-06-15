# Spring AOP

## 介绍 
面向切面编程（Aspect-Oriented Programming, AOP）本质上就是[动态代理](./../../design/structural/proxy.md)，但是在它的基础上做了一些改进


Spring AOP 内部实现依然遵循以下原则
- 如果目标对象实现了接口，采用 JDK 动态代理实现
- 如果目标对象没有实现接口，采用 CGLib 动态代理实现