// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('exchangecode.addController', addController);

    addController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function addController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        $scope.openstart_a = false;
        $scope.openend_a = false;
        $scope.couponadd = {
            start_time: new Date(),
            expire_time: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)//  第二个月 加上30天
        };
        $scope.couponadd_param = {
            title: '',
            price: 3,
            // scope_type: 3,
            start_time: '',
            expire_time: '',
            // is_nofity: 0,
            // notify_content: '',
            category: 0,
            sku: 0,
            commodity_type: 0,
            total: 1
        };
        $scope.save = function () {
            $scope.couponadd_param.start_time = $filter('date')($scope.couponadd.start_time, 'yyyy-MM-dd HH:mm:ss')
            $scope.couponadd_param.expire_time = $filter('date')($scope.couponadd.expire_time, 'yyyy-MM-dd HH:mm:ss')
            if (!$scope.couponadd_param.title || $scope.couponadd_param.title == '') {
                widget.msgToast('请填写优惠劵介绍');
                return false;
            }
            if ($scope.couponadd_param.total < 1) {
                widget.msgToast('优惠劵总数不能小于1');
                return false;
            }
            var add_url = simpleCons.domain + '/manage/exchangecode/add';
            $http.post(add_url, $scope.couponadd_param)
                .success(function (json) {
                    if (json.code == 0) {
                        widget.msgToast('添加成功！');
                        $state.go('exchangecode.list');
                    } else {
                        widget.msgToast('失败: ' + json.msg);
                    }
                });
        }
    };
});
