define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('groupbuyOrderCopies', function ($templateCache, $filter, $compile, widget, $uibModal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show();" ng-bind="text" ng-show="text"></a>',
                link: function ($scope, $element, $attrs) {
                    $scope.text = (($scope.data.order || {}).count || 0) + '/' + (($scope.data.allorder || {}).count || 0);
                    $scope.ext = {groupbuy_id: $scope.data.groupbuy_id};
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                            template: '<div hjm-grid modid="orderList" config="config_by_groupbuy" columns="columns_by_groupbuy" ext-search="ext"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.ext = supscope.ext;
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
        .directive('groupbuyOrder', function ($templateCache, $filter, $compile) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="txt"></p>',
                link: function ($scope, $element, $attrs) {
                    if ($scope.data) {
                        $scope.txt = ($scope.data.user && $scope.data.user.name) ? ('微信昵称:' + $scope.data.user.name) : '';
                        $scope.txt += ($scope.data.address && $scope.data.address.contact_name ) ? ('<br/>\n联系人:' + $scope.data.address.contact_name) : '';
                        $scope.txt += ($scope.data.address && $scope.data.address.contact_mobile ) ? ('<br/>手机:' + $scope.data.address.contact_mobile) : '';
                        $scope.txt += ($scope.data.address && $scope.data.address.created_at ) ? ('<br/>开团时间<br/>' + $scope.data.address.created_at) : '';
                        $scope.txt += ($scope.data.accomplish_time) ? ('<br/>成团时间<br/>' + $scope.data.accomplish_time) : '';
                        $element.find(".txt").html($scope.txt);
                        $compile($element.contents())($scope);
                    }
                }
            }
        })
        .directive('groupbuyAccomplishStatus', function ($templateCache, $filter, $compile) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="txt"></p>',
                link: function ($scope, $element, $attrs) {
                    $scope.txt = '';
                    if ($scope.data) {
                        switch (Number($scope.data.accomplish_status)) {
                            case 1 :
                                $scope.txt = '<uib-progressbar class="active" value="warning" type="warning">开团</uib-progressbar>';
                                break;
                            case 2 :
                                $scope.txt = '<uib-progressbar class="progress-striped active" value="90" type="primary">进行中</uib-progressbar>';
                                break;
                            case 3 :
                                $scope.txt = '<uib-progressbar class="active" value="success" type="success">已完成</uib-progressbar>';
                                break;
                            case 4 :
                                $scope.txt = '<uib-progressbar class="active" value="warning" type="danger">已取消</uib-progressbar>';
                                break;
                        }
                        $element.find(".txt").html($scope.txt);
                        $compile($element.contents())($scope);
                    }
                }
            }
        })
        .directive('groupbuyChange', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-sm btn-warning" ng-click="show_groupbuy_change()" ng-disabled="data.accomplish_status != 2">修改成团人数结束时间</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_groupbuy_change = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '修改成团人数结束时间';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate' +
                                        ' disabled-role="\'admin,op\'" >' +
                                        '<div form-input text="ID" ng-model="param.groupbuy_id" ng-disabled="true"></div>' +
                                        '<div form-date-time text="拼团结束时间" ng-model="param.group_end_time"></div>' +
                                        '<div form-input text="拼团人数" ng-model="param.group_min_num"></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $timeout(function () {
                                        $scope.param = supscope.data;
                                        // console.log($scope.param);
                                    }, 0);
                                    $scope.submit = function () {
                                        // console.log($scope);
                                        if (!confirm('确认要修改成团人数结束时间吗?')) {
                                            return false;
                                        }
                                        var paramJson = {
                                            "groupbuy_id": $scope.param.groupbuy_id,
                                            "group_end_time": $scope.param.group_end_time,
                                            "group_min_num": $scope.param.group_min_num
                                        };
                                        widget.ajaxRequest({
                                            url: '/groupbuys',
                                            method: 'PUT',
                                            scope: $scope,
                                            data: paramJson,
                                            success: function (json) {
                                                widget.msgToast('修改成团人数结束时间成功!');
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

});
