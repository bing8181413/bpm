// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod,simpleCons) {
    mod.controller('familyController', familyController);

    familyController.$injector = ['$scope', '$http','$modal', '$rootScope'];
    function familyController($scope, $http, $modal, $rootScope) {
        $scope.tab = 0;
        $scope.list_param = {'page':1,'count':10,'address_status':0};
        //初始化参数  使用对象传
        $scope.getapi = function(method,page,address_status){
            $scope.list_param.page = page ? page : 1;
            $scope.list_param.keyword = $scope.search;
            $scope.list_param.address_status = address_status==0 || address_status ? address_status : $scope.list_param.address_status;
            var url = simpleCons.domain+'/manage/plat/'+method;
            $http.post(url, $scope.list_param)
                .success(function (data) {
                    if(data.code == 0 ){
                        $scope.family_list(data,page);
                    }else{
                        alert('服务器请求出错，请联系管理员');
                    }
                });
        }
        //初始化数据列表
        $scope.getapi('family_list');
        $rootScope.searchkeyword = function(event){
            if (event.keyCode !== 13) return;
            $scope.getapi('family_list');
        }
        //获取数据后填充到界面（  提供给FamilyFactory.jsonp  success 回调使用 ）
        $scope.family_list = function(json,page){
            if(json.code==0){
                $scope.Familys = json.data.family_list;
                $scope.totalItems = json.data.family_count;
                $scope.currentPage = page;
                $scope.maxSize = '5';
                $scope.numPages = '';
            }
        }
        //修改状态
        $scope.change_family = function(family_id,address_status,index){
            if(window.confirm('确定要执行此操作吗?')) {
                var url =  simpleCons.domain+'/manage/plat/change_family';
                $http.post(url, {family_id: family_id, address_status: address_status})
                    .success(function (data) {
                        if (data.code == 0) {
                            $scope.family_status(data, index);
                        } else {
                            alert('服务器请求出错，请联系管理员');
                        }
                    });
            }
        }
        $scope.family_status = function(json,index){
            if(json.code==0){
                $scope.Familys[index] = '';
                alert('操作成功');
            }else{
                alert(json.msg);
            }
        }

        $scope.open_members = function(family_id){
            $modal.open({
                templateUrl: 'family_members.html',
                controller: function($scope, $modalInstance){
                    var url = simpleCons.domain+'/manage/plat/family_members';
                    $http.post(url, {family_id:family_id})
                        .success(function (data) {
                            if(data.code == 0 ){
                                $scope.member_list = data.data.member_list;
                            }else{
                                alert('服务器请求出错，请联系管理员');
                            }
                        });

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: 'lg'

            });
        }
    };
});
