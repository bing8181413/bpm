define(['./controllers'
    , '../cons/simpleCons'
], function (mod,simpleCons) {
    mod
        .controller('feedController', feedController)
    feedController.$injector = ['$scope', '$http'];
    function feedController($scope, $http) {
        var feedscope = $scope;
        $scope.tab = 1;
        $scope.list_param = {};
        $scope.list_param.count = 10;
        $scope.list_param.page = 1;
        $scope.list_param.status = 1;
        var list_url = simpleCons.domain + '/manage/plat/feed_list';
        $scope.getapi = function(page,status){
            $scope.list_param.status = status?status:$scope.list_param.status;
            $scope.list_param.page = page?page:$scope.list_param.page;
            $http.post(list_url,$scope.list_param)
                .success(function (data) {
                    if (data.code == 0) {
                        $scope.Feeds = data.data.feed_list;
                        $scope.totalItems = data.data.feed_count;
                        $scope.currentPage = $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    }
                });
        }

        $scope.getapi(1,1);

        $scope.feedstatus = function(feed_id, status , index){
            if(window.confirm('确定要执行此操作吗?')) {
                var feedstatus_url = simpleCons.domain + '/manage/plat/feed_status';
                $http.post(feedstatus_url, {feed_id: feed_id, status: status})
                    .success(function (data) {
                        if (data.code == 0) {
                            $scope.getapi();
                            alert('操作成功！');
                        } else {
                            alert(data.msg);
                        }
                    });
            }
        }

    };
});
