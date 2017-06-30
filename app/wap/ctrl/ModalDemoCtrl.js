angular.module('wap.demo', ['ui.bootstrap', 'demoServices', 'ab-base64', 'ipCookie', 'envServices']);
angular.module('wap.demo').controller('ModalDemoCtrl', function ($scope, widget, $uibModal, $log, $document, $filter, ipCookie, $compile) {
    var $ctrl = this;
    $ctrl.items = ['item1', 'item2', 'item3'];

    $ctrl.animationsEnabled = true;
    // 获取未支付订单
    $scope.getorders = function () {
        $scope.order_ids = [];
        widget.ajaxRequest({
            url: '/v1/orders',
            method: 'get',
            scope: $scope,
            data: {
                limit: 15,
                order_status: [1, 2]
            },
            success: function (json) {
                if (json.code == 0 && json.data && json.data.length > 0) {
                    angular.forEach(json.data, function (val, key) {
                        $scope.order_ids.push({
                            order_id: val.order_id,
                            order_status: val.order_status,
                        });
                    })
                } else {
                    widget.msgToast('没有未支付订单!')
                }

            }
        });
    }
    $scope.getpayForm = function () {
        // $scope.order = {};
        if (!$scope.order || !$scope.order.order_id) {
            widget.msgToast('没有订单ID!');
            return false;
        }
        widget.ajaxRequest({
            url: '/v1/orders/' + $scope.order.order_id + '/paycert',
            method: 'get',
            scope: $scope,
            data: {pay_type: 6, return_url: $scope.order.return_url},
            success: function (json) {
                if (json.paycert && json.paycert.data && json.paycert.data.result) {
                    var template = angular.element(json.paycert.data.result);
                    var mobileDialogElement = $compile(template)($scope);
                    angular.element(document.getElementById('form_str')).append(mobileDialogElement);
                    console.log(mobileDialogElement);
                    // document.getElementsByName('punchout_form')[0].submit();
                } else {
                    widget.msgToast('没有获取支付凭证!');
                }
            },
            failure: function (err) {
                widget.msgToast(err.error.msg);
            }
        });
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

    $ctrl.removeCookie = function (size, parentSelector) {
        if (!confirm('要清空cookie中的认证信息吗?')) {
            return false;
        }
        var cookieArr = ipCookie();
        angular.forEach(cookieArr, function (val, key) {
            ipCookie.remove(key);
        })
        $log.info(cookieArr);
        widget.msgToast('已清空Cookie!');
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