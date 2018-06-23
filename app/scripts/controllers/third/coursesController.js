// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons',
], function(mod, con) {
    mod.controller('courses.updateController', updateController);

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', 'comfunc', '$filter', '$timeout'];

    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $timeout) {
        var superScope = $scope;
        $scope.param = {};
        $scope._tmp = {};
        $scope.chapters = [];
        $scope.chapters_length = 0;
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: con.third_domain + '/courses/' + $stateParams.id,
                method: 'GET',
                scope: $scope,
                success: function(json) {
                    $scope.param = json.data;
                    // 记录变化使用的临时变量
                    $scope._tmp = {
                        chapters_online_time: {},
                    };
                    $scope.getDataFlag = true;

                    // 章节和视频排序 初始化
                    angular.forEach($scope.param.chapters, function(val, key) {
                        $scope.chapters_length++;
                        // var tmp_val = angular.copy(val);
                        // delete tmp_val.videos;
                        // tmp_val.chapters_index = $scope.chapters_length;
                        // tmp_val.type = 1;
                        // $scope.chapters.push(tmp_val);
                        $scope.chapters.push({
                            type: 1,
                            id: val.id,
                            chapters_index: $scope.chapters_length,
                            order_by: val.order_by || 0,
                            title: val.title,
                            course_id: val.course_id || undefined,
                        });
                        angular.forEach(val.videos, function(v, k) {
                            $scope.chapters.push({
                                type: 2,
                                chapter_id: v.chapter_id,
                                id: v.id,
                                room_id: v.room_id,

                                title: v.title,
                                video_url: v.video_url,
                                image_url: v.image_url,

                                online_status: v.online_status,
                                online_time: v.online_time,
                            });
                            $scope._tmp.chapters_online_time[v.id] = {online_status: v.online_status, online_time: v.online_time};
                        });
                    });
                    // console.log($scope.chapters);
                },
            });
        }
        // 与get的原始数据 同步 房间生效时间
        $scope.sync_chapters_online_time = function() {
            angular.forEach($scope.chapters, function(val, key) {
                if (val.type == 2) {
                    var current_date_time = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                    var need_change_date_time = new Date(val.online_time).getTime() < new Date().getTime();
                    if (val.id) { //  是初始化的老数据 且是房间
                        var tmp_room = $scope._tmp.chapters_online_time[val.id];
                        if (tmp_room.online_status == 1 && val.online_status == 1) { //    1=>1  还原
                            val.online_time = tmp_room.online_time;
                        } else if (tmp_room.online_status == 2 && val.online_status == 2 && need_change_date_time//  2=>2  不还原
                            || tmp_room.online_status == 2 && val.online_status == 1 // 2=>1  直接 重置到当前时间
                            || tmp_room.online_status == 1 && val.online_status == 2 && need_change_date_time) { // 1==2  不还原
                            val.online_time = current_date_time;
                        }
                    } else if (!val.id) {// 新增视频房间
                        if (val.online_status == 1  //  1 直接重置为当前时间
                            || val.online_status == 2 && need_change_date_time) { // 2 随便改 但必须大于今天
                            val.online_time = current_date_time;
                        }
                    }
                }
            });
        };
        $scope.change_row = function(type, index) {
            var modalInstance = $uibModal.open({
                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                controller: function($scope, $uibModalInstance) {
                    $scope.title = ' ';
                    $scope.chapters = [];
                    $scope.rows = [];
                    $scope.index = index;
                    $scope.row = index;
                    $scope.desc_title = '当前行是第 ' + index + ' 行,切换到选择的行之上';
                    angular.forEach(superScope.chapters, function(val, key) {
                        $scope.rows.push({text: '第' + key + '行', value: val.chapters_index});
                    });
                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                        '<h4 class="text-primary" ng-bind="desc_title"></h4>' +
                        '<div form-input text="选择行数" type="number" ng-model="row" required="true" min="0" max="' + (superScope.chapters.length - 1) +
                        '"></div>' +
                        '<a class="btn btn-success btn-rounded pull-right" ng-click="submit(index,row)">确定</a>' +
                        '</form>';
                    $scope.submit = function(from_obj_index, to_obj_index) {
                        if (from_obj_index == to_obj_index) {
                            widget.msgToast('位置没变，不能提交');
                            return false;
                        }
                        var tmp_obj = angular.copy(superScope.chapters[from_obj_index]);
                        superScope.chapters[from_obj_index]._del = 1;//加 删除标示
                        superScope.chapters.splice(to_obj_index, 0, tmp_obj);
                        angular.forEach(superScope.chapters, function(val, key) {
                            if (val._del == 1) {
                                superScope.chapters.splice(key, 1);
                            }
                        });
                        $scope.cancel();
                    };
                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                size: 'sm',
            });
        };
        var tmp_num = 0;
        $scope.$watch('chapters', function(chapters_val) {
            if (chapters_val && chapters_val.length > 0 && chapters_val[0].type != 1) {
                // 第一行必须是 章节类型 type : 1
                $scope.chapters.unshift({type: 1, title: ''});
            } else {
                var chapters_index = 0;
                var video_index = 0;
                $scope.param.chapters = [];
                angular.forEach(chapters_val, function(val, key) {
                    if (val.type == 1) {//  章节
                        chapters_index++;
                        val.chapters_index = chapters_index;
                        val.order_by = chapters_index;
                        var tmp_val = angular.copy(val);
                        tmp_val.videos = [];
                        delete tmp_val.chapters_index;
                        delete tmp_val.type;
                        $scope.param.chapters.push(tmp_val);
                    } else {// 视频
                        val.chapters_index = chapters_index;
                        video_index++;
                        val.order_by = video_index;
                        var tmp_val = angular.copy(val);
                        if ($scope.param.chapters[(chapters_index - 1)].id != tmp_val.chapter_id) {
                            delete tmp_val.id;
                        }
                        delete tmp_val.chapters_index;
                        delete tmp_val.type;
                        $scope.param.chapters[(chapters_index - 1)].videos.push(tmp_val);
                    }
                });
                $scope.sync_chapters_online_time();
                tmp_num++;
            }
        }, true);

        $scope.verify_room = function() {
            var has_room = false;
            angular.forEach($scope.chapters, function(val, key) {
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
        };
        $scope.add_room = function(json) {
            if (json.code == 0) {
                $scope.chapters.push({
                    type: 2,
                    room_id: json.data.id,
                    title: json.data.title,
                    image_url: json.data.pic_url,
                    video_url: json.data.record && json.data.record.video_url  || '',
                });
                $scope.room_id = '';
            } else {
                widget.msgToast('没有相关的房间ID');
                return false;
            }
        };

        $scope.submit = function(status) {
            // $scope.param.video_count = $scope.param.rooms && $scope.param.rooms.length || 0;
            // if ($scope.param.video_count == 0) {
            //     widget.msgToast('视频数量不能为0!');
            //     return false;
            // }
            if ($scope.param.pay_type == 1) {
                $scope.param.skus = [];
                $scope.param.products = [];
                $scope.param.product_id = '';
                $scope.param.product_url = '';
                $scope.param.miniapp_url = '';
                $scope.param.onoff = 2;
            } else if ($scope.param.pay_type == 2) {
                if ($scope.param.skus.length == 0 && $scope.param.products.length == 0) {
                    widget.msgToast('收费模式下,关联SKU和关联活动类目不能同时为空!');
                    return false;
                } else if ($scope.param.products.length > 0) {
                    var err_option = false;
                    angular.forEach($scope.param.products, function(val, key) {
                        if (val.options.length == 0) {
                            err_option = true;
                        }
                    });
                    if (err_option) {
                        widget.msgToast('收费模式下,关联活动类目不能为空!');
                        return false;
                    }
                }

            }
            widget.ajaxRequest({
                url: con.third_domain + '/courses' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function(json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.courses.list');
                },
            });
        };
    };
});
