// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('refundController', refundController);

    refundController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', 'widget'];
    function refundController($scope, $http, $rootScope, $modal, $state, widget) {
        $scope.list_param = {page: 1, count: 20};
        $scope.list_param.status = 2;
        $scope.list_param.refund_status = 0;
        $scope.list_param.refund_type = '';
        //var list_url = simpleCons.domain + '/manage/order/refund/list';
        var list_url = simpleCons.domain + '/manage/refund/list';
        $scope.getapi = function (page) {
            $scope.list_param.keyword = $rootScope.search || '';
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        //$scope.refund_list = json.data.refund_list;
                        $scope.refund_list = json.data.list;
                        //$scope.totalItems = json.data.refund_count;
                        $scope.totalItems = json.data.count;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = page ? page : $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    } else {
                        $scope.addAlert(json.msg);
                    }
                });
        }
        //$scope.update = function (refund_id, refund_price, status, index) {
        //    if (!confirm('确认退款吗?')) {
        //        return false;
        //    }
        //    $scope.update_param = {refund_id: refund_id, refund_price: refund_price, status: status};
        //    var update_url = simpleCons.domain + '/manage/order/refund/update';
        //    $http.post(update_url, $scope.update_param)
        //        .success(function (json) {
        //            if (json.code == 0) {
        //                $scope.refund_list[index].already_operation = true;
        //            } else {
        //                widget.msgToast(json.msg);
        //            }
        //        });
        //}
        $scope.CheckAll = function () {
            angular.forEach($scope.refund_list, function (val, key) {
                val.checked = true;
            });
        }
        $scope.UnCheck = function () {
            angular.forEach($scope.refund_list, function (val, key) {
                val.checked = false;
            });
        }
        $scope.order_refund = function () {
            if (!($scope.list_param.refund_type == 1 || $scope.list_param.refund_type == 2 || $scope.list_param.refund_type == 3)) {
                alert('请选择一种退款类型,微信，支付宝或者微信H5.');
                return false;
            }
            // 退款失败的  价格参数
            if ($scope.list_param.refund_status == 2) {
                $scope.list_param.redo_refund = 1;
            } else {
                if ($scope.list_param.redo_refund) {
                    delete $scope.list_param.redo_refund;
                }
            }
            var order_refund_url = simpleCons.domain + '/manage/refund/submit';
            if (!$scope.list_param.refund_status == 2) {
                alert('已申请状态的微信，支付宝或者微信H5订单才能退款');
                return false;
            }
            $scope.ids = [];
            angular.forEach($scope.refund_list, function (val, key) {
                if (val.checked) {
                    $scope.ids.push(val.refund_id);
                }
            });
            if (!$scope.ids.join(',') || $scope.ids.join(',') == '') {
                alert('不要随便点，先选择一个订单再退款.');
                return false;
            }
            if (!confirm('确认退款吗?')) {
                return false;
            }
            $scope.order_refund_prarm = {refund_ids: $scope.ids};
            $http.post(order_refund_url, $scope.order_refund_prarm)
                .success(function (json) {
                    if (json.code == 0) {
                        //alert('操作成功.刷新查看列表!');
                        $scope.getapi();
                        //angular.forEach($scope.refund_list, function (val, key) {
                        //    if (val.checked) {
                        //        $scope.refund_list[key].already_operation = true;
                        //    }
                        //    $scope.refund_list[key].checked = false;
                        //});
                        if ($scope.list_param.refund_type == 2) {
                            //$scope.from_str = json.data.form_str;
                            document.getElementById('form_str').value = json.data.formFields;
                            document.getElementById('form1').submit();
                        }
                    } else {
                        widget.msgToast(json.msg);
                    }
                });
        }
        $scope.getapi(1);
        $rootScope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }
    };
});
