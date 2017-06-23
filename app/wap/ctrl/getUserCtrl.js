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
        // $scope.pay_href = 'https://openapi.alipay.com/gateway.do'
        $scope.pay_href = 'https://mapi.alipay.com/gateway.do'
        widget.ajaxRequest({
            url: $scope.pay_href,
            method: 'get',
            scope: $scope,
            data: {
                app_id:'',
                method:'alipay.trade.wap.pay',
                format:'JSON',
                return_url:'https://m.alipay.com/Gk8NF23',
                charset:'utf-8',
                sign_type:'RSA2',
                sign:'NSmtqnf3x7qzAT6y1ZrQm8y8jCW5mRj3bVGEhY%2BglZa6Ps%2F9I8nwO4K0B%2F1qveyIUaOXb5oG68JzMa6h0CQliTm9phxPf6ZlWCt%2FZNYL6f37GhFBK2%2FRfW87AybJb0C1OSzkMW6G3OGLMb8xyKuI1JE7LFx607P6qVm4uQflits%3D',
                timestamp:'2014-07-24 03:07:50',
                timesversiontamp:'1.0',
                biz_content:'',
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