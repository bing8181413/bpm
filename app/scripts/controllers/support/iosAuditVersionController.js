// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons',
], function(mod, con) {
    mod.controller('iosauditversion.configController', configController);

    configController.$injector = [
        '$scope',
        '$http',
        '$rootScope',
        '$uibModal',
        '$state',
        '$stateParams',
        'widget',
        '$filter',
        '$templateCache',
    ];

    function configController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $templateCache) {
        $scope.init = function() {
            widget.ajaxRequest({
                url: con.live_domain + '/supports/iosauditversion',
                method: 'get',
                scope: $scope,
                data: {},
                success: function(json) {
                    $scope.param = json.data;
                },
            });
        };
        $scope.init();

        $scope.submit = function(status) {
            widget.ajaxRequest({
                url: con.live_domain + '/supports/iosauditversion',
                method: 'put',
                scope: $scope,
                data: $scope.param,
                success: function(json) {
                    widget.msgToast('已经更新完成!');
                    $scope.init();
                },
            });
        };

    }
});
