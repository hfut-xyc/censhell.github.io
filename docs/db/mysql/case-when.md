# case when 语句

本文主要介绍一下 SQL 中用得比较少的 case 语句

## 场景1-修改属性的展示形式
某门课程的成绩表 `tb_grade` 如下：
|  id   | name  | grade |
| :---: | :---: | :---: |
|   1   |  甲   |  50   |
|   2   |  乙   |  60   |
|   3   |  丙   |  70   |
|   4   |  丁   |  80   |

现在要将成绩属性显示为是否及格：
|  id   | name  | grade |
| :---: | :---: | :---: |
|   1   |  甲   |  不及格   |
|   2   |  乙   |  及格   |
|   3   |  丙   |  及格   |
|   4   |  丁   |  及格   |

```sql
select
    id, name,
    (case when grade < 60 then '不及格' else '及格' end) as grade
from
    tb_grade;
```
## 场景2-统计数量
某门课程的成绩表 `tb_grade` 如下：
|  id   | name  |sex| grade |
| :---: | :---: |--|:---: |
|   1   |  甲   |男|  50   |
|   2   |  乙   |男|  60   |
|   3   |  丙   |女|  70   |
|   4   |  丁   |女|  80   |

现在要将统计男生和女生的及格人数：
|  male_pass   | female_pass  |
| :---: | :---: |
|1|2|


1.先用 case 语句，转换为下表的形式
|  male_pass   | female_pass  |
| :---: | :---: |
|  0    |  0   |
|  1    |  0   |
|  0    |  1   |
|  0    |  1   |
```sql
select
    (case when grade >= 60 and sex='男' then 1 else 0 end) as male_pass,
    (case when grade >= 60 and sex='女' then 1 else 0 end) as female_pass
from
    tb_grade;
```

2.再用聚合函数 sum 对每一列求和，这里每一列默认就是一组，不需要再分组
```sql
select
    sum(case when grade >= 60 and sex='男' then 1 else 0 end) as male_pass,
    sum(case when grade >= 60 and sex='女' then 1 else 0 end) as female_pass
from
    tb_grade;
```

## 场景3-行转列操作
某成绩汇总表 `tb_grade` 如下：
|  id   | name  | course | grade |
| :---: | :---: | :----: | :---: |
|  1   | 甲 |  语文  |  10   |
|  2   | 甲 |  数学  |  20   |
|  3   | 甲 |  英语  |  30   |
|  4   | 乙 |  语文  |  40   |
|  5   | 乙 |  数学  |  50   |
|  6   | 乙 |  英语  |  60   |

现在要将数据按如下方式显示：
| 姓名  | 语文  | 数学  | 英语  |
| :---: | :---: | :---: | :---: |
| 甲  |  10   |  20   |  30   |
| 乙  |  40   |  50   |  60   |

1.先用 case 语句，转换为下表的形式
| 姓名  | 语文  | 数学  | 英语  |
| :---: | :---: | :---: | :---: |
| 甲  |  10   |   0   |   0   |
| 甲  |   0   |  20   |   0   |
| 甲  |   0   |   0   |  30   |
| 乙  |  40   |   0   |   0   |
| 乙  |   0   |  50   |   0   |
| 乙  |   0   |   0   |  60   |
```sql
select
    name as '姓名',
    (case course when '语文' then grade else 0 end) as '语文',
    (case course when '数学' then grade else 0 end) as '数学',
    (case course when '英语' then grade else 0 end) as '英语'
from
    tb_grade;
```

2.再用 `group by`+聚合函数 sum，和上一题不同，这里需要按姓名分组后再求和
```sql
select 
    name as '姓名',
    sum(case course when '语文' then grade else 0 end) as '语文',
    sum(case course when '数学' then grade else 0 end) as '数学',
    sum(case course when '英语' then grade else 0 end) as '英语'
from
    tb_grade
group by
    name;
```
