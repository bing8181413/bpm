// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('account.updateController', updateController);
    mod.controller('account.profileController', profileController);

    updateController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    profileController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    function profileController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter, $timeout) {
        $scope.param = {};
        $scope.openCitys = [];
        // if ($rootScope.hjm.pubData.open_citys) {
        //     angular.forEach($rootScope.hjm.pubData.open_citys, function (val, key) {
        //         $scope.openCitys.push({text: val, value: val});
        //     });
        // }
        $timeout(function () {
            $scope.param = {
                account_id: $rootScope.hjm.account_id,
                username: $rootScope.hjm.username,
                mobile: $rootScope.hjm.mobile,
                remark: $rootScope.hjm.remark,
                userpass: $rootScope.hjm.pwd,
            }
            // console.log($scope.param);
        }, 0);

        $scope.aaa = function () {
            console.log('$scope.param', $scope.param);
        }
        $scope.submit = function (status) {
            $scope.param.password = $scope.param.userpass;
            widget.ajaxRequest({
                url: '/account/' + $rootScope.hjm.account_id,
                method: 'PUT',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    $rootScope.hjm.mobile = json.data.mobile;
                    $rootScope.hjm.remark = json.data.remark;
                    $rootScope.selected.mobile = json.data.mobile;
                    $rootScope.selected.remark = json.data.remark;
                    widget.msgToast('更新成功！');
                    $state.go(con.state.main + '.account.list');
                }
            })
        }
    };

    function updateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter, $timeout) {
        $scope.param = {};
        $scope.openCitys = [];
        if ($rootScope.hjm.pubData.open_citys) {
            angular.forEach($rootScope.hjm.pubData.open_citys, function (val, key) {
                $scope.openCitys.push({text: val, value: val});
            });
        }
        // console.log($scope.openCitys);
        $timeout(function () {
            if ($stateParams.account_id && $rootScope.account_obj) {
                if ($stateParams.account_id == $rootScope.account_obj.account_id) {
                    $scope.param = $rootScope.account_obj;
                    $scope.param.city_list = $scope.param.city_list.split(',');
                    // console.log($scope.param);
                }
            } else if ($stateParams.account_id) {
                $state.go(con.state.main + '.account.list');
            }
        }, 0);

        $scope.aaa = function () {
            console.log('$scope.param', $scope.param);
        }
        $scope.submit = function (status) {
            $scope.param.city_list = $scope.param.city_list.join(',');
            if ($stateParams.account_id && $rootScope.account_obj) {
                $scope.param.userpass = $scope.userpass;
                $scope.param.password = $scope.userpass;
            }
            widget.ajaxRequest({
                url: '/accounts' + ($stateParams.account_id ? ('/' + $stateParams.account_id) : ''),
                method: $stateParams.account_id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.account.list');
                }
            })
        }
    };
});
