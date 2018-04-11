define([
  '../../directives/directives',
  '../../cons/simpleCons',
], function(mod, simpleCons) {
  mod
  // 取消订单
      .directive('skunoUpdate', function($templateCache, $filter, $compile, widget, $uibModal) {
        return {
          restrict: 'AE',
          replace: false,
          scope: {data: '='},
          template: '<a class="btn btn-rounded btn-sm" ng-class="{\'btn-success pull-right\':!data.id,\'btn-primary\':data.id}"' +
          ' ng-click="open()" ng-bind="data.id?\'更新\':\'关联skuno与视频组\'"></a>',
          link: function($scope, $element, $attrs) {
            var supscope = $scope;
            $scope.open = function() {
              var modalInstance = $uibModal.open({
                template: $templateCache.get('app/' + simpleCons.biz_path + 'market/skuno.html'),
                controller: function($scope, $uibModalInstance) {
                  if (supscope.data) {
                    $scope.param = supscope.data;
                  } else {
                    $scope.param = {};
                  }
                  $scope.submit = function() {
                    widget.ajaxRequest({
                      url: '/markets/skunos' + ($scope.param.id ? ('/' + $scope.param.id) : ''),
                      method: $scope.param.id ? 'PUT' : 'POST',
                      scope: $scope,
                      data: $scope.param,
                      success: function(json) {
                        widget.msgToast('操作成功,请刷新查看');
                        supscope.$parent.updateList();
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
  // 子订单
})
;
