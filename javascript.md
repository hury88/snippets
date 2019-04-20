### 版权校验
```javascript
if(['jp1000.demo.ai1956.cc'].indexOf(document.location.hostname) < 0){
    throw "\u64cd\u4f5c\u5df2\u88ab\u76d1\u542c\u8bb0\u5f55!";
    return false;
}
```

### 时间戳-时间格式互转
```javascript
// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
var date = new Date(1398250549490);
Y = date.getFullYear() + '-';
M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
D = date.getDate() + ' ';
h = date.getHours() + ':';
m = date.getMinutes() + ':';
s = date.getSeconds(); 
console.log(Y+M+D+h+m+s); //呀麻碟
// 输出结果：2014-04-23 18:55:49
```
