// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('exchangecode.listController', listController);

    listController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', '$templateCache'];
    function listController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter, $templateCache) {
        $scope.list_param = {page: 1, count: 20};
        $scope.list_param.keyword = $scope.search;
        var list_url = simpleCons.domain + '/manage/exchangecode/list';
        $scope.getapi = function (page) {
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.list = json.data.list;
                        $scope.res_head = [];
                        $scope.res_data = [];
                        $scope.res_api = '';
                        $scope.res_title = '兑换优惠劵';
                        $scope.res_head.push(
                            {name: 'ID', key: 'id', className: 'span30'},
                            {name: '总量', key: 'total', className: 'span30'},
                            {name: '适用范围', key: 'category', className: 'span30', filter: 'coupon_category'},
                            {name: '商品品类', key: 'sku', className: 'span30', filter: 'coupon_sku'},
                            {
                                name: '商品类型(频率)',
                                key: 'commodity_type',
                                className: 'span30',
                                filter: 'coupon_commodity_type'
                            },
                            {name: '金额', key: 'price', className: 'span30'},
                            {name: '优惠券名称', key: 'title', className: 'span50'},
                            // {name: '兑换码领取数', key: 'send_count', className: 'span30'},
                            {name: '优惠券领取数', key: 'coupon_receive_num', className: 'span30'},
                            {name: '生成时间', key: 'created_at', className: 'span30'},
                            {
                                name: '有效期',
                                className: 'span30',
                                template: "<span ng-bind=\"start_time+'-'\"></span><br><span ng-bind=\"expire_time\"></span>"
                            },
                            // {name: '状态', key: 'export_status', className: 'span30', filter: 'coupon_status'},
                            {
                                name: '导出兑换码',
                                className: 'span30',
                                template: $templateCache.get('export_btn.html')
                            }
                        );
                        $scope.res_data = $scope.list;

                        $scope.totalItems = json.data.total;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = page ? page : $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    } else {
                        widget.msgToast(json.msg);
                    }
                }).error(function (err, status, sss) {
                //$scope.getapi();
            });
        }
        $scope.getapi(1);
        $rootScope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }

        $scope.export = function (item) {
            // console.log(item);
            var modalInstance = $modal.open({
                templateUrl: 'export_list.html',
                controller: function ($scope, $modalInstance) {
                    var couponinfo_url = simpleCons.domain + '/manage/exchangecode/export';
                    $http.post(couponinfo_url, {
                        id: item.id
                    })
                        .success(function (json) {
                            if (json.code == 0) {
                                $scope.export_list = [];
                                angular.forEach(json.data.list, function (val, key) {
                                    $scope.export_list.push(val.code);
                                });
                                $scope.export_data = $scope.export_list.join(',');
                            } else {
                                widget.msgToast('失败: ' + json.msg);
                            }
                        });
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: 'lg'
            });
        }
    };
});
