// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons',
], function(mod, con) {
    mod.controller('questions.questionsController', questionsController);

    questionsController.$injector = [
        '$scope',
        '$http',
        '$rootScope',
        '$uibModal',
        '$state',
        '$stateParams',
        'widget',
        '$filter',
        '$templateCache',
        '$q',
        'is_modal',
    ];

    function questionsController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $templateCache, $q, resolve_data) {
        $scope.is_modal = resolve_data.is_modal;//有2个页面同事使用的controller 需要区分重复  传入resolve对象
        $scope.is_modal_room_id = resolve_data.room_id;
        console.log(resolve_data);
        $scope.searchItem = {room_id: resolve_data && resolve_data.room_id || null};
        $scope.init = function(page) {
            if (!($scope.searchItem.start_time && $scope.searchItem.end_time || !$scope.searchItem.start_time && !$scope.searchItem.end_time)) {
                widget.msgToast('开始和结束时间必须同时存在才能查询', 2000);
                return false;
            }
            $scope.currentPage = page || $scope.currentPage || 1;
            angular.extend($scope.searchItem,
                {
                    page: $scope.currentPage,
                    count: 20,
                    order_by: $scope.is_modal && 'on_top',
                    // room_id: $scope.is_modal && $scope.is_modal_room_id || $scope.searchItem.room_id || null,
                });
            widget.ajaxRequest({
                url: con.live_domain + '/live/questions',
                method: 'get',
                scope: $scope,
                data: $scope.searchItem,
                success: function(json) {
                    $scope.totalItems = json.total;
                    $scope.data = json.data;
                },
            });
        };
        $scope.init();

        $scope.$watch('searchItem', function(val, old_val) {
            if (val != old_val) {
                if (old_val.role_type != undefined && val.role_type != old_val.role_type || old_val.status != undefined && val.status != old_val.status) {
                    $scope.init();
                }
            }
        }, true);

        $scope.selected = function(type) {
            if (type == 'all') {
                $scope.data.forEach(function(val, key) {
                    val.checked = true;
                });
            } else if (type == 'cancel') {
                $scope.data.forEach(function(val, key) {
                    val.checked = false;
                });
            } else if (type == 'reverse') {
                $scope.data.forEach(function(val, key) {
                    val.checked = !val.checked;
                });
            }
        };
        $scope.on_top = function(item, index) {
            if (confirm(' ' + (item.on_top == 1 ? '取消置顶' : '置顶') + ' 吗?')) {
                widget.ajaxRequest({
                    url: con.live_domain + '/live/questions/' + ($scope.is_modal && item.id) + '/ontop/' + (item.on_top == 1 ? 0 : 1),
                    method: 'put',
                    scope: $scope,
                    data: {},
                    success: function(json) {
                        if (json.code == 0) {
                            $scope.init(1);
                            widget.msgToast('修改成功!');
                        }
                    },
                });
            }
        };
        $scope.audit = function(status) {
            var selected_array = [];
            $scope.data.forEach(function(val, key) {
                if (val.checked) {
                    selected_array.push(val.id);
                }
            });
            if (selected_array.length == 0) {
                widget.msgToast('未选择任何数据');
                return false;
            }
            if (confirm('确认审核' + (status == 2 ? '通过' : '不通过') + '?')) {
                widget.ajaxRequest({
                    url: con.live_domain + '/live/questionstatus',
                    method: 'put',
                    scope: $scope,
                    data: {
                        ids: selected_array,
                        status: status,
                    },
                    success: function(json) {
                        widget.msgToast('审核完成!');
                        angular.forEach($scope.data, function(val, key) {
                            var someResult = selected_array.some(function(item, index) {
                                return item == val.id;
                            });
                            if (someResult) {
                                val.status = status;
                            }
                        });
                    },
                });
            }
        };

        $scope.open_answer = function(item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/' + con.live_path + 'answers/answers.html',
                controller: 'answers.answersController',
                resolve: {
                    question: function() {
                        item.question_id = item.id;
                        return item;
                    },
                },
                size: 'lg',
            });

        };
    }
});
