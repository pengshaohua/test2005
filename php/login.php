<?php

// include "conn.php";//引入conn.php的代码到这里。 
require "conn.php";//引入conn.php的代码到这里。 引入数据库。

//检测用户名和密码
if(isset($_POST['username'])&&isset($_POST['password'])){
    $name = $_POST['username'];
    $pass = $_POST['password'];
    $result=$conn->query("select * from registry where username = '$name' and password = '$pass'");
    
    if($result->fetch_assoc()){//登录成功
        echo true;//1
    }else{//登录失败
        echo false;//空
    }
}




