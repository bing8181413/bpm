define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('productPattern', function ($templateCache) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'product/product-pattern.html'),
                link: function ($scope, $element, $attrs) {
                    $scope.cities = [];
                    if ($scope.data.citys) {
                        angular.forEach($scope.data.citys, function (val) {
                            $scope.cities.push(val.city_name);
                        });
                        // console.log($scope.cities.join(','));
                    }
                }
            };
        })
        .directive('groupbuyPattern', function ($templateCache, $filter, $compile) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="txt"></p>',
                // template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'product/groupbuy-pattern.html'),
                link: function ($scope, $element, $attrs) {
                    // console.log($scope.data);
                    // console.log(1);
                    if ($scope.data && $scope.data.category == 1) {
                        $scope.txt = '砍价团';
                        $scope.txt += '<br/>拼团有效时间:' + $filter('second2hour')($scope.data.group_seconds) + '小时';
                        $scope.txt += '<br/>起始价:' + $scope.data.high_price;
                        $scope.txt += '<br/>底价:' + $scope.data.bottom_price;
                        $scope.txt += '<br/>单人返现:' + $scope.data.per_cut_amount;
                    } else if ($scope.data && $scope.data.category == 2) {
                        $scope.txt = '人数团';
                        $scope.txt += '<br/>拼团有效时间:' + $filter('second2hour')($scope.data.group_seconds) + '小时';
                        $scope.txt += '<br/>人数:' + $scope.data.group_min_num;
                        $scope.txt += '<br/>单价:' + $scope.data.price;
                    }
                    $element.find(".txt").html($scope.txt);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('productChangeStatus', function ($templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="change-status"></p>',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '下线';
                        status_text = 'ng-bind="\'下线\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(3);"';
                        $scope.show_text = true;
                    } else if ($scope.data.status == 3) {
                        status_title = '上线';
                        status_text = 'ng-bind="\'上线\'"';
                        class_text = 'ng-class={\"btn-primary\":true} ';
                        click_text = 'ng-click="change(1);"';
                        $scope.show_text = true;
                    }
                    $scope.change = function (status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: '/products/' + $scope.data.product_id || 0,
                                method: 'patch',
                                scope: $scope,
                                data: {status: status},
                                success: function (json) {
                                    widget.msgToast('修改成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }
                    }
                    var content = '<a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text +
                        ' ng-show="show_text" show-role="\'admin,op\'"></a>';
                    $element.find('.change-status').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('productEdit', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="product-edit"></p>',
                link: function ($scope, $element, $attrs) {
                    var content = '';
                    if ('admin,op'.indexOf($rootScope.hjm.role) > -1) {
                        content = '<a class="btn btn-success btn-rounded btn-sm"' +
                            'ui-sref="main.product.update({product_id:' + $scope.data.product_id + '})" show-role="\'admin,op\'" >编辑</a>';
                    } else {
                        content = '<a class="btn btn-info btn-rounded btn-sm"' +
                            'ui-sref="main.product.update({product_id:' + $scope.data.product_id + '})" show-role="\'!admin,op\'" >详情</a>';
                    }
                    $element.find('.product-edit').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('actEdit', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="act-edit"></p>',
                link: function ($scope, $element, $attrs) {
                    var content = '';
                    if ('admin,op'.indexOf($rootScope.hjm.role) > -1) {
                        content = '<a class="btn btn-success btn-rounded btn-sm"' +
                            'ui-sref="main.act.update({product_id:' + $scope.data.product_id + '})" show-role="\'admin,op\'" >编辑</a>';
                    } else {
                        content = '<a class="btn btn-info btn-rounded btn-sm"' +
                            'ui-sref="main.act.update({product_id:' + $scope.data.product_id + '})" show-role="\'!admin,op\'" >详情</a>';
                    }
                    $element.find('.act-edit').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('productAdd', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-success btn-rounded btn-sm pull-right" style="margin-top: -5.5px;" ' +
                'ui-sref="main.product.add" show-role="\'admin,op\'" >新增商品</a>',
                link: function ($scope, $element, $attrs) {
                }
            }
        })
        .directive('actAdd', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-success btn-rounded btn-sm pull-right" style="margin-top: -5.5px;" ' +
                'ui-sref="main.act.add" show-role="\'admin,op\'" >新增活动</a>',
                link: function ($scope, $element, $attrs) {
                }
            }
        })
        .directive('productOption', function ($templateCache) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'product/product-option.html'),
                link: function ($scope, $element, $attrs) {

                }
            };
        })
        .directive('productOrderCopies', function ($rootScope, $templateCache, $filter, $compile, widget, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-sm btn-info" ng-bind="data.order.order_copies" ng-click="show_order_copies()"' +
                ' ng-show="data.order.order_copies"></a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_order_copies = function () {
                        // if ('adminpm'.indexOf($rootScope.hjm.role) == -1) {
                        //     widget.msgToast('权限不够');
                        //     return false;
                        // }

                        var modalInstance = $modal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $modalInstance) {
                                    widget.ajaxRequest({
                                        url: '/products/' + (supscope.data.product_id || 0) + '/options',
                                        method: 'get',
                                        scope: $scope,
                                        data: {},
                                        success: function (json) {
                                            $scope.rtn_json = json.data;
                                        }
                                    })

                                    $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                        ' <div form-table ng-model="rtn_json" config="{readonly:\'true\'}"' +
                                        'columns="[{\'name\': \'ID\', \'field\': \'option_id\',\'disabled\':\'true\'},' +
                                        '{\'name\': \'类目ID\', \'field\': \'option_id\',readonly:\'true\'},' +
                                        '{\'name\': \'类目\', \'field\': \'option_name\',readonly:\'true\'},' +
                                        '{\'name\': \'价格\', \'field\': \'option_price\',readonly:\'true\'},' +
                                        '{\'name\': \'剩余库存\', \'field\': \'left_inventory\',readonly:\'true\'},' +
                                        '{\'name\': \'库存\', \'field\': \'option_inventory\',readonly:\'true\'},' +
                                        '{\'name\': \'状态\', \'field\': \'option_status\',filter:\'product_option_status\',readonly:\'true\'}' +
                                        ']"></div>' +
                                        '</form>';
                                    $scope.title = '类目详情';
                                    $scope.cancel = function () {
                                        $modalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg'
                            }
                        );
                    }
                }
            }
        })
        .directive('actChangeNotice', function ($rootScope, $templateCache, $filter, $compile, widget, $modal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-sm btn-warning" ng-click="show_act_change_notice()"' +
                ' ng-show="data.category==3">活动更改通知</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_act_change_notice = function () {
                        var modalInstance = $modal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $modalInstance) {
                                    $scope.title = '发送活动更改通知';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate' +
                                        ' disabled-role="\'admin,op\'" >' +
                                        '<h4>修改活动时间、地点，操作“确定”后，报名用户会收到消息提醒，请确认无误后操作！</h4>' +
                                        '<div form-date-time text="活动开始时间" ng-model="param.act_start_time" ng-disabled="true"></div>' +
                                        '<div form-date-time text="活动结束时间" ng-model="param.act_end_time" ng-disabled="true"></div>' +
                                        '<div form-input text="活动地点" ng-model="param.act_address" ng-disabled="true"></div>' +
                                        '<div form-input text="详细地址" ng-model="param.act_detailed_address" ng-disabled="true"></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $timeout(function () {
                                        $scope.param = supscope.data;
                                        // console.log($scope.param);
                                    }, 0);
                                    $scope.submit = function () {
                                        console.log($scope);
                                        // widget.ajaxRequest({
                                        //     url: '/products/' + (supscope.data.product_id || 0) + '/options',
                                        //     method: 'get',
                                        //     scope: $scope,
                                        //     data: {},
                                        //     success: function (json) {
                                        //         $scope.rtn_json = json.data;
                                        //     }
                                        // })
                                    }
                                    $scope.cancel = function () {
                                        $modalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg'
                            }
                        );
                    }
                }
            }
        })
        .directive('actCrowdfunding', function ($rootScope, $templateCache, $filter, $compile, widget, $modal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p><a class="btn btn-rounded btn-sm btn-warning" ng-click="show_act_crowdfunding()"' +
                ' ng-show="data.category==3">发送众筹结果通知</a></p>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.is_show = true;
                    if ($scope.data.category == 3) {
                        // console.log($filter('remaining_time')(supscope.data.act_apply_end_time),
                        //     $filter('arraySum')($scope.data.options, 'left_inventory'));
                        if (!($filter('remaining_time')(supscope.data.act_apply_end_time) == '已结束'
                            || $filter('arraySum')($scope.data.options, 'left_inventory') == 0)) {
                            $scope.is_show = false;
                        }
                    }
                    $scope.show_act_crowdfunding = function () {
                        if (!$scope.is_show) {
                            widget.msgToast('众筹报名结束，或库存已售完，才能发送众筹结果通知');
                            return false;
                        }
                        var modalInstance = $modal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $modalInstance) {
                                    $scope.title = '发送众筹结果通知';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                                        '<h4>请选择该众筹结果，操作完成后，报名用户会收到消息提醒；若众筹失败，则该活动订单会全部自动取消！请确认无误后再操作。</h4>' +
                                        '<div form-radio text="众筹结果" ng-model="param.act_result" ng-disabled="disabled_act_result"' +
                                        ' source="[{text:\'众筹成功\',value:\'1\'},{text:\'众筹失败\',value:\'2\'}]" ></div>' +
                                        '<div form-textarea text="失败原因" ng-model="param.act_update_reason" ng-show="param.act_result==2"' +
                                        ' data-placeholder="请填写失败原因，不超过30个字"></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $timeout(function () {
                                        $scope.param = {product_id: supscope.data.product_id};
                                    }, 0);
                                    $scope.$watch('param.act_result', function (val) {
                                        if (val && val == 1) {
                                            $scope.param.act_update_reason = '';
                                        }
                                    });
                                    $scope.submit = function () {
                                        // console.log($scope.param);
                                        if (!$scope.param.act_result) {
                                            widget.msgToast('没有选择众筹结果');
                                            return false;
                                        }
                                        if ($scope.param.act_result == 2 && $scope.param.act_update_reason == '') {
                                            widget.msgToast('众筹失败要写原因');
                                            return false;
                                        }
                                        widget.ajaxRequest({
                                            url: '/products/' + (supscope.data.product_id || 0) + '/crowdFunding',
                                            method: 'PUT',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                $scope.rtn_json = json.data;
                                            }
                                        })
                                    }
                                    $scope.cancel = function () {
                                        $modalInstance.dismiss('cancel');
                                    };
                                },
                                size: ''
                            }
                        );
                    }
                }
            }
        })
        .directive('actOrderCopies', function ($templateCache, $filter, $compile, widget, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show();" ng-bind="text" ng-show="text"></a>',
                link: function ($scope, $element, $attrs) {
                    $scope.text = (($scope.data.order || {}).order_count || 0);// + '/' + (($scope.data.allorder || {}).count || 0);
                    $scope.ext = {product_id: $scope.data.product_id};
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $modal.open({
                            template: '<div hjm-grid modid="orderList" config="config_by_act_2" columns="columns_by_act" ext-search="ext"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.ext = supscope.ext;
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
});
