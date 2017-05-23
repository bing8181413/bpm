// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('teacher.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        if ($stateParams.teacher_id) {
            widget.ajaxRequest({
                url: '/teachers/' + $stateParams.teacher_id,
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
            // return false;
            widget.ajaxRequest({
                url: '/teachers' + ($stateParams.teacher_id ? ('/' + $stateParams.teacher_id) : ''),
                method: $stateParams.teacher_id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！', 500);
                    $state.go(con.state.main + '.teacher.list');
                },
            })
        }
    };
});
