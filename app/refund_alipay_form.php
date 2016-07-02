<?php
header("Content-type: text/html; charset=utf-8");
header("X-XSS-Protection: 0");
//echo $_POST['form_str'];
?>
<html>
    <head>
        <title>支付</title>
    </head>
    <body>
        <?php echo $_POST['form_str']; ?>
    </body>
</html>