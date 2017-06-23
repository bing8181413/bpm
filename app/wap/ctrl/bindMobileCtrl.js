angular.module('wap.demo').controller('bindMobileCtrl', bindMobileCtrl);

bindMobileCtrl.$injector = ['$http', '$scope', 'widget', 'base64', '$uibModalInstance', 'items'];
function bindMobileCtrl($http, $scope, widget, base64, $uibModalInstance, items) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.selected = {
        item: $ctrl.items[0]
    };
    $ctrl.param = {mobile: '17621037089'};
    $ctrl.getCaptcha = function () {

        if (!$ctrl.param.mobile || $ctrl.param.mobile.length != 11) {
            widget.msgToast('手机号码填写不正确');
            return false;
        }
        widget.ajaxRequest({
            url: 'https://devopenapi.ahaschool.com/v1/visitor/captcha',
            method: 'POST',
            scope: $scope,
            data: {
                mobile: $ctrl.param.mobile,
                type: 4
            },
            success: function (json) {
                if (json.code == 0) {
                    widget.msgToast('发送成功,请查收短信');
                } else {
                    widget.msgToast(json.message);
                }
            }
        })
    };

    $ctrl.ok = function () {
        widget.ajaxRequest({
            url: 'https://devopenapi.ahaschool.com/v1/visitor/login',
            method: 'POST',
            scope: $scope,
            data: {
                mobile: $ctrl.param.mobile,
                code: $ctrl.param.code
            },
            success: function (json) {
                if (json.code == 0) {
                    widget.msgToast('绑定成功');
                    angular.forEach(json.data, function (val, key) {
                        document.cookie = (key + ' = ' + val);
                    })
                } else {
                    widget.msgToast(json.message);
                }
            }
//            $uibModalInstance.close($ctrl.selected.item);
        });
    }

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}
