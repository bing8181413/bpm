// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('answers.updateController', updateController)
        .controller('answers.answersController', answersController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    answersController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$templateCache', '$q'];

    function answersController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $templateCache, $q) {
        $scope.searchItem = {category: 1};
        $scope.init = function () {
            angular.extend($scope.searchItem, {page: $scope.currentPage || 1, count: 20});
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
            if (old_val) {
                $scope.init();
            }
        }, true);

    }

    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: '/answers/' + $stateParams.id,
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
                url: '/answers' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！', 500);
                    $state.go(con.state.main + '.answers.list');
                },
            })
        }
    };
});
