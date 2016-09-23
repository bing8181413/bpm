<?php
header("Content-type:application/json;charset=utf-8");
/**
 * 上传附件和上传视频
 * User: Jinqn
 * Date: 14-04-09
 * Time: 上午10:17
 */
//include "Uploader.class.php";
include "Qiniu_upload.php";
include "conf.php";
/* 上传配置 */
$base64 = "upload";
switch (htmlspecialchars($_GET['action'])) {
    case 'uploadimage':
        $config = array(
            "pathFormat" => $CONFIG['imagePathFormat'],
            "maxSize" => $CONFIG['imageMaxSize'],
            "allowFiles" => $CONFIG['imageAllowFiles']
        );
        $fieldName = $CONFIG['imageFieldName'];
        break;
    case 'uploadscrawl':
        $config = array(
            "pathFormat" => $CONFIG['scrawlPathFormat'],
            "maxSize" => $CONFIG['scrawlMaxSize'],
            "allowFiles" => $CONFIG['scrawlAllowFiles'],
            "oriName" => "scrawl.png"
        );
        $fieldName = $CONFIG['scrawlFieldName'];
        $base64 = "base64";
        break;
    case 'uploadvideo':
        $config = array(
            "pathFormat" => $CONFIG['videoPathFormat'],
            "maxSize" => $CONFIG['videoMaxSize'],
            "allowFiles" => $CONFIG['videoAllowFiles']
        );
        $fieldName = $CONFIG['videoFieldName'];
        break;
    case 'uploadfile':
    default:
        $config = array(
            "pathFormat" => $CONFIG['filePathFormat'],
            "maxSize" => $CONFIG['fileMaxSize'],
            "allowFiles" => $CONFIG['fileAllowFiles']
        );
        $fieldName = $CONFIG['fileFieldName'];
        break;
}


/* 生成上传实例对象并完成上传 */
// $config = array(
//         'secrectKey'     => $QINIU_SECRET_KEY, 
//         'accessKey'      => $QINIU_ACCESS_KEY, 
//         'domain'         => $HOST, 
//         'bucket'         => $BUCKET, 
//         'timeout'        => $TIMEOUT, 
// );
$config['secrectKey'] = $QINIU_SECRET_KEY;
$config['accessKey'] = $QINIU_ACCESS_KEY;
$config['domain'] = $HOST;
$config['bucket'] = $BUCKET;
$config['timeout'] = $TIMEOUT;
// exit(json_encode($config));
$qiniu = new Qiniu($config);
//命名规则
if ($SAVETYPE == 'date') {
    $key = time() . '.' . pathinfo($_FILES[$fieldName]["name"], PATHINFO_EXTENSION);
} else {
    $key = $_FILES[$fieldName]['name'];
}

$upfile = array(
    'name' => 'file',
    'fileName' => $key,
    'fileBody' => file_get_contents($_FILES[$fieldName]['tmp_name'])
);

// $config = array();
$result = $qiniu->upload($config, $upfile);
// exit(json_encode($result));
if (!empty($result['hash'])) {
    $url = '';
    if (htmlspecialchars($_GET['action']) == 'uploadimage') {
        if ($USEWATER) {
            $waterBase = urlsafe_base64_encode($WATERIMAGEURL);
            $url = $qiniu->downlink($result['key']) . "?watermark/1/image/{$waterBase}/dissolve/{$DISSOLVE}/gravity/{$GRAVITY}/dx/{$DX}/dy/{$DY}";
        } else {
            $url = $qiniu->downlink($result['key']);
        }
    } else {
        $url = $qiniu->downlink($result['key']);
    }
//    exit($url);
    // 再包裹一层  修改上传的图片重新来一次
    //开始包裹
    $_name = explode('.', $result['key'])[0];
    $_suffix = explode('.', $result['key'])[1];
    $entry = $config['bucket'] . ':' . $_name . '-1280.' . $_suffix;
    // .'?imageView2/0/w/1280/h/1280'
    // exit();
    $encodedEntryURI = urlsafe_base64_encode($entry);
    // $signingStr = $config['bucket'] .".qiniudn.com/". $result['key'] ."?imageView2/0/w/1280/h/1280|saveas/" . $encodedEntryURI;
    $signingStr = $config['bucket'] . ".huijiame.com/" . $result['key'] . "?imageView2/0/w/1280/h/1280|saveas/" . $encodedEntryURI;
    // exit(urlsafe_base64_encode("t-test:Ship-thumb-200.jpg"));
    // $sign_change = hash_hmac('sha1', $signingStr, $sk, true);
    $sign_change = $qiniu->sign($config['secrectKey'], $config['accessKey'], $signingStr);
    $url_tmp = $signingStr . '/sign/' . $sign_change;
//  exit($url_tmp);
//  exit(json_encode($result));

    $ch_final = curl_init();
    $timeout = 5;
    curl_setopt($ch_final, CURLOPT_URL, $url_tmp);
    curl_setopt($ch_final, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch_final, CURLOPT_CONNECTTIMEOUT, $timeout);
    $file_contents = curl_exec($ch_final);
    curl_close($ch_final);
    $file_contents = json_decode($file_contents, true);
    $url_final = $qiniu->downlink($file_contents['key']);
//     exit(json_encode($file_contents));
    //获取图片信息 
    $ch_info = curl_init();
    $timeout = 5;
    curl_setopt($ch_info, CURLOPT_URL, $url_final . '?imageInfo');
    curl_setopt($ch_info, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch_info, CURLOPT_CONNECTTIMEOUT, $timeout);
    $file_ch_info = curl_exec($ch_info);
    curl_close($ch_info);
    $file_ch_info = json_decode($file_ch_info, true);

    // exit(json_encode($file_ch_info));
//    exit(json_encode($_FILES[$fieldName]));
    // 结束包裹
    if ($file_contents['error']) {
        $file_contents['state'] = "ERROR";
    } else {
        $file_contents['state'] = "SUCCESS";
    }
    $file_contents['url'] = $url_final;
    $file_contents['title'] = $file_contents['key'];
    $file_contents['width'] = $file_ch_info['width'];
    $file_contents['height'] = $file_ch_info['height'];
    $file_contents['original'] = $_FILES[$fieldName]['name'];
    $file_contents['name'] = $_FILES[$fieldName]['name'];
    $file_contents['type'] = $_FILES[$fieldName]['type'];
    $file_contents['size'] = $_FILES[$fieldName]['size'];
//    exit(json_encode($file_contents));
    return json_encode($file_contents);
    /*构建返回数据格式*/
    $FileInfo = array(
        "state" => "SUCCESS",
        "url" => $url,
        "title" => $result['key'],
        "width" => $result['w'],
        "height" => $result['h'],
        "original" => $_FILES[$fieldName]['name'],
        "name" => $_FILES[$fieldName]['name'],
        "type" => $_FILES[$fieldName]['type'],
        "size" => $_FILES[$fieldName]['size'],
    );
    /* 返回数据 */
    return json_encode($FileInfo);
}

//$up = new Uploader($fieldName, $config, $base64);

/**
 * 得到上传文件所对应的各个参数,数组结构
 * array(
 *     "state" => "",          //上传状态，上传成功时必须返回"SUCCESS"
 *     "url" => "",            //返回的地址
 *     "title" => "",          //新文件名
 *     "original" => "",       //原始文件名
 *     "type" => ""            //文件类型
 *     "size" => "",           //文件大小
 * )
 */

/* 返回数据 */
//return json_encode($up->getFileInfo());
