// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('videogroups.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', 'comfunc', '$filter', '$timeout'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $timeout) {
        $scope.param = {};
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: con.live_domain + '/live/videogroups/' + $stateParams.id,
                method: 'GET',
                scope: $scope,
                success: function (json) {
                    $scope.param = json.data;
                }
            })
        }
        $scope.verify_room = function () {
            var has_room = false;
            angular.forEach($scope.param.rooms, function (val, key) {
                if (val.room_id == $scope.room_id) {
                    has_room = true;
                }
            });
            if ($scope.room_id && !has_room) {
                return true;
            } else if (has_room) {
                return '房间ID已存在!';
            } else {
                return '请输入房间ID!';
            }
        }
        $scope.add_room = function (json) {
            // console.log(json);
            var has_room = false;
            if (json.code == 0) {
                angular.forEach($scope.param.rooms, function (val, key) {
                    if (val.room_id == $scope.room_id) {
                        has_room = true;
                    }
                });
                if (!has_room) {
                    $scope.param.rooms.push({
                        room_id: json.data.id,
                        room: {
                            title: json.data.title,
                            live_status: json.data.live_status,
                            plans: json.data.plans
                        }

                    });
                } else {
                    widget.msgToast('已经存在了')
                }
            }
        }
        $scope.verify_product = function (product_id, index) {
            if (product_id) {
                return true;
            } else {
                return '请输入活动ID!!';
            }
        }
        $scope.add_product = function (json, index) {
            if (json.code == 0) {
                $scope.param.products[index].tmp_options = [];
                angular.forEach(json.data.options, function (val, key) {
                    $scope.param.products[index].tmp_options.push({
                        text: val.option_name,
                        value: val.option_id,
                        option_id: val.option_id,
                        option_name: val.option_name
                    });
                });
                angular.forEach(json.data.groupbuy_options, function (val, key) {
                    $scope.param.products[index].tmp_options.push({
                        text: val.option_name,
                        value: val.option_id,
                        option_id: val.option_id,
                        option_name: val.option_name
                    });
                });
            }
        }

        $scope.submit = function (status) {

            widget.ajaxRequest({
                url: con.live_domain + '/live/videogroups' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.videogroups.list');
                }
            })
        }
    };
});
