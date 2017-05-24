// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('mission.updateController', updateController)
        .controller('knowledge.updateController', knowledgeController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    knowledgeController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    function knowledgeController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        if (!$stateParams.mission_id) {
            widget.msgToast('任务ID未选择,已跳转至课程列表。', 3000);
            $state.go(con.state.main + '.lessons.list');
        }
        $scope.getknowledges = function () {
            widget.ajaxRequest({
                url: '/missions/' + $stateParams.mission_id + '/knowledges',
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.knowledge_list = angular.copy(json.data);
                    $scope.knowledge_title = [];
                    $scope.title = '1111111111';
                    angular.forEach(json.data, function (val, key) {
                        $scope.knowledge_title.push({value: val.knowledge_id, text: val.title});
                    });
                }
            })
        }
        if ($stateParams.mission_id) {
            $scope.getknowledges();
        }

        $scope.go_lesson_order = function () {
            history.back();
        }

        $scope.selected = function (item) {
            $scope.param = {};//保证重新添加图文详情的数据
            if (!item) {
                $scope.title = '1111111111';
                return false;
            }
            $scope.title = item.value;
            widget.ajaxRequest({
                url: '/knowledges/' + item.value,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.param = angular.copy(json.data);
                    console.log($scope.param.imagetexts);
                }
            })
        }

        $scope.submit = function (status) {
            var err_audios = false;
            angular.forEach($scope.param.audios, function (val, key) {
                if (!val.url) {
                    widget.msgToast('音频第' + (key + 1) + '行没有完成上传。');
                    err_audios = true;
                }
                val.id = val.id || undefined;
            });
            if (err_audios) {
                return false;
            }
            var err_videos = false;
            angular.forEach($scope.param.videos, function (val, key) {
                if (!val.url) {
                    widget.msgToast('视频第' + (key + 1) + '行没有完成上传。');
                    err_videos = true;
                }
                val.id = val.id || undefined;
            });
            if (err_videos) {
                return false;
            }
            if ($scope.param.imagetexts && !comfunc.isEmptyArray($scope.param.imagetexts)) {
                var tmp_imagetexts_err = 0;
                angular.forEach($scope.param.imagetexts, function (val, key) {
                    if (!val) {
                        tmp_imagetexts_err++;
                    } else {
                        angular.forEach(val.sources, function (v, k) {
                            if (!v.url) {
                                tmp_imagetexts_err++;
                            }
                        })
                    }

                })
                if (tmp_imagetexts_err > 0) {
                    widget.msgToast('图文详情中有图片还没有完成上传');
                    return false;
                }
            }
            angular.extend($scope.param, {mission_id: $stateParams.mission_id});

            // console.log($scope.param.imagetexts);
            // return false;
            if (status == 2) { // 删除
                if (!confirm('确认删除这个知识点吗?')) {
                    return false;
                }
                widget.ajaxRequest({
                    url: '/knowledges/' + $scope.param.knowledge_id,
                    method: 'delete',
                    scope: $scope,
                    data: {},
                    success: function (json) {
                        widget.msgToast('删除成功！', 500);
                        $scope.param = {};
                        $scope.getknowledges();
                    },
                })
            } else {
                widget.ajaxRequest({
                    url: $scope.param.knowledge_id ? ('/knowledges/' + $scope.param.knowledge_id) : ('/missions/' + $stateParams.mission_id + '/knowledges'),
                    method: $scope.param.knowledge_id ? 'PUT' : 'POST',
                    scope: $scope,
                    data: $scope.param,
                    success: function (json) {
                        widget.msgToast('发布成功！', 500);
                        $scope.param = {};
                        $scope.getknowledges();
                    },
                })
            }

        }
    };
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        if (!$stateParams.lesson_id && $stateParams.mission_id) {
            widget.msgToast('课程ID未选择,已跳转至课程列表。', 3000);
            $state.go(con.state.main + '.lessons.list');
        }
        if ($stateParams.mission_id) {
            widget.ajaxRequest({
                url: '/missions/' + $stateParams.mission_id,
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
            var err_sources = false;
            angular.forEach($scope.param.sources, function (val, key) {
                if (!val.url) {
                    widget.msgToast('任务图片第' + (key + 1) + '行没有完成上传。');
                    err_sources = true;
                }
                val.id = val.id || undefined;
            });
            if (err_sources) {
                return false;
            }
            angular.extend($scope.param, {lesson_id: $stateParams.lesson_id});
            widget.ajaxRequest({
                url: '/missions' + ($stateParams.mission_id ? ('/' + $stateParams.mission_id) : ''),
                method: $stateParams.mission_id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！', 500);
                    $state.go(con.state.main + '.lessons.order', {
                        lesson_id: $stateParams.lesson_id,
                        status: $scope.param.status
                    });
                },
            })
        }
    };
});
