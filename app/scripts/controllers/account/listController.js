// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('account.listController', listController);

    listController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function listController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        var sup_scope = $scope;
        $scope.pubdata = '';
        $scope.init_param = angular.extend({}, simpleCons.default_param);
        $scope.init_param.keyword = $rootScope.search;
        $scope.init_url = simpleCons.domain + '/manage/account/list';
        $scope.getapi = function (page) {
            $rootScope.loading = true;
            $scope.init_param.page = page ? page : $scope.init_param.page;
            $scope.init_param.keyword = $rootScope.search || '';
            $http.post($scope.init_url, $scope.init_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.list = json.data.account_list;
                        $scope.totalItems = json.data.account_count;
                        $scope.itemsPerPage = $scope.init_param.count;
                        $scope.currentPage = page ? page : $scope.init_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                        $rootScope.loading = false;
                    } else {
                        widget.msgToast(json.msg);
                        $rootScope.loading = false;
                    }
                });
        }
        $scope.getapi(1);
        $scope.redirect2update = function (item) {
            if ($rootScope.hjm) {
                $rootScope.hjm.account_update_obj = item;
            } else {
                $rootScope.hjm = {account_obj: item};
            }
            $state.go('account.update', {account_id: item.account_id})
        }
        $scope.resetpwd = function (account_id) {
            var pwd = window.prompt("请在此输入新密码", "123456");
            if (pwd) {
                $http.post(simpleCons.api.update_account, {
                    account_id: account_id,
                    userpass: pwd,
                    password: pwd
                })
                    .success(function (json) {
                        if (json.code == 0) {
                            widget.msgToast('更新密码成功！');
                        } else {
                            widget.msgToast(json.msg);
                        }
                    });
            }
        }

    };
});
