// This is a file copied by your subgenerator
define([
  './../controllers'
  , '../../cons/simpleCons',
], function(mod, con) {
  mod.controller('recordRooms.updateController', updateController);

  updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout', '$q'];

  function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $timeout, $q) {
    if ($stateParams.id) {
      widget.ajaxRequest({
        url: con.live_domain + '/live/rooms/' + $stateParams.id,
        method: 'get',
        scope: $scope,
        data: {},
        success: function(json) {
          if ($state.current.name.indexOf('record_rooms.copy') > -1) { // 复制用的
            delete json.data.id;
            delete json.data.room_stream_id;
            delete json.data.room_no;
            delete json.data.created_at;
            delete json.data.updated_at;
            if (json.data.record) {
              delete json.data.record.id;
              delete json.data.record.room_id;
              delete json.data.record.play_count;
              delete json.data.record.thumbup_count;
              delete json.data.record.show_play_count;
              delete json.data.record.created_at;
              delete json.data.record.updated_at;
            }
            if (json.data.points) {
              angular.forEach(json.data.points, function(val, key) {
                delete val.id;
                delete val.created_at;
                delete val.room_id;
                delete val.updated_at;
                if (val.pics) {
                  angular.forEach(val.pics, function(v, k) {
                    delete v.created_at;
                    delete v.id;
                    delete v.imageable_id;
                    delete v.imageable_type;
                    delete v.pic_size;
                    delete v.qiniu_key;
                    delete v.status;
                    delete v.updated_at;
                  });
                }
              });
            }
          }
          json.data.order_by = Number(json.data.order_by);
          $scope.param = angular.copy(json.data);
        },
      });
    }

    $scope.getDuration = function() {
      var url = $scope.param.record && $scope.param.record.fluent_video_url || '';
      // var deferred = $q.defer();
      // var promise = deferred.promise;
      if (!url || url == '') {
        // deferred.reject('没有URL,不能提交!');
        widget.msgToast('没有URL,不能提交!');
      } else {
        widget.ajaxRequest({
          url: con.live_domain + '/live/rooms/duration',
          method: 'post',
          scope: $scope,
          data: {url: url},
          success: function(json) {
            $scope.param.video_seconds = json.data.duration;
            $scope.param.record.video_duration = json.data.duration;
            // deferred.resolve('success');
          },
          // failure: function (error) {
          // deferred.reject(error);
          // }
        });
      }
      // return promise;
    };

    $scope.submit = function(status) {
      // var watch_point_text = angular.element($scope.param.watch_point).text();
      // if (!watch_point_text || watch_point_text == '') {
      //     $scope.param.watch_point = '';
      // }
      $scope.param.type = 2;

      // console.log($scope.param);
      // return false;

      $scope.doSubmit(status);
      // $scope.getDuration().then(function (result) {
      //     $scope.doSubmit(status);
      // }, function (error) {
      //     widget.msgToast(error);
      // });
    };
    $scope.doSubmit = function(status) {
      widget.ajaxRequest({
        url: con.live_domain + '/live/rooms' + ($scope.param.id ? ('/' + $scope.param.id) : ''),
        method: $scope.param.id ? 'PUT' : 'POST',
        scope: $scope,
        data: $scope.param,
        success: function(json) {
          widget.msgToast('发布成功！');
          $state.go(con.state.main + '.record_rooms.list');
        },
      });
    };
  };
});
