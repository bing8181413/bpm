// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('surveyList.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$timeout'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $timeout) {
        $scope.init = function () {
            widget.ajaxRequest({
                url: '/surveys/lists/',
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.param = angular.copy(json.data);
                }
            })
        }
        $scope.init();

        $scope.$watch('param', function (lists) {
            angular.forEach(lists, function (val, key) {
                val.order_by = key + 1;
            })
        }, true);

        $scope.del = function (index) {
            if (!confirm('确认要删除吗?')) {
                return false;
            }
            $scope.param.splice(index, 1);
        }
        $scope.update = function (update_index) {
            $scope.add(update_index);
        }
        $scope.add = function (update_index) {
            var supscope = $scope;
            var modalInstance = $uibModal.open({
                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                controller: function ($scope, $uibModalInstance) {
                    if (update_index || update_index == 0) {
                        // console.log(update_index, supscope.param[update_index]);
                        $scope.param = {
                            plan_id: supscope.param[update_index].plan_id,
                            plan_name: supscope.param[update_index].name
                        };
                    } else {
                        $scope.param = {};
                    }
                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate>' +
                        '<div class="form-group">' +
                        '    <label class="col-sm-2 control-label">对应测评ID' +
                        '    <span class="form_label_dangus">*</span></label>' +
                        '    <div class="col-sm-2">' +
                        '    <input class="form-control" ng-model="param.plan_id" required>' +
                        '</div>' +
                        '<div class="col-sm-1">' +
                        '    <a class="btn btn-primary btn-rounded" ng-click="search_plan_id()">查询</a>' +
                        '    </div>' +
                        '    <div class="col-sm-5">' +
                        '    <input class="form-control" ng-model="param.plan_name" ng-disabled="true"' +
                        'placeholder="点击查询确认测评存在" required>' +
                        '</div>' +
                        '</div>' +
                        '<a class="btn btn-primary btn-rounded pull-right " ng-click="submit()">确定</a>' +
                        '</form>';
                    $scope.title = '添加测评';
                    $scope.search_plan_id = function () {
                        if (!$scope.param.plan_id) {
                            widget.msgToast('测评ID未填写');
                            return false;
                        }
                        widget.ajaxRequest({
                            url: '/surveys/plans/' + $scope.param.plan_id,
                            method: 'get',
                            scope: $scope,
                            data: {},
                            success: function (json) {
                                $scope.param.plan_name = json.data.name;
                            }
                        })
                    }
                    $scope.submit = function () {
                        if (!$scope.param.plan_id || !$scope.param.plan_name) {
                            widget.msgToast('测评ID或名称未填写完整');
                            return false;
                        }
                        supscope.param.splice(
                            (update_index || update_index == 0) ? update_index : 0,
                            (update_index || update_index == 0) ? 1 : 0,
                            {
                                plan_id: $scope.param.plan_id,
                                order_by: undefined,
                                plan: {
                                    id: $scope.param.plan_id,
                                    name: $scope.param.plan_name
                                }
                            });
                        $scope.cancel();
                    }
                    $scope.$watch('param.plan_id', function (val) {
                        $scope.param.plan_name = '';
                    });
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                size: 'lg'
            });
        }
        $scope.submit = function (status) {
            if (!confirm('确认要提交此次更新吗?')) {
                return false;
            }
            widget.ajaxRequest({
                url: '/surveys/lists',
                method: 'PUT',
                scope: $scope,
                data: {items: $scope.param},
                success: function (json) {
                    widget.msgToast('更新成功！', 500);
                    $scope.init();
                },
                failure: function (err) {
                    widget.msgToast(err.message + '\n点击取消', 2000);
                }
            })
        }
    };
});
