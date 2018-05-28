define([
  '../../directives/directives',
  '../../cons/simpleCons',
], function(mod, simpleCons) {
  mod.directive('deleteData', function($state, $rootScope, $timeout, $templateCache, $compile, $timeout, widget, $uibModal) {
    return {
      restrict: 'EA',
      replace: false,
      transclude: true,
      scope: false,
      scope: {
        param: '=',
        config: '=',
        callback: '&',
      },
      template: '<a class="btn btn-rounded btn-sm {{config.class||\'btn-danger\'}}"  ng-bind="config.text||\'删除\'" ng-click="open();" ng-bind="config.text||\'删除\'">删除</a>',
      link: function($scope, $element, $attrs, $ctrl) {
        var superScope = $scope;
        var attrs = $attrs;
        $scope.open = function() {
          var modalInstance = $uibModal.open({
            template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'delete/delete-data.html'),
            controller: function($scope, $uibModalInstance, $timeout, $templateCache) {
              // console.log(superScope,attrs.$attr.callback);
              $scope.config = {
                url: superScope.config && superScope.config.url || '',
                tmp_url: superScope.config && superScope.config.tmp_url || '',
                method: superScope.config && superScope.config.method || 'delete',
                text: superScope.config && superScope.config.text || '删除',
                class: superScope.config && superScope.config.class || 'btn-danger',
              };
              $scope.param = superScope.param || {};
              $scope.getContentUrl = function() {
                return $scope.config.tmp_url;
              };
              $scope.del = function() {
                if (!$scope.config || !$scope.config.url) {
                  widget.msgToast('JS:API 接口未配置!');
                  return false;
                }
                widget.ajaxRequest({
                  url: $scope.config.url,
                  method: $scope.config.method,
                  scope: $scope,
                  data: $scope.param,
                  success: function(json) {
                    widget.msgToast($scope.config.text + '成功,请刷新查看');
                    if (attrs.$attr.callback) {
                      superScope.callback();
                    }
                    $scope.cancel();
                  },
                });
              };
              $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
              };
            },
            size: $scope.config && $scope.config.size || '',
          });
        };
      },
    };
  });

})
;
