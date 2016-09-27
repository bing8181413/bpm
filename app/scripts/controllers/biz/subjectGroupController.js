// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('subjectGroup.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    function updateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, comfunc, $filter, $timeout) {
        $scope.param = {};
        $scope.subjects_group = [];
        var sup_scope = $scope;
        // 初始化数据
        widget.ajaxRequest({
            url: '/subjects/groups',
            method: 'get',
            scope: $scope,
            data: {},
            success: function (json) {
                angular.forEach(json.data, function (val, key) {
                    val.disabled = true;
                })
                $scope.subjects_group = json.data;
            }
        })

        $scope.add_subject_group = function () {
            var subject_group_tmp_key = new Date().getTime();
            if ($scope.subjects_group.length == 0) {
                var subjects_group_tmp = new Object();
                subjects_group_tmp['group_' + subject_group_tmp_key] = [];
                $scope.subjects_group = subjects_group_tmp;
            } else {
                $scope.subjects_group['group_' + subject_group_tmp_key] = [];
            }
        }
        //  保存或者删除 专题组
        $scope.save_subject_group = function (key, value) {
            $scope.save_subject_group_confirm = function () {
                $scope.save_subject_param = {group_tag: key};
                $scope.tmp_subject_ids = [];
                angular.forEach(value, function (v, k) {
                    if (v.subject_id) {
                        $scope.tmp_subject_ids.push({subject_id: v.subject_id});
                    }
                });
                if (value) {
                    if ($scope.tmp_subject_ids.length < 2) {
                        widget.msgToast('每个专题组至少需要2个专题，否则无法提交，请调整！');
                        return false;
                    }
                    $scope.save_subject_param.subjects = $scope.tmp_subject_ids;
                } else {
                    $scope.save_subject_param.subjects = [];
                }
                widget.ajaxRequest({
                    url: '/subjects/groups',
                    method: 'put',
                    scope: $scope,
                    data: $scope.save_subject_param,
                    success: function (json) {
                        $scope.subjects_group[key].disabled = true;
                        if (!value) {
                            delete $scope.subjects_group[key];
                        }
                        widget.msgToast(value ? '保存成功' : '删除成功');
                    }
                })
            }
            if (!value) {
                var model = $modal.open({
                        template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                        controller: function ($scope, $modalInstance) {
                            $scope.title = '删除专题组';
                            $scope.save_subject_group_delete_confirm = function () {
                                sup_scope.save_subject_group_confirm();
                                $scope.cancel();
                            }
                            $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                '<div ><h4>删除后，首页将不再显示该运营组。是否确定删除？</h4></div>' +
                                '<a class="btn btn-danger btn-rounded col-sm-2 pull-right" ng-click="save_subject_group_delete_confirm()">移除</a>' +
                                '</div>';
                            $scope.cancel = function () {
                                $modalInstance.dismiss('cancel');
                            };
                        },
                        size: ''
                    }
                );
            } else {
                $scope.save_subject_group_confirm();
            }
        }
        $scope.add_update_subject = function (key, value, index) {
            // index : update 时候的顺序  没有index 是添加
            var model = $modal.open({
                    template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                    controller: function ($scope, $modalInstance) {
                        $scope.title = '运营专题';
                        $scope.search_subject = function () {
                            if (!$scope.subject_id) {
                                widget.msgToast('专题ID未填写');
                                return false;
                            }
                            widget.ajaxRequest({
                                url: '/subjects',
                                method: 'get',
                                scope: $scope,
                                data: {subject_id: $scope.subject_id},
                                success: function (json) {
                                    var tmp_data = json.data[0];
                                    if (tmp_data) {
                                        var err = false;
                                        angular.forEach(sup_scope.subjects_group[key], function (v, k) {
                                            if (tmp_data.subject_id == v.subject_id) {
                                                err = true;
                                            }
                                        });
                                        if (err) {
                                            widget.msgToast('专题ID已经存在');
                                            return false;
                                        }
                                        if (typeof index == 'number') {
                                            sup_scope.subjects_group[key].splice(index, 1, {
                                                subject_id: tmp_data.subject_id,
                                                name: tmp_data.name,
                                                brief: tmp_data.brief,
                                                share_pic: tmp_data.share_pic,
                                            })
                                        } else {
                                            sup_scope.subjects_group[key].push({
                                                subject_id: tmp_data.subject_id,
                                                name: tmp_data.name,
                                                brief: tmp_data.brief,
                                                share_pic: tmp_data.share_pic,
                                            });
                                            sup_scope.subjects_group[key].empty.length--;
                                        }
                                        sup_scope.subjects_group[key].disabled = false;
                                        $scope.cancel();
                                        widget.msgToast('添加成功');
                                    } else {
                                        $scope.subject_id = '';
                                        widget.msgToast('添加失败,专题ID不存在');
                                    }
                                },
                            })
                        }
                        $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                            '<div class="col-sm-8" form-input text="专题ID" ng-model="subject_id" ' +
                            'label-width="4" content-width="8"></div>' +
                            '<a class="btn btn-primary btn-sm btn-rounded col-sm-2" ng-click="search_subject()">添加</a>' +
                            '</div>';
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    },
                    size: ''
                }
            );
        }
        // 删除专题
        $scope.sub_subject = function (key, value, index) {
            var model = $modal.open({
                    template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                    controller: function ($scope, $modalInstance) {
                        $scope.title = '移除专题';
                        $scope.sub_subject_confirm = function () {
                            sup_scope.subjects_group[key].splice(index, 1);
                            sup_scope.subjects_group[key].empty.length++;
                            sup_scope.subjects_group[key].disabled = false;
                            $scope.cancel();
                        }
                        $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                            '<div ><h4>确定移除该专题吗？移除后，该专题将从该运营组消失。</h4></div>' +
                            '<a class="btn btn-danger btn-rounded col-sm-2 pull-right" ng-click="sub_subject_confirm()">移除</a>' +
                            '</div>';
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    },
                    size: ''
                }
            );
        }
    };
});
