// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('questions.updateController', updateController)
        .controller('questions.questionsController', questionsController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    questionsController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$templateCache', '$q'];

    function questionsController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $templateCache, $q) {
        $scope.searchItem = {};
        $scope.init = function () {
            angular.extend($scope.searchItem, {page: $scope.currentPage || 1, count: 20});
            widget.ajaxRequest({
                url: con.live_domain + '/live/questions',
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
                $scope.init();
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
                    url: con.live_domain + '/live/questionstatus',
                    method: 'put',
                    scope: $scope,
                    data: {
                        ids: selected_array,
                        status: status
                    },
                    success: function (json) {
                        widget.msgToast('审核完成!');
                        $scope.init();
                    }
                })
            }

        }
    }

    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: '/questions/' + $stateParams.id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.param = angular.copy(json.data);
                }
            })
        } else {
            $scope.param = {};
        }
        $scope.submit = function (status) {
            // console.log($scope.param);
            // return false;
            widget.ajaxRequest({
                url: '/questions' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！', 500);
                    $state.go(con.state.main + '.questions.list');
                },
            })
        }
    };
});
