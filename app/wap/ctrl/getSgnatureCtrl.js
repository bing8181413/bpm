angular.module('wap.demo').controller('getSignatureCtrl', function ($scope, widget, $uibModalInstance, items) {
    $scope.param = {};
    $scope.ok = function () {
        if (!$scope.product_id) {
            widget.msgToast('商品ID没填写');
            return false;
        }
        $scope.param = {url: encodeURIComponent('https://devm.ahaschool.com/order/add?product_id=' + $scope.product_id + '&option_type=2')};
        widget.ajaxRequest({
            url: 'https://devopenapi.ahaschool.com/v1/supports/signature',
            method: 'get',
            scope: $scope,
            data: $scope.param,
            success: function (json) {
                if (json.code == 0) {
                    widget.msgToast('success');
                    // angular.forEach(json.data, function (val, key) {
                    //     document.cookie = (key + ' = ' + val);
                    // })
                } else {
                    widget.msgToast(json.message);
                }
            }
//            $uibModalInstance.close($ctrl.selected.item);
        });
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});