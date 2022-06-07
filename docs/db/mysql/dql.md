# Data Select Language

## 介绍
本文主要针对数据查询语言（DQL），介绍一些比较进阶的用法

## distinct

```sql
        tb_user
+----+---------+---------+
| id | 	name   | balance |
+----+---------+--------+
|  1 | aaa     |  100 	|
|  2 | aaa     |  200 	|
|  3 | ccc     |  300 	|
+----+---------+--------+

select distinct name from tb_user
+--------+
|  name  |
+--------+
|  aaa   |
|  ccc   |
```

## union all
```sql
        tb_A								 tb_B
+----+---------+---------+			+----+---------+---------+
| id | 	name   | balance |			| id | 	name   | balance |
+----+---------+---------+			+----+---------+---------+
|  1 | aaa     |  100 	 |			|  1 |   bbb   |  100    |
|  2 | bbb     |  200 	 |			|  2 |   ccc   |  200    |
+----+---------+--------+			+----+---------+--------+

select name from tb_A
union all
select name from tb_B
+--------+
|  name  |
+--------+
|  aaa   |
|  bbb   |
|  bbb   |
|  ccc   |
```

## case when

```sql
| id   | course  | score |			|  id  |  cpp   |  Java  |
|------------------------|			|------------------------|
|  1   |   cpp   |  10   |	  =>  	|  1   |   10   |   20   |
|  2   |   cpp   |  20   | 			|  2   |   30   |   40   |
|  1   |  Java   |  30   |
|  2   |  Java   |  40   |

select id, 
	sum(case course when 'cpp' then score end) as cpp, 
	sum(case course when 'Java' then score end) as Java
from tb_score group by id
order by id
```

##### 行转列操作

某学生成绩表tb_score如下表所示

|  id  | name | course | score |
| :--: | :--: | :----: | :---: |
|  1   | 张三 |  语文  |  10   |
|  2   | 张三 |  数学  |  20   |
|  3   | 张三 |  英语  |  30   |
|  4   | 李四 |  语文  |  40   |
|  5   | 李四 |  数学  |  50   |
|  6   | 李四 |  英语  |  60   |

现在要将数据按下表的方式显示

| 姓名 | 语文 | 数学 | 英语 |
| :--: | :--: | :--: | :--: |
| 张三 |  10  |  20  |  30  |
| 李四 |  40  |  50  |  60  |



``` sql
select
    name as '姓名',
    (case course when '语文' then score else 0 end) as '语文',
    (case course when '数学' then score else 0 end) as '数学',
    (case course when '英语' then score else 0 end) as '英语'
from
    tb_score;
```

可以先用**case-when**语句，转换为下表的形式

| 姓名 | 语文 | 数学 | 英语 |
| :--: | :--: | :--: | :--: |
| 张三 |  10  |  0   |  0   |
| 张三 |  0   |  20  |  0   |
| 张三 |  0   |  0   |  30  |
| 李四 |  40  |  0   |  0   |
| 李四 |  0   |  50  |  0   |
| 李四 |  0   |  0   |  60  |

再用**group** **by**语句+聚合函数，其中sum也可以换成max，效果是一样的

```sql
select 
    name as '姓名',
    sum(case course when '语文' then score else 0 end) as '语文',
    sum(case course when '数学' then score else 0 end) as '数学',
    sum(case course when '英语' then score else 0 end) as '英语'
from
    tb_score
group by
    name;
```

