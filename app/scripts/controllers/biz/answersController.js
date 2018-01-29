// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('answers.answersController', answersController)

    answersController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$templateCache', '$q', 'question'];

    function answersController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $templateCache, $q, question) {
        $scope.question = question;
        $scope.searchItem = {};
        $scope.init = function () {
            if (!($scope.searchItem.start_time && $scope.searchItem.end_time || !$scope.searchItem.start_time && !$scope.searchItem.end_time)) {
                widget.msgToast('开始和结束时间必须同时存在才能查询', 2000);
                return false;
            }
            angular.extend($scope.searchItem, {
                page: $scope.currentPage || 1,
                count: 20,
                question_id: question.question_id || ''
            });
            widget.ajaxRequest({
                url: con.live_domain + '/live/answers',
                method: 'get',
                scope: $scope,
                data: $scope.searchItem,
                success: function (json) {
                    $scope.totalItems = json.total;
                    $scope.data = json.data;
                }
            })
        }
        $scope.init();

        $scope.$watch('searchItem', function (val, old_val) {
            if (val != old_val) {
                if (old_val.role_type != undefined && val.role_type != old_val.role_type || old_val.status != undefined && val.status != old_val.status) {
                    $scope.init();
                }
            }
        }, true);

        $scope.selected = function (type) {
            if (type == 'all') {
                $scope.data.forEach(function (val, key) {
                    val.checked = true;
                });
            } else if (type == 'reverse') {
                $scope.data.forEach(function (val, key) {
                    val.checked = false;
                });
            }
        }
        $scope.audit = function (status) {
            var selected_array = [];
            $scope.data.forEach(function (val, key) {
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
                    url: con.live_domain + '/live/answerstatus',
                    method: 'put',
                    scope: $scope,
                    data: {
                        ids: selected_array,
                        status: status
                    },
                    success: function (json) {
                        widget.msgToast('审核完成!');
                        angular.forEach($scope.data, function (val, key) {
                            var someResult = selected_array.some(function (item, index) {
                                return item == val.id;
                            });
                            if (someResult) {
                                val.status = status;
                            }
                        })
                    }
                })
            }

        }
    }

});
