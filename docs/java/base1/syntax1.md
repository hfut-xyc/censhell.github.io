# Java 语法（上）

## 基本数据类型/包装类型

Java 中有 8 种基本数据类型，分别对应 1 种 包装类型，如下表所示
- 包装类型默认值为 null
- 包装类型可用于泛型，基本类型不可以

| 基本类型 | 对应包装类型 | 字节 | bit | 默认值  | 取值范围                                   |
| -------- | ------------ | ---- | --- | ------- | :------------------------------------------ |
| byte     | Byte         | 1    | 8   | 0       | -128 ~ 127                                 |
| short    | Short        | 2    | 16  | 0       | -32768 ~ 32767                             |
| char     | Character    | 2    | 16  | 'u0000' | 0 ~ 65535                                  |
| int      | Integer      | 4    | 32  | 0       | -2147483648 ~ 2147483647                   |
| long     | Long         | 8    | 64  | 0L      | -9223372036854775808 ~ 9223372036854775807 |
| float    | Float        | 4    | 32  | 0f      | 1.4E-45 ~ 3.4028235E38                     |
| double   | Double       | 8    | 64  | 0d      | 4.9E-324 ~ 1.7976931348623157E308          |
| boolean  | Boolean      | NaN  | 1   | false   | true, false                                |

### 自动装箱与拆箱
```java
// boxing  
Integer i = 0;  // Integer i = Integer.valueOf(0);

// unboxing
int x = i;      // int x = i.intValue();      
```

### 基本类型与 String 转换
```java
// int -> String
int i = 123;
String str = i + "";
String str = Integer.toString(i);
String str = String.valueOf(i);

// String -> int
String str = "123";
int i = Integer.parseInt(str);
```

### 包装类型的缓存机制
- Byte, Short, Integer, Long 创建了 -128~127 的缓存数据
- Character 创建了 0~127 的缓存数据
- Boolean 创建了 True、False 的缓存数据
- Float, Double 没有缓存机制

## 上下转型
父类引用可以指向子类对象，在此前提下可以强转为子类引用
```java
Object obj = new String();	// upcasting
String str = (String) obj;	// downcasting
```
 
子类引用不能指向父类对象，否则会抛出异常
```java
Object obj = new Object();		
String str = (String) obj;	// ClassCastException
```

## BigDecimal
涉及到金额的运算，不要使用浮点类型，务必使用 `BigDecimal`
```java
public class BigDecimalTest {
    @Test
    public void test1() {
        System.out.println(0.1 + 0.2);
        System.out.println(1.0 - 0.8);
        System.out.println(2.013 * 100);
        System.out.println(123.3 / 100);
    }

    @Test
    public void test2() {
        System.out.println(new BigDecimal("0.1").add(new BigDecimal("0.2")));
        System.out.println(new BigDecimal("1.0").subtract(new BigDecimal("0.8")));
        System.out.println(new BigDecimal("2.013").multiply(new BigDecimal("100")));
        System.out.println(new BigDecimal("123.3").divide(new BigDecimal("100")));
    }
}
```
运行结果如下
```
0.30000000000000004
0.19999999999999996
201.29999999999998
1.2329999999999999

0.3
0.2
201.300
1.233
```

## 参数传递
Java 中的函数传参只有值传递，没有引用传递


## super 关键字

## 内部类

### 成员内部类

### 静态内部类

### 匿名内部类