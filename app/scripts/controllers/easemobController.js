// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('easemobController', easemobController);
    easemobController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state'];
    function easemobController($scope, $http, $modal, FileUploader, $stateParams, $state) {
        $scope.user_id = 'hx_100036';
        $scope.search = function () {
            if (!$scope.user_id) {
                alert('还没有填写user_id');
                return false;
            }
            $http({
                url: simpleCons.domain_noauth + '/v1/user/profile',
                method: "POST",
                headers: {
                    Authorization: 'Basic MTg4MDAwMDAwMDA6cHdkX2QxZTQzMmE5MWM2MWU3MzA0OTRiZjBjNGE4OTMwY2Zj'
                },
                data: {user_id: $scope.user_id}
            })
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.user = json.data.user_info;
                    } else {
                        alert(json.msg);
                    }
                });
        }
        $scope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.search();
        }
    };
});
