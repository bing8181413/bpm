// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('activemodController', activemodController)
        .controller('updateActivemodController', updateActivemodController)
        .controller('publishController', publishController)
        .controller('updateActivemodPicsController', updateActivemodPicsController);
    mod.directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {;
                    //赋值给原数据
                    params.itemobj.width = this.width;
                    params.itemobj.height = this.height;

                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    width = width<=250?width:250;
                    height = width<=250?height:(this.height / this.width * width);
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);
    activemodController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state'];
    updateActivemodController.$injector = ['$scope', '$http', '$modalInstance', '$modal', 'FileUploader', 'activity'];
    publishController.$injector = ['$scope', '$http', '$modalInstance', '$modal','activity'];
    updateActivemodPicsController.$injector = ['$scope', '$http', '$modalInstance', '$modal', 'FileUploader', 'activity'];
    function updateActivemodPicsController($scope, $http, $modalInstance, $modal, FileUploader,activity) {
        var uploaderActivity = $scope.uploaderActivity = new FileUploader({
            url: '/qiniu/controller.php?action=uploadimage'
        });
        $scope.active_param = {activity_id:activity.activity_id,pics_info:''};
        $scope.activedatail = activity;
        $scope.ok = function(){
            $scope.active_param.pics_info = '';
            for(var i=0;i<uploaderActivity.queue.length;i++){
                if(!uploaderActivity.queue[i].qiniu_url){
                    alert('还没有上传完图片'+uploaderActivity.queue[i].file.name+'请继续上传！');
                    return false;
                }
                $scope.active_param.pics_info += uploaderActivity.queue[i].qiniu_url+','+uploaderActivity.queue[i].width+','+uploaderActivity.queue[i].height+';';
            }
            angular.forEach(activity.pics, function(value, key){
                $scope.active_param.pics_info += value.pic_url+','+value.pic_width+','+value.pic_height+';';
            });

            if($scope.active_param.pics_info==''){
                alert( '请至少上传一张图片！');
            }

            var update_url = simpleCons.domain + '/manage/activity/template/update';
            $http.post(update_url,$scope.active_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('更新成功！');
                        $modalInstance.dismiss('cancel');
                    } else {
                        alert(data.msg);
                    }
                });
        }
        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        }

        // FILTERS
        uploaderActivity.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        uploaderActivity.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 9-activity.pics.length;
            }
        });
        uploaderActivity.onSuccessItem = function(fileItem, response, status, headers) {
            if(response){
                if(response.code==1001){
                    alert(response.msg);
                    fileItem.qiniu_url == '';
                    fileItem.isReady = false;
                    return false;
                }
                fileItem.qiniu_url = response.url;
            }
        };
    }
    function publishController($scope, $http, $modalInstance, $modal, activity) {
            $scope.activepublish_param = {
                activity_id :activity.activity_id
            };
            // 获取公共数据
            $scope.ok = function(){
                var detail_url = simpleCons.domain + '/manage/activity/template/publish';
                $http.post(detail_url,$scope.activepublish_param)
                    .success(function (data) {
                        if (data.code == 0) {
                            alert('发布成功，刷新页面查看更新的数据');
                            $modalInstance.close('OK');
                        } else {
                            alert(data.msg);
                        }
                    });
            }
            $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
            }
    }
    function updateActivemodController($scope, $http, $modalInstance, $modal, FileUploader,activity) {
            $scope.activeUpdate_param = {
                activity_id :activity.activity_id,
                title :activity.activity_title,
                time : activity.activity_time,
                end_time : activity.activity_end_time,
                addr : activity.activity_addr,
                addr_ex : activity.activity_addr_ex,
                people_num : activity.people_num,
                people_num_ex : activity.people_num_ex,
                age_range : activity.age_range,
                type : activity.activity_type,
                apply_range : activity.apply_range,
                cost : activity.activity_cost,
                rule : activity.activity_rule,
                note : activity.activity_note
            };
            $scope.strToDateTime = function(str)
            {
                str=str.toString();
                str =  str.replace(/-/g,"/");
                var oDate = new Date(str);
                return oDate;
            }
            // 页面展示的数据
            $scope.activemod = {start:{},end:{}};
            $scope.openedstart = false;
            $scope.openedend = false;
            $scope.activemod.start.dt = $scope.strToDateTime(activity.activity_time);
            $scope.activemod.start.tp = $scope.strToDateTime(activity.activity_time);
            $scope.activemod.end.dt   = $scope.strToDateTime(activity.activity_end_time);
            $scope.activemod.end.tp   = $scope.strToDateTime(activity.activity_end_time);
            $scope.changed = function(){
                var start = {
                    dt:$scope.activemod.start.dt,
                    tp:$scope.activemod.start.tp
                };
                var end = {
                    dt:$scope.activemod.end.dt,
                    tp:$scope.activemod.end.tp
                };
                $scope.activeUpdate_param.time = (start.dt.getFullYear() + '-'+(start.dt.getMonth() + 1)
                + '-'+start.dt.getDate() +' '+start.tp.getHours()+':'+start.tp.getMinutes()+':00')
                    .replace(/([\-\: ])(\d{1})(?!\d)/g,'$10$2');
                $scope.activeUpdate_param.end_time = (end.dt.getFullYear() + '-'+(end.dt.getMonth() + 1)
                + '-'+end.dt.getDate() +' '+end.tp.getHours()+':'+end.tp.getMinutes()+':00')
                    .replace(/([\-\: ])(\d{1})(?!\d)/g,'$10$2');
                //console.log($scope.activeUpdate_param.time + '==========' +$scope.activeUpdate_param.end_time );
            };
            $scope.changed();
            $scope.openstart = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.openedstart = true;
            };
            $scope.openend = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.openedend = true;
            };

            $scope.ok = function(){
                var detail_url = simpleCons.domain + '/manage/activity/template/update';
                $http.post(detail_url,$scope.activeUpdate_param)
                    .success(function (data) {
                        if (data.code == 0) {
                            alert('更新成功，刷新页面查看更新的数据');
                            $modalInstance.close('OK');
                        } else {
                            alert(data.msg);
                        }
                    });
            }
            $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
            }
    }
    function activemodController($scope, $http, $rootScope, $modal, FileUploader, $state) {
        var uploader = $scope.uploader = new FileUploader({
            url: '/qiniu/controller.php?action=uploadimage'
        });
        $scope.pubdata = '';
        $scope.list_param = {page:1,count:20};
        $scope.list_param.keyword = $scope.search;
        var list_url = simpleCons.domain + '/manage/activity/template/list';
        $scope.getapi = function(page){
            $scope.list_param.page = page?page:$scope.list_param.page;
            $http.post(list_url,$scope.list_param)
                .success(function (data) {
                    if (data.code == 0) {
                        $scope.active_list = data.data.list;
                        $scope.totalItems = data.data.total;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = page?page:$scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    } else {
                        $scope.addAlert(data.msg);
                    }
                });
        }
        $scope.getapi(1);
        $rootScope.searchkeyword = function(event){
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }
        var del_activemod_url = simpleCons.domain + '/manage/activity/template/del';
        $scope.del_activemod = function(activity_id,index){
            if(!confirm('是否删除此模板')){
                return false;
            }
            $http.post(del_activemod_url,{activity_id:activity_id})
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.active_list.splice(index, 1);
                        alert('删除成功');
                    } else {
                        alert(json.msg);
                    }
                });
        }

        $scope.publish = function(activity,index){
            var modalInstance = $modal.open({
                templateUrl: 'publish.html',
                controller: 'publishController',
                size: '',
                resolve: {
                    activity: function () {
                        return activity;
                    }
                }
            });
        }
        $scope.update_detail = function(activity,index){
            var modalInstance = $modal.open({
                templateUrl: 'updateActivity.html',
                controller: 'updateActivemodController',
                size: 'lg',
                resolve: {
                    activity: function () {
                        return activity;
                    }
                }
            });
        }
        $scope.update_activitypic = function(activity,index){
            var modalInstance = $modal.open({
                templateUrl: 'updateActivityPics.html',
                controller: 'updateActivemodPicsController',
                size: 'lg',
                resolve: {
                    activity: function () {
                        return activity;
                    }
                }
            });
        }
        $scope.detail = function(activity_id){
            var modalInstance = $modal.open({
                templateUrl: 'activedatail.html',
                controller: function($scope,$modalInstance){
                    var detail_url = simpleCons.domain + '/manage/activity/template/detail';
                    $http.post(detail_url,{activity_id:activity_id})
                        .success(function (data) {
                            if (data.code == 0) {
                                $scope.activedatail = data.data;
                            } else {
                                $scope.addAlert(data.msg);
                            }
                        });
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: 'lg'
            });
        }
        // 提交的参数
        $scope.activemod_param = {
            title : '',
            //time : '',
            addr : '',
            addr_ex : '',
            people_num : '',
            people_num_ex : '',
            age_range : '',
            type : '',
            apply_range : '',
            cost : '',
            pics_info : '',
            rule : '',
            note : '',
            time : '',
            end_time : ''

        };
        // 页面展示的数据
        $scope.activemod = {start:{},end:{}};
        $scope.openedstart = false;
        $scope.openedend = false;
        $scope.activemod.start.dt = new Date();
        $scope.activemod.start.tp = new Date();
        $scope.activemod.end.dt = new Date();
        $scope.activemod.end.tp = new Date();
        $scope.format = 'yyyy-MM-dd';
        $scope.hstep = 1;
        $scope.mstep = 5;
        $scope.changed = function(){
            var start = {
                dt:$scope.activemod.start.dt,
                tp:$scope.activemod.start.tp
            };
            var end = {
                dt:$scope.activemod.end.dt,
                tp:$scope.activemod.end.tp
            };
            $scope.activemod_param.time = (start.dt.getFullYear() + '-'+(start.dt.getMonth() + 1)
                + '-'+start.dt.getDate() +' '+start.tp.getHours()+':'+start.tp.getMinutes()+':00')
                .replace(/([\-\: ])(\d{1})(?!\d)/g,'$10$2');
            $scope.activemod_param.end_time = (end.dt.getFullYear() + '-'+(end.dt.getMonth() + 1)
                + '-'+end.dt.getDate() +' '+end.tp.getHours()+':'+end.tp.getMinutes()+':00')
                .replace(/([\-\: ])(\d{1})(?!\d)/g,'$10$2');
            //console.log($scope.activemod_param.time + '==========' +$scope.activemod_param.end_time );
        };
        $scope.changed();
        $scope.openstart = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedstart = true;
        };
        $scope.openend = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedend = true;
        };
        $scope.save = function(){
            var param_tmp = 0;
            $scope.activemod_param.pics_info = '';
            for(var i=0;i<uploader.queue.length;i++){
                if(!uploader.queue[i].qiniu_url){
                    param_tmp ++;
                    alert('还没有上传完图片'+uploader.queue[i].file.name+'请继续上传！');
                    return false;
                }
                $scope.activemod_param.pics_info += uploader.queue[i].qiniu_url+','+uploader.queue[i].width+','+uploader.queue[i].height+';';
            }
            angular.forEach($scope.activemod_param, function(value, key) {
                eval('$scope.activemod.' + key + '=0' )
                if(key != 'pics_info' && key != 'time' && key != 'addr_ex' && key != 'people_num_ex' && value==''){
                    param_tmp ++;
                    $scope.addAlert( '有必填项未填写！');
                    eval('$scope.activemod.' + key + '=1' )
                }else if(key == 'pics_info' && value==''){
                    param_tmp ++;
                    $scope.addAlert( '请至少上传一张图片！');
                }
            });
            if(param_tmp>0){
                return false;
            }
            var url = simpleCons.domain + '/manage/activity/template/post';
            //console.log($scope.activemod_param);
            $http.post(
                url,
                $scope.activemod_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('模板发布成功！');
                        $state.go('activemod');
                    } else {
                        $scope.addAlert(data.msg);
                    }
                });
        }
        // FILTERS
        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 9;
            }
        });
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            if(response){
                if(response.code==1001){
                    alert(response.msg);
                    fileItem.qiniu_url == '';
                    fileItem.isReady = false;
                    return false;
                }
                fileItem.qiniu_url = response.url;

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
    };
});
