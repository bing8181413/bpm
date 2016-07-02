<?php

!session_id() && session_start();
header("Content-type:application/json;charset=utf-8");

function invoke_api($uri, $data = array(), $auth = NULL) {
    $auth_username = trim($auth ? $auth['auth_username'] : (isset($_SESSION['auth_username']) ? $_SESSION['auth_username'] : ''));
    $auth_password = trim($auth ? $auth['auth_password'] : (isset($_SESSION['auth_password']) ? $_SESSION['auth_password'] : ''));
//    $api_url = ($_SERVER['SERVER_NAME'] == 'www.huijiame.com' ? 'http://apihost/' : 'http://huijiame.rrlt.com/') . $uri;
    $api_url = 'http://web_apihost/' . $uri;
    $ch = curl_init ();
    curl_setopt ( $ch, CURLOPT_URL, $api_url);
    $header = array("Accept: application/json", "App-Version:1.5");
    if ($auth_username)
        $header[] = "Authorization: Basic :" . base64_encode( $auth_username . ":" . $auth_password );
    curl_setopt ( $ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, TRUE );
    curl_setopt ( $ch, CURLOPT_TIMEOUT, 10);
    curl_setopt ( $ch, CURLOPT_POST, TRUE );
    curl_setopt ( $ch, CURLOPT_POSTFIELDS, http_build_query($data) );
    $result = curl_exec ( $ch );
    $curl_errno = curl_errno( $ch );
    $curl_error = curl_error( $ch );
    curl_close ( $ch );

    if ($curl_errno > 0) {
        return array('code' => $curl_errno, 'msg' => $curl_error);
    } else if(stripos($result, '{"code":') === 0) {
        return json_decode($result, true);
    } else if(stripos($result, '{"code":') > 0) {
        return array('code' => 1100, 'msg' => '数据错误', 'source' => $result);
    } else {
        return array('code' => 1100, 'msg' => '接口不存在', 'source' => $result);
    }
}

$api_uri = isset($_SERVER['QUERY_STRING']) ? $_SERVER['QUERY_STRING'] : '';
if ($api_uri) {
    if (isset($_SERVER['PHP_AUTH_USER'])) {
        $auth = array('auth_username' => $_SERVER['PHP_AUTH_USER'], 'auth_password' => $_SERVER['PHP_AUTH_PW']);
    } else {
        $auth = array();
    }
    if($api_uri{0} == '/')
        $api_uri = substr($api_uri, 1);
    $data = invoke_api($api_uri, $_POST, $auth);
    echo json_encode($data);
}

?>