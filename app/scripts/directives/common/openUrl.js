define([
  '../../directives/directives',
  '../../cons/simpleCons',
], function(mod, simpleCons) {
  mod.directive('openUrl', function($state, $rootScope, $timeout, $templateCache, $compile, $timeout, widget, $uibModal) {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      scope: {
        openUrl: '='
      },
      template: '<a class="btn btn-primary btn-rounded btn-sm" ng-click="open();" uib-tooltip="{{openUrl}}"><ng-transclude></ng-transclude></a>',
      link: function($scope, $element, $attrs, $ctrl) {
        $scope.open = function() {
          window.open($scope.openUrl);
        };
      },
    };
  });
});
