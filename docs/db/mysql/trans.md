# MySQL 事务

## 事务的ACID特性

- Atomicity(原子性)：
- Consistency(一致性)：
- Isolation(隔离性)：
- Durability(持久性)：

## 事务的并发问题

- 脏读（Dirty Read）
- 不可重复读（Unrepeatable Read）
- 幻读（Phantom Read）：不可重复读重点在于update和delete，而幻读的重点在于insert
- 第一类更新丢失，第二类更新丢失

## 事务的隔离级别

|     隔离级别     | 脏读 | 不可重复读 | 幻影读 |
| :--------------: | :--: | :--------: | :----: |
| READ UNCOMMITTED |  √   |     √      |   √    |
|  READ COMMITTED  |  ×   |     √      |   √    |
| REPEATABLE READ  |  ×   |     ×      |   √    |
|   SERIALIZABLE   |  ×   |     ×      |   ×    |

```sql
-- 查看当前事务隔离级别
select @@transaction_isolation 

-- 修改当前事务隔离级别
set [session | global] transaction isolation level 
[READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE]
```

## MySQL 锁机制

- 只有在 commit 或 rollback 之后才会释放锁
- MyISAM 不支持行锁
- InnoDB 的行锁是通过索引来实现的，只有通过索引查询，InnoDB 才会使用行级锁，否则 InnoDB 将使用表锁

## 多版本并发控制（MVCC）


| Read | Property | Example |
|--|--|:-|
| 当前读（Current Read） | 读取数据的最新版本，会对读取的记录进行加锁，基于悲观锁的思想 | `update ..`<br/>`insert into ..`<br/>`delete from ..`<br/> `select * from tb where .. for update`<br/>`select * from tb where .. lock in share mode`|
| 快照读（Snapshot Read） | 不读取最新版本的数据，而是基于历史版本读取一个快照，基于乐观锁的思想 |`select * from tb where ..`|

- MVCC 只作用于 Read Committed 和 Repeatable Read 级别
- RC 级别下，每次快照读都会重置 ReadView，RR 级别下则不会
- 对于快照读的幻读，MVCC 从 ReadView 读取，所以不会看到新插入的行，自然解决了幻读
- 对于当前读的幻读，MVCC 是无法解决的。需要使用 Next-Key Lock（Gap Lock + Record Lock）来解决

## 案例


```sql
-- 在 RR 级别下
CREATE TABLE `tb_user`  (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `balance` int(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx`(`balance`)
) ENGINE=InnoDB CHARACTER SET=utf8mb4

+----+---------+---------+
| id | 	name   | balance |
+----+---------+--------+
|  1 | aaa     |  100 	|
|  2 | bbb     |  200 	|
|  3 | ccc     |  300 	|
```


<table>
<tr><th>事务A</th><th>事务B</th></tr>
<tr><td>begin</td><td>begin</td></tr>
<tr>
<td>
select * from tb_user
<table><tr><th>id</th><th>name</th><th>balance </th></tr>
<tr><td>1</td><td>aaa</td><td>100</td></tr>
<tr><td>2</td><td>bbb</td><td>200</td></tr>
<tr><td>3</td><td>ccc</td><td>300</td></tr>
</table>
</td>
<td></td>
</tr>
<tr>
<td></td>
<td>insert into tb(name, balance) values("ddd", 400)`</td>
</tr>
<tr>
<td></td>
<td>commit</td>
</tr>
<tr>
<td>select * from tb_user
<table><tr><th>id</th><th>name</th><th>balance </th></tr>
<tr><td>1</td><td>aaa</td><td>100</td></tr>
<tr><td>2</td><td>bbb</td><td>200</td></tr>
<tr><td>3</td><td>ccc</td><td>300</td></tr>
</table>
</td>
<td colspan="1"></td>
</tr>
<tr>
<td colspan="1">select * from tb_user lock in share mode
<table><tr><th>id</th><th>name</th><th>balance </th></tr>
<tr><td>1</td><td>aaa</td><td>100</td></tr>
<tr><td>2</td><td>bbb</td><td>200</td></tr>
<tr><td>3</td><td>ccc</td><td>300</td></tr>
<tr><td>4</td><td>ddd</td><td>400</td></tr> 
</table>
</td>
<td colspan="1">&nbsp;</td>
</tr>
</table>

假设初始数据依然为：
```c
+----+---------+---------+
| id | 	name   | balance |
+----+---------+--------+
|  1 | aaa     |  100 	|
|  2 | bbb     |  200 	|
|  3 | ccc     |  300 	|
```

| 事务A | 事务B | 事务C |
|--|--|--|
| begin | begin | begin|
| update tb_user set name=name where balance=150 | | |
| | insert into tb_user(name, balance) values('ddd', 170) <br/> BLOCKING...| |
| | |insert into tb_user(name, balance) values('eee', 250) |
| commit|事务A提交后才执行成功 | commit|
| |commit | |

|                    Transaction A                    |                   Transaction B                   |
| :-------------------------------------------------: | :-----------------------------------------------: |
|                        start                        |                       start                       |
|          `select * from table where id=1`           |                                                   |
|                                                     | `update table set balance=balance+400 where id=1` |
|                                                     |                      commit                       |
|          `select * from table where id=1`           |                                                   |
| `select * from table where id=1 lock in share mode` |                                                   |