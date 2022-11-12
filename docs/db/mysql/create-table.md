# MySQL 建表规约

SQL 语言按照功能可以划分为四类：

|类别|例子|
|--|--|
|数据定义语言 DDL|`create`|
|数据查询语言 DQL|`select`|
|数据操纵语言 DML|`insert`, `update`, `delete`|
|数据控制语言 DCL|`grant`|


``` sql
CREATE DATABASE IF NOT EXISTS `db_test`;
USE `db_test`;

DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id`          INT(11)      NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username`    VARCHAR(255) NOT NULL COMMENT '用户名',
  `password`    VARCHAR(255) NOT NULL COMMENT '加密后的密码',
  `create_time` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARSET = utf8 COMMENT '用户表';
```
考虑到代码的可读性和设计的完整性，建议在建表时遵守如下规约：
1. 表名，字段名一律使用 `下划线命名法`
2. 每张表和每个字段都加上注释
3. 每张表都要定义 `id`, `create_time`, `update_time` 三个字段
4. 尽量把所有字段定义为 `NOT NULL`
5. 表示是或否概念的字段类型，使用 `unsigned tinyint`
6. 时间类型优先使用 `timestamp`
7. 小数类型使用定点类型 `decimal`，不要使用浮点类型 `float`，`double`
8. 不要使用 `foreign key` 和 `cascade`
9. 每张表必须使用 `InnoDB` 存储引擎
10. 数据库和表的字符集统一使用 `utf8`，如果需要存储 emoji 表情，使用 `utf8mb4`
