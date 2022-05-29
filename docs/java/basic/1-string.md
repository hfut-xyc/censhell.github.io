
# String

## 字符串常量池 
```java
String s1 = "a";            	// constant pool
final String s2 = "a";

String s3 = "a" + "b"; 
String s4 = s1 + "b";
String s5 = s2 + "b";
String s6 = new String("ab"); 	// heap memory

System.out.println(s1 == s2);   // true
System.out.println(s1 == s3);   // false
```

```java
String s1 = "ab";
String s2 = "abc";
String s3 = s1 + "c";
System.out.println(s2 == s3);  // false
```

## String-StringBuilder-StringBuffer