<?php
/**
 * 抓取远程图片
 * User: Jinqn
 * Date: 14-04-14
 * Time: 下午19:18
 */
set_time_limit(0);

    $current_qiniu_dir = dirname(dirname($_SERVER['SCRIPT_FILENAME']));

include("Uploader.class.php");
include "Qiniu_upload.php";
include "conf.php";

/* 上传配置 */
$config = array(
    "pathFormat" => $CONFIG['catcherPathFormat'],
    "maxSize" => $CONFIG['catcherMaxSize'],
    "allowFiles" => $CONFIG['catcherAllowFiles'],
    "oriName" => "remote.png"
);
$fieldName = $CONFIG['catcherFieldName'];

/* 抓取远程图片 */
$list = array();
if (isset($_POST[$fieldName])) {
    $source = $_POST[$fieldName];
} else {
    $source = $_GET[$fieldName];
}
foreach ($source as $imgUrl) {
    $item = new Uploader($imgUrl, $config, "remote");
    $info = $item->getFileInfo();

    $config = array(
        "pathFormat" => $CONFIG['imagePathFormat'],
        "maxSize" => $CONFIG['imageMaxSize'],
        "allowFiles" => $CONFIG['imageAllowFiles']
    );
    $fieldName = $CONFIG['imageFieldName'];
    $config['secrectKey'] = $QINIU_SECRET_KEY;
    $config['accessKey'] = $QINIU_ACCESS_KEY;
    $config['domain'] = $HOST;
    $config['bucket'] = $BUCKET;
    $config['timeout'] = $TIMEOUT;
    $qiniu = new Qiniu($config);
    $key = $info["title"];
    $upfile = array(
            'name'=>'file',
            'fileName'=>$key,
            'fileBody'=>file_get_contents($current_qiniu_dir.$info['url'])
        );

    $result = $qiniu->upload($config, $upfile);
   $info["url"] =  'http://'.$config['bucket'] .".huijiame.com/". $result['key'] ;


    array_push($list, array(
        "state" => $info["state"],
        "url" => $info["url"],
        "size" => $info["size"],
        "title" => htmlspecialchars($info["title"]),
        "original" => htmlspecialchars($info["original"]),
        "source" => htmlspecialchars($imgUrl)
    ));
}

/* 返回抓取数据 */
return json_encode(array(
    'state'=> count($list) ? 'SUCCESS':'ERROR',
    'list'=> $list
));