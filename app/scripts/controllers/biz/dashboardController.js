// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('dashboard.updateController', updateController);

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$q'];

    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $q) {
        $scope.searchItem = {
            page: 1,
            count: 100,
            product_id: undefined,
            period: undefined,
            start_time: '2017-12-04',
            end_time: '2017-12-06'
        };
        $scope.stat = {
            order_list: [],//订单数据
            groupbuy_list: [],// 团数据
            share_list: [] // 分享数据
        };
        $scope.getData = function (searchItem, type) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $scope.param = searchItem;
            if (!type) {
                type = 'stat_order';
            }
            $scope.param = angular.extend($scope.param, {type: type});
            widget.ajaxRequest({
                url: '/dashboard/stats',
                method: 'GET',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    // console.log(json, type);
                    var result = {type: type, json: json}
                    deferred.resolve(result);
                },
                failure: function (error) {
                    console.log('错误了', error, type);
                    deferred.reject(error);
                }
            })
            return promise;
        }

        $scope.getActData = function (product_id) {
            widget.ajaxRequest({
                url: '/products/' + product_id,
                method: 'GET',
                scope: $scope,
                data: {},
                success: function (json) {
                    if (json.code == 0) {
                        $scope.actData = json.data;
                        console.log($scope.actData);
                    }
                }
            })
        }
        $scope.search = function (type) {
            if (!$scope.searchItem.product_id) {
                widget.msgToast('商品ID没有传!');
                return false;
            }
            $scope.getActData($scope.searchItem.product_id);
            $scope.getData($scope.searchItem, type).then(function (result) {
                if (result.type == 'stat_order') {
                    $scope.stat.order_list = result.json.data;
                    $scope.search('stat_groupbuy');
                } else if (result.type == 'stat_groupbuy') {
                    $scope.stat.groupbuy_list = result.json.data;
                    $scope.search('stat_share');
                } else if (result.type == 'stat_share') {
                    $scope.stat.share_list = result.json.data;
                }
            }, function (error) {
                $scope.data = "error!";
            }, function (progress) {
                $scope.progress = progress;
                $scope.show = false;
            });
        }
        var tr2text = function (rows) {
            var row_content = [];
            angular.forEach(rows.children(), function (row) {
                row_content.push($(row).text());
            })
            return row_content;
        }
        var table2Excel = function (id) {
            var excel = [];
            var head = $("#" + id + ">thead>tr");
            var body = $("#" + id + ">tbody>tr");
            if (head.length > 0) {
                angular.forEach(head, function (tr) {
                    excel.push(tr2text($(tr)));
                })
            }
            if (body.length > 0) {
                angular.forEach(body, function (tr) {
                    excel.push(tr2text($(tr)));
                })
            }
            return excel;
        }
        $scope.export = function () {
            if ($scope.stat.order_list.length == 0 && $scope.stat.groupbuy_list.length == 0 && $scope.stat.share_list.length == 0) {
                widget.msgToast('没有数据可以导出!')
                return false;
            }
            var order_list_text = table2Excel('order_list_text');
            var groupbuy_list_text = table2Excel('groupbuy_list_text');
            var share_list_text = table2Excel('share_list_text');
            // console.log(order_list_text, groupbuy_list_text, share_list_text);
            // console.table(order_list_text);
            // console.table(groupbuy_list_text);
            // console.table(share_list_text);


            widget.ajaxRequest({
                url: '/exports/file',
                method: 'POST',
                scope: $scope,
                data: {
                    '订单数据': order_list_text,
                    '拼团数据': groupbuy_list_text,
                    '分享数据': share_list_text
                },
                success: function (json) {
                    if (json.code == 0) {
                        window.open(json.data.url);
                    } else {
                        widget.msgToast('返回excel存在问题!');
                    }
                }
            })

        }
        var field = [
            {
                "product_id": 111,
                "data_type": 1,//(数据类型:1按小时统计,2按天统计)
                "pv": 123,
                "uv": 321,
                "stat_hous": 0,//(统计小时:0-23)
                "stat_day": 20171204,//(统计的天)
                "total": 123,//订单总数
                "buy_total": 123,//单人购订单数
                "gift_total": 123,//礼包订单数
                "sale_total": 123,//已售总分数
                "pamt_total": 123.00,//支付总金额
                "user_total": 222,//订单总用户
                "new_user_total": 221,//新增下单用户数
                "visit_user_total": 2223,//回访下单用户数
                "convert_rate": 12,//订单转换率
                "created_at": "yyyy-MM-dd HH:mm:ss",//创建时间
            },
            {
                "product_id": 111,
                "data_type": 1,
                "stat_hous": 0,
                "stat_day": 20171204,
                "total": 123,//总团数
                "in_total": 321,//未成团(进行中)
                "accomplish_total": 0,//成团数
                "fixed_total": 20171204,//定员成团数
                "elastic_total": 123,//弹性成团数
                "fail_total": 123,//开团失败数
                "accomplish_rate": 123,//成团率
                "fail_rate": 123,//开团失败率
                "open_rate": 123,//开团率
                "created_at": "yyyy-MM-dd HH:mm:ss"
            },
            {
                "product_id": 111,
                "data_type": 1,
                "stat_hous": 0,
                "stat_day": 20171204,
                "total": 123,//分享次数
                "user_total": 123,//分享人数
                "order_total": 123,//分享产生的订单
                "uv": 321,//分享产生UV
                "convert_rate": 0,//分享转化率
                "uv_proportion": 20171204,//分享UV占比
                "user_avg_uv": 123,//人均分享UV
                "user_avg_order_total": 123,//人均分享订单
                "created_at": "yyyy-MM-dd HH:mm:ss"
            }]
    };
});
