<?php
header('Access-Control-Allow-Origin: *'); //设置http://www.baidu.com允许跨域访问
header('Access-Control-Allow-Headers: X-Requested-With,X_Requested_With'); //设置允许的跨域header
date_default_timezone_set("Asia/chongqing");
error_reporting(E_ERROR);
//header("Content-Type: text/html; charset=utf-8");
header("Content-Type: application/x-www-form-urlencoded");

$request_body = json_decode(file_get_contents('php://input'));

$param = array('content' => 'fdipzone blog');

$rsp_code = 0;
$rsp_msg = array();
$result_data = array();
$ret_tmp = '';
if (is_array($request_body)) { // 是数组  变量来控制
    foreach ($request_body as $key => $obj) {
        if (isset($obj->key) && isset($obj->url) && isset($obj->data)) {
            if (strtolower($obj->method) == 'post') {
                $output = postData($obj->url, $obj->data);
            } else if (strtolower($obj->method) == 'get' || empty(strtolower($obj->method))) {
                $output = getData($obj->url, http_build_query($obj->data));
            }
            if ($output) {
                $output_code = json_decode($output)->code;
                $output_data = json_decode($output)->data;
                $output_msg = json_decode($output)->message;
            }
            if ($output_code == 0) {
                $result_data[$obj->key] = $output_data;
            } else {
                $rsp_code = 500;
                $rsp_msg[$obj->key]->code = $output_code;
                $rsp_msg[$obj->key]->message = $output_msg;
                $result_data[$obj->key] = $output;
            }
        } else {
            if (empty($obj->key)) {
                $rsp_msg[$key]->code = '10001';
                $rsp_msg[$key]->message = '参数错误,key is null';
            } else if (empty($obj->url)) {
                $rsp_msg[$obj->key]->code = '10002';
                $rsp_msg[$obj->key]->message = '参数错误,url is null';
            }
        }
    }
} else { // 是对象  提供 get 方式
    foreach ($request_body as $key => $url) {
        $output = getData($url, http_build_query($param));
        $output_code = json_decode($output)->code;
        $output_data = json_decode($output)->data;
        if ($output_code == 0) {
            $result_data[$key] = $output_data;
        } else {
            $rsp_code = 500;
            $result_data[$key] = '';
        }
    }
}

if (!$rsp_code == 500) {
    $ret = array(
        'code' => 0,
        'message' => $rsp_msg,
        'data' => $result_data,
    );
    echo json_encode($ret, true);
    return;
} else {
    $ret = array(
        'code' => 500,
        'message' => $rsp_msg,
        'data' => $result_data,
    );
    echo json_encode($ret, true);
    return;
}

function postData($url, $data)
{
    $ch = curl_init();
    $post_data = array();
    $timeout = 300;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERPWD, $_SERVER['PHP_AUTH_USER'] . ':' . $_SERVER['PHP_AUTH_PW']);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    $output = curl_exec($ch);
    curl_close($ch);
    return $output;

}

function getData($url, $data)
{
    $ch = curl_init();
    $timeout = 300;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERPWD, $_SERVER['PHP_AUTH_USER'] . ':' . $_SERVER['PHP_AUTH_PW']);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    $output = curl_exec($ch);
    curl_close($ch);
    return $output;

}

?>