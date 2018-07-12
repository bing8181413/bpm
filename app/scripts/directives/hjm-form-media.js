define([
    '../directives/directives',
    '../cons/simpleCons',
], function(mod, cons) {

    mod
        .directive('formMediaSingle', function($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    duration: '=',
                    text: '@',
                    name: '@',
                    required: '@',
                    callback: '&',
                    token: '@',
                    noLabel: '@',// 没有label
                    mediaType: '@',
                    // hideBar: '=',
                },
                link: function($scope, $element, $attrs, $ctrl) {
                    // <div form-media-single ng-model="item.body_value" no-label="true" media-type="audio" ng-if="optionType==3" text="语音"></div>
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = ' max="1" ';
                    var token = $scope.token ? (' token="' + $scope.token + '"') : (' token="activity"');
                    $scope.tmpNgModel = [];
                    $scope.$watch('ngModel', function(pic_url) {
                        if (!!pic_url) {
                            $scope.tmpNgModel = [{pic_url: pic_url, pic_width: 0, pic_height: 0, duration: $scope.duration}];
                        } else {
                            $scope.tmpNgModel = [];
                        }
                    }, true);

                    $scope.$watch('tmpNgModel', function(arr_pic_val) {
                        if ($scope.tmpNgModel && $scope.tmpNgModel[0] && $scope.tmpNgModel[0].pic_url) {
                            $scope.ngModel = $scope.tmpNgModel[0].pic_url;
                            console.log($scope.tmpNgModel[0]);
                            if ($scope.tmpNgModel[0].duration) {
                                $scope.duration = $scope.tmpNgModel[0].duration;
                            }
                        } else {
                            $scope.ngModel = null;
                        }

                    }, true);
                    $timeout(function() {
                        $scope.hideBar = [1, 1, 1, 1, 1];
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var uploadHtml =
                            '<show-upload-media-token media="tmpNgModel" hide-bar="hideBar" media-type="mediaType" duration="duration"  ' + name + max + required + disabledRole +
                            token +
                            '></show-upload-media-token>';
                        var content = '';
                        if ($scope.noLabel) {
                            content = uploadHtml + '<input class="hide" ng-model="ngModel" ' + max + name + disabledRole + required + '></div>';
                        } else {
                            content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                                '<div class="col-sm-8" style="">' + uploadHtml +
                                '<input class="hide" ng-model="ngModel" ' + max + name + disabledRole + required + '>' +
                                '</div>';
                        }
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        // console.log($scope.$parent.FormBody[$scope.ngModelText]);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);
                },
            };
        });

});
