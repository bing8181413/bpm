// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('web.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter','$timeout'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter,$timeout) {
        $scope.param = {};
        $timeout(function () {
            // $scope.param = {url: 'https://m.ahaschool.com/produnct/detail?product_id=10000'};
            $scope.param = {url: 'https://m.ahaschool.com/'};
        }, 0);

        $scope.$watch('param', function (val) {
            if (!!val.url && !!val.utm_source) {
                var tmp = val.url.indexOf('?') > 0 ? '&' : '?';
                $scope.param.full_url = encodeURI(val.url + tmp +
                    'utm_source=' + val.utm_source +
                    '&utm_medium=' + (val.utm_medium || '') +
                    '&utm_campaign=' + (val.utm_campaign || ''));
            } else {
                $scope.param.full_url = ' ';
            }
        }, true);
        $scope.submit = function (status) {
            widget.ajaxRequest({
                url: '/markets/urls',
                method: 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('保存成功！');
                    // $state.go(con.state.main + '.web.list');
                }
            })
        }
    };
});
