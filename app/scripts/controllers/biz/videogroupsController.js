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
                    $scope.param.rooms = $scope.param.rooms || [];
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
            } else {
                widget.msgToast('没有相关的房间ID');
                return false;
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
                $scope.param.products[index]._tmp_options = [];
                angular.forEach(json.data, function (val, key) {
                    $scope.param.products[index]._tmp_options.push({
                        option: {
                            option_type: val.option_type,
                            option_status: val.option_status,
                            option_name: val.option_name
                        },
                        option_id: val.option_id,
                        product_id: val.product_id,
                        text: val.option_name + '(' + $filter('product_option_status')(val.option_status) + ')',
                        value: val.option_id
                    });
                })
                // angular.forEach(json.data.options, function (val, key) {
                //     $scope.param.products[index]._tmp_options.push({
                //         text: val.option_name,
                //         value: val.option_id,
                //         option_id: val.option_id,
                //         option_name: val.option_name,
                //         product_id: val.product_id
                //     });
                // });
                // angular.forEach(json.data.groupbuy_options, function (val, key) {
                //     $scope.param.products[index]._tmp_options.push({
                //         text: val.option_name,
                //         value: val.option_id,
                //         option_id: val.option_id,
                //         option_name: val.option_name,
                //         product_id: val.product_id
                //     });
                // });
                // angular.forEach(json.data.gift_options, function (val, key) {
                //     $scope.param.products[index]._tmp_options.push({
                //         text: val.option_name,
                //         value: val.option_id,
                //         option_id: val.option_id,
                //         option_name: val.option_name,
                //         product_id: val.product_id
                //     });
                // });
                $scope.param.products[index]._tmp_options_selected = [];
                angular.forEach($scope.param.products[index].options, function (val, key) {
                    if (val.option_id) {
                        $scope.param.products[index]._tmp_options_selected.push(val.option_id);
                        angular.forEach($scope.param.products[index]._tmp_options, function (_tmp_options_val, _tmp_options_key) {
                            if (val.option_id == _tmp_options_val.option_id) {
                                _tmp_options_val.id = val.id;
                            }
                        });
                    }
                });
                // console.log($scope.param.products[index]._tmp_options_selected);
                // console.log(1);
            }
        }
        $scope.update_option = function () {
            if ($scope.param.products) {
                angular.forEach($scope.param.products, function (product, product_key) {
                    if (product._tmp_options && product._tmp_options.length > 0) {
                        product.options = [];
                        angular.forEach(product._tmp_options, function (_tmp_option_val, _tmp_option_key) {
                            angular.forEach(product._tmp_options_selected, function (_tmp_options_selected_val, _tmp_options_selected_key) {
                                if (_tmp_option_val.option_id == _tmp_options_selected_val) {
                                    var has_option = false;
                                    angular.forEach(product.options, function (option_val, option_key) {
                                        if (option_val.option_id == _tmp_options_selected_val) {
                                            has_option = true;
                                        }
                                    });
                                    if (!has_option) {
                                        product.options.push(_tmp_option_val);
                                    }
                                }
                            })
                        })
                    }
                });
            }
        }
        $scope.$watch('param.products', function (products) {
            if (products) {
                $scope.update_option();
            } else {
                // console.log('还没有products');
            }
        }, true)
        $scope.$watch('param.product_id', function (product_id) {
            if (product_id && product_id != 0) {
                $scope.param.product_url = $rootScope.common.wx_domain + '/product/detail/product_id/' + product_id + '?utm_source=appbuy';
            } else {
                $scope.param.product_url = '';
            }
        })
        $scope.submit = function (status) {
            $scope.param.video_count = $scope.param.rooms && $scope.param.rooms.length || 0;
            if ($scope.param.video_count == 0) {
                widget.msgToast('视频数量不能为0!');
                return false;
            }
            if ($scope.param.pay_type == 1) {
                $scope.param.skus = [];
                $scope.param.products = [];
                $scope.param.product_id = '';
                $scope.param.product_url = '';
                $scope.param.onoff = 2;
            }
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
