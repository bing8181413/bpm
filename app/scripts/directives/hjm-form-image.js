define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {

    mod
        .directive('formImageSingle', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '@',
                    max: '@',
                    callback: '&',
                    token: '@',
                    // hideBar: '=',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = ' max="1" ';
                    var token = $scope.token ? (' token="' + $scope.token + '"') : (' token="activity"');
                    $scope.tmpNgModel = [];
                    $scope.$watch('ngModel', function (url) {
                        if (!!url) {
                            $scope.tmpNgModel = [{pic_url: url, pic_width: 100, pic_hight: 100}];
                        } else {
                            $scope.tmpNgModel = [];
                        }
                    }, true);

                    $scope.$watch('tmpNgModel', function (arr_pic_val) {
                        if ($scope.tmpNgModel && $scope.tmpNgModel[0] && $scope.tmpNgModel[0].pic_url) {
                            $scope.ngModel = $scope.tmpNgModel[0].pic_url;
                        } else {
                            $scope.ngModel = null;
                        }

                    }, true);
                    $timeout(function () {
                        $scope.hideBar = [1, 1, 1, 1, 1];
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var uploadHtml =
                            '<show-upload-token images="tmpNgModel" hide-bar="hideBar"   ' + name + max + required + disabledRole + token + '></show-upload-token>';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8" style="">' + uploadHtml +
                            '<input class="hide" ng-model="ngModel" ' + max + name + disabledRole + required + '">' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        // console.log($scope.$parent.FormBody[$scope.ngModelText]);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);
                }
            }
        })

})
