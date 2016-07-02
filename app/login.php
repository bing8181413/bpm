<?php
session_start();
//header("Content-type:application/json;charset=utf-8");
if(isset($_POST['username'])){// 传username 是登录
    $_SESSION['auth_username']=$_POST['username'];
    $_SESSION['auth_password']=$_POST['password'];
    $data =  array('code' => 0, 'msg' => '', 'data' => 'login success!');
    echo json_encode($data);
}else if(!isset($_POST['username'])){// 登出
    $_SESSION['auth_username']='';
    $_SESSION['auth_password']='';
    unset($_SESSION['auth_username']);
    unset($_SESSION['auth_password']);
    session_destroy();
    $data =  array('code' => 0, 'msg' => '', 'data' => 'logout success!');
    echo json_encode($data);
}

?>