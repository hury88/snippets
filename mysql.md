# Mysql

    时间

[查询今天,昨天,近7天,近30天,本月,上一月数据的方法](http://www.phpernote.com/mysql/350.html)

`摘要`

```SQL
DATE_FORMAT(FROM_UNIXTIME(chattime),’%Y-%m-%d’) = DATE_FORMAT(NOW(),’%Y-%m-%d’)

TO_DAYS(DATE_FORMAT(FROM_UNIXTIME(`add_time`),'%Y-%m-%d')) = TO_DAYS(NOW())

STR_TO_DATE("2010-11-23 14:39:51",'%Y-%m-%d %H:%i:%s')
```

---
