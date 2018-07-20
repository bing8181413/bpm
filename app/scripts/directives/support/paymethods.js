define([
  '../../directives/directives',
  '../../cons/simpleCons',
], function(mod, con) {
  mod.directive('paymethodsData', function($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
    return {
      restrict: 'EA',
      // transclude: true,
      template: $templateCache.get('app/' + con.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
      scope: {
        ngModel: '=ngModel',
        ngModelText: '@ngModel',
        text: '@',
        name: '@',
        required: '=',
        max: '@',
        callBack: '&',
        ngDisabled: '=',
      },
      link: function($scope, $element, $attrs, $ctrl) {
        $scope.tmp_url = 'app/' + con.support_path + 'paymethods/arrayData.html';
        $timeout(function() {
          var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
              (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
          var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
          var required = $scope.required ? (' required') : '';
          var required_span = $scope.required ? ('<span class="form_label_danger">*</span>') : '&nbsp;&nbsp;';
          var max = $scope.max ? (' max="' + $scope.max + '"') : '';
          var content = '<h3 class="row text-danger">调整完顺序or修改状态后 一定要提交才能生效</h3>';
          if (!$scope.text) {
            content += '<div class="col-sm-12 ">';
          } else {
            content += '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                '<div class="col-sm-8">';
          }
          $scope.config = {add: false, del: false};
          content += '<dnd-array class="row col-sm-8" ng-model="ngModel" ' + name + 'config= "config"' +
              required + max + disabledRole + '><div tmp-url="tmp_url" >ahaschool</div></dnd-array>';
          content += '</div>';
          $element.find('.form_element').html(content);
          $compile($element.contents())($scope);
        }, 0);
        $scope.change = function(item, index) {
          var obj = $scope.ngModel[index] || {};
          obj.enable == 1 ? obj.enable = 0 : obj.enable = 1;
        };
        $scope.$watch('ngModel', function(val) {
          if (!val || val && val.length == 0) {
            $scope.ngModel = [];
          } else {
            angular.forEach(val, function(v, k) {
              v.order_by = (k + 1);
            });
          }
        }, true);

      },
    };
  });
});
