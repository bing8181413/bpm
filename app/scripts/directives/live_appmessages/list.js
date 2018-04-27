define([
  '../../directives/directives',
  '../../cons/simpleCons',
], function(mod, con) {
  mod.directive('liveAppmessagesSend', function($templateCache, $filter, $compile, widget, $uibModal, $templateCache) {
    return {
      multiElement: true,
      restrict: 'AE',
      replace: false,
      scope: {
        data: '=',
      },
      template: '<a class="btn btn-success btn-rounded btn-sm pull-right" ng-click="send()">推送消息</a>',
      link: function($scope, $element, $attrs) {
        var supScope = $scope;
        $scope.send = function(status) {
          var modalInstance = $uibModal.open({
            template: function() {
              return $templateCache.get('app/' + con.live_path + 'appmessages/send.html');
            },
            controller: function($scope, $uibModalInstance) {
              $scope.param = {};
              $scope.submit = function() {
                console.log($scope.param);
                if (!confirm('确定要推送给全部用户这条消息吗？')) {
                  return false;
                }
                widget.ajaxRequest({
                  url: con.live_domain + '/live/appmessages/',
                  method: 'POST',
                  scope: $scope,
                  data: $scope.param,
                  success: function(json) {
                    widget.msgToast('发送成功,请刷新查看');
                    supScope.$parent.searchAction();
                    $scope.cancel();
                  },
                });
              };
              $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
              };
            },
            size: 'lg',
          });
        };
      },
    };
  });

});
