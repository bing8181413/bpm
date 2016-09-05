define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
    // 取消订单
        .directive('orderCancel', function ($templateCache, $filter, $compile, widget, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="order-cancel" ></p>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_cancel_order = function () {
                        var modalInstance = $modal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-textarea text="取消原因" ng-model="cancel_reason"' +
                                    ' placeholder = "取消原因" required = "true" > </div > ' +
                                    '<a class="btn btn-primary btn-rounded pull-right " ng-click="cancel_order()">确定</a>' +
                                    // '<a class="btn btn-warning btn-rounded " ng-click="cancel()">关闭</a>' +
                                    '</form>';
                                $scope.title = '取消订单';
                                $scope.cancel_order = function () {
                                    if (confirm('确认取消订单吗?')) {
                                        widget.ajaxRequest({
                                            url: '/orders/' + supscope.data.order_id || 0,
                                            method: 'delete',
                                            scope: $scope,
                                            data: {cancel_reason: $scope.cancel_reason},
                                            success: function (json) {
                                                widget.msgToast('修改成功,请刷新查看');
                                                supscope.$parent.$parent.searchAction();
                                                $scope.cancel();
                                            }
                                        })
                                    }
                                }
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: ''
                        });
                    }
                    var content = '<a class="btn btn-warning btn-rounded btn-sm" ng-click="show_cancel_order();" ng-show="data.order_status!==6">取消订单</a>';
                    $element.find('.order-cancel').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        // 子订单
        .directive('orderDeliveries', function ($templateCache, $filter, $compile, widget, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="order-deliveries" ></p>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_deliveries = function () {
                        if (!$scope.data.deliveries || $scope.data.deliveries.length == 0) {
                            widget.msgToast('没有子订单');
                            return false;
                        }
                        var modalInstance = $modal.open({
                            template: '<div hjm-grid modid="deliveryList" config="configByOrder" columns="columnsByOrder" ext-api="extApi"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.extApi = '/orders/' + supscope.data.order_id + '/deliveries'
                            },
                            size: 'lg'
                        });
                    }
                    var content = '<a class="btn btn-info btn-rounded btn-sm" ng-click="show_deliveries();" ng-bind="data.deliveries.length">子订单</a>';
                    $element.find('.order-deliveries').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        // 修改收货地址 拼团
        .directive('orderChangeAddress', function ($templateCache, $filter, $compile, widget, $modal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="order-change-address" ></p>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_order_change_address = function () {
                        var modalInstance = $modal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $modalInstance) {
                                    // console.log(supscope.data.address);
                                    $timeout(function () {
                                        $scope.address = {
                                            contact_name: supscope.data.address.contact_name,
                                            contact_mobile: supscope.data.address.contact_mobile,
                                            city_name: supscope.data.address.city_name,
                                            community_name: supscope.data.address.community_name,
                                            community_id: supscope.data.address.community_id,
                                            address: supscope.data.address.address,
                                            district: supscope.data.address.district,
                                            poi_type: supscope.data.address.poi_type,
                                            province: supscope.data.address.province,
                                        };
                                    }, 0);

                                    $scope.remoteUrlRequestFn = function (str) {
                                        return {
                                            count: 50,
                                            page: 1,
                                            poi_type: 1,
                                            city_name: supscope.data.address.city_name,
                                            keyword: str
                                        };
                                    };
                                    $scope.selectedCommunity = function (selected) {
                                        if (selected) {
                                            $scope.address.community_name = selected.originalObject.name;
                                            $scope.address.community_id = selected.originalObject.community_id;
                                            $scope.address.district = selected.originalObject.district;
                                            $scope.address.poi_type = selected.originalObject.poi_type;
                                            $scope.address.province = selected.originalObject.city && selected.originalObject.city.province;
                                        }
                                        else {
                                            $scope.address.community_name = null;
                                            $scope.address.community_id = null;
                                            $scope.address.district = null;
                                            $scope.address.poi_type = null;
                                            $scope.address.province = null;
                                        }
                                    }
                                    $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                        '<div form-input text="联系人" ng-model="address.contact_name"' +
                                        ' placeholder = "联系人" required = "true" > </div > ' +
                                        '<div form-input text="手机号" ng-model="address.contact_mobile"' +
                                        ' placeholder = "手机号" required = "true" > </div > ' +
                                        '<div form-input text="城市" ng-model="address.city_name"' +
                                        ' placeholder = "城市" required = "true" > </div > ' +
                                        '<div class="form-group">' +
                                        '<style>.angucomplete-dropdown {' +
                                        'overflow-y: auto;max-height: 250px;}' +
                                        '</style>' +
                                        '<label class="col-sm-2 control-label">小区／办公楼<span class="form_label_dangus">*</span></label>' +
                                        '<p class="form-control-static col-sm-4" ng-bind="address.community_name"></p>' +
                                        '<div class="col-sm-4"><angucomplete-alt ' +
                                        'id="ex5"' +
                                        'placeholder="搜索小区"' +
                                        'pause="100"' +
                                        'selected-object="selectedCommunity"' +
                                        'remote-url="' + simpleCons.domain + '/communities"' +
                                        'remote-url-request-formatter="remoteUrlRequestFn"' +
                                        'remote-url-data-field="data"' +
                                        'title-field="name"' +
                                        'search-fields="keyword"' +
                                        'description-field="address"' +
                                        'minlength="1"' +
                                        // 'image-field="pic"' +
                                        'input-class="form-control form-control-small" ' +
                                        'match-class="highlight" ' +
                                        // 'initial-value="address.community_name" ' +
                                        'override-suggestions="true" ' +
                                        'clear-selected="true"' +
                                        '/></div>' +
                                        '</div>' +
                                        '<div form-textarea text="详细地址" ng-model="address.address"' +
                                        ' placeholder = "详细地址" required = "true" > </div > ' +
                                        '<a class="btn btn-primary btn-rounded pull-right" ng-click="cancel_order()">确定</a>' +
                                        // '<a class="btn btn-warning btn-rounded " ng-click="cancel()">关闭</a>' +
                                        '</form>';
                                    $scope.title = '修改收货地址';
                                    $scope.cancel_order = function () {
                                        var err = 0;
                                        // console.log($scope.address);
                                        angular.forEach($scope.address, function (val, key) {
                                            if (val == null || val == undefined) {
                                                err++;
                                            }
                                        });
                                        if (err > 0) {
                                            widget.msgToast('有数据为填写完整');
                                            return false;
                                        }
                                        if (confirm('确认修改收货地址吗?')) {
                                            widget.ajaxRequest({
                                                url: '/orders/' + (supscope.data.order_id || 0) + '/addresses/' + (supscope.data.address && supscope.data.address.order_address_id || 0),
                                                method: 'put',
                                                scope: $scope,
                                                data: $scope.address,
                                                success: function (json) {
                                                    widget.msgToast('修改成功,请刷新查看');
                                                    supscope.$parent.$parent.searchAction();
                                                    $scope.cancel();
                                                }
                                            })
                                        }
                                    }
                                    $scope.cancel = function () {
                                        $modalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg'
                            }
                        );
                    }
                    var content = '<a class="btn btn-primary btn-rounded btn-sm" ng-click="show_order_change_address();">修改收货地址</a>';
                    $element.find('.order-change-address').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        // 修改收货地址 拼团
        .directive('orderChangeAddressOfAct', function ($templateCache, $filter, $compile, widget, $modal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="order-change-address-of-act" ></p>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_order_change_address = function () {
                        var modalInstance = $modal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $modalInstance) {
                                    $timeout(function () {
                                        $scope.address = {
                                            contact_name: supscope.data.address.contact_name,
                                            contact_mobile: supscope.data.address.contact_mobile,
                                            // city_name: supscope.data.address.city_name,
                                            // community_name: supscope.data.address.community_name,
                                            // community_id: supscope.data.address.community_id,
                                            // address: supscope.data.address.address,
                                            // district: supscope.data.address.district,
                                            // poi_type: supscope.data.address.poi_type,
                                            // province: supscope.data.address.province,
                                        };
                                    }, 0);

                                    $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                        '<div form-input text="联系人" ng-model="address.contact_name"' +
                                        ' placeholder = "联系人" required = "true" > </div > ' +
                                        '<div form-input text="手机号" ng-model="address.contact_mobile"' +
                                        ' placeholder = "手机号" required = "true" > </div > ' +
                                        '<a class="btn btn-primary btn-rounded pull-right" ng-click="cancel_order()">确定</a>' +
                                        '</form>';
                                    $scope.title = '修改收货信息';
                                    $scope.cancel_order = function () {
                                        var err = 0;
                                        // console.log($scope.address);
                                        angular.forEach($scope.address, function (val, key) {
                                            if (val == null || val == undefined) {
                                                err++;
                                            }
                                        });
                                        if (err > 0) {
                                            widget.msgToast('有数据为填写完整');
                                            return false;
                                        }
                                        if (confirm('确认修改收货信息吗?')) {
                                            widget.ajaxRequest({
                                                url: '/orders/' + (supscope.data.order_id || 0) + '/addresses/' + (supscope.data.address && supscope.data.address.order_address_id || 0),
                                                method: 'put',
                                                scope: $scope,
                                                data: $scope.address,
                                                success: function (json) {
                                                    widget.msgToast('修改成功,请刷新查看');
                                                    supscope.$parent.$parent.searchAction();
                                                    $scope.cancel();
                                                }
                                            })
                                        }
                                    }
                                    $scope.cancel = function () {
                                        $modalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg'
                            }
                        );
                    }
                    var content = '';
                    // console.log($scope.data.delivery_type);
                    if ($scope.data.delivery_type && $scope.data.delivery_type !== 3) {
                        content = '<div order-change-address data="data"></div>';
                        $element.find('.order-change-address-of-act').html(content);
                        $compile($element.contents())($scope);
                    }else{
                        content = '<a class="btn btn-primary btn-rounded btn-sm" ng-click="show_order_change_address();">修改收货地址</a>';
                        $element.find('.order-change-address-of-act').html(content);
                        $compile($element.contents())($scope);
                    }
                }
            }
        })
        // 修改配送模式时间类型
        .directive('orderChangePattern', function ($templateCache, $filter, $compile, widget, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="order-change-pattern" ></p>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_order_change_pattern = function () {
                        var modalInstance = $modal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.title = '修改配送时间类型';
                                $scope.pattern_id = supscope.data.pattern.pattern_id;
                                var source = '[';
                                if (supscope.data && supscope.data.product && supscope.data.product.patterns) {
                                    angular.forEach(supscope.data.product.patterns, function (val, key) {
                                        source += ('{text:\'' + $filter('num2week')(val.arrive_pm) + '\',value:\'' + val.pattern_id + '\'},');
                                    });
                                } else {
                                    widget.msgToast('没有配送模式可以选择');
                                    return false;
                                }
                                source += ']';
                                $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-radio text="配送时间" type="radio" ng-model="pattern_id" required="true"' +
                                    'source="' + source + '" source-api="" default="' + supscope.data.pattern.pattern_id + '"></div>' +
                                    '<a class="btn btn-primary btn-rounded pull-right" ng-click="change_pattern()">确定</a>' +
                                    // '<a class="btn btn-warning btn-rounded " ng-click="cancel()">关闭</a>' +
                                    '</form>';
                                $scope.change_pattern = function () {
                                    if (confirm('确认修改配送时间类型吗?')) {
                                        widget.ajaxRequest({
                                            url: '/orders/' + (supscope.data.order_id || 0) + '/pattern',
                                            method: 'PUT',
                                            scope: $scope,
                                            data: {pattern_id: $scope.pattern_id},
                                            success: function (json) {
                                                widget.msgToast('修改成功,请刷新查看');
                                                supscope.$parent.$parent.searchAction();
                                                $scope.cancel();
                                            }
                                        })
                                    }
                                }
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: ''
                        });
                    }
                    var content = '<a class="btn btn-primary btn-rounded btn-sm" ng-click="show_order_change_pattern();">修改配送时间</a>';
                    $element.find('.order-change-pattern').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        // 修改订单备注
        .directive('orderChangeRemark', function ($templateCache, $filter, $compile, widget, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="order-change-remark" ></p>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_order_change_remark = function () {
                        var modalInstance = $modal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.title = '修改订单备注';
                                $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-textarea="" text="订单备注" ng-model="remark" required="true"></div>' +
                                    '<a class="btn btn-primary btn-rounded pull-right" ng-click="change_remark()">确定</a>' +
                                    // '<a class="btn btn-warning btn-rounded " ng-click="cancel()">关闭</a>' +
                                    '</form>';
                                $scope.change_remark = function () {
                                    if (confirm('确认修改订单备注吗?')) {
                                        widget.ajaxRequest({
                                            url: '/orders/' + (supscope.data.order_id || 0),
                                            method: 'PATCH',
                                            scope: $scope,
                                            data: {remark: $scope.remark},
                                            success: function (json) {
                                                widget.msgToast('修改成功,请刷新查看');
                                                supscope.$parent.$parent.searchAction();
                                                $scope.cancel();
                                            }
                                        })
                                    }
                                }
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: ''
                        });
                    }
                    var content = '<a class="btn btn-primary btn-rounded btn-sm" ng-click="show_order_change_remark();">修改订单备注</a>';
                    $element.find('.order-change-remark').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
})
;
