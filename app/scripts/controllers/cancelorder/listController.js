// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('cancelorder.listController', listController);

    listController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', '$templateCache'];
    function listController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter, $templateCache) {
        var sup_scope = $scope;
        $scope.pubdata = '';
        $scope.init_param = angular.extend({audit_type: 1, status: '', cancel_from: ''}, simpleCons.default_param);
        //console.log($scope.init_param);
        $scope.init_param.keyword = $rootScope.search;
        $scope.init_url = simpleCons.domain + '/manage/refund/list';
        $scope.getapi = function (page) {
            //$rootScope.loading = true;
            $scope.init_param.page = page ? page : $scope.init_param.page;
            $scope.init_param.keyword = $rootScope.search || '';
            $http.post($scope.init_url, $scope.init_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.list = json.data.list;
                        $scope.res_head = [];
                        $scope.res_data = [];
                        $scope.res_api = '';
                        $scope.res_title = '取消订单';
                        $scope.res_extra = {init_param: $scope.init_param};
                        $scope.res_head.push(
                            {name: '序号', key: 'idx', className: 'span50'},
                            {name: '订单序号', key: 'order_id', className: 'span70'},
                            {name: '订单编号', key: 'order_no', className: 'span150'},
                            {name: '活动名称', key: 'order.order_title', className: 'span70'},
                            {name: '用户姓名', key: 'order.contact_name', className: 'span70'},
                            {name: '联系电话', key: 'contact_mobile', className: 'span70'},
                            {key: 'order.community_name', name: '小区', className: 'span70'},
                            {key: 'refund_type', name: '支付方式', className: 'span50', filter: 'payment_from'},
                            {key: 'refund_price', name: '退款金额', className: 'span50'},
                            {key: 'cancel_reason', name: '取消订单原因', className: 'span100'},
                            {name: '审核操作', className: 'span70', template: $templateCache.get('audit_btn.html')},
                            {key: 'refund_reason', name: '备注', className: 'span100'}
                        );
                        $scope.res_data = $scope.list;

                        $scope.totalItems = json.data.count;
                        $scope.itemsPerPage = $scope.init_param.count;
                        $scope.currentPage = page ? page : $scope.init_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                        $rootScope.loading = false;
                    } else {
                        widget.msgToast(json.msg);
                        $rootScope.loading = false;
                    }
                });
        }
        $scope.getapi(1);
        $rootScope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }
        $scope.audit = function (item, index) {
            //console.log(item);
            var modalInstance = $modal.open({
                templateUrl: 'audit.html',
                controller: function ($scope, $modalInstance) {
                    $scope.param = {
                        user_id: item.user_id,
                        order_id: item.order_id,
                        refund_id: item.refund_id,
                        status: 2,
                        refund_reason: ''
                    }
                    $scope.submit = function () {
                        $scope.audit_url = simpleCons.domain + '/manage/refund/audit';
                        $http.post($scope.audit_url, $scope.param)
                            .success(function (json) {
                                if (json.code == 0) {
                                    widget.msgToast('操作成功!请刷新列表查看');
                                    //sup_scope.list[sup_index].status = status;
                                    $modalInstance.dismiss('cancel');
                                    sup_scope.getapi();
                                } else {
                                    widget.msgToast('失败: ' + json.msg);
                                }
                            });
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: ''
            });


        }
    };
});
