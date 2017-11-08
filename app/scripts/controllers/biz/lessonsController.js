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
                data: {page: 1, count: 1000},//草稿状态的列表
                success: function (json) {
                    $scope.mission_edit_status = [];//草稿
                    $scope.mission_online_status = [];// 上线
                    $scope.max_order_by = 0;
                    angular.forEach(json.data, function (val, key) {
                        if (val.status == 1) {
                            $scope.mission_online_status.push(val);
                            $scope.max_order_by = (Number.parseInt(val.order_by) && Number.parseInt($scope.max_order_by) > Number.parseInt(val.order_by)) ? $scope.max_order_by : val.order_by;
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
                    // $scope.search_product_id();
                }
            })
        } else {
            $scope.param = {};
        }
        // 临时变量存放
        $scope._tmp_ = {
            options: [], // 已查询出的选项
            options_selected: []  // 当前已选的变量
        };

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


        $scope.verify_product = function (product_id) {
            if (product_id) {
                return true;
            } else {
                return '请输入活动ID!!';
            }
        }
        $scope.add_product = function (json) {
            if (json.code == 0) {
                $scope._tmp_.options = [];
                angular.forEach(json.data, function (val, key) {
                    $scope._tmp_.options.push({
                        option: {
                            option_type: val.option_type,
                            option_status: val.option_status,
                            option_name: val.option_name
                        },
                        option_id: val.option_id,
                        product_id: val.product_id,
                        text: val.option_name + '(' + $filter('product_option_status')(val.option_status) + ')',
                        value: val.option_id
                    });
                })
                $scope._tmp_.options_selected = [];
                angular.forEach($scope.param.products, function (val, key) {
                    if (val.option_id) {
                        angular.forEach($scope._tmp_.options, function (_tmp_options_val, _tmp_options_key) {
                            if (val.option_id == _tmp_options_val.option_id) {
                                $scope._tmp_.options_selected.push(_tmp_options_val.option_id);
                                // _tmp_options_val.id = val.id;
                            }
                        });
                    }
                });
            }
        }
        $scope.update_option = function () {
            angular.forEach($scope._tmp_.options, function (_tmp_option_val, _tmp_option_key) {
                if (('|' + $scope._tmp_.options_selected.join('|') + '|').indexOf('|' + _tmp_option_val.option_id + '|') > -1) {
                    if ($filter('arraySub2String')($scope.param.products, 'option_id').indexOf(_tmp_option_val.option_id) == -1) {
                        //已选中  未在param.products列表
                        console.log(1);
                        $scope.param.products.push(_tmp_option_val);
                    } else {
                        //已选中  已在param.products列表
                        console.log(2);
                    }
                } else {
                    if ($filter('arraySub2String')($scope.param.products, 'option_id').indexOf(_tmp_option_val.option_id) > -1) {
                        //未选中  已在param.products列表
                        console.log(3);
                        var tmp_index = 0;
                        angular.forEach($scope.param.products, function (options, options_key) {
                            if (_tmp_option_val.option_id == options.option_id) {
                                tmp_index = options_key;
                            }
                        });
                        $scope.param.products.splice(tmp_index, 1);
                    } else {
                        //未选中  未在param.products列表
                        console.log(4);
                    }
                }
            });
        }
        $scope.$watch('param.products', function (products) {
            if (products) {
                // $scope.update_option();
            } else {
                // console.log('还没有products');
            }
        }, true)
        $scope.$watch('_tmp_', function (options_val, old_options_val) {
            var diff = $filter('arraySub2String')(options_val.options, 'option_id') + '???' + $filter('arraySub2String')(old_options_val.options, 'option_id');
            // console.log(0, diff);
            if ($filter('arraySub2String')(options_val.options, 'option_id') == $filter('arraySub2String')(old_options_val.options, 'option_id')) {
                // console.log('ok', options_val, old_options_val);
                $scope.update_option();
            } else {
                // console.log('diff', options_val, old_options_val);
                angular.forEach(options_val.options, function (tmp_options, tmp_options_key) {
                    angular.forEach($scope.param.products, function (options, options_key) {
                        if (tmp_options.option_id == options.option_id) {
                            $scope._tmp_.options_selected.push(tmp_options.option_id);
                        }
                    });
                });

            }
        }, true)


        // // 查询活动ID
        // var search_product_time = 0;
        // $scope.search_product_id = function () {
        //     search_product_time++;
        //     if (!$scope.product_id) {
        //         if (search_product_time > 1) {
        //             widget.msgToast('没有活动ID');
        //         }
        //         return false;
        //     }
        //     widget.ajaxRequest({
        //         url: '/lessons_options',
        //         method: 'GET',
        //         data: {product_id: $scope.product_id},
        //         success: function (json) {
        //             if (json.data.length > 0) {
        //                 if ($stateParams.lesson_id) {
        //                     angular.forEach(json.data, function (val, key) {
        //                         if (val.lesson_id != 0 && val.lesson_id != $stateParams.lesson_id) {
        //                             val.disabled = true;
        //                             val.selected = true;
        //                         } else {
        //                             angular.forEach($scope.param.products, function (v, k) {
        //                                 if (val.option_id == v.option_id) {
        //                                     val.selected = true;
        //                                     val.id = v.id;
        //                                 }
        //                             });
        //                         }
        //                     });
        //                 }
        //                 $scope.products = json.data;
        //             } else {
        //                 widget.msgToast('未找到符合要求的活动');
        //             }
        //         }
        //     })
        // }
        //
        // $scope.updateSelection = function ($event, index) {
        //     var checkbox = $event.target;
        //     var checked = checkbox.checked;
        //     if (checked) {
        //         $scope.products[index].selected = true;
        //     } else {
        //         $scope.products[index].selected = false;
        //     }
        // };
        $scope.submit = function (status) {
            // console.log($scope.param);

            //组装 param.options start
            // $scope.param.products = [];
            // angular.forEach($scope.products, function (val, key) {
            //     if (val.selected && !val.disabled) {
            //         $scope.param.products.push({
            //             id: val.id || undefined,
            //             product_id: val.product_id,
            //             option_id: val.option_id,
            //         });
            //     }
            // });
            //组装 param.options end

            var err_schedules = false;
            if (comfunc.isEmptyArray($scope.param.schedules)) {
                widget.msgToast('每周任务发布时间没有添加,赶紧添加一下吧。');
                return false;
            }
            angular.forEach($scope.param.schedules, function (val, key) {
                if (!val.week && val.week !== 0 || !val.hour && val.hour !== 0 || !val.minute && val.minute !== 0) {
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
