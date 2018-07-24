###定义页面所有的a标签
```
<script type="text/javascript">document.querySelectorAll('a').forEach(a => {a.onclick=(e) => {e.preventDefault();return false}})</script>
```


