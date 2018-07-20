define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {

    mod
        .directive('formDoubleDate', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModelStart: '=ngModelStart',
                    ngModelEnd: '=ngModelEnd',
                    ngModelTextStart: '@ngModelStart',
                    ngModelTextEnd: '@ngModelEnd',
                    textStart: '@',
                    textEnd: '@',
                    nameStart: '@',
                    nameEnd: '@',
                    required: '@',
                    callback: '&',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var nameStart = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelTextStart + '"');
                    var nameEnd = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelTextEnd + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_danger">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="col-sm-2 control-label">' + $scope.textStart + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<hjm_date ng-model="ngModelStart"' + required + disabledRole + ' ></hjm_date>' +

                            '<label class="col-sm-2 control-label">' + $scope.textEnd + required_span + '</label>' +
                            '<hjm_date ng-model="ngModelEnd"' + required + disabledRole + ' ></hjm_date>' +

                            '<input class="hide" ng-model="ngModelStart"' + nameStart + required + disabledRole + '>' +
                            '<input class="hide" ng-model="ngModelEnd"' + nameEnd + required + disabledRole + '>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelTextStart] && $scope.$parent.FormBody[$scope.ngModelTextEnd]) {
                            $scope.$parent.FormBody[$scope.ngModelTextStart].text = $scope.textStart || $scope.ngModelTextStart;
                            $scope.$parent.FormBody[$scope.ngModelTextEnd].text = $scope.textEnd || $scope.ngModelTextEnd;
                        }
                    }, 0);
                }
            }
        })
        .directive('formDoubleDateTime', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModelStart: '=ngModelStart',
                    ngModelEnd: '=ngModelEnd',
                    ngModelTextStart: '@ngModelStart',
                    ngModelTextEnd: '@ngModelEnd',
                    textStart: '@',
                    textEnd: '@',
                    nameStart: '@',
                    nameEnd: '@',
                    required: '@',
                    callback: '&',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var nameStart = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelTextStart + '"');
                    var nameEnd = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelTextEnd + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_danger">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="col-sm-2 control-label">' + $scope.textStart + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<hjm_date_time ng-model="ngModelStart" ' + required + disabledRole + ' ></hjm_date_time>' +

                            '<label class="col-sm-2 control-label">' + $scope.textEnd + required_span + '</label>' +
                            '<hjm_date_time ng-model="ngModelEnd" ' + required + disabledRole + ' ></hjm_date_time>' +

                            '<input class="hide" ng-model="ngModelStart" text="aaa" ' + nameStart + required + disabledRole + '>' +
                            '<input class="hide" ng-model="ngModelEnd"' + nameEnd + required + disabledRole + '>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelTextStart] && $scope.$parent.FormBody[$scope.ngModelTextEnd]) {
                            $scope.$parent.FormBody[$scope.ngModelTextStart].text = $scope.textStart || $scope.ngModelTextStart;
                            $scope.$parent.FormBody[$scope.ngModelTextEnd].text = $scope.textEnd || $scope.ngModelTextEnd;
                        }
                    }, 0);
                }
            }
        })

})
