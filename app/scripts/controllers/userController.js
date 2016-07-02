// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod,simpleCons) {
    mod.controller('userController', userController);

    userController.$injector = ['$scope', '$http','$modal','$rootScope'];
    function userController($scope, $http, $modal, $rootScope) {
        $scope.list_param = {'page':1,'count':20};
        //初始化参数  使用对象传
        $scope.getapi = function(method,page){
            $scope.list_param.page = page;
            $scope.list_param.keyword = $scope.search;
            var url = simpleCons.domain+'/manage/plat/'+method;
            $http.post(url, $scope.list_param)
                .success(function (data) {
                    if(data.code == 0 ){
                        $scope.user_list(data,page);
                    }else{
                        alert('服务器请求出错，请联系管理员');
                    }
                });
        }
        //初始化数据列表
        $scope.getapi('user_list');
        //获取数据后填充到界面（  提供给userFactory.jsonp  success 回调使用 ）
        $scope.user_list = function(json,page){
            if(json.code==0){
                $scope.users = json.data.user_list;
                $scope.totalItems = json.data.user_count;
                $scope.currentPage = page;
                $scope.maxSize = '5';
                $scope.numPages = '';
            }
        }
        $scope.getlist = function(page){
            $scope.getapi('user_list',page);
        }

        $rootScope.searchkeyword = function(event){
            if (event.keyCode !== 13) return;
            $scope.getapi('user_list');
        }
        $scope.user_verify = function(user,index,type){
            if(window.confirm('确定要执行此操作吗?')){
                var url = simpleCons.domain+'/manage/plat/change_user';
                $http.post(url, {user_id:user.user_id,verify_type:type})
                    .success(function (data) {
                        if(data.code == 0 ){
                            alert('修改状态成功');
                            $scope.users[index].verify_type = type;
                        }else{
                            alert('服务器请求出错，请联系管理员');
                        }
                    });
            }

        }
    };
});
