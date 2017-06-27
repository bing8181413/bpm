angular.module('wap.demo').controller('getUserCtrl', function ($scope, widget, $uibModalInstance, ipCookie) {
    $scope.param = {};
    widget.ajaxRequest({
        url: 'https://devopenapi.ahaschool.com/v1/users/' + ipCookie('user_id'),
        method: 'get',
        scope: $scope,
        data: $scope.param,
        success: function (json) {
            if (json.code == 0) {
                $scope.user = json.data;
                $scope.user = {
                    user_id: json.data.user_id,
                    mobile: json.data.mobile,
                    name: json.data.name,
                    is_vip: json.data.is_vip,
                };
            } else {
                widget.msgToast(json.message);
            }
        }
    });
    $scope.ok = function () {
        // $scope.pay_href = 'https://mapi.alipay.com/gateway.do?sign=IvjVp0%2FXaRmVmE8Csio%2BTpbjuTzAzd4PrQLMUR8V82OcGhrjy%2BWLtaDD7KFn0tnMXfpLIJyKRjmxNulXNTMVWknKB4S77TRiBVHVOzeECKfh4BUY%2BUyesw6vXjtbIq2cL6GUI1A8OHu2HCjlNJK1Ks3VQqMTY7cowe8DX8PETq0%3D&_input_charset=utf-8&subject=test&total_fee=0.01&sign_type=RSA&service=alipay.wap.create.direct.pay.by.user&notify_url=http%3A%2F%2Fwww.testalipay.com%2Falipay.wap.create.direct.pay.by.user-JAVA-UTF-8%2Fnotify_url.jsp&partner=2088501624560335&seller_id=2088501624560335&out_trade_no=2016330134443814&payment_type=1&return_url=http%3A%2F%2Fwww.testalipay.com%2Falipay.wap.create.direct.pay.by.user-JAVA-UTF-8%2Freturn_url.jsp';
        // $scope.pay_href = 'https://mapi.alipay.com/gateway.do?
        // sign=IvjVp0%2FXaRmVmE8Csio%2BTpbjuTzAzd4PrQLMUR8V82OcGhrjy%2BWLtaDD7KFn0tnMXfpLIJyKRjmxNulXNTMVWknKB4S77TRiBVHVOzeECKfh4BUY%2BUyesw6vXjtbIq2cL6GUI1A8OHu2HCjlNJK1Ks3VQqMTY7cowe8DX8PETq0%3D
        // &_input_charset=utf-8
        // &subject=test
        // &total_fee=0.01
        // &sign_type=RSA
        // &service=alipay.wap.create.direct.pay.by.user
        // &notify_url=http%3A%2F%2Fwww.testalipay.com%2Falipay.wap.create.direct.pay.by.user-JAVA-UTF-8%2Fnotify_url.jsp
        // &partner=2088501624560335
        // &seller_id=2088501624560335
        // &out_trade_no=2016330134443814
        // &payment_type=1
        // &return_url=http%3A%2F%2Fwww.testalipay.com%2Falipay.wap.create.direct.pay.by.user-JAVA-UTF-8%2Freturn_url.jsp';
        // $scope.pay_href = 'https://openapi.alipay.com/gateway.do';
        // $scope.pay_href = 'https://mapi.alipay.com/gateway.do';
        $scope.pay_href = 'https://openapi.alipaydev.com/gateway.do';
        widget.ajaxRequest({
            url: $scope.pay_href,
            method: 'get',
            scope: $scope,
            data:{
                "_input_charset": "utf-8",
                "subject": "虞美人节•创新与美论坛暨混沌研习社上海分社成立大会",
                "sign": "Zw25Kh7YwFPzcrMSuZMFTFzFE1HSs977f1cTkum1AZLaakNi%2BieGjlwcmC%2FAa6M7EpEMpCCW66aafSJy94YGLwKYS8QJVliv8RsNwW6sLBXXBNxV5CflnB%2B0Rmc7%2BcAD1VKuN3cmr8c0ynOponbsfrASKzduFOC1AjPHvTv8NiA%3D",
                "it_b_pay": "30m",
                "notify_url": "https://testpay.huijiame.com/pay_result/notify/2",
                "body": "虞美人节•创新与美论坛暨混沌研习社上海分社成立大会",
                "payment_type": "1",
                "out_trade_no": "TA1JE13SC0400",
                "partner": "2088021101527281",
                "service": "alipay.wap.create.direct.pay.by.user",
                "total_fee": "0.02",
                // "order_string": "partner=\"2088021101527281\"&seller_id=\"2088021101527281\"&out_trade_no=\"TA1JE13SC0400\"&subject=\"虞美人节•创新与美论坛暨混沌研习社上海分社成立大会\"&body=\"虞美人节•创新与美论坛暨混沌研习社上海分社成立大会\"&total_fee=\"0.02\"&notify_url=\"https://testpay.huijiame.com/pay_result/notify/2\"&service=\"alipay.wap.create.direct.pay.by.user\"&payment_type=\"1\"&_input_charset=\"utf-8\"&it_b_pay=\"30m\"&show_url=\"m.alipay.com\"&sign=\"Zw25Kh7YwFPzcrMSuZMFTFzFE1HSs977f1cTkum1AZLaakNi%2BieGjlwcmC%2FAa6M7EpEMpCCW66aafSJy94YGLwKYS8QJVliv8RsNwW6sLBXXBNxV5CflnB%2B0Rmc7%2BcAD1VKuN3cmr8c0ynOponbsfrASKzduFOC1AjPHvTv8NiA%3D\"&sign_type=\"RSA\"",
                "sign_type": "RSA",
                "seller_id": "2088021101527281",
                "show_url": "m.alipay.com"
            },
            success: function (json) {
                console.log(json);
            }
        });
    }


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});