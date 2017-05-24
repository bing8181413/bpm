// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('lessons.updateController', updateController)
        .controller('order.updateController', orderController)

    orderController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    function orderController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        if ($stateParams.lesson_id) {
            $scope.lesson_id = $stateParams.lesson_id;
        }
        if ($stateParams.lesson_id) {
            widget.ajaxRequest({
                url: '/lessons/' + $stateParams.lesson_id + '/missions',
                method: 'get',
                scope: $scope,
                data: {},//草稿状态的列表
                success: function (json) {
                    $scope.mission_edit_status = [];//草稿
                    $scope.mission_online_status = [];// 上线
                    $scope.max_order_by = 0;
                    angular.forEach(json.data, function (val, key) {
                        if (val.status == 1) {
                            $scope.mission_online_status.push(val);
                            $scope.max_order_by = (val.order_by && $scope.max_order_by > val.order_by) ? $scope.max_order_by : val.order_by;
                        } else if (val.status == 3) {
                            $scope.mission_edit_status.push(val);
                        }
                    })
                }
            })
        }
        $scope.$watch('mission_edit_status', function (val) {
            angular.forEach(val, function (v, k) {
                v.order_by = comfunc.numAdd($scope.max_order_by, k) + 1;
            })
        }, true);
        $scope.notify = function (mission_id) {
            var superscope = $scope;
            var modalInstance = $uibModal.open({
                    template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                    controller: function ($scope, $uibModalInstance) {
                        $scope.title = '任务修改通知';
                        $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                            '<a class="btn btn-rounded pull-right btn-primary" ' + ' ng-click="submit()">发送通知</a>' +
                            '</form>';
                        $scope.submit = function () {
                            widget.ajaxRequest({
                                url: '/missions/' + mission_id + '/notify',
                                method: 'post',
                                scope: $scope,
                                data: {status: status},
                                success: function (json) {
                                    widget.msgToast('发送成功');
                                    $scope.cancel();
                                },
                                failure: function (json) {
                                    widget.msgToast(json.message);
                                    $scope.cancel();
                                }
                            })
                        }
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    size: 'sm'
                }
            );
        }
        $scope.del = function (index, mission_id) {
            var superscope = $scope;
            var modalInstance = $uibModal.open({
                    template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                    controller: function ($scope, $uibModalInstance) {
                        $scope.title = '删除任务';
                        $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                            '<a class="btn btn-rounded pull-right btn-primary" ' + ' ng-click="submit()">删除</a>' +
                            '</form>';
                        $scope.submit = function () {
                            widget.ajaxRequest({
                                url: '/missions/' + mission_id,
                                method: 'delete',
                                scope: $scope,
                                data: {},
                                success: function (json) {
                                    widget.msgToast('删除任务成功');
                                    superscope.mission_edit_status.splice(index, 1);
                                    $scope.cancel();
                                },
                                failure: function (json) {
                                    widget.msgToast(json.message);
                                    $scope.cancel();
                                }
                            })
                        }
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    size: 'sm'
                }
            );
        }

        $scope.submit = function (status) {
            $scope.status_text = status == 1 ? '上线' : '草稿';
            if (!$scope.mission_edit_status || $scope.mission_edit_status.length == 0) {
                widget.msgToast('没有任何草稿需要上线。')
                return false;
            }
            $scope.param = {missions: [], status: status};
            angular.forEach($scope.mission_edit_status, function (val, key) {
                $scope.param.missions.push({mission_id: val.mission_id, order_by: val.order_by});
            });
            if (status == 1) {
                var superscope = $scope;
                var err_knowledge_count = 0;
                angular.forEach($scope.mission_edit_status, function (val, key) {
                    if (!val.stat_knowledge || val.stat_knowledge.knowledge_count == 0) {
                        err_knowledge_count++;
                    }
                });
                if (err_knowledge_count > 0) {
                    widget.msgToast('有任务下没有添加知识点,不能上线任务。');
                    return false;
                }
                var modalInstance = $uibModal.open({
                    template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                    controller: function ($scope, $uibModalInstance) {
                        $scope.title = '任务上线提醒';
                        $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                            '<h3 class="text-danger">上线后，以上任务顺序将不能再修改，请确定。</h3>' +

                            '<a class="btn btn-rounded pull-right btn-success" ng-click="submit()">上线</a>' +
                            '</form>';
                        $scope.submit = function () {
                            superscope.onsubmit(status);
                            $scope.cancel();
                        }
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    size: ''
                });
            } else {
                $scope.onsubmit();
            }
        }
        $scope.onsubmit = function (status) {
            widget.ajaxRequest({
                url: '/lessons/' + $stateParams.lesson_id + '/missions',
                method: 'PUT',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast($scope.status_text + '保存成功', 1500);
                    if (status == 1) {
                        $state.go(con.state.main + '.lessons.list');
                    }
                },
            })
        }
    };
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        if ($stateParams.lesson_id) {
            widget.ajaxRequest({
                url: '/lessons/' + $stateParams.lesson_id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.param = angular.copy(json.data);
                    $scope.product_id = $scope.param.products[0] && $scope.param.products[0].product_id;
                    $scope.search_product_id();
                }
            })
        } else {
            $scope.param = {};
        }
        $scope.add_schedule = function () {
            if (!$scope.param.schedules) {
                $scope.param.schedules = [];
            }
            $scope.param.schedules.push({
                week: undefined,
                hour: undefined,
                minute: undefined,
                type: 1,
            });
        }
        $scope.del_schedule = function (index) {
            if ($scope.param.schedules) {
                $scope.param.schedules.splice(index, 1);
            }
        }
        // 查询活动ID
        var search_product_time = 0;
        $scope.search_product_id = function () {
            search_product_time++;
            if (!$scope.product_id) {
                if (search_product_time > 1) {
                    widget.msgToast('没有活动ID');
                }
                return false;
            }
            widget.ajaxRequest({
                url: '/lessons_options',
                method: 'GET',
                data: {product_id: $scope.product_id},
                success: function (json) {
                    if (json.data.length > 0) {
                        if ($stateParams.lesson_id) {
                            angular.forEach(json.data, function (val, key) {
                                if (val.lesson_id != 0 && val.lesson_id != $stateParams.lesson_id) {
                                    val.disabled = true;
                                    val.selected = true;
                                } else {
                                    angular.forEach($scope.param.products, function (v, k) {
                                        if (val.option_id == v.option_id) {
                                            val.selected = true;
                                            val.id = v.id;
                                        } else {
                                            val.selected = false;
                                        }
                                    });
                                }
                            });

                        }
                        $scope.products = json.data;
                    } else {
                        widget.msgToast('未找到符合要求的活动');
                    }
                }
            })
        }

        $scope.updateSelection = function ($event, index) {
            var checkbox = $event.target;
            var checked = checkbox.checked;
            if (checked) {
                $scope.products[index].selected = true;
            } else {
                $scope.products[index].selected = false;
            }
        };
        $scope.submit = function (status) {
            // console.log($scope.param);

            //组装 param.options start
            $scope.param.products = [];
            angular.forEach($scope.products, function (val, key) {
                if (val.selected && !val.disabled) {
                    $scope.param.products.push({
                        id: val.id || undefined,
                        product_id: val.product_id,
                        option_id: val.option_id,
                    });
                }
            });
            //组装 param.options end

            var err_schedules = false;
            if (comfunc.isEmptyArray($scope.param.schedules)) {
                widget.msgToast('每周任务发布时间没有添加,赶紧添加一下吧。');
                return false;
            }
            angular.forEach($scope.param.schedules, function (val, key) {
                if (!val.week || !val.hour || !val.minute) {
                    widget.msgToast('每周任务发布时间的第' + (key + 1) + '行没有完成添加,赶紧添加一下吧。');
                    err_schedules = true;
                }
            });
            if (err_schedules) {
                return false;
            }
            // console.log($scope.param);
            // return false;
            widget.ajaxRequest({
                url: '/lessons' + ($stateParams.lesson_id ? ('/' + $stateParams.lesson_id) : ''),
                method: $stateParams.lesson_id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！', 500);
                    $state.go(con.state.main + '.lessons.list');
                },
            })
        }
    };
});
