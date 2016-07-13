// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('product.addController', addController);

    addController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function addController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        // $scope.$watch('param', function (val) {
        //     console.log(val);
        // }, true);
        // $scope.param = {
        //     // 注释的都是可以直接提交的数据 或者直接用 tuanadd_param
        //     //account_id: '',
        //     //activity_title: '',
        //     //reward: '',// 团长奖励
        //     //group_buy_min_num: '',
        //     //group_buy_days: '',
        //     //black_list: '',
        //     //white_list: '',
        //     group_buy_header_user_id: null,
        //     //is_pinned: '',
        //     //activity_options: '',
        //     //activity_pics: '',
        //     //activity_contents: '',
        //     target_type: 0,// 0 全部小区 1：部分小区 2：排除部分小区
        //     activity_pics: [],
        //     activity_small_pics: [],
        //     activity_contents: [
        //         {
        //             id: 0,
        //             category: '活动摘要',
        //             old: [],
        //             new: []
        //         }
        //     ]
        //     //activity_time: new Date($filter('date')(new Date(), 'yyyy-MM-dd 09:00:00')),
        //     //activity_end_time: new Date($filter('date')(new Date(), 'yyyy-MM-dd 11:00:00')),
        //     //activity_apply_end_time: new Date($filter('date')(new Date(), 'yyyy-MM-dd 18:00:00'))
        // };
        $scope.submit = function (status) {
            console.log($scope.param);
            if (status == 0) {//草稿
                $scope.param.status = status;
            } else {
                $scope.param.status = 1;
            }
            var url = simpleCons.domain + '/products';
            widget.ajaxRequest({
                url: url,
                method: 'POST',
                data: $scope.param,
                success: function (json) {
                    alert('发布成功！');
                    $state.go('goods.list');
                }
            })
        }
    };
});
