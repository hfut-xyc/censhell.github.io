# synchronized

## 介绍

synchronized 关键字即同步，用于修饰方法和代码块，

在多线程环境下，表明进入该方法或代码块需要竞争锁，运行结束后会释放锁

- 修饰实例方法：锁住当前对象 this
- 修饰静态方法：锁住类的 class 对象
- 修饰代码块：锁住指定对象

## 原理
- 修饰方法时，编译后会加上 ACC_SYNCHRONIZED
- 修饰代码块时，编译后会在代码块前后分别加上 monitorenter 和 monitorexit

## 锁优化机制

### 锁消除


### 锁粗化