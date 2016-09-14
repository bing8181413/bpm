<?php
set_time_limit(0);
include("Uploader.class.php");
include "Qiniu_upload.php";
include "conf.php";

/* 
 * 
 * @desc URL安全形式的base64编码 
 * @param string $str 
 * @return string 
 */  
  
if (!function_exists('urlsafe_base64_encode')) {
    function urlsafe_base64_encode($str){  
        $find = array("+","/");  
        $replace = array("-", "_");  
        return str_replace($find, $replace, base64_encode($str));  
    }  
}
  
/** 
 * generate_access_token 
 * 
 * @desc 签名运算 
 * @param string $access_key 
 * @param string $secret_key 
 * @param string $url 
 * @param array  $params 
 * @return string 
 */  
function generate_access_token($access_key, $secret_key, $url, $params = ''){  
    $parsed_url = parse_url($url);  
    $path = $parsed_url['path'];  
    $access = $path;  
    if (isset($parsed_url['query'])) {  
        $access .= "?" . $parsed_url['query'];  
    }  
    $access .= "\n";  
    if($params){  
        if (is_array($params)){  
            $params = http_build_query($params);  
        }  
        $access .= $params;  
    }  
    $digest = hash_hmac('sha1', $access, $secret_key, true);  
    return $access_key.':'.urlsafe_base64_encode($digest);  
}  
  
/** 
 * 测试 
 */  
  
// $access_key = $QINIU_ACCESS_KEY;  
// $secret_key = $QINIU_SECRET_KEY;  
  
// $fetch = urlsafe_base64_encode('http://statics.xiumi.us/xmi/ua/7dYa/i/f81a064301eaf76e4c62411a42f917bf-sz_345213.JPG');  
// $to = urlsafe_base64_encode('home:111.jpg');  
  
// $url  = 'http://iovip.qbox.me/fetch/'. $fetch .'/to/' . $to;  
  
// $access_token = generate_access_token($access_key, $secret_key, $url);  
  
// $header[] = 'Content-Type: application/json';  
// $header[] = 'Authorization: QBox '. $access_token;  
  
  
// $con = send('iovip.qbox.me/fetch/'.$fetch.'/to/'.$to, $header);  
// var_dump($con);  

function send($url, $header = '') {  
    $curl = curl_init($url);  
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
    curl_setopt($curl, CURLOPT_HEADER,1);  
    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);  
    curl_setopt($curl, CURLOPT_POST, 1);  
  
    $con = curl_exec($curl);  
  
    if ($con === false) {  
        echo 'CURL ERROR: ' . curl_error($curl);  
    } else {  
        return $con;  
    }  
}

function fetch_stat_by_key($key) {
    global $QINIU_ACCESS_KEY, $QINIU_SECRET_KEY, $BUCKET;
    $url = 'http://rs.qiniu.com/stat/' . urlsafe_base64_encode($BUCKET . ':' . $key);
    $access_token = generate_access_token($QINIU_ACCESS_KEY, $QINIU_SECRET_KEY, $url);  
    $header[] = 'Content-Type: application/json';  
    $header[] = 'Authorization: QBox '. $access_token;
    $curl = curl_init($url);  
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
    curl_setopt($curl, CURLOPT_HEADER, 1);  
    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);  
  
    $con = curl_exec($curl);  
  
    if ($con === false) {  
        echo 'CURL ERROR: ' . curl_error($curl);  
    } else {  
        return $con;  
    }  
}
// $data = fetch_stat_by_key('1438668561.jpg', $BUCKET);


function upload_image_by_url($fetch, $to) {
    global $QINIU_ACCESS_KEY, $QINIU_SECRET_KEY, $BUCKET;
    $fetch = urlsafe_base64_encode($fetch);
    $to = urlsafe_base64_encode($BUCKET . ':' . $to); 
    $url  = 'http://iovip.qbox.me/fetch/'. $fetch .'/to/' . $to;  
    $access_token = generate_access_token($QINIU_ACCESS_KEY, $QINIU_SECRET_KEY, $url);  
    $header[] = 'Content-Type: application/json';  
    $header[] = 'Authorization: QBox '. $access_token;  
    $con = send($url, $header);
    return $con;
}

$fieldName = $CONFIG['catcherFieldName'];

// $_POST['source'] = array('http://statics.xiumi.us/xmi/ua/7dYa/i/f81a064301eaf76e4c62411a42f917bf-sz_345213.JPG');
// $fieldName = 'source';

$list = array();
if (isset($_POST[$fieldName])) {
    $source = $_POST[$fieldName];
} else {
    $source = $_GET[$fieldName];
}
foreach ($source as $imgUrl) {
    $file_info = pathinfo($imgUrl);
    $filename = 'crawler' . md5($imgUrl) . '.' . strtolower($file_info['extension']);
    $con = upload_image_by_url($imgUrl, $filename);
    $imgsrc = 'http://activity.huijiame.com/' . $filename;
    array_push($list, array(
        "state" => 'SUCCESS',
        "url" => $imgsrc,
        "size" => '10240',
        "title" => htmlspecialchars(basename($imgsrc)),
        "original" => htmlspecialchars(basename($imgUrl)),
        "source" => htmlspecialchars($imgUrl)
    ));
}
// print_r($list);

/* 返回抓取数据 */
return json_encode(array(
    'state'=> count($list) ? 'SUCCESS':'ERROR',
    'list'=> $list
));

?>