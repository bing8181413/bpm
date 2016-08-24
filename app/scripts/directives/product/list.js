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
                        if ('adminpm'.indexOf($rootScope.hjm.role) == -1) {
                            widget.msgToast('权限不够');
                            return false;
                        }

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
});
