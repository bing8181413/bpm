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
                    $scope.pic = !$scope.param.pic_url ? '' : ([{
                        pic_url: $scope.param.pic_url,
                        pic_width: 100,
                        pic_height: 100
                    }])
                }
            })
        }

        $scope.submit = function (status) {
            $scope.param.type = 1;
            if (!$scope.pic || !$scope.pic[0] || $scope.pic && $scope.pic[0] && !$scope.pic[0].pic_url) {
                widget.msgToast('图片没上传,不能提交');
                return false;
            }
            $scope.param.pic_url = $scope.pic[0] && $scope.pic[0].pic_url || '';
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
