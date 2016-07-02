// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('orderController', orderController);

    orderController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$stateParams', '$state'];
    function orderController($scope, $http, $rootScope, $modal, $stateParams) {
        $scope.list_param = {page: 1, count: 20, order_status:[3,5]};
        $scope.list_param.keyword = $rootScope.search;
        var list_url = simpleCons.domain + '/manage/order/list';
        $scope.getapi = function (page) {
            $scope.list_param.keyword = $rootScope.search;
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.order_list = json.data.list;
                        $scope.totalItems = json.data.count;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = page ? page : $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    } else {
                        alert(json.msg);
                    }
                }).error(function (err,status,sss) {
                    console.log(err,status,sss);
                    //$scope.getapi();
                });
        }
        $scope.getapi(1);
        $rootScope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }
    };
});
