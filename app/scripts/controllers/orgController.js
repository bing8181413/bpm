// This is a file copied by your subgenerator
define([
  './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
  mod.controller('orgController', orgController)
      .controller('verifyController', verifyController)
  mod.filter('verify_status',[function(){
        return function(val){
            return val==0?'未填写':val==1?'已填写':val==2?'申请中':val==3?'已验证':val==4?'不通过':'未知状态';
        }
    }]);

    orgController.$injector = ['$scope', '$http', '$rootScope', '$modal'];
    verifyController.$injector = ['$scope', '$http', '$modalInstance'];
  function orgController($scope, $http, $rootScope, $modal){
      $scope.tab = 0;
      mainscope = $scope;
      $scope.org_param = {};
      $scope.org_param.page = 1;
      $scope.org_param.count = 10;
      $scope.org_param.keyword = '';
      $scope.org_param.verify_status = 0;
      var list_url = simpleCons.domain + '/manage/plat/org_list';

      $scope.getapi = function(page,verify_status){
          $scope.org_param.verify_status = verify_status&&verify_status!=0?verify_status:verify_status==0?0:$scope.org_param.verify_status;
          $scope.org_param.page = page?page:$scope.org_param.page;
          $scope.org_param.keyword = $rootScope.search;
          $http.post(list_url,$scope.org_param)
              .success(function (data) {
                  if (data.code == 0) {
                      $scope.org_list = data.data.org_list;
                      $scope.totalItems = data.data.org_count;
                      $scope.currentPage = $scope.org_param.page;
                  }
              });
      }
      $scope.getapi();

      $scope.verify_community = function(org,main_index){
          var modalInstance = $modal.open({
              templateUrl: 'verify_community.html',
              controller: 'verifyController',
              size: 'lg',
              resolve: {
                  org: function () {
                      return org;
                  }
                  ,main_index: function () {
                      return main_index;
                  }
                  ,mainscope:function () {
                      return mainscope;
                  }
              }
          });
      }

      $scope.orgstatus = function(org_id, verify_status, main_index){
          if(window.confirm('确定要执行此操作吗?')) {
              var verify_status_url = simpleCons.domain + '/manage/plat/change_org';
              $http.post(verify_status_url, {org_id: org_id, verify_status: verify_status})
                  .success(function (json) {
                      if (json.code == 0) {
                          $scope.org_list.splice(main_index, 0);
                      } else {
                          alert(json.msg);
                      }
                  });
          }
      }

  };

    function verifyController($scope, $http, $modalInstance, org, mainscope, main_index){
        $scope.org = org;
        $scope.community_names_array = [];
        if($scope.org.community_names){
            $scope.community_names_toArray = $scope.org.community_names.split(",");
            for (community_name in $scope.community_names_toArray) {
                $scope.community_names_array.push({community_name: $scope.community_names_toArray[community_name],new_community : ''});
            }
        }else{
            $scope.community_names_toArray = [];
        }
        var verify_url = simpleCons.domain + '/manage/plat/search_community';
        $scope.search_community = function($index, parent_index, community){
            if(!$scope.community_names_array[parent_index].search_community_list == ''){
                $scope.community_names_array[parent_index].search_community_list = '';
                return false;
            }
            for(key in $scope.community_names_array){
                $scope.community_names_array[key].search_community_list = '';
            }
            $http.post(verify_url,{keyword:community})
                .success(function(json){
                    if(json.code==0){
                        $scope.community_names_array[parent_index].search_community_list = json.data.community_list;
                    }else {
                        alert(json.msg);
                    }
                });


        }
        $scope.select_community = function($index, parent_index, community){
            $scope.community_names_array[parent_index].new_community = community;
            $scope.community_names_array[parent_index].search_community_list = '';
        }
        $scope.OK = function(){
            var update_url = simpleCons.domain + '/manage/plat/change_org';
            $scope.community_names_new = [];
            for(key in $scope.community_names_array){
                if($scope.community_names_array[key].new_community==''){
                    alert('第'+(parseInt(key)+1)+'个小区:“ '+$scope.community_names_array[key].community_name+'” 没有验证成功');
                    return false;
                }
                $scope.community_names_new.push($scope.community_names_array[key].new_community);
            }
            $http.post(update_url,{org_id:org.org_id, community_names:$scope.community_names_new.toString()})
                .success(function(json){
                    if(json.code==0){
                        mainscope.org_list[main_index].community_names = $scope.community_names_new.toString();
                        $modalInstance.dismiss('cancel');
                    }else {
                        alert(json.msg);
                    }
                });
        }
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
});
