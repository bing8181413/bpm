define([
  '../../directives/directives',
  '../../cons/simpleCons',
], function(mod, simpleCons) {
  mod
  // 取消订单
      .directive('sqlsUpdate', function($templateCache, $filter, $compile, widget, $uibModal) {
        return {
          restrict: 'AE',
          replace: false,
          scope: {data: '='},
          template: '<a class="btn btn-rounded btn-sm" ng-class="{\'btn-success pull-right\':!data.id,\'btn-primary\':data.id}"' +
          ' ng-click="open()" ng-bind="data && data.id?\'更新\':\'新增\'"></a>',
          link: function($scope, $element, $attrs) {
            var supscope = $scope;
            $scope.open = function() {
              var modalInstance = $uibModal.open({
                template: $templateCache.get('app/' + simpleCons.biz_path + 'sqls/update.html'),
                controller: function($scope, $uibModalInstance) {
                  $scope.init = function() {
                    widget.ajaxRequest({
                      url: '/exports/sqls/' + supscope.data.id,
                      method: 'GET',
                      scope: $scope,
                      data: {},
                      success: function(json) {
                        $scope.param = angular.copy(json.data);
                      },
                    });
                  };
                  if (supscope.data && supscope.data.id) {
                    $scope.init();
                  } else {
                    $scope.param = {};
                  }
                  $scope.submit = function() {
                    widget.ajaxRequest({
                      url: '/exports/sqls' + ($scope.param.id ? ('/' + $scope.param.id) : ''),
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
});