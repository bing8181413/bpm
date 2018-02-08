define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {

    mod
        .directive('formInput', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                // require: '^?$parent',
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '@',
                    type: '@',
                    placeholder: '@',
                    maxlength: '@',
                    minlength: '@',
                    min: '@',
                    max: '@',
                    ngDisabled: '=',
                    labelWidth: '@',
                    contentWidth: '@',
                    formShowRole: '@',
                    requiredSpanShow: '=', //  用于展示必填符号 不能实际校验是否必填
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    // console.log('formElement', $scope, $attrs, $element, $ctrl);
                    // console.log($scope.ngModelText);
                    var labelWidth = $scope.labelWidth ? ('col-sm-' + $scope.labelWidth) : ('col-sm-2');
                    var contentWidth = $scope.contentWidth ? ('col-sm-' + $scope.contentWidth) :
                        ($scope.labelWidth ? ('col-sm-' + (10 - $scope.labelWidth)) : ('col-sm-8'));
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '' + '" ');
                    var required = $scope.required ? (' required') : '';
                    var required_span = ($scope.required || $scope.requiredSpanShow) ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var type = $scope.type ? (' type="' + $scope.type + '" ') : '';
                    var min = $scope.min ? (' min="' + $scope.min + '" ') : '';
                    var max = $scope.max ? (' max="' + $scope.max + '" ') : '';
                    var placeholder = $scope.placeholder ? (' placeholder="' + $scope.placeholder + '" ') : '';
                    var maxlength = $scope.maxlength ? (' maxlength="' + $scope.maxlength + '" ') : '';
                    var minlength = $scope.minlength ? (' minlength="' + $scope.minlength + '" ') : '';
                    var formShowRole = $scope.formShowRole ? (' show-role="' + $scope.formShowRole + '" ') : '';
                    $scope.init = function () {
                        var disabledRole = '';
                        if ($scope.ngDisabled) {
                            disabledRole = ' disabled="true" ';
                        } else {
                            disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ? (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        }
                        var content = '<label class="' + labelWidth + ' control-label" ' + formShowRole + '>' + $scope.text + required_span + '</label>' +
                            '<div class="' + contentWidth + ' " ' + formShowRole + '>' +
                            '<input class="form-control" ng-model="ngModel"' + min + max +
                            type + name + placeholder + maxlength + minlength + required + disabledRole + '>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        // $scope.modelVal = $scope.ngModel;
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    };
                    $timeout(function () {
                        $scope.init();
                    }, 0);
                    $scope.$watch('ngDisabled', function () {
                        $scope.init();
                    });
                    $scope.$watch('ngModel', function (val) {
                        if ($scope.type == 'number' && $scope.max) {
                            (val > $scope.max) ? (val = $scope.max) : (angular.noop());
                        }
                    });
                    // $scope.$watch('modelVal', function (val) {
                    //     $scope.ngModel = val;
                    // });
                    // $scope.$watch($scope.ngModelText, function (val) {
                    //     if ($scope.type == 'number') {
                    //         $scope.ngModel = (parseFloat(val) || 0);
                    //     } else {
                    //         $scope.ngModel = val;
                    //     }
                    // });
                    // $scope.$watch('ngModel', function (val) {
                    //     if (val || val == 0) {
                    //         if ($scope.type == 'number') {
                    //             $scope.$eval($scope.ngModelText + '=' + (parseFloat(val) || parseFloat($scope.min) || 0) + '');
                    //         } else {
                    //             $scope.$eval($scope.ngModelText + '="' + val + '"');
                    //         }
                    //     }
                    // });
                }
            }
        })
        .directive('formTextarea', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
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
                    type: '@',
                    placeholder: '@',
                    ngMaxlength: '@max',
                    ngMinlength: '@min',
                    ngDisabled: '=',
                    rows: '=',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    // console.log('formElement', $scope, $attrs);
                    // console.log($scope.ngModelText);
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var type = $scope.type ? (' type="' + $scope.type + '"') : '';
                    var placeholder = $scope.placeholder ? (' placeholder="' + $scope.placeholder + '"') : '';
                    var ngMaxlength = $scope.ngMaxlength ? (' ng-maxlength="' + $scope.ngMaxlength + '"') : '';
                    var ngMinlength = $scope.ngMinlength ? (' ng-minlength="' + $scope.ngMinlength + '"') : '';
                    var rows = $scope.rows ? (' rows="' + $scope.rows + '"') : 'rows="5"';
                    var ngDisabled = $scope.ngDisabled && (' ng-disabled="ngDisabled"');
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<textarea class="form-control" ' + rows + ' ng-model="ngModel"' +
                            name + placeholder + ngMaxlength + ngMinlength + required + ngDisabled + disabledRole + '>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);
                }
            }
        })
        .directive('formSelect', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    default: '@',
                    text: '@',
                    name: '@',
                    required: '@',
                    source: '=',
                    needDefaultEmpty: '=?',
                    sourceApi: '@',
                    callback: '&',
                    ngDisabled: '=',
                    labelWidth: '@',
                    contentWidth: '@',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    // console.log('formElement', $scope, $attrs);
                    var labelWidth = $scope.labelWidth ? ('col-sm-' + $scope.labelWidth) : ('col-sm-2');
                    var contentWidth = $scope.contentWidth ? ('col-sm-' + $scope.contentWidth) :
                        ($scope.labelWidth ? ('col-sm-' + (10 - $scope.labelWidth)) : ('col-sm-8'));
                    var ngDisabled = $scope.ngDisabled ? (' disabled') : '';
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var type = ' type="radio"';
                    var optionDefault = '';
                    if (!$scope.needDefaultEmpty || $scope.needDefaultEmpty != false) {
                        optionDefault = '<option value="">--  请选择  --</option>';
                    }
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="' + labelWidth + ' control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="' + contentWidth + '">';
                        content += '<select class="form-control"' + name + ngDisabled + ' ng-model="ngModel" ' +
                            'ng-options="item.value as item.text for item in source">' + optionDefault +
                            // '<option value=undefined>--  请选择  --</option>' +
                            '</select>';
                        content += '<input class="hide" ng-model="ngModel" ' + name + disabledRole + required + '">'
                            + '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);
                }
            }
        })
        .directive('formRadio', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    default: '@',
                    text: '@',
                    name: '@',
                    required: '@',
                    source: '=',
                    sourceApi: '@',
                    type: '@?',
                    callback: '&',
                    ngDisabled: '=',
                    labelWidth: '@',
                    contentWidth: '@',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    if (!$scope.ngModel) {
                        $scope.ngModel = $scope.default;
                    }
                    // console.log('formElement', $scope, $attrs);
                    var labelWidth = $scope.labelWidth ? ('col-sm-' + $scope.labelWidth) : ('col-sm-2');
                    var contentWidth = $scope.contentWidth ? ('col-sm-' + $scope.contentWidth) :
                        ($scope.labelWidth ? ('col-sm-' + (10 - $scope.labelWidth)) : ('col-sm-8'));
                    var ngDisabled = $scope.ngDisabled ? (' disabled') : '';
                    var date = new Date().getTime();
                    var name = $scope.name ? (' name="' + $scope.name + date + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var type = ' type="radio"';
                    $scope.init = function () {
                        var disabledRole = '';
                        if ($scope.ngDisabled) {
                            disabledRole = ' disabled="true" ';
                        } else {
                            disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ? (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        }
                        // var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                        //     (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label  class="' + labelWidth + ' control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="' + contentWidth + '">';
                        angular.forEach($scope.source, function (val, key) {
                            var value = '';
                            if ($scope.type == 'number' || typeof val.value == 'number') {
                                var value = ' value = ' + val.value + '  ';
                            } else {
                                var value = ' value = "' + val.value + '"';
                            }
                            content += '<label class="radio-inline radio1" ng-class="{\'disabled\':ngDisabled}" ><input ' + type + ' ng-model="ngModel"' +
                                name + value + disabledRole + '><span></span>' + val.text + '</label>';
                        });
                        content += '<input class="hide" ng-model="ngModel" ' + name + required + '>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }
                    $timeout(function () {
                        $scope.init();
                    }, 0);
                    $scope.$watch('ngDisabled', function () {
                        $scope.init();
                    });
                }
            }
        })
        .directive('formCheckbox', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    default: '=',
                    text: '@',
                    name: '@',
                    required: '@',
                    source: '=',
                    type: '@?',
                    ngDisabled: '=',
                    // sourceApi: '=',
                    callback: '&',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var date = new Date().getTime();
                    var name = $scope.name ? (' name="' + $scope.name + date + '"') : (' name="' + $scope.ngModelText + date + '"');
                    var nickname = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var type = ' type="checkbox"';
                    $scope.init = function () {
                        var disabledRole = '';
                        if ($scope.ngDisabled) {
                            disabledRole = ' disabled="true" ';
                        } else {
                            disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ? (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        }
                        // var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                        //     (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">';
                        angular.forEach($scope.source, function (val, key) {
                            if ($scope.type == 'number') {
                                var value = val.value;
                            } else {
                                var value = "\'" + val.value + "\'";
                            }
                            content += '<label class="checkbox-inline checkbox1" ng-class="{\'disabled\':ngDisabled}" ><input ' + type + disabledRole + name +
                                ' ng-checked="isChecked(' + value + ')"' +
                                ' ng-click="updateSelection($event,' + value + ',' + key + ')"  ' +
                                '><span></span>' + val.text + '</label>';
                        });
                        content += '<div><input class="hide" ng-model="tmp_field" ' + nickname + required + disabledRole + '" /></div>';
                        // content += '<div form-input text="' + $scope.text + '" ng-model="tmp_field" ' + nickname + required + disabledRole + '"/></div>';
                        // content += '<div class="hide1" ng-bind="ngModel|json"></div>';
                        content += '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                            // console.log($scope.$parent.FormBody);
                        }
                    }
                    $scope.tmp_source = [];
                    $timeout(function () {
                        $scope.init();
                    }, 0);
                    $scope.$watch('ngDisabled', function () {
                        $scope.init();
                    });
                    $scope.$watch('source', function () {
                        $scope.init();
                    });

                    $scope.$watch('ngModel', function (val) {
                        // console.log('ngModel  ===', $scope.ngModel);
                        if (val && val.length > 0) {
                            $scope.tmp_field = true;
                        } else if (val) {
                            $scope.tmp_field = undefined;
                        } else if (!val) {
                            $scope.ngModel = $scope.default || [];
                        }
                        // console.log($scope.$parent.FormBody);
                    }, true);
                    $scope.isChecked = function (value) {
                        if ($scope.ngModel && $scope.ngModel.length > 0) {
                            return $scope.ngModel && $scope.ngModel.indexOf(value) >= 0;
                        } else {
                            return false;
                        }
                    };

                    $scope.updateSelection = function ($event, value, key) {
                        $scope.ngModel = [];
                        var source_html = $('[' + name + ']');
                        angular.forEach(source_html, function (val, key) {
                            if (val.checked) {
                                $scope.ngModel.push($scope.source[key].value);
                            }
                        });
                    };


                }
            }
        })
        // .directive('formCheckbox', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
        //     return {
        //         restrict: 'EA',
        //         replace: true,
        //         template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
        //         scope: {
        //             ngModel: '=ngModel',
        //             ngModelText: '@ngModel',
        //             default: '=',
        //             text: '@',
        //             name: '@',
        //             required: '@',
        //             source: '=',
        //             // sourceApi: '=',
        //             callback: '&',
        //         },
        //         link: function ($scope, $element, $attrs, $ctrl) {
        //             // console.log($scope.ngModel);
        //             // console.log($scope.source);
        //             // console.log('formElement', $scope, $attrs);
        //             // if (!$scope.ngModelText) {
        //             //     return false;
        //             // }
        //             // var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
        //             var date = new Date().getTime();
        //             var name = $scope.name ? (' name="' + $scope.name + date + '"') : (' name="' + $scope.ngModelText + date + '"');
        //             var required = $scope.required ? (' required') : '';
        //             var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
        //             var type = ' type="checkbox"';
        //             $scope.tmp_source = [];
        //             $timeout(function () {
        //                 var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
        //                     (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
        //                 var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
        //                     '<div class="col-sm-8">';
        //                 angular.forEach($scope.source, function (val, key) {
        //                     $scope.source[key].checked = false;
        //                     content += '<label class="checkbox-inline checkbox1"><input ' + type + disabledRole +
        //                         ' ng-model="tmp_source[' + key + ']"' + name +
        //                         ' ng-true-value="\'' + val.value + '\'" ' +
        //                         ' ng-false-value="false" ' +
        //                         ' ng-checked = "source[' + key + '].checked" ' +
        //                         '><span></span>' + val.text + '</label>';
        //                 });
        //                 content += '<input class="hide" ng-model="ngModel"' + name + required + disabledRole + '>';
        //                 content += ' {{ngModel}}  </div>';
        //                 $element.find('.form_element').html(content);
        //                 $compile($element.contents())($scope);
        //                 if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
        //                     $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
        //                     // console.log($scope.$parent.FormBody);
        //                 }
        //                 console.log($scope.tmp_source, $scope.source, $scope.ngModelText, $scope.ngModel);
        //             }, 0);
        //             $scope.$watch($scope.ngModelText, function (val) {
        //                 // console.log('ngModelText', val);
        //                 console.log(1);
        //                 if (val && val.length == 0) {
        //                     $scope.ngModel = undefined;
        //                 } else {
        //                     $scope.ngModel = val || [];
        //                 }
        //             }, true);
        //
        //             $scope.$watch('tmp_source', function (val) {
        //                 // console.log('tmp_source',val);
        //                 console.log(2);
        //                 if (val) {
        //                     var mod_arr = [];
        //                     angular.forEach(val, function (v, k) {
        //                         if (v) mod_arr.push(v);
        //                     });
        //                     $scope.$eval($scope.ngModelText + '=' + JSON.stringify(mod_arr) + '');
        //                 } else {
        //                     $scope.$eval($scope.ngModelText + '=[]');
        //                 }
        //             }, true);
        //             $scope.$watch('ngModel', function (mod) {
        //                 // console.log('ngModel', mod);
        //                 console.log(3);
        //                 if (mod) {
        //                     angular.forEach($scope.source, function (source, key) {
        //                         $scope.source[key].checked = false;
        //                         $scope.tmp_source[key] = false;
        //                         angular.forEach(mod, function (mod_v, mod_k) {
        //                             if (source.value == mod_v) {
        //                                 // console.log(source.value,mod_v);
        //                                 $scope.source[key].checked = true;
        //                                 $scope.tmp_source[key] = source.value + '';
        //                             }
        //                         });
        //                     });
        //                     console.log(JSON.stringify(mod));
        //                     $scope.$eval($scope.ngModelText + '=' + JSON.stringify(mod) + '');
        //                 } else {
        //                     if (mod && mod.length == 0) {
        //                         $scope.ngModel = undefined;
        //                     }
        //                 }
        //             }, true);
        //         }
        //     }
        // })
        .directive('formImage', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout, formBody) {
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
                    min: '@',
                    max: '@',
                    callback: '&',
                    token: '@',
                    hideBar: '=',
                },
                link: function ($scope, $element, $attrs, $ctrl) {

                    var FormScope = formBody.getScope($scope);

                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var min = $scope.min ? (' min="' + $scope.min + '"') : '';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var token = $scope.token ? (' token="' + $scope.token + '"') : (' token="activity"');

                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var uploadHtml =
                            // $scope.token ?
                            '<show-upload-token images="ngModel" ng-model="ngModel"  hide-bar="hideBar"   ' + name + min + max + required + disabledRole + token + '></show-upload-token>';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8" style="">' + uploadHtml +
                            // '<input class="hide" ng-model="ngModel" ' + min + max + name + disabledRole + ' ng-minlength="' + ($scope.required ? 1 : 0) + '">' +
                            '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        // console.log($scope.$parent.FormBody[$scope.ngModelText]);
                        // console.log(formBody.getScope($scope));
                        if (FormScope && FormScope.FormBody && FormScope.FormBody[$scope.ngModelText]) {
                            FormScope.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                            valid_model();
                        } else if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);

                    var hasPic = function (modelValue, viewValue) {
                        var hasPicFlag = true;
                        var value = modelValue || viewValue;
                        if (!value || value.length == 0) {
                            hasPicFlag = false;
                        } else {
                            angular.forEach(value, function (v, k) {
                                if (!v || !v.pic_url) {
                                    hasPicFlag = false;
                                }
                            })
                        }
                        return hasPicFlag;
                    }
                    var times = 0;
                    var valid_model = function () {
                        if (($scope.min && ($scope.min > 0) || $scope.required) && FormScope.FormBody[$scope.ngModelText]) {
                            times++;
                            FormScope.FormBody[$scope.ngModelText].$setValidity('hasPic', hasPic($scope.ngModel));
                            if (FormScope.FormBody[$scope.ngModelText].$pristine && times > 1) {
                                FormScope.FormBody[$scope.ngModelText].$setDirty();
                            }
                        }
                    }
                    $scope.$watch('ngModel', function (val) {
                        valid_model();
                    }, true);

                    // $scope.$watch('ngModel', function (val) {
                    //     var tmp_pics_err = 0;
                    //     angular.forEach(val, function (v, k) {
                    //         if (!v.pic_url) {
                    //             tmp_pics_err++;
                    //         }
                    //     })
                    //     if (tmp_pics_err > 0) {
                    //         console.log('图片还没有完成上传');
                    //     }
                    // }, true);
                }
            }
        })
        .directive('formSources', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
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
                    type: '@',
                    // hideBar: '=',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var type = $scope.type ? (' type="' + $scope.type + '"') : '';
                    var token = $scope.token ? (' token="' + $scope.token + '"') : (' token="activity"');
                    $scope.hideBar = $scope.type != 1 ? [0, 0, 1, 1] : $scope.hideBar;
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var uploadHtml =
                            // $scope.token ?
                            '<hjm-upload-source sources="ngModel" hide-bar="hideBar"   ' + type + name + max + required + disabledRole + token + '></hjm-upload-source>';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8" style="border: 1px #ccc dashed;">' + uploadHtml +
                            '<input class="hide" ng-model="ngModel" ' + max + name + disabledRole + ' ng-minlength="' + ($scope.required ? 1 : 0) + '">' +
                            '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
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
        .directive('formMedia', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
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
                    token: '@'
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var token = $scope.token ? (' token="' + $scope.token + '"') : (' token="resource"');

                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var uploadHtml =
                            '<show-upload-media-token media="ngModel" ' + name + max + required + disabledRole + token + '></show-upload-media-token>';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8" style="border: 1px #ccc dashed;">' + uploadHtml +
                            '<input class="hide" ng-model="ngModel" ' + max + name + disabledRole + ' ng-minlength="' + ($scope.required ? 1 : 0) + '">' +
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
        .directive('formApk', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
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
                    callback: '&',
                    token: '@',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = ' max="1" ';
                    var token = $scope.token ? (' token="' + $scope.token + '"') : (' token=""');
                    $scope.tmpNgModel = [];
                    $scope.$watch('ngModel', function (url) {
                        if (!!url) {
                            $scope.tmpNgModel = [{
                                pic_url: url,
                                pic_width: 100,
                                pic_hight: 100,
                                updated_at: new Date()
                            }];
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
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var uploadHtml =
                            '<show-upload-apk-token apk="tmpNgModel" ' + name + max + required + disabledRole + token + '></show-upload-apk-token>';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8" style="border: 1px #ccc dashed;">' + uploadHtml +
                            '<input class="hide" ng-model="ngModel" ' + max + name + disabledRole + ' ng-minlength="' + ($scope.required ? 1 : 0) + '">' +
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
        .directive('formImageContent', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
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
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            // '<content_or_img ng-model="ngModel"' + name + required + disabledRole + '></content_or_img>' +
                            '<rich-content-or-img ng-model="ngModel"' + name + required + disabledRole + '></rich-content-or-img>' +
                            // '<content_or_img ng-model="' + $scope.ngModelText + '"' + name + required + disabledRole + '></content_or_img>' +
                            '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);

                }
            }
        })
        .directive('formRichText', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout, $sce) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=',
                    ngModelText: '@ngModel',
                    text: '@',
                    required: '@',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var required = $scope.required ? (' ng-required="true" ') : '';
                    $timeout(function () {
                        $scope.simditorConfig = {placeholder: ''};
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<simditor ng-model="ngModel" config="simditorConfig" ' + required + '></simditor>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                        $scope.$watch('ngModel', function (newVal) {
                            if ($scope.required) {
                                var text = $element.find('.simditor-body').text();
                                $scope.$parent.FormBody[$scope.ngModelText].$setViewValue(newVal);
                                if (text.trim() === "") {
                                    $scope.$parent.FormBody[$scope.ngModelText].$setValidity("required", false);
                                } else {
                                    $scope.$parent.FormBody[$scope.ngModelText].$setValidity("required", true);
                                }
                            }
                        }, true);
                    }, 0);
                }
            }
        })
        .directive('formRichContent', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout, $sce) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=',
                    ngModelText: '@ngModel',
                    text: '@',
                    // name: '@',
                    required: '@',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var required = $scope.required ? (' required') : '';
                    $scope.editorConfig = {
                        // focus: true, //自动把光标放到UEditor中。测试config配置。 实际情况要删掉 容易误操作填入文本内容
                        allowDivTransToP: false, //DIV 自动替换 为其他标签
                    }
                    $timeout(function () {
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<ueditor config="editorConfig" ng-model="ngModel">' +
                            '</ueditor>' +
                            '<input class="hide" ng-model="ngModel"' + name + required + '>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    });
                }
            }
        })
        .directive('formDateTime', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
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
                    callback: '&',
                    ngDisabled: '@',
                    showtip: '@',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var showtip = $scope.showtip ? (' showtip="' + $scope.showtip + '"') : '';
                    $timeout(function () {
                        var disabledRole = $scope.ngDisabled ? (' disabled-role="aaaaaaaaa"') :
                            (($scope.$parent && $scope.$parent.disabledRole) ?
                                (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ');
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<hjm_date_time ng-model="ngModel"' + required + disabledRole + showtip + '></hjm_date_time>' +
                            '<input class="hide" ng-model="ngModel"' + name + required + disabledRole + '>' +
                            '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);
                }
            }
        })
        .directive('formDate', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
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
                    callback: '&',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<hjm_date ng-model="ngModel"' + required + disabledRole + ' ></hjm_date>' +
                            '<input class="hide" ng-model="ngModel"' + name + required + disabledRole + '>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);

                    // $scope.$watch($scope.ngModelText, function (modelNew) {
                    //     $scope.ngModel = modelNew;
                    // });
                    // $scope.$watch('ngModel', function (val) {
                    //     if (val) {
                    //         $scope.$eval($scope.ngModelText + '="' + val + '"');
                    //     } else {
                    //         $scope.$eval($scope.ngModelText + '=' + undefined + '');
                    //     }
                    // });
                }
            }
        })
        .directive('formTable', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    columns: '=',
                    config: '=?config',
                    text: '@',
                    name: '@',
                    required: '=',
                    max: '@',
                    callBack: '&',
                    ngDisabled: '='
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    $timeout(function () {
                        var columns = $scope.columns ? (' columns="columns" ') : ('');
                        if ($scope.ngDisabled) {
                            // || $scope.$parent && $scope.$parent.disabledRole
                            $scope.config = $scope.config || {};
                            angular.extend($scope.config, {readonly: true});
                        }
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var config = $scope.config ? (' config=' + JSON.stringify($scope.config) + '') : ('');
                        var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                        var required = $scope.required ? (' required') : '';
                        var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                        var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                        var content = '';
                        if (!$scope.text) {
                            content = '<div class="col-sm-12 ">';
                        } else {
                            content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                                '<div class="col-sm-8">';
                        }
                        if ($scope.columns) {
                            content += '<json-table ng-model="ngModel" ' + columns + config + name +
                                required + max + disabledRole + '></json-table>';
                            // console.log(content);
                        }
                        // content += '<input class="hide" ng-model="ngModel"' + name + required + '>' ;
                        content += '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        // console.log($scope.$parent.FormBody[$scope.ngModelText]);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);
                    $scope.$watch('ngModel', function (val) {
                        // 简单区分数据是否填写 要是length 为0 就置为undefined 这样require就起作用了
                        if (val && val.length == 0) {
                            $scope.ngModel = [];
                        }
                    }, true);

                }
            }
        })
        .directive('formErrorBlock', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-err-block.html'),
                // scope: {
                //     ngModel: '=ngModel'
                // },
                link: function ($scope, $element, $attrs, $ctrl) {

                }
            }
        })
        .directive('formAddress', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
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
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';

                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var uploadHtml =
                            '<show-addresses addresses="ngModel"   ' + name + max + required + disabledRole + '></show-addresses>';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' + uploadHtml +
                            '<input class="hide" ng-model="ngModel" ' + max + name + disabledRole + ' ng-minlength="' + ($scope.required ? 1 : 0) + '">' +
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
