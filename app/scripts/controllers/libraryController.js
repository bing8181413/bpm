// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('libraryController', libraryController)
        .controller('libTmpController', libTmpController);

    libraryController.$injector = ['$scope', '$http', '$modal'];
    libTmpController.$injector = ['$scope', '$http', '$modal','FileUploader','$state'];
    function libraryController($scope, $http, $modal) {
        $scope.list_param = {'page':1,'count':10};
        $scope.list_param.community_id = $scope.list_param.community_id | '';
        $scope.getapi = function(page){
            $scope.list_param.page = page ? page : 1;
            var url = simpleCons.domain+'/manage/community_share/share/list';
            $http.post(url, $scope.list_param)
                .success(function (json) {
                    if(json.code == 0 ){
                        $scope.lib_list = json.data.list;
                        $scope.totalItems = json.data.total;
                        $scope.currentPage = page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    }else{
                        alert(json.msg);
                    }
                });
        }
        //获取pubdata
        var pubdata_url = simpleCons.domain+'/manage/community_share/community/list';
        $scope.getpubdata = function(){
            $http.post(pubdata_url)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.community_list = json.data;
                    } else {
                        $scope.addAlert(json.msg);
                    }
                });
        }
        // 获取公共数据
        $scope.getpubdata();
        $scope.cancel_lib = function(template_id,transaction_id){
            $scope.cancel_url = simpleCons.domain+'/manage/community_share/share/cancel';
            $scope.cancel_param = {template_id:template_id,transaction_id:transaction_id};
            $http.post($scope.cancel_url,$scope.cancel_param).success(function (json) {
                        if (json.code == 0) {
                            alert('取消共享成功！');
                            $scope.getapi();
                        } else {
                            $scope.addAlert(json.msg);
                        }
                    });
        }
        $scope.add_lib = function(){
            var parentScope = $scope;
            var modalInstance = $modal.open({
                templateUrl: 'add_lib.html',
                controller: function($scope,$modalInstance){
                    $scope.template_list_url = simpleCons.domain + '/manage/community_share/template/list';
                    $scope.template_list_param = {page:1,count:10};
                    $scope.getapi = function(page){
                        $scope.template_list_param.page = page ? page : 1;
                        $http.post($scope.template_list_url,$scope.template_list_param)
                            .success(function (json) {
                                if (json.code == 0) {
                                    $scope.template_list = json.data.list;
                                    $scope.totalItems = json.data.total;
                                    $scope.currentPage = page;
                                    $scope.maxSize = '5';
                                    $scope.numPages = '';
                                } else {
                                    $scope.addAlert(json.msg);
                                }
                            });
                    }
                    $scope.getapi();

                    $scope.add_url = simpleCons.domain + '/manage/community_share/share/add';
                    $scope.add_param = {community_id:parentScope.list_param.community_id};
                    $scope.ok = function(){
                        $scope.add_param.share_id = '';
                        for(var i=0;i<$scope.template_list.length;i++){
                            if($scope.template_list[i].add){
                                $scope.add_param.share_id += $scope.template_list[i].share_id+',';
                            }
                        };
                        if(!$scope.add_param.community_id || $scope.add_param.community_id==''){
                            alert('请在小区图书列表页面选择一个小区');
                            return false;
                        }else if($scope.add_param.share_id==''){
                            alert('请在选择至少一本图书');
                            return false;
                        }
                        $http.post($scope.add_url,$scope.add_param)
                            .success(function (json) {
                                if (json.code == 0) {
                                    alert('添加成功！');
                                } else {
                                    alert(json.msg);
                                }
                            });
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: ''
            });
        }
        $scope.alerts = [
            //{ msg: '用户名或者密码不正确'  }
        ];
        $scope.closeAlert = function(index){
            $scope.alerts.splice(index, 1);
        };
        $scope.addAlert = function(msg,type) {
            $scope.alerts = [];
            $scope.alerts.push({msg: msg,type:type});
        };
    };
    function libTmpController($scope, $http, $modal, FileUploader, $state) {
        $scope.list_param = {'page':1,'count':10};
        $scope.getapi = function(page){
            $scope.list_param.page = page ? page : 1;
            var url = simpleCons.domain+'/manage/community_share/template/list';
            $http.post(url, $scope.list_param)
                .success(function (json) {
                    if(json.code == 0 ){
                        $scope.libTmp_list = json.data.list;
                        $scope.totalItems = json.data.total;
                        $scope.currentPage = page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    }else{
                        alert(json.msg);
                    }
                });
        }
        $scope.getapi();
        $scope.add_tmp = function(){
            var parentScope = $scope;
            var modalInstance = $modal.open({
                templateUrl: 'add_tmp.html',
                controller: function($scope,$modalInstance){
                    $scope.tmp_param = {};
                    $scope.imgtmp = {};
                    var uploader = $scope.uploader = new FileUploader({
                        url: '/qiniu/controller.php?action=uploadimage'
                    });
                    $scope.tmp_url = simpleCons.domain + '/manage/community_share/template/post';
                    $scope.ok = function(){
                        if(!$scope.imgtmp.image ||$scope.imgtmp.image== 'undefined' || $scope.imgtmp.image == undefined){
                            alert('请上传图片');
                            return false;
                        }else if(!$scope.tmp_param.title){
                            alert('请填写图书名称');
                            return false;
                        }else if(!$scope.tmp_param.note){
                            alert('请选填写图书内容简介');
                            return false;
                        }
                        $http.post($scope.tmp_url,$scope.tmp_param)
                            .success(function (json) {
                                if (json.code == 0) {
                                    alert('添加成功！');
                                } else {
                                    alert(json.msg);
                                }
                            });
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    // FILTERS
                    uploader.filters.push({
                        name: 'customFilter',
                        fn: function(item /*{File|FileLikeObject}*/, options) {
                            return this.queue.length < 1;
                        }
                    });
                    uploader.onSuccessItem = function(fileItem, response, status, headers) {
                        if(response){
                            $scope.imgtmp.image = response.url;
                            $scope.imgtmp.width = response.width;
                            $scope.imgtmp.height = response.height;
                            $scope.tmp_param.pics_info = $scope.imgtmp.image+','+$scope.imgtmp.width+','+$scope.imgtmp.height;
                        }
                    };
                },
                size: ''
            });
        }
        $scope.alerts = [
            //{ msg: '用户名或者密码不正确'  }
        ];
        $scope.closeAlert = function(index){
            $scope.alerts.splice(index, 1);
        };
        $scope.addAlert = function(msg,type) {
            $scope.alerts = [];
            $scope.alerts.push({msg: msg,type:type});
        };
    };
});
