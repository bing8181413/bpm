// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('verifyController', verifyController);

    verifyController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$stateParams']
    function verifyController($scope, $http, $rootScope, $modal, $stateParams) {
        $scope.verifyStatus = $stateParams.verifyStatus || 1;
        $scope.list_param = {page: 1, count: 20, verify_status: $scope.verifyStatus};
        var list_url = simpleCons.domain + '/manage/user/verify/list';
        $scope.getapi = function (page) {
            $scope.list_param.keyword = $rootScope.search;
            $scope.list_param.page = page || $scope.list_param.page;
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.user_list = json.data.list;
                        $scope.totalItems = json.data.count;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    } else {
                        $scope.addAlert(json.msg);
                    }
                });
        }
        $scope.getapi(1);
        $rootScope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }
        var update_url = simpleCons.domain + '/manage/user/verify/update';
        $scope.update = function (user, verify_status, index) {
            if (!confirm('确定要修改这个状态吗？')) {
                return false;
            }
            $scope.verifyUpdate_param = {
                apply_id: user.apply_id,
                verify_status: verify_status
            };
            $http.post(
                update_url,
                $scope.verifyUpdate_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('状态更新成功！！');
                        $scope.user_list[index].verify_status = verify_status;
                    } else {
                        alert(data.msg);
                    }
                });

        }

        $scope.alerts = [
            //{ msg: '用户名或者密码不正确'  }
        ];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        $scope.addAlert = function (msg, type) {
            $scope.alerts = [];
            $scope.alerts.push({msg: msg, type: type});
        };
    };
});
