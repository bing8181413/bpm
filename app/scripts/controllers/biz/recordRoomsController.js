// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('recordRooms.updateController', updateController);

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];

    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $timeout) {
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: con.live_domain + '/live/rooms/' + $stateParams.id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    if ($state.current.name.indexOf('record_rooms.copy') > -1) { // 复制用的
                        delete json.data.id;
                        delete json.data.created_at;
                        delete json.data.updated_at;

                        delete json.data.record.id;
                        delete json.data.record.room_id;
                        delete json.data.record.created_at;
                        delete json.data.record.updated_at;

                    }
                    json.data.order_by = Number(json.data.order_by);
                    $scope.param = angular.copy(json.data);
                }
            })
        }

        $scope.submit = function (status) {
            var watch_point_text = angular.element($scope.param.watch_point).text();
            if (!watch_point_text || watch_point_text == '') {
                $scope.param.watch_point = '';
            }
            $scope.param.type = 2;
            widget.ajaxRequest({
                url: con.live_domain + '/live/rooms' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.record_rooms.list');
                }
            })
        }
    };
});
