// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('liveRooms.updateController', updateController);
    mod.controller('liveRooms.planController', planController);

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    planController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];

    // 直播预告 设置详情
    function planController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $timeout) {
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: con.live_domain + '/live/rooms/' + $stateParams.id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.param = angular.copy(json.data);
                }
            })
        }

        $scope.compare_plan_time = function () {
            var err_flag = false; // 是否有错误?
            angular.forEach($scope.param.plans, function (val, key) {
                if (val.start_time > val.end_time) {
                    widget.msgToast('第' + (key + 1) + '行的开始时间 > 结束时间了', 5000);
                    err_flag = true;
                }
            })
            return err_flag;
        }
        $scope.submit = function (status) {

            if ($scope.compare_plan_time()) {
                return false;
            }

            widget.ajaxRequest({
                url: con.live_domain + '/live/rooms' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.live_rooms.list');
                }
            })
        }
    };

    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $timeout) {
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: con.live_domain + '/live/rooms/' + $stateParams.id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    json.data.order_by = Number(json.data.order_by);
                    $scope.param = angular.copy(json.data);
                }
            })
        }

        $scope.make_all_url = function () {
            var app_name = $scope.param.cloud.app_name || '';
            var domain = $scope.param.cloud.domain || '';
            var stream_name = $scope.param.cloud.stream_name || '';
            var default_rtmp_url = 'rtmp://' + domain + '/' + app_name + '/' + stream_name;
            var default_http_url = 'http://' + domain + '/' + app_name + '/' + stream_name;

            $scope.param.cloud.rtmp_url = default_rtmp_url + '_lsd';
            $scope.param.cloud.mu_url = default_http_url + '.m3u8';
            $scope.param.cloud.flv_url = default_http_url + '_lsd.flv';

            $scope.param.cloud.high_rtmp_url = default_rtmp_url + '_lhd';
            $scope.param.cloud.high_mu_url = default_http_url + '.m3u8';
            $scope.param.cloud.high_flv_url = default_http_url + '_lhd.flv';

            $scope.param.cloud.fluency_rtmp_url = default_rtmp_url + '_lld';
            $scope.param.cloud.fluency_mu_url = default_http_url + '.m3u8';
            $scope.param.cloud.fluency_flv_url = default_http_url + '_lld.flv';

        }
        $scope.submit = function (status) {
            var watch_point_text = angular.element($scope.param.watch_point).text();
            if (!watch_point_text || watch_point_text == '') {
                $scope.param.watch_point = '';
            }
            $scope.param.type = 1;
            widget.ajaxRequest({
                url: con.live_domain + '/live/rooms' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.live_rooms.list');
                }
            })
        }
    };
});
