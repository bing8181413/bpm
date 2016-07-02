// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('smsinviteController', smsinviteController)
        .controller('smsinviteAddController', smsinviteAddController)

    smsinviteController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$stateParams', '$state'];
    smsinviteAddController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$stateParams', '$state', '$filter'];
    function smsinviteController($scope, $http, $rootScope, $modal, $stateParams) {
        var sup_scope = $scope;
        $scope.list_param = {page: 1, count: 20};
        $scope.list_param.keyword = $scope.search;
        var list_url = simpleCons.domain + '/manage/market/sms_invite/list';
        $scope.getapi = function (page) {
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.smsinvite_list = json.data.list;
                        $scope.totalItems = json.data.total;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = page ? page : $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    } else {
                        alert(json.msg);
                    }
                }).error(function (err, status, sss) {
                    //$scope.getapi();
                });
        }
        $scope.getapi(1);
        $rootScope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }

        $scope.add = function () {
            var modalInstance = $modal.open({
                templateUrl: 'add.html',
                controller: function ($scope, $modalInstance) {
                    $scope.add_param = {remark: ''};
                    var add_url = simpleCons.domain + '/manage/market/sms_invite/post';
                    $scope.ok = function () {
                        $rootScope.loading = true;
                        $http.post(add_url, $scope.add_param)
                            .success(function (json) {
                                if (json.code == 0) {
                                    $rootScope.loading = false;
                                    alert('恭喜你验证码有了,4小时后作废哦！');
                                    sup_scope.getapi(1);
                                    $modalInstance.dismiss('cancel');
                                } else {
                                    $rootScope.loading = false;
                                    alert('失败: ' + json.msg);
                                }
                            }).error(function (json) {
                                console.log('err : 调用失败！');
                                $rootScope.loading = false;
                            });
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: 'sm'
            });
        }
    };

    function smsinviteAddController($scope, $http, $rootScope, $modal, $stateParams, $filter) {
// 提交的参数
        $scope.smsinviteadd_param = {
            title: '',
            price: 3,
            scope_type: 3,
            mobile_list: '',
            send_time: new Date(),
            is_timing: 0,
            is_marketing: '0',
            nofity_content: ''

        };
        $scope.save = function () {
            console.log($scope.smsinviteadd_param);
            $scope.smsinviteadd_param.send_time = $filter('date')($scope.smsinviteadd_param.send_time, 'yyyy-MM-dd HH:mm:ss');
            if (!$scope.smsinviteadd_param.content || $scope.smsinviteadd_param.content == '') {
                alert('请填写短信内容');
                return false;
            }
            $scope.smsinviteadd_param.mobile_list = $scope.smsinviteadd_param.mobile_list.replace(/，/g, ',');
            if ($scope.smsinviteadd_param.scope_type == 3 && (!$scope.smsinviteadd_param.mobile_list || $scope.smsinviteadd_param.mobile_list == '')) {
                alert('请填写发送用户的手机号码列表');
                return false;
            }
            if ($scope.smsinviteadd_param.is_marketing == 1 && $scope.smsinviteadd_param.scope_type == 3) {
                if ($scope.smsinviteadd_param.mobile_list.split(',').length <= 10) {
                    alert('营销短信必须发送10条以上');
                    return false;
                }
            }
            var add_url = simpleCons.domain + '/manage/market/smsinvite/add';
            $rootScope.loading = true;
            $http.post(add_url, $scope.smsinviteadd_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $rootScope.loading = false;
                        alert('成功！');
                    } else {
                        $rootScope.loading = false;
                        alert('失败: ' + json.msg);
                    }
                }).error(function (json) {
                    console.log('err : 调用失败！');
                    $rootScope.loading = false;
                });
        }

    }
});
