// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('captcha.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {

        $scope.submit = function (status) {
            $scope.param.expire_time = $filter('date')($scope.param.expire_time, 'yyyy-MM-dd HH:mm:ss');
            widget.ajaxRequest({
                url: '/supports/captchas',
                method: 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.captcha.list');
                }
            })
        }
    };
});
