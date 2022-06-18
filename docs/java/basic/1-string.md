# String

## String 为什么不可变
```java
public final class String implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];
    // ...
}
```
Java 9 之后 String 的字符数组改为 byte 类型
```java
public final class String implements java.io.Serializable,Comparable<String>, CharSequence {
    @Stable
    private final byte[] value;
    // ...
}
```

## 字符串常量池
```java
String s1 = "a";
String s2 = "b"; 	
String s3 = "ab";               // constant pool    
String s4 = "a" + "b";          // constant pool
String s5 = s1 + s2;            // heap
String s6 = new String("ab"); 	// heap

System.out.println(s3 == s4);   // true
System.out.println(s3 == s5);   // false
System.out.println(s3 == s6);   // false

System.out.println(s4 == s5);   // false
System.out.println(s4 == s6);   // false

System.out.println(s5 == s6);   // false
```
如果在前面加上 final
```java
final String s1 = "a";
final String s2 = "b"; 	
String s3 = "ab";               // constant pool    
String s4 = "a" + "b";          // constant pool
String s5 = s1 + s2;            // constant pool

System.out.println(s3 == s5);   // true
System.out.println(s4 == s5);   // true
```

## StringBuilder

## StringBuffer