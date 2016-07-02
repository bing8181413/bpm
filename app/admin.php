<?php

function query($sql, $arg = array(), $mode = NULL)
{
    static $pdo=NULL;
    if ($pdo == NULL) {
        try{
            $is_web = gethostname() == '10-10-7-58' ? 1 : 0;
            if ($is_web ) {
                $pdo=new PDO('mysql:host=120.132.67.19;dbname=huijia', 'meilin', 'meilin123!');
            } else {
                $pdo=new PDO('mysql:host=192.168.1.170;dbname=huijia', 'dev', 'e8j7dk6v');
            }
            $pdo->exec('set names utf8');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(Exception $ex) {
            exit(json_encode($ex->getMessage()));
        }
    }
    $stmt=$pdo->prepare($sql);
    $stmt->execute($arg);
    if(empty($mode)){
        return $stmt;
    }else if($mode=="all"){
        return $stmt->fetchAll();
    }else if($mode=="one"){
        return $stmt->fetchColumn(0);
    }else if($mode=="num"){
        return $stmt->rowCount();
    }else if($mode=="row"){
        return $stmt->fetch();
    }else if($mode=="add"){
        return ($stmt->rowCount()>0)?$pdo->lastInsertId():0;
    }else return $stmt;
}


class huijiame_admin 
{
    public function welcome()
    {
        $data['server_ip'] = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
        return $data;
    }

    public function invite_code()
    {
        $id = isset($_GET['id']) ? $_GET['id'] : 0;
        $data = query('SELECT invite_code, u.true_name AS user_name, f.name FROM t_invitation i INNER JOIN t_user u ON i.user_id = u.id INNER JOIN t_family f ON i.family_id = f.id WHERE i.id = ?', array($id), 'row');
        return $data;
    }

    public function user_list()
    {
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $count = isset($_GET['count']) ? intval($_GET['count']) : 10;
        $data['user_list'] = array();
        $data['user_count'] = 0;
        $sql_list = 'SELECT u.id, u.alias_name, u.true_name, u.phone, e.city, e.sex, FROM_UNIXTIME(age / 1000, "%Y-%m-%d %h-%i-%s") AS age, FROM_UNIXTIME(e.create_date / 1000, "%Y-%m-%d %h-%i-%s") AS create_at, FROM_UNIXTIME(last_visit_time / 1000, "%Y-%m-%d %h-%i-%s") AS login_at
            FROM t_user u INNER JOIN t_user_ext e ON u.id = e.id ORDER BY e.create_date DESC' . sprintf(' limit %s, %s', ($page - 1) * $count, $count);
        $sql_count = 'SELECT count(1) FROM t_user u INNER JOIN t_user_ext e ON u.id = e.id ORDER BY e.create_date DESC';
        $user_list = query($sql_list, NULL, 'all');
        $user_count = query($sql_count, NULL, 'one');
        $data['user_list'] = $user_list;
        $data['user_count'] = $user_count;
        return $data;
    }

    public function family_list()
    {
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $count = isset($_GET['count']) ? intval($_GET['count']) : 10;
        $reg_step = isset($_GET['reg_step']) ? intval($_GET['reg_step']) : 0;
        $where = ' WHERE 1' . ($reg_step ? ' AND e.is_register = ' . $reg_step : '');

        // 家庭列表
        $sql_count = 'SELECT COUNT(1) FROM t_family f INNER JOIN t_user_ext e ON f.create_by = e.id' . $where;
        $total = query($sql_count, NULL, 'one');
        $sql_family = 'SELECT f.id AS family_id, f.name AS family_name, f.create_by AS user_id, e.home_addr AS address, e.is_register as reg_step, FROM_UNIXTIME(f.create_date / 1000, "%Y-%m-%d %h-%i-%s") as created_at
            FROM t_family f INNER JOIN t_user_ext e ON f.create_by = e.id ' . $where . ' ORDER BY f.create_date DESC' . sprintf(' limit %s, %s', ($page - 1) * $count, $count);
        $arr = query($sql_family, NULL, 'all');
        foreach ($arr as &$row) {
            // 成员数
            $sql = 'SELECT COUNT(1) FROM t_family_user m WHERE m.family_id = ' . $row['family_id'];
            $row['member_count'] = query($sql, NULL, 'one');
            // 认证图片
            $sql = 'SELECT original FROM t_user_request r INNER JOIN t_images i ON r.id = i.reference_id WHERE r.user_id = ' . $row['user_id'] . ' ORDER BY i.create_date DESC';
            $img_url = query($sql, NULL, 'one');
            $row['address_image'] = trim($img_url);
            $row['address'] = trim($row['address']);
        }
        $data['family_list'] = $arr;
        $data['family_count'] = $total;
        $data['reg_step_msg'] = '0,所有，4、地址填写，5、地址验证，6、验证通过';
        return $data;
    }

    public function change_step()
    {
        $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : 0;
        $reg_step = isset($_GET['reg_step']) ? intval($_GET['reg_step']) : 0;
        if ($user_id && $reg_step) {
            $num = query('UPDATE t_user_ext SET is_register = ? WHERE id = ?', array($reg_step, $user_id), 'num');
            return $num ? array('code' => 0) : array('code' => 1100, 'msg' => '更新不成功');
        } else {
            return array('code' => 1001, 'msg' => '输入信息有误');
        }
    }

    public function apply_list()
    {
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $count = isset($_GET['count']) ? intval($_GET['count']) : 10;
        // 0，注册的，1，待认证，2已认证，3不通过
        $status = isset($_GET['status']) ? intval($_GET['status']) : 0;

        $sql_apply = 'SELECT r.user_id, e.home_addr as address, img.original AS address_image, r.status as address_binded
            FROM t_user_request r INNER JOIN t_images img ON r.id = img.reference_id
            INNER JOIN t_user_ext e ON r.user_id = e.id WHERE r.status > 0 ' . ($status ? ' AND status = ' . $status : '') . ' order by r.id desc' . sprintf(' limit %s, %s', ($page - 1) * $count, $count);
        $sql_family = 'SELECT m.family_id, f.name as family_name, COUNT(m.user_id) AS member_count
            FROM t_family_user m INNER JOIN t_family f ON m.family_id = f.id WHERE m.user_id = %s GROUP BY m.user_id';

        $arr = query($sql_apply, NULL, 'all');
        foreach ($arr as $index => $row) {
            $family_info = query(sprintf($sql_family, $row['user_id']), NULL, 'row');
            $arr[$index] = array_merge($family_info, $row);
        }

        $data['apply_list'] = $arr;
        $data['status_msssage'] = '0，注册的，1，待认证，2已认证，3不通过';
        return $data;
    }

    public function apply_status()
    {
        $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : '';
        $status = isset($_GET['status']) ? intval($_GET['status']) : 0;
        if ($user_id && $status) {
            $num = query('UPDATE t_user_request SET STATUS = ? WHERE user_id = ?', array($status, $user_id), 'num');
            return $num ? array('code' => 0) : array('code' => 1100, 'msg' => '更新不成功');
        } else {
            return array('code' => 1001, 'msg' => '输入信息有误');
        }
    }

    public function member_list()
    {
        $family_id = isset($_GET['family_id']) ? $_GET['family_id'] : '';
        if (!$family_id)
            return array('code' => 1001, 'msg' => '输入信息有误');
        $data['member_list'] = array();
        return $data;
    }

    public function feed_list()
    {
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $count = isset($_GET['count']) ? intval($_GET['count']) : 10;
        $status = isset($_GET['status']) ? intval($_GET['status']) : 0;

        //0,正常，1正常，2举报，3屏蔽
        $sql_where = ' where 1=1';
        if ($status == 1) {
            $sql_where .= ' AND i.is_del = 0';
        } else if ($status == 2) {
            $sql_where .= ' AND i.id in(SELECT reference_id FROM t_report t WHERE t.is_del = 0)';
        } else if ($status == 3) {
            $sql_where .= ' AND i.is_del = 1';
        }
        $sql_list = 'SELECT i.id as feed_id, u.alias_name, u.true_name, u.phone AS mobile, e.city, i.xiaoqu_name, i.description AS content, i.category_name
            FROM (t_information i INNER JOIN t_user u ON i.create_by = u.id
                INNER JOIN t_user_ext e ON u.id = e.id)' . $sql_where . sprintf(' limit %s, %s', ($page - 1) * $count, $count);
        $sql_count = 'SELECT count(1)
            FROM (t_information i INNER JOIN t_user u ON i.create_by = u.id
                INNER JOIN t_user_ext e ON u.id = e.id)' . $sql_where;
        $sql_image = 'SELECT GROUP_CONCAT(img.original) FROM t_images img WHERE img.reference_id = %s';
        $sql_thumbup = 'SELECT COUNT(1) AS total FROM t_praise p WHERE reference_id = %s';
        $sql_comment = 'SELECT COUNT(1) AS total FROM t_comment c WHERE reference_id = %s';
        $feed_list = query($sql_list, NULL, 'all');
        $feed_count = query($sql_count, NULL, 'one');
        foreach ($feed_list as &$row) {
            $image_list = query(sprintf($sql_image, $row['feed_id']), NULL, 'one');
            $row['image_list'] = explode(',', $image_list);
            $row['comment_count'] = query(sprintf($sql_comment, $row['feed_id']), NULL, 'one');
            $row['thumbup_count'] = query(sprintf($sql_thumbup, $row['feed_id']), NULL, 'one');
        }

        $data['feed_count'] = $feed_count;
        $data['feed_list'] = $feed_list;
        $data['status_msssage'] = '0正常，1正常，2举报，3屏蔽';
        return $data;
    }

    public function comment_list()
    {
        $feed_id = isset($_GET['feed_id']) ? $_GET['feed_id'] : '0';
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $count = isset($_GET['count']) ? intval($_GET['count']) : 10;

        $sql_comment = 'SELECT c.alias_name, c.comment, FROM_UNIXTIME(c.create_date / 1000, "%Y-%m-%d %h-%i-%s") as created_at, e.headshot_url AS avatar_url
            FROM t_comment c LEFT JOIN t_user_ext e ON c.user_id = e.id
            WHERE reference_id = ' . $feed_id . ' order by c.id desc' . sprintf(' limit %s, %s', ($page - 1) * $count, $count);
        $comment_list = query($sql_comment, NULL, 'all');
        $data['comment_list'] = $comment_list;
        return $data;
    }

    public function feed_report()
    {
        $feed_id = isset($_GET['feed_id']) ? $_GET['feed_id'] : '0';
        $sql_insert = 'insert into t_report(id, reference_id, is_del) values(UNIX_TIMESTAMP(),' . $feed_id . ',0)';
        $id = query($sql_insert, NULL, 'add');
        $data['code'] = 0;
        return $data;
    }

    public function feed_status()
    {
        $feed_id = isset($_GET['feed_id']) ? $_GET['feed_id'] : '0';
        $status = isset($_GET['status']) ? $_GET['status'] : '0';

        if ($feed_id && $status) {
            if ($status == '11') {
                $num = query('UPDATE t_information SET is_del = 1 WHERE id = ?', array($feed_id), 'num');
                $num = query('UPDATE t_report SET is_del = 1 WHERE reference_id = ?', array($feed_id), 'num');
            } else if ($status == '12') {
                $num = query('UPDATE t_report SET is_del = 1 WHERE reference_id = ?', array($feed_id), 'num');
            } else if ($status == '13') {
                $num = query('UPDATE t_information SET is_del = 0 WHERE id = ?', array($feed_id), 'num');
            } else {
                $num = 0;
            }
            return $num ? array('code' => 0) : array('code' => 1100, 'msg' => '更新不成功');
        } else {
            return array('code' => 1001, 'msg' => '输入信息有误');
        }
    }

    public function message_list()
    {
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $count = isset($_GET['count']) ? intval($_GET['count']) : 10;
        $keyword = isset($_GET['keyword']) ? trim($_GET['keyword']) : '';

        $arg = array(':keyword' => '%' . $keyword . '%');
        $sql = 'SELECT COUNT(1) FROM t_letter l WHERE l.user_id = 0 AND l.from_id > 0 AND l.comment like :keyword';
        $total = query($sql, $arg, 'one');
        $sql = 'SELECT l.id, l.from_id AS user_id, l.from_alias_name AS user_name, l.comment, 
            e.headshot_url AS avatar, e.home_xq_name, e.home_addr, u.phone, FROM_UNIXTIME(l.create_date / 1000, "%Y-%m-%d %h-%i-%s") as created_at
            FROM t_letter l INNER JOIN t_user_ext e ON l.from_id = e.id INNER JOIN t_user u ON l.from_id = u.id
            WHERE l.user_id = 0 AND l.comment like :keyword' . sprintf(' limit %s, %s', ($page - 1) * $count, $count);
        $arr = query($sql, $arg, 'all');
        foreach ($arr as &$row) {
            $row['phone'] = trim($row['phone']);
            $row['home_xq_name'] = trim($row['home_xq_name']);
            $row['home_addr'] = trim($row['home_addr']);
        }
        $data['message_list'] = $arr;
        $data['message_count'] = $total;
        return $data;
    }

    public function message_send()
    {
        $data = array();
        return $data;
    }

    public function test()
    {
        $arr = query('select * from t_user limit 2', NULL, 'all');
        $data['arr '] = $arr;
        return $data;
    }
}

if (php_sapi_name() == 'cli') {
    $_GET['user_id'] = '142711344857900911';
    $_GET['status'] = '2';
    $_GET['family_id'] = '142711161268236238';
    $_GET['feed_id'] = '142710980346518565';
    $instance = new huijiame_admin();
    $argv = $_SERVER['argv'];
    if (count($argv) == 3) {
        $method = $argv[2];
        print_r($instance->$method());
    } else {
        print_r($instance->feed_list()); //apply_status,apply_list
    }
    exit();
}

$method = isset($_GET['method']) ? $_GET['method'] : 'welcome';
if ($method && method_exists('huijiame_admin', $method)) {
    $instance = new huijiame_admin();
    $return = $instance->$method();
    $result = isset($return['code']) ? $return : array('code' => 0, 'data' => $return);
    header("Content-type: text/javascript");
    if (isset($_GET['callback'])) {
        echo $_GET['callback'] . '(' . json_encode($result) . ');';
    } else {
        echo json_encode($result);
    }
} else {
    exit(json_encode(array('code'=>1000, 'data'=>'', 'msg'=>'method is not exit!')));
}

?>