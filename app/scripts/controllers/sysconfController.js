// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('sysconfController', sysconfController)
        .controller('opencitysController', opencitysController)

    sysconfController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$stateParams', '$state', 'widget'];
    opencitysController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$stateParams', '$state', 'widget'];
    function sysconfController($scope, $http, $rootScope, $modal, FileUploader, $stateParams, $state, widget) {
        $scope.conf_param = {};
        $scope.init = 0; // 标记是不是初始化加载
        var sys_conf_url = simpleCons.domain + '/manage/public/sys/config';
        $scope.getapi = function (conf_param) {
            $scope.conf_param.config_type = 8;
            $http.post(sys_conf_url, $scope.conf_param)
                .success(function (json) {
                    if (json.code == 0) {
                        if ($scope.init > 0) {
                            alert('更新成功');
                        }
                        $scope.init++;
                        $scope.conf_param = json.data;
                    } else {
                        widget.msgToast(json.msg);
                    }
                });

        }
        $scope.getapi();
    };
    function opencitysController($scope, $http, $rootScope, $modal, FileUploader, $stateParams, $state, widget) {
        $scope.conf_param = {};
        $scope.init = 0; // 标记是不是初始化加载
        var sys_conf_url = simpleCons.domain + '/manage/public/sys/config';
        $scope.getapi = function (conf_param) {
            $scope.conf_param.config_type = 10;
            $http.post(sys_conf_url, $scope.conf_param)
                .success(function (json) {
                    if (json.code == 0) {
                        if ($scope.init > 0) {
                            alert('更新成功');
                        }
                        $scope.init++;
                        $scope.conf_param = json.data;
                    } else {
                        widget.msgToast(json.msg);
                    }
                });

        }
        $scope.getapi();
    };
});
