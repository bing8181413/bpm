// This is a file copied by your subgenerator
define([
  './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('activityController', activityController);
    activityController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader'];
  function activityController($scope, $http, $rootScope,  $modal, FileUploader){
      $scope.pubdata = '';
      $scope.list_param = {page:1,count:20,has_apply:1};
      $scope.list_param.keywords = $scope.search;
      var list_url = simpleCons.domain + '/manage/activity/list';
      $scope.getapi = function(page,has_apply){
          $scope.list_param.page = page?page:$scope.list_param.page;
          $scope.list_param.has_apply = has_apply?has_apply:$scope.list_param.has_apply;
          $scope.list_param.keywords = $scope.search;
          $http.post(list_url,$scope.list_param)
              .success(function (data) {
                  if (data.code == 0) {
                      $scope.activity_list = data.data.list;
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
      $scope.update_detail = function(activity){
          var modalInstance = $modal.open({
              templateUrl: 'activitydatail.html',
              controller: function($scope,$modalInstance){
                  console.log(activity);
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
                  $scope.activeUpdate = {start:{},end:{}};
                  $scope.openedstart = false;
                  $scope.openedend = false;
                  $scope.activeUpdate.start.dt = $scope.strToDateTime(activity.activity_time);
                  $scope.activeUpdate.start.tp = $scope.strToDateTime(activity.activity_time);
                  $scope.activeUpdate.end.dt   = $scope.strToDateTime(activity.activity_end_time);
                  $scope.activeUpdate.end.tp   = $scope.strToDateTime(activity.activity_end_time);
                  $scope.changed = function(){
                      var start = {
                          dt:$scope.activeUpdate.start.dt,
                          tp:$scope.activeUpdate.start.tp
                      };
                      var end = {
                          dt:$scope.activeUpdate.end.dt,
                          tp:$scope.activeUpdate.end.tp
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
                      var detail_url = simpleCons.domain + '/manage/activity/update';
                      $http.post(detail_url,$scope.activeUpdate_param)
                          .success(function (data) {
                              if (data.code == 0) {
                                  alert('更新成功');
                                  $modalInstance.dismiss('cancel');
                              } else {
                                  alert(data.msg);
                              }
                          });
                  }
                  $scope.cancel = function(){
                      $modalInstance.dismiss('cancel');
                  }

              },
              size: 'lg'
          });
      }
      $scope.activitypic = function(activity){
          var modalInstance = $modal.open({
              templateUrl: 'activitypic.html',
              controller: function($scope,$modalInstance){
                  //console.log(activity.pics);
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

                      var update_url = simpleCons.domain + '/manage/activity/update';
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
              },
              size: 'lg'
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
