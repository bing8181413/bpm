// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('inviteController', inviteController);

    inviteController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$stateParams', '$state'];
    function inviteController($scope, $http, $rootScope, $modal, $stateParams, $state) {
        var parentscope = $scope;
        $scope.list_param = {page: 1, count: 20};
        var list_url = simpleCons.domain + '/manage/market/invitation/list';
        $scope.getapi = function (page) {
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $scope.list_param.keyword = $rootScope.search || '';
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.invite_list = json.data.invitation_list;
                        $scope.totalItems = json.data.invitation_count;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = page ? page : $scope.list_param.page;
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

        $scope.update = function (invite, status, index) {
            //if(!confirm('确定要更新状态吗？')){
            //    return false;
            //}
            var updateinvite_url = simpleCons.domain + '/manage/market/invitation/update';
            if (!invite.invitation_id) {
                alert('没有获取到序号！');
                return false;
            } else {
                $scope.updateinvite_param = {invitation_id: invite.invitation_id, status: status};
                $http.post(updateinvite_url, $scope.updateinvite_param)
                    .success(function (data) {
                        if (data.code == 0) {
                            $scope.invite_list[index].status = status;
                            alert('状态更新成功，刷新页面查看最新状态');
                        } else {
                            alert(data.msg);
                        }
                    });
            }
        }
        $scope.addinvite = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addinvite.html',
                controller: function ($scope, $http, $modalInstance) {
                    $scope.addinvite = {};
                    $scope.addinvite_param = {invite_code: '', channel: ''};
                    $scope.ok = function () {
                        if ($scope.addinvite_param.channel == '') {
                            $scope.addinvite.channel = 1;
                            $scope.addAlert('用途，渠道描述未填写');
                        } else {
                            $rootScope.loading = true;
                            var addinvite_url = simpleCons.domain + '/manage/market/invitation/post';
                            $http.post(addinvite_url, $scope.addinvite_param)
                                .success(function (data) {
                                    $rootScope.loading = false;
                                    if (data.code == 0) {
                                        parentscope.getapi(1);
                                        alert('发布成功，刷新页面查看更新的数据');
                                        $modalInstance.close('OK');
                                    } else {
                                        alert(data.msg);
                                    }
                                });
                        }
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
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
                },
                size: ''
            });
        }

        $scope.user_list = function (invite_code, index) {
            var modalInstance = $modal.open({
                templateUrl: 'user_list.html',
                controller: function ($scope, $modalInstance) {
                    var sup_index = index;
                    $scope.invite_code = invite_code;
                    $scope.list_param = {page: 1, count: 20};
                    var couponinfo_url = simpleCons.domain + '/manage/market/invitation/users';
                    $scope.getapi = function (page) {
                        $http.post(couponinfo_url, {
                            invite_code: $scope.invite_code,
                            count: $scope.list_param.count,
                            page: page || $scope.list_param.page
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    $scope.user_list = json.data.list;
                                    $scope.totalItems = json.data.count;
                                    $scope.itemsPerPage = $scope.list_param.count;
                                    $scope.currentPage = page ? page : $scope.list_param.page;
                                    $scope.maxSize = '5';
                                    $scope.numPages = '';

                                } else {
                                    alert('失败: ' + json.msg);
                                }
                            });
                    }
                    $scope.getapi(1);

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };


                },
                size: 'lg'
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
