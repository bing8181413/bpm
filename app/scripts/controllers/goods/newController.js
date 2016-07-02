// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('goods.newController', newController);

    newController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function newController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        $scope.tmp_param = {};
        $scope.communityerr = {count: 0};// 小区错误数量
        $scope.init = function (tuan_new_obj) {
            if (tuan_new_obj) {
                //console.log(tuan_new_obj);
                //图片格式化字段
                $scope.param = {
                    activity_id: tuan_new_obj.activity_id,
                    account_id: $rootScope.hjm.account_id,
                    post_user_mobile: tuan_new_obj.post_user_mobile,
                    post_user_mobile: tuan_new_obj.post_user_mobile,
                }
                //配置小区的选项
                if (tuan_new_obj.white_list && tuan_new_obj.white_list.length > 0) {
                    $scope.tmp_param.includes = tuan_new_obj.white_list;
                    $scope.tmp_param.communitys = [];
                    $scope.tmp_param.show_communitys = tuan_new_obj.white_list;
                    $scope.tmp_param.target_type = 1;
                } else if (tuan_new_obj.black_list && tuan_new_obj.black_list.length > 0) {
                    $scope.tmp_param.excludes = tuan_new_obj.black_list;
                    $scope.tmp_param.communitys = [];
                    $scope.tmp_param.show_communitys = tuan_new_obj.black_list;
                    $scope.tmp_param.target_type = 2;
                } else {
                    $scope.tmp_param.communitys = [];
                    $scope.tmp_param.target_type = 0;
                }
                //console.log($scope.param);
                //console.log($scope.tmp_param);
            } else {
                widget.msgToast('没有获取更新的信息，从列表选择重新编辑');
            }
        }
        $scope.init($rootScope.hjm.tuan_new_obj);
        $scope.save = function () {
            if ($scope.communityerr.count > 0) {
                widget.msgToast('小区没有选择完成');
                return false;
            } else if ($scope.tmp_param.communitys.length == 0) {
                widget.msgToast('小区未选择选择');
                return false;
            } else {
                $scope.param.community_id = $scope.tmp_param.communitys[0].community_id;
                $scope.param.community_name = $scope.tmp_param.communitys[0].community_name;
            }
            if (!$scope.param.post_user_mobile) {
                widget.msgToast('输入开团用户账号没有填写');
                return false;
            }
            var url = simpleCons.domain + '/manage/tuan/new';
            // 添加一个新类型
            $scope.param.utm_channel = 'admin';
            $http.post(url, $scope.param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('发布成功！');
                        $state.go('pintuan.list');
                    } else {
                        widget.msgToast(data.msg);
                    }
                });

        }
    };
});
