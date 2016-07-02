// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod,simpleCons) {
    mod.controller('godlampController', godlampController)
    .controller('godlampArtController', godlampArtController);

    godlampController.$injector = ['$scope','$http','$modal'];
    godlampArtController.$injector = ['$scope','$http','$modal','FileUploader','$state'];
    function godlampController($scope, $http, $modal, FileUploader) {
        $scope.list_param = {'page':1,'count':10};
        $scope.getapi = function(page){
            $scope.list_param.page = page ? page : 1;
            var url = simpleCons.domain+'/manage/wish/template/list';
            $http.post(url, $scope.list_param)
                .success(function (json) {
                    if(json.code == 0 ){
                        $scope.wish_list = json.data.list;
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

        $scope.update_wish = function(obj_update, index){
            var parentScope = $scope;
            var modalInstance = $modal.open({
                templateUrl: 'update_wish.html',
                controller: function($scope,$modalInstance,FileUploader){
                    $scope.wish = {};
                    $scope.wish_param = {};
                    var uploader = $scope.uploader = new FileUploader({
                        url: '/qiniu/controller.php?action=uploadimage'
                    });
                    //获取pubdata
                    $scope.pubdata = parentScope.pubdata;
                    $scope.wish_param.activity_id = obj_update.activity_id;
                    $scope.wish_param.title = obj_update.activity_title;
                    $scope.wish_param.type = obj_update.activity_type;
                    $scope.wish_param.people_num = obj_update.people_num;
                    $scope.wish_param.url = obj_update.url;
                    $scope.wish.image = obj_update.pics[0].pic_url;
                    $scope.wish.width = obj_update.pics[0].pic_width;
                    $scope.wish.height = obj_update.pics[0].pic_height;
                    $scope.wish_param.pics_info = $scope.wish.image+','+$scope.wish.width+','+$scope.wish.height;


                    var update_url = simpleCons.domain + '/manage/wish/template/update';
                    $scope.ok = function(){
                        if(!$scope.wish.image ||$scope.wish.image== 'undefined' || $scope.wish.image == undefined){
                            $scope.addAlert('请上传封面图！');
                            return false;
                        }else if(!$scope.wish_param.title){
                            $scope.addAlert('请填写名称！');
                            return false;
                        }else if(!$scope.wish_param.type){
                            $scope.addAlert('请选择类型！');
                            return false;
                        }else if(!$scope.wish_param.people_num){
                            $scope.addAlert('请填写活动人数！');
                            return false;
                        }else if(!$scope.wish_param.url){
                            $scope.addAlert('请填写活动的URL！');
                            return false;
                        }
                        $http.post(update_url,$scope.wish_param)
                            .success(function (data) {
                                if (data.code == 0) {
                                    alert('更新成功！');
                                    $modalInstance.dismiss('ok');
                                } else {
                                    $scope.addAlert(data.msg);
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
                            $scope.wish.image = response.url;
                            $scope.wish.width = response.width;
                            $scope.wish.height = response.height;
                            $scope.wish_param.pics_info = $scope.wish.image+','+$scope.wish.width+','+$scope.wish.height;
                        }
                    };
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
    function godlampArtController($scope, $http, $modal, FileUploader, $state) {
        $scope.wish = {};
        $scope.wish_param = {};
        var uploader = $scope.uploader = new FileUploader({
            url: '/qiniu/controller.php?action=uploadimage'
        });

        $scope.save = function(){
            $scope.wish_param.pics_info = $scope.wish.image+','+$scope.wish.width+','+$scope.wish.height;
            if(!$scope.wish.image){
                $scope.addAlert('请上传封面图！');
                return false;
            }else if(!$scope.wish_param.title){
                $scope.addAlert('请填写名称！');
                return false;
            }else if(!$scope.wish_param.type){
                $scope.addAlert('请选择类型！');
                return false;
            }else if(!$scope.wish_param.people_num){
                $scope.addAlert('请填写活动人数！');
                return false;
            }else if(!$scope.wish_param.url){
                $scope.addAlert('请填写活动的URL！');
                return false;
            }

            var url = simpleCons.domain+'/manage/wish/template/post';
            $http.post(url, $scope.wish_param)
                .success(function (json) {
                    if(json.code == 0 ){
                        alert('发布成功');
                        $state.go('godlamp');
                    }else{
                        alert(json.msg);
                    }
                });
        }
        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 1;
            }
        });
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            if(response){
                $scope.wish.image = response.url;
                $scope.wish.width = response.width;
                $scope.wish.height = response.height;
            }
        };
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
    }
});
