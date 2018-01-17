define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, con) {
    // <div product-pattern="patterns"></div>
    mod
        .directive('addMerchantProduct', function ($templateCache, $filter, $compile, widget, $uibModal, $templateCache) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-primary btn-rounded btn-sm" ng-click="show()">关联新活动</a>',
                link: function ($scope, $element, $attrs) {
                    var supScope = $scope;
                    $scope.show = function (status) {
                        var modalInstance = $uibModal.open({
                            template: function () {
                                return $templateCache.get('app/' + con.biz_path + 'merchant/product.html');
                            },
                            controller: function ($scope, $uibModalInstance) {
                                $scope.company_name = supScope.data.company_name;
                                $scope.utm_source = supScope.data.utm_source;
                                $scope.param = {};
                                $scope.verify_product_id = function (product_id) {
                                    if (!product_id) {
                                        widget.msgToast('没有填写,或者不是数字');
                                        return false;
                                    } else {
                                        $scope.products = $scope.products || [];
                                        var has_product = $scope.products.findIndex(function (val, index, arr) {
                                            return val.product_id == product_id;
                                        });
                                        if (has_product > -1) {
                                            widget.msgToast('ID已经存在了!');
                                            return false;
                                        }
                                    }
                                    return true;
                                }
                                $scope.add_product_id = function (json) {
                                    if (json.code != 0) {
                                        widget.msgToast('ID不存在!');
                                        return false;
                                    }
                                    if (json.data) {
                                        if (!$scope.products) {
                                            $scope.products = [];
                                        }
                                        var option_tmp = Array.prototype.concat(json.data.options, json.data.groupbuy_options, json.data.gift_options);
                                        json.data.options = option_tmp;
                                        $scope.products.push(json.data);
                                    }
                                }
                                $scope.submit = function () {
                                    $scope.param = {products: []};
                                    $scope.param.products = $scope.products.map(function (item) {
                                        return {product_id: item.product_id, show_contact: $scope.show_contact};
                                    });
                                    widget.ajaxRequest({
                                        url: '/merchant/merchants/' + supScope.data.id + '/products',
                                        method: 'POST',
                                        scope: $scope,
                                        data: $scope.param,
                                        success: function (json) {
                                            widget.msgToast('新增成功,请刷新查看');
                                            supScope.$parent.searchAction();
                                            $scope.cancel();
                                        },
                                        failure: function (error) {
                                            if (error.validates && JSON.stringify(error.validates).indexOf('has already been taken') > -1) {
                                                widget.msgToast('数据验证失败,请检查课程ID是否已经存在!');
                                            } else {
                                                widget.msgToast(error.message);
                                            }
                                        }
                                    })
                                }
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
        .directive('delMerchantProduct', function ($templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.merchant_product.status == 1) {
                        status_title = '移除';
                        status_text = 'ng-bind="\'移除\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(2);"';
                    }
                    $scope.change = function (status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: '/merchant/merchantproducts/' + $scope.data.merchant_product.id + '/status/2',
                                method: 'put',
                                scope: $scope,
                                data: {},
                                success: function (json) {
                                    widget.msgToast('修改成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }
                    }
                    var content = '<a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + '></a>';
                    $element.html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('merchantProduct', function (widget, $uibModal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show()" ng-bind="data.stat.product_count|null2empty" ng-show="data.stat.product_count"></a>',
                link: function ($scope, $element, $attrs) {
                    var supScope = $scope;
                    $scope.show = function (status) {
                        var modalInstance = $uibModal.open({
                            template: '<div hjm-grid modid="merchantProductList" config="config_by_merchant" columns="columns_by_merchant" ext-search="extSearch"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.extApi = '';
                                if (supScope.data.id) {
                                    $scope.extSearch = {merchant_id: supScope.data.id};
                                }
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
        .directive('merchantForbidden', function ($templateCache, $rootScope, $compile, widget, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.account.status == 1) {
                        status_title = '禁用';
                        status_text = 'ng-bind="\'禁用\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(2);"';
                        $scope.show_text = true;
                    } else if ($scope.data.account.status == 2) {
                        status_title = '启用';
                        status_text = 'ng-bind="\'启用\'"';
                        class_text = 'ng-class={\"btn-success\":true} ';
                        click_text = 'ng-click="change(1);"';
                        $scope.show_text = true;
                    }
                    var content = ' <a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + ' ng-show="show_text"></a>';
                    $element.html(content);
                    $compile($element.contents())($scope);

                    $scope.change = function (status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: '/accounts/' + $scope.data.account.account_id,
                                method: 'put',
                                scope: $scope,
                                data: {status: status},
                                success: function (json) {
                                    widget.msgToast('修改成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }

                    }
                }
            }
        })
})
;
