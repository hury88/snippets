------------------获取性别年龄分组下的客流信息
SELECT
  gender,
	sum( CASE WHEN age <= 17 THEN 1 ELSE 0 END ) AS "17岁以下",
	sum( CASE WHEN age BETWEEN 18 AND 23 THEN 1 ELSE 0 END ) AS "18-23岁",
	sum( CASE WHEN age BETWEEN 24 AND 30 THEN 1 ELSE 0 END ) AS "24-30岁",
	sum( CASE WHEN age BETWEEN 31 AND 40 THEN 1 ELSE 0 END ) AS "31-40岁",
	sum( CASE WHEN age BETWEEN 41 AND 50 THEN 1 ELSE 0 END ) AS "41-50岁",
	sum( CASE WHEN age BETWEEN 51 AND 60 THEN 1 ELSE 0 END ) AS "51-60岁",
	sum( CASE WHEN age >= 61 THEN 1 ELSE 0 END ) AS "60岁以上" 
FROM
	`sd_person_camera` 
WHERE
	`in_time` BETWEEN 1554716386 
	AND 1554716401
GROUP BY
   `gender`
--------------------------------------------
if object_id('[tb]') is not null drop table [tb]
go 
create table [tb]([姓名] varchar(1),[部门] varchar(4),[学历] varchar(4),[出生年月] datetime)
insert [tb]
select 'A','后勤','高中','1986-1-1' union all
select 'B','后勤','初中','1984-3-7' union all
select 'C','管理','本科','1987-2-1' union all
select 'D','操作','专科','1976-2-1' union all
select 'E','操作','专科','1943-2-1' 


--------------开始查询--------------------------
declare @sql varchar(8000)
set @sql = 'select 部门,dbo.AgeLevel([出生年月]) as 年龄段'
select @sql = @sql + ' , sum(case 学历 when ''' + 学历 + ''' then 1 else 0 end) [' + 学历 + ']'
from (select distinct 学历 from tb) as a
set @sql = @sql + ' from tb group by 部门,dbo.AgeLevel([出生年月])'
exec(@sql) 

/* 
部门   年龄段        本科          初中          高中          专科
---- ---------- ----------- ----------- ----------- -----------
管理   21－30      1           0           0           0
后勤   21－30      0           1           1           0
操作   31－40      0           0           0           1
操作   50以上       0           0           0           1

(4 行受影响)
*/


drop function AgeLevel 
go 
--获取年龄段 
create function AgeLevel(@birthday datetime) 
returns varchar(10) 
as 
begin 
declare  @AgeLevel varchar(10) 

select @AgeLevel=case((datediff(year,@birthday,getdate())-1)/10) when 2 then '21－30' when 3 then '31－40' when 4 then'41－50' else '50以上' end  
return @AgeLevel 
end 
go 

select * ,dbo.AgeLevel([出生年月]) as 年龄段 from tb
/*
姓名   部门   学历   出生年月                    年龄段
---- ---- ---- ----------------------- ----------
A    后勤   高中   1986-01-01 00:00:00.000 21－30
B    后勤   初中   1984-03-07 00:00:00.000 21－30
C    管理   本科   1987-02-01 00:00:00.000 21－30
D    操作   专科   1976-02-01 00:00:00.000 31－40
E    操作   专科   1943-02-01 00:00:00.000 50以上
*/





select N'年龄段'=(
case((datediff(year,[出生年月],getdate())-1)/10)  
when 2 then '21－30'   
when 3 then '31－40' 
when 4 then'41－50'
else '50以上'
end),   
count(*) as count     
from tb   
group by (
case((datediff(year,[出生年月],getdate())-1)/10)   
when   2   then   '21－30'   
when   3   then   '31－40'   
when   4   then'41－50'   
else   '50以上'   
end   )
/*
年龄段    count
------ -----------
21－30  3
31－40  1
50以上   1

(3 行受影响)
*/





--以10岁为递增
select 
cast(f1*10+1 as varchar(3))+'-'+cast(f1*10+10 as varchar(3)) as 年龄段,f2 as 人数 
from 
(
select datediff(d,[出生年月],getdate())/365/10 as f1,
count(*) as f2 
from tb 
group by datediff(d,[出生年月],getdate())/365/10) a 
order by cast(f1*10+1 as varchar(3))+'-'+cast(f1*10+10 as varchar(3)) 
/*
年龄段     人数
------- -----------
21-30   3
31-40   1
61-70   1

(3 行受影响)
*/




SELECT 
SUM(
CASE WHEN datediff(year, [出生年月], getdate()) BETWEEN 16 AND 20 THEN 1 ELSE 0 END) AS '16-20', 
SUM(CASE WHEN datediff(year, [出生年月], getdate()) BETWEEN 21 AND 30 THEN 1 ELSE 0 END) AS '21-30', 
SUM(CASE WHEN datediff(year, [出生年月], getdate()) BETWEEN 31 AND 40 THEN 1 ELSE 0 END) AS '31-40', 
SUM(CASE WHEN datediff(year, [出生年月], getdate()) BETWEEN 41 AND 50 THEN 1 ELSE 0 END) AS '41-50',
SUM(CASE WHEN datediff(year, [出生年月], getdate()) BETWEEN 51 AND 60 THEN 1 ELSE 0 END) AS '51-60', 
SUM(CASE WHEN datediff(year, [出生年月], getdate()) BETWEEN 61 AND 70 THEN 1 ELSE 0 END) AS '61-70' 
FROM tb

/*
16-20       21-30       31-40       41-50       51-60       61-70
----------- ----------- ----------- ----------- ----------- -----------
0           3           1           0           0           1

(1 行受影响)
*/
 
 
 
 
 
 
 
 
 
 
create table brands(id int,brand varchar(10), address varchar(10)) 
insert into brands values(1 ,'联想', '北京') 
insert into brands values(2 ,'惠普', '美国') 
insert into brands values(3 ,'神舟', '深圳') 
create table products(id int, brand int, name varchar(10)) 
insert into products values(1 ,1, '联想1') 
insert into products values(2 ,1, '联想2') 
insert into products values(3 ,2, '惠普1') 
insert into products values(4 ,2, '惠普2'
) insertinto products values(5 ,1, '联想3') 
insertinto products values(6 ,3, '神舟1')
insertinto products values(7 ,1, '联想4') 
go

 
select ID=row_number()over(order by getdate()),
       b.产品数量,
       a.[brand],
       a.[address]
from brands a,
(select [brand],
        count([brand])产品数量
 from products
 group by [brand] )b
where a.[ID]=b.[brand]
order by b.产品数量 desc


select b.id,b1.cnt as 产品数量,b.brand,b.address
from brands b
join
(
 select brand,count(brand) cnt
from products
group by brand
) b1
on b1.brand=b.id

id          产品数量        brand                          address
----------- ----------- ------------------------------ ------------------------------
1           4           联想                             北京
2           2           惠普                             美国
3           1           神舟                             深圳

(3 行受影响)

 
 select 
sum(case when ( 字段名>0 and 字段名<4000) then 1 else 0 end)  别名,
sum(case when  字段名>=4000 and 字段名<8000  then 1 else 0 end) 别名,
sum(case when 字段名>=8000  then 1 else 0 end) 别名 ,
count(*) as total
from  表名    
