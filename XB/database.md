###数据库回滚
```
//启用事务
$tranDb = M("");
$tranDb->startTrans();
$oneID='';
//修改之前先删除全部
if(!M(self::T_ROLEMENU)->where("RoleID=%d",$RoleID)->delete()){
	$tranDb->rollback();//如果插入不成功，则回滚
}
//print_r($post);die;
//循环处理post的数据


$row=M(self::T_ROLEMENU)->where("RoleID=%d and MenuID=%d",$RoleID,intval($menu_arr[1]))->find();
if(!$row ){							//没有
	$arr1 = array();
	$arr1['RoleID'] = $RoleID;
	$arr1['ParentID'] = intval($menu_arr[0]);
	$arr1['MenuID'] = intval($menu_arr[1]);
	$arr1['ButtonID'] = '';
	if (!M(self::T_ROLEMENU)->add($arr1)) {
		$tranDb->rollback();//如果插入不成功，则回滚
	}
}else{								//有
	$arr1 = array();
	$arr1['RoleID'] = $RoleID;
	$arr1['ID'] = $row['ID'];
	$arr1['ParentID'] = intval($menu_arr[0]);
	$arr1['MenuID'] = intval($menu_arr[1]);
	$arr1['ButtonID'] =$row['ButtonID'].",".intval($menu_arr[2]);
	if(!M(self::T_ROLEMENU)->where()->save($arr1)){
		$tranDb->rollback();//如果插入不成功，则回滚
	}
}
$tranDb->commit();//提交事务
//更改权限成功，更改菜单和权限按钮缓存
```