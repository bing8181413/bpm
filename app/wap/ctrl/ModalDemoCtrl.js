angular.module('wap.demo', ['ui.bootstrap', 'demoServices', 'ab-base64', 'ipCookie']);
angular.module('wap.demo').controller('ModalDemoCtrl', function ($scope, widget, $uibModal, $log, $document, $filter) {
    var $ctrl = this;
    $ctrl.items = ['item1', 'item2', 'item3'];

    $ctrl.animationsEnabled = true;
    // $scope.pay_href = 'https://mapi.alipay.com/gateway.do?sign=IvjVp0%2FXaRmVmE8Csio%2BTpbjuTzAzd4Pr QLMUR8V82OcGhrjy%2BWLtaDD7KFn0tnMXfpLIJyKRjmxNulXNTMVWknKB4S77TRiBVHVOzeEC Kfh4BUY%2BUyesw6vXjtbIq2cL6GUI1A8OHu2HCjlNJK1Ks3VQqMTY7cowe8DX8PETq0%3D&_inp ut_charset=utf-8&subject=test&total_fee=0.01&sign_type=RSA&service=alipay.wap.create.dire ct.pay.by.user&notify_url=http%3A%2F%2Fwww.testalipay.com%2Falipay.wap.create.direct.pay. by.user-JAVA-UTF-8%2Fnotify_url.jsp&partner=2088501624560335&seller_id=20885016245603 35&out_trade_no=2016330134443814&payment_type=1&return_url=http%3A%2F%2Fwww.tes talipay.com%2Falipay.wap.create.direct.pay.by.user-JAVA-UTF-8%2Freturn_url.jsp';
    $scope.pay_href = 'https://mapi.alipay.com/gateway.do?app_id=&method=alipay.trade.wap.pay&format=JSON&return_url=https://m.alipay.com/Gk8NF23&charset=utf-8&sign_type=RSA2&sign=NSmtqnf3x7qzAT6y1ZrQm8y8jCW5mRj3bVGEhY%2BglZa6Ps%2F9I8nwO4K0B%2F1qveyIUaOXb5oG68JzMa6h0CQliTm9phxPf6ZlWCt%2FZNYL6f37GhFBK2%2FRfW87AybJb0C1OSzkMW6G3OGLMb8xyKuI1JE7LFx607P6qVm4uQflits%3D&timestamp=2014-07-24%2003:07:50&timesversiontamp=1.0&biz_content=';
    $scope.alipay = function () {
        _AP.pay($scope.pay_href);
    }
    $ctrl.open = function (size, parentSelector) {
//            console.log(size);
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'bindMobile.html',
            controller: 'bindMobileCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return $ctrl.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'));
        });
    };
    $ctrl.getSignature = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'getSignature.html',
            controller: 'getSignatureCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return $ctrl.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'));
        });
    };
    $ctrl.getUser = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'getUser.html',
            controller: 'getUserCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return $ctrl.items;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'));
        });
    };

//        $ctrl.openComponentModal = function () {
//            var modalInstance = $uibModal.open({
//                animation: $ctrl.animationsEnabled,
//                component: 'modalComponent',
//                resolve: {
//                    items: function () {
//                        return $ctrl.items;
//                    }
//                }
//            });
//
//            modalInstance.result.then(function (selectedItem) {
//                $ctrl.selected = selectedItem;
//            }, function () {
//                $log.info('modal-component dismissed at: ' + new Date());
//            });
//        };

//        $ctrl.toggleAnimation = function () {
//            $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
//        };
});