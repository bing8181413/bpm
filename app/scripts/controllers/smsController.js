// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('smsController', smsController)
        .controller('smsAddController', smsAddController)

    smsController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$stateParams', '$state'];
    smsAddController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$stateParams', '$state', '$filter'];
    function smsController($scope, $http, $rootScope, $modal, $stateParams) {
        $scope.list_param = {page: 1, count: 20, sms_status: 3};
        $scope.list_param.keyword = $scope.search;
        var list_url = simpleCons.domain + '/manage/market/sms/list';
        $scope.getapi = function (page, sms_status) {
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $scope.list_param.sms_status = sms_status ? sms_status : $scope.list_param.sms_status;
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.sms_list = json.data.list;
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

        $scope.mobile_list = function (sms) {
            var modalInstance = $modal.open({
                templateUrl: 'mobile_list.html',
                controller: function ($scope, $modalInstance) {
                    $scope.mobile_list = sms.mobile_list;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: 'lg'
            });
        }
    };

    function smsAddController($scope, $http, $rootScope, $modal, $stateParams, $filter) {
// 提交的参数
        $scope.smsadd_param = {
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
            console.log($scope.smsadd_param);
            $scope.smsadd_param.send_time = $filter('date')($scope.smsadd_param.send_time, 'yyyy-MM-dd HH:mm:ss');
            if (!$scope.smsadd_param.content || $scope.smsadd_param.content == '') {
                alert('请填写短信内容');
                return false;
            }
            $scope.smsadd_param.mobile_list = $scope.smsadd_param.mobile_list.replace(/，/g, ',');
            if ($scope.smsadd_param.scope_type == 3 && (!$scope.smsadd_param.mobile_list || $scope.smsadd_param.mobile_list == '')) {
                alert('请填写发送用户的手机号码列表');
                return false;
            }
            if ($scope.smsadd_param.is_marketing == 1 && $scope.smsadd_param.scope_type == 3) {
                if ($scope.smsadd_param.mobile_list.split(',').length <= 10) {
                    alert('营销短信必须发送10条以上');
                    return false;
                }
            }
            var add_url = simpleCons.domain + '/manage/market/sms/add';
            $rootScope.loading = true;
            $http.post(add_url, $scope.smsadd_param)
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
