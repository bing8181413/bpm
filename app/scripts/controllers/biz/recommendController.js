// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons',
], function(mod, con) {
    mod.controller('recommend.recommendController', recommendController);

    recommendController.$injector = [
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

    function recommendController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $templateCache) {
        $scope.init = function() {
            widget.ajaxRequest({
                url: con.live_domain + '/videogroup/recommend',
                method: 'get',
                scope: $scope,
                data: {},
                success: function(json) {
                    $scope.data = json.data;
                },
            });
        };
        $scope.init();

        $scope.update = function(add_obj) {
            if (add_obj && add_obj.video_group_id) {
                $scope.data.push(add_obj);
            }
            widget.ajaxRequest({
                url: con.live_domain + '/videogroup/recommend',
                method: 'put',
                scope: $scope,
                data: $scope.data,
                success: function(json) {
                    widget.msgToast('提交完成!');
                    $scope.data = json.data;
                },
            });
        };

        $scope.add = function() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/' + con.live_path + 'recommend/add.html',
                controller: function($scope, $uibModalInstance, resolve_scope) {
                    $scope.submit = function() {
                        resolve_scope.scope.update({
                            video_group_id: $scope.video_group_id,
                            order_by: resolve_scope.length + 1,
                        });
                        $scope.cancel();
                    };
                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                    resolve_scope: function() {
                        return {
                            scope: $scope,
                            length: $scope.data && $scope.data.length,
                        };
                    },
                },
                size: 'sm',
            });

        };
    }
});
