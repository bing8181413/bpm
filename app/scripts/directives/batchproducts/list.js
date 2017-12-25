define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('batchproductsAdd', function ($templateCache, $filter, $compile, widget, $state, $rootScope, $uibModal) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: '<span class="btn btn-rounded btn-success btn-sm pull-right" ng-click="show();">新增母活动</span>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '新增母活动';
                                    $scope.param = {parent_id: '', sync_base: 2};
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate>' +
                                        '<div form-search text="查询添加活动ID" verify="true" btn-text="添加活动ID" ' +
                                        'ajax-config="{method:\'get\',url:$root.common.domain+\'/products/\'+produce_id}" ' +
                                        'ng-model="produce_id" callback="add_parent_id(json)"></div>' +
                                        '<div form-input text="活动ID" ng-model="param.parent_id" required="true" ng-disabled="true" ></div>' +
                                        '<div form-radio text="同步商品基数" ng-model="param.sync_base" type="number" required="true" source="[{text:\'同步\',value:\'1\'},{text:\'不同步\',value:\'2\'}]"></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right"  ng-disabled="FormBody.$invalid" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $scope.add_parent_id = function (json) {
                                        if (json.code == 0) {
                                            $scope.param.parent_id = json.data.product_id;
                                        } else {
                                            $scope.param.parent_id = '';
                                            widget.msgToast('没有对应的活动ID');
                                        }
                                    }
                                    $scope.submit = function () {
                                        widget.ajaxRequest({
                                            url: '/product/parent',
                                            method: 'POST',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                widget.msgToast('添加母活动成功!');
                                                supscope.$parent.searchAction();
                                                $scope.cancel();
                                            }
                                        })
                                    }
                                    $scope.cancel = function () {
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg'
                            }
                        );
                    }
                }
            }
        })
        .directive('batchproductsUpdate', function ($templateCache, $filter, $compile, widget, $state, $rootScope, $uibModal) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: '<span class="btn btn-rounded btn-success btn-sm" ng-click="show();">编辑关联参数</span>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '新增母活动';
                                    // $scope.param = {parent_id: supscope.data.parent_id, sync_base: supscope.data.sync_base};
                                    $scope.param = supscope.data;
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate>' +
                                        '<div form-input text="活动ID" ng-model="param.parent_id" required="true" ng-disabled="true" ></div>' +
                                        '<div form-radio text="同步商品基数" ng-model="param.sync_base" type="number" required="true" source="[{text:\'同步\',value:\'1\'},{text:\'不同步\',value:\'2\'}]"></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right"  ng-disabled="FormBody.$invalid" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $scope.submit = function () {
                                        widget.ajaxRequest({
                                            url: '/product/parent/' + supscope.data.id,
                                            method: 'PUT',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                widget.msgToast('修改母活动成功!');
                                                supscope.$parent.searchAction();
                                                $scope.cancel();
                                            }
                                        })
                                    }
                                    $scope.cancel = function () {
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg'
                            }
                        );
                    }
                }
            }
        })
        .directive('productSonAdd', function ($templateCache, $filter, $compile, widget, $state, $rootScope, $uibModal) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: '<p><a class="btn btn-rounded btn-success btn-sm" ng-click="show();">添加子活动</a></p>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '添加子活动';
                                    $scope.param = {parent_id: supscope.data.parent_id};
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate>' +
                                        '<div form-search text="查询添加活动ID" verify="true" btn-text="添加活动ID" ' +
                                        'ajax-config="{method:\'get\',url:$root.common.domain+\'/products/\'+produce_id}" ' +
                                        'ng-model="produce_id" callback="add_son_id(json)"></div>' +
                                        '<div form-input text="活动ID" ng-model="param.son_id" required="true" ng-disabled="true" ></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right"  ng-disabled="FormBody.$invalid" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $scope.add_son_id = function (json) {
                                        if (json.code == 0) {
                                            $scope.param.son_id = json.data.product_id;
                                        } else {
                                            $scope.param.son_id = '';
                                            widget.msgToast('没有对应的活动ID');
                                        }
                                    }
                                    $scope.submit = function () {
                                        widget.ajaxRequest({
                                            url: '/product/son',
                                            method: 'POST',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                widget.msgToast('添加子活动成功!');
                                                supscope.$parent.searchAction();
                                                $scope.cancel();
                                            }
                                        })
                                    }
                                    $scope.cancel = function () {
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg'
                            }
                        );
                    }
                }
            }
        })
        .directive('productCover', function ($templateCache, $filter, $compile, widget, $state, $rootScope, $uibModal) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: '<p><a class="btn btn-rounded btn-success btn-sm" ng-click="show();">覆盖所有子活动</a></p>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '覆盖所有子活动';
                                    $scope.param = {parent_id: supscope.data.parent_id};
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate>' +
                                        '<h4 class="col-sm-offset-2 text-danger">请选择以下项目覆盖全部活动</h4>' +
                                        '<div form-checkbox text="覆盖内容" type="radio" ng-model="param.covers" required="true" ' +
                                        'default="1" source="[{text:\'课程详情\',value:\'1\'},{text:\'基本信息\',value:\'2\'},{text:\'礼包信息\',value:\'3\'}]" ' +
                                        'source-api=""></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right"  ng-disabled="FormBody.$invalid" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $scope.submit = function () {
                                        if ($scope.param.covers.length == 0) {
                                            widget.msgToast('你想覆盖什么?');
                                            return false;
                                        }
                                        widget.ajaxRequest({
                                            url: '/product/cover',
                                            method: 'put',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                widget.msgToast('覆盖所有子活动成功!');
                                                supscope.$parent.searchAction();
                                                $scope.cancel();
                                            }
                                        })
                                    }
                                    $scope.cancel = function () {
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg'
                            }
                        );
                    }
                }
            }
        })
        .directive('batchproductsDel', function ($templateCache, $filter, $compile, widget, $state, $rootScope, $uibModal) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: '<p><a class="btn btn-rounded btn-danger btn-sm" ng-click="show();">删除</a></p>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show = function () {
                        if (confirm('确定要删除这个母活动及与其相关子活动关系吗?')) {
                            widget.ajaxRequest({
                                url: '/product/batchproducts/' + $scope.data.parent_id,
                                method: 'delete',
                                scope: $scope,
                                data: {},
                                success: function (json) {
                                    widget.msgToast('删除母活动成功!');
                                    supscope.$parent.searchAction();
                                }
                            })
                        }
                    }
                }
            }
        })
        .directive('productSonDel', function ($templateCache, $filter, $compile, widget, $state, $rootScope, $uibModal) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: '<p><a class="btn btn-rounded btn-danger btn-sm" ng-click="show();">取消覆盖</a></p>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show = function () {
                        if (confirm('确定要取消覆盖这个子活动吗?')) {
                            widget.ajaxRequest({
                                url: '/product/sons/' + $scope.data.id,
                                method: 'delete',
                                scope: $scope,
                                data: {},
                                success: function (json) {
                                    widget.msgToast('取消覆盖成功!');
                                    supscope.$parent.searchAction();
                                }
                            })
                        }
                    }
                }
            }
        })
        .directive('productSonEdit', function ($templateCache, $filter, $compile, widget, $state, $rootScope) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p><a class="btn btn-rounded btn-primary btn-sm" ng-click="go();">编辑活动</a></p>',
                link: function ($scope, $element, $attrs) {
                    $scope.go = function () {
                        $scope.$parent.$parent.$parent.cancel();
                        $state.go(simpleCons.state.main + '.act.update', {product_id: $scope.data.product_id});
                    }
                }
            }
        })
});
