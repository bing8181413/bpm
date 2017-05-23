// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('student.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        if ($stateParams.student_id) {
            widget.ajaxRequest({
                url: '/students/' + $stateParams.student_id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.param = angular.copy(json.data);
                }
            })
        } else {
            $scope.param = {};
        }
        $scope.submit = function (status) {
            // console.log($scope.param);

            //组装 param.options start
            $scope.param.products = [];
            angular.forEach($scope.products, function (val, key) {
                if (val.selected) {
                    $scope.param.products.push({
                        id: val.id || undefined,
                        product_id: val.product_id,
                        option_id: val.option_id,
                    });
                }
            });
            //组装 param.options end

            var err_schedules = false;
            if (comfunc.isEmptyArray($scope.param.schedules)) {
                widget.msgToast('每周任务发布时间没有添加,赶紧添加一下吧。');
                return false;
            }
            angular.forEach($scope.param.schedules, function (val, key) {
                if (!val.week || !val.hour || !val.minute) {
                    widget.msgToast('每周任务发布时间的第' + (key + 1) + '行没有完成添加,赶紧添加一下吧。');
                    err_schedules = true;
                }
            });
            if (err_schedules) {
                return false;
            }
            // console.log($scope.param);
            // return false;
            widget.ajaxRequest({
                url: '/students' + ($stateParams.student_id ? ('/' + $stateParams.student_id) : ''),
                method: $stateParams.student_id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！', 500);
                    $state.go(con.state.main + '.student.list');
                },
            })
        }
    };
});
