# Java 日期时间

```java
SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
Date date = sdf1.parse("2019-12-31");

SimpleDateFormat sdf2 = new SimpleDateFormat("YYYY-MM-dd");
System.out.println(sdf2.format(date));
```


```java
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
System.out.println(sdf.format(new Date()));
System.out.println(sdf.parse("2022-09-10"));

DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
System.out.println(dtf.format(LocalDateTime.now()));
System.out.println(dtf.parse("2022-09-10"));
```