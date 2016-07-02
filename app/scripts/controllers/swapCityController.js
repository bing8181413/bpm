// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('swapCityController', swapCityController);

    swapCityController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function swapCityController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        //console.log($rootScope.hjm);
        $scope.param = {
            current_city_list: $rootScope.hjm.current_city_list,
            current_city_name: $rootScope.hjm.current_city_name
        };
        //console.log($scope.param);
        $scope.save = function () {
            var modify_url = simpleCons.domain + '/manage/account/modify';
            $http.post(modify_url, {city_name: $scope.param.current_city_name})
                .success(function (json) {
                    if (json.code == 0) {
                        alert('更新成功！');
                        $rootScope.logout();
                    } else {
                        widget.msgToast(json.msg);
                    }
                });
        }
    };
});
