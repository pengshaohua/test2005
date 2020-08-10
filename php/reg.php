<?php

// include "conn.php";//引入conn.php的代码到这里。 
require "conn.php";//引入conn.php的代码到这里。 引入数据库。




// 当前这个页面不能直接预览

//检测用户名是否存在
if(isset($_POST['name'])){
    $name = $_POST['name'];
    $result=$conn->query("select * from registry where username = '$name'");
    //只要结果存在内容，表示数据存在用户名。
    if($result->fetch_assoc()){//存在
        echo true;//1
    }else{//不存在。
        echo false;//空
    }
}


// 获取前端表单传入的值，传到数据库。
//isset():检查括号里面的值是否存在，返回布尔值。
if(isset($_POST['submit'])){//存在，代表前端点击了提交按钮。
    $user = $_POST['username'];
    $pass = sha1($_POST['password']);
    $email = $_POST['email'];
    $conn->query("insert registry values(null,'$user','$pass','$email',NOW())");
    
    //前端页面彼此可以使用相对路径
    //后端页面彼此可以使用相对路径
    //前后端页面使用绝对路径。

//设置页面跳转
    header('location:http://localhost/JS2005/Day%2022_ajax/loginregistry/src/login.html');
}

