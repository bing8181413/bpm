define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {

    mod
    // .directive('form', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
    //     return {
    //         restrict: 'EA',
    //         replace: true,
    //         template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form.html'),
    //         controller: ['$scope', function ($scope) {
    //             $scope.initTableRequestSend = false;//是否初始化过 table
    //
    //             $scope.modsconfs = angular.copy(cons.modsconfs);
    //             this.modsconfs = angular.extend({}, $scope.modsconfs);
    //             function buildRouter(config) {
    //                 var router = '';
    //                 if (config.route && config.route.length > 0) {
    //                     angular.forEach(config.route, function (router_val, router_key) {
    //                         router += '<a class="btn btn-success btn-rounded" ui-sref="' + router_val.value + '" >' + router_val.text + '</a>';
    //                     });
    //                     return '<div class="row"><div class="col-sm-12"><div class="panel panel-default"><div class="panel-body">' + router + '</div></div></div></div>';
    //                 }
    //                 return '';
    //             }
    //
    //             this.buildForm = function (columns, config) {
    //                 var rowDef = buildRows(columns, config);
    //                 var btnDef = buildBtn(columns, config);
    //                 return '<div class="panel panel-primary"><div class="panel-body">' + rowDef + ' </div></div>' + buildBtn;
    //             }
    //
    //             this.buildBtn = function (columns, config) {
    //
    //                 return '<div class="panel panel-primary"><div class="panel-body">' + rowDef + ' </div></div>' + buildBtn;
    //             }
    //
    //             function buildRows(columns, config) {
    //                 // console.log(arguments);
    //                 var useBindOnce = config.useBindOnce || 'bindonce';
    //                 var itemList = config.itemList || 'list';
    //                 var rowItemName = config.rowItemName || 'item';
    //                 var rowItem = '';
    //                 angular.forEach(columns, function (col) {
    //                     var cellContent = cellRender(col, rowItemName, useBindOnce);
    //                     var cssProperty = col.className ? ' class="' + col.className + '" ' : "";
    //                     rowItem += '<td' + cssProperty + '>' + cellContent + '</td>'
    //                 });
    //                 return '<tbody><tr ' + useBindOnce + ' ng-repeat="' + rowItemName + ' in ' + itemList + '">' + rowItem + '</tr></tbody>'
    //
    //             }
    //
    //             this.refreshCurrentView = function () {
    //                 $scope.searchParams = {};
    //             }
    //         }],
    //         scope: {
    //             modid: '@',
    //             config: '@',
    //             columns: '@'
    //         },
    //         link: function ($scope, $element, $attrs, $ctrl) {
    //             var columnsDef = '';
    //             var configDef = '';
    //             $scope.list = [];
    //             $scope.searchParams = {};
    //             $scope.filterParams = {};
    //             $scope.searchAction = function (searchParams) {
    //                 $log.info('当前查询条件 :', $scope.searchParams);
    //                 $scope.pageInfo.currentPage = 1;
    //                 $scope.updateList();
    //             }
    //             $scope.updateList = function () {
    //                 var pageInfo = {
    //                     page: $scope.pageInfo.currentPage || 1,
    //                     count: configDef.pageInfo.count || 1,
    //                 };
    //                 var searchItemsParamDefault = {};
    //                 angular.forEach(configDef.searchItems, function (searchItems_val, searchItems_key) {
    //                     if (searchItems_val.default) {
    //                         angular.forEach(configDef.searchItems, function (searchItems_val, searchItems_key) {
    //                             if (searchItems_val.default || searchItems_val.default == '') {
    //                                 eval('searchItemsParamDefault.' + searchItems_val.value + ' = ' + searchItems_val.default);
    //                             }
    //                         });
    //                     }
    //                 });
    //                 var searchParam = angular.extend({}, configDef.preSelectionSearch, searchItemsParamDefault, $scope.searchParams, pageInfo);
    //                 // console.log(configDef.pageInfo);
    //                 widget.ajaxRequest({
    //                     method: 'GET',
    //                     url: configDef.api,
    //                     scope: $scope,
    //                     data: searchParam,
    //                     success: function (json) {
    //                         $scope.list = json.list;
    //                         $scope.pageInfo.totalItems = ((json.count == 0) ? 0 : (json.count || $scope.pageInfo.totalItems));//获取总数
    //                     }
    //                 });
    //             }
    //             $scope.$watchCollection('[columns,config,modid]', function (gridDef) {
    //                     //这里初始化 执行一次 以后不会执行
    //                     if (gridDef) {
    //                         var modidDef = gridDef[2];
    //                         // console.log('$ctrl.modsconfs', $ctrl.modsconfs);
    //                         angular.forEach($ctrl.modsconfs, function (val, key) {
    //                             angular.forEach(val, function (v, k) {
    //                                 if (k == modidDef) {
    //                                     $scope.modDef = v;
    //                                     columnsDef = $scope.$eval('modDef.' + gridDef[0]);
    //                                     configDef = $scope.$eval('modDef.' + gridDef[1]);
    //                                     $scope.configDef = configDef;// 提供页面展示
    //                                 }
    //                             });
    //                             ;
    //                         })
    //                         if (!columnsDef || !configDef) {
    //                             $log.error('未找到modid为' + modidDef + '的config,请检查对应配置文件');
    //                             return false;
    //                         }
    //                         $scope.pageInfo = {
    //                             itemsPerPage: configDef.pageInfo.count,
    //                             maxSize: configDef.pageInfo.maxSize || 5,
    //                             currentPage: configDef.pageInfo.page,
    //                         }//初始化   开始监听  paginationInfo
    //                         $scope.searchItems = configDef.searchItems || [];
    //                         $ctrl.refreshCurrentView();
    //                         // configDef.refreshCurrentView = $scope.refreshCurrentView;
    //                         var routerBar = $ctrl.buildRouter(configDef, $element);
    //                         var formContent = $ctrl.buildForm(columnsDef, configDef);
    //                         // console.log(searchBar);
    //                         $element.find('.routerSection').html(routerBar);
    //                         $element.find(".formSection").html(formContent);
    //                         $compile($element.contents())($scope);
    //                         $scope.updateList();
    //                     }
    //                 }
    //             );
    //         }
    //     };
    // })
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
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    // console.log('formElement', $scope, $attrs, $element, $ctrl);
                    // console.log($scope.ngModelText);
                    var labelWidth = $scope.labelWidth ? ('col-sm-' + $scope.labelWidth) : ('col-sm-2');
                    var contentWidth = $scope.contentWidth ? ('col-sm-' + $scope.contentWidth) :
                        ($scope.labelWidth ? ('col-sm-' + (10 - $scope.labelWidth)) : ('col-sm-8'));
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var ngDisabled = $scope.ngDisabled ? (' disabled') : '';
                    var type = $scope.type ? (' type="' + $scope.type + '"') : '';
                    var min = $scope.min ? (' min="' + $scope.min + '"') : '';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var placeholder = $scope.placeholder ? (' placeholder="' + $scope.placeholder + '"') : '';
                    var maxlength = $scope.maxlength ? (' maxlength="' + $scope.maxlength + '"') : '';
                    var minlength = $scope.minlength ? (' minlength="' + $scope.minlength + '"') : '';
                    var err_show = ($scope.name || $scope.ngModelText) ?
                        ('<span class="glyphicon glyphicon-ok form-control-feedback"' +
                        'ng-show="$parent.FormBody[\'' + ($scope.name || $scope.ngModelText) +
                        '\'].$viewValue && $parent.FormBody[\'' + ($scope.name || $scope.ngModelText) +
                        '\'].$dirty && $parent.FormBody[\'' + ($scope.name || $scope.ngModelText) + '\'].$valid">' +
                        '</span>') : '';
                    // err_show += '{{$parent.FormBody["' + ($scope.name || $scope.ngModelText) +
                    //     '"]}}=============={{$parent.FormBody["' + ($scope.name || $scope.ngModelText) +
                    //     '"].$dirty}}========={{$parent.FormBody["' + ($scope.name || $scope.ngModelText) + '"].$valid}}';
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var content = '<label class="' + labelWidth + ' control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="' + contentWidth + '">' +
                            '<input class="form-control" ng-model="' + $scope.ngModelText + '"' + min + max +
                            type + name + placeholder + maxlength + minlength + required + disabledRole + ngDisabled + '>' +
                            err_show + '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                    }, 0);
                    $scope.$watch($scope.ngModelText, function (val) {
                        if ($scope.type == 'number') {
                            $scope.ngModel = (parseFloat(val) || 0);
                        } else {
                            $scope.ngModel = val;
                        }
                    });
                    $scope.$watch('ngModel', function (val) {
                        if (val || val == 0) {
                            if ($scope.type == 'number') {
                                $scope.$eval($scope.ngModelText + '=' + (parseFloat(val) || parseFloat($scope.min) || 0) + '');
                            } else {
                                $scope.$eval($scope.ngModelText + '="' + val + '"');
                            }
                        }
                    });
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
                    var ngDisabled = $scope.ngDisabled && (' ng-disabled="ngDisabled"');
                    var err_show = ($scope.name || $scope.ngModelText) ?
                        ('<span class="glyphicon glyphicon-ok form-control-feedback"' +
                        'ng-show="$parent.form[\'' + ($scope.name || $scope.ngModelText) +
                        '\'].$viewValue && $parent.form[\'' + ($scope.name || $scope.ngModelText) +
                        '\'].$dirty && $parent.form[\'' + ($scope.name || $scope.ngModelText) + '\'].$valid">' +
                        '</span>') : '';
                    // err_show += '{{$parent.form["' + ($scope.name || $scope.ngModelText) +
                    //     '"]}}=============={{$parent.form["' + ($scope.name || $scope.ngModelText) +
                    //     '"].$dirty}}========={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"].$valid}}';
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<textarea class="form-control" rows="5" ng-model="' + $scope.ngModelText + '"' +
                            name + placeholder + ngMaxlength + ngMinlength + required + ngDisabled + disabledRole + '>' +
                            err_show + '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                    }, 0);

                    $scope.$watch($scope.ngModelText, function (val, oldVal) {
                        $scope.ngModel = val;
                    });
                    $scope.$watch('ngModel', function (val, oldVal) {
                        if (val) {
                            $scope.$eval($scope.ngModelText + '="' + val + '"');
                        } else {
                            $scope.$eval($scope.ngModelText + '=""');
                        }
                    });
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
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var type = ' type="radio"';
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="' + labelWidth + ' control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="' + contentWidth + '">';
                        content += '<select class="form-control"' + name + ' ng-model="' + $scope.ngModelText + '" ' +
                            'ng-options="item.value as item.text for item in source">' +
                            '<option value="">--  请选择  --</option>' +
                            '</select>';
                        content += '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                    }, 0);
                    $scope.$watch($scope.ngModelText, function (val) {
                        // console.log('ngModelText ' + $scope.ngModelText, typeof  val, val);
                        if (typeof val == 'number') {
                            $scope.ngModel = parseFloat(val);
                        } else {
                            $scope.ngModel = val;
                        }
                    }, true);
                    $scope.$watch('ngModel', function (val) {
                        // console.log('ngModel ' + $scope.ngModelText, typeof  val, val);
                        if (val || val == 0 || val == null || val == undefined) {
                            if (typeof val == 'number') {
                                $scope.$eval($scope.ngModelText + '=' + parseFloat(val) + '');
                            } else if (val == null) {
                                $scope.$eval($scope.ngModelText + '=""');
                            } else {
                                $scope.$eval($scope.ngModelText + '="' + val + '"');
                            }
                        }
                    }, true);
                    $scope.$watch('default', function (val) {
                        // console.log('default ' + $scope.default, typeof  val, val);
                        if (typeof val == 'number') {
                            $scope.ngModel = parseFloat(val);
                        } else if (val == undefined) {
                            $scope.ngModel = undefined;
                        } else {
                            $scope.ngModel = val;
                        }
                    }, true);
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
                    callback: '&',
                    ngDisabled: '='
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    // console.log('formElement', $scope, $attrs);
                    var ngDisabled = $scope.ngDisabled ? (' disabled') : '';
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var type = ' type="radio"';
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">';
                        angular.forEach($scope.source, function (val, key) {
                            var value = '';
                            if (typeof val.value == 'number') {
                                value = ' value = "' + parseFloat(val.value) + '"';
                            } else {
                                value = ' value = \"' + val.value + '\"';
                            }
                            content += '<label class="radio-inline radio1"><input ' + type + ' ng-model="' +
                                $scope.ngModelText + '"' + name + value + disabledRole + ngDisabled + '><span></span>' + val.text + '</label>';
                        });
                        content += '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                    }, 0);
                    $scope.$watch($scope.ngModelText, function (val) {
                        // console.log('ngModelText ' + $scope.ngModelText, typeof  val, val);
                        if (typeof val == 'number') {
                            $scope.ngModel = parseFloat(val);
                        } else {
                            $scope.ngModel = val;
                        }
                    }, true);
                    $scope.$watch('ngModel', function (val) {
                        // console.log('ngModel ' + $scope.ngModelText, typeof  val, val);
                        if (val || val == 0) {
                            if (typeof val == 'number') {
                                $scope.$eval($scope.ngModelText + '=' + parseFloat(val) + '');
                            } else {
                                $scope.$eval($scope.ngModelText + '="' + val + '"');
                            }
                        }
                    }, true);
                    $scope.$watch('default', function (val) {
                        // console.log('default ' + $scope.default, typeof  val, val);
                        if (typeof val == 'number') {
                            $scope.ngModel = parseFloat(val);
                        } else {
                            $scope.ngModel = val;
                        }
                    }, true);
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
                    // sourceApi: '=',
                    callback: '&',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    // console.log($scope.source);
                    // console.log('formElement', $scope, $attrs);
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    // var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var type = ' type="checkbox"';
                    $scope.tmp_source = [];
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">';
                        angular.forEach($scope.source, function (val, key) {
                            $scope.source[key].checked = false;
                            content += '<label class="checkbox-inline checkbox1"><input ' + type + disabledRole +
                                ' ng-model="tmp_source[' + key + ']"' + name +
                                ' ng-true-value="\'' + val.value + '\'" ' +
                                ' ng-false-value="false" ' +
                                ' ng-checked = "source[' + key + '].checked" ' +
                                '><span></span>' + val.text + '</label>';
                        });
                        // content += '<input class="" ng-model="' + $scope.ngModelText + '"' + name + required +
                        //     disabledRole + ngDisabled + '>';
                        content += '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                    }, 0);
                    $scope.$watch($scope.ngModelText, function (val) {
                        // console.log('$scope.ngModelText', val);
                        $scope.ngModel = val || [];
                    }, true);

                    $scope.$watch('tmp_source', function (val) {
                        // console.log(val);
                        if (val) {
                            var mod_arr = [];
                            angular.forEach(val, function (v, k) {
                                if (v) mod_arr.push(v);
                            });
                            $scope.$eval($scope.ngModelText + '=' + JSON.stringify(mod_arr) + '');
                        } else {
                            $scope.$eval($scope.ngModelText + '=[]');
                        }
                    }, true);
                    $scope.$watch('ngModel', function (mod) {
                        // console.log('ngModel', mod);
                        if (mod) {
                            angular.forEach($scope.source, function (source, key) {
                                $scope.source[key].checked = false;
                                $scope.tmp_source[key] = false;
                                angular.forEach(mod, function (mod_v, mod_k) {
                                    if (source.value == mod_v) {
                                        $scope.source[key].checked = true;
                                        $scope.tmp_source[key] = source.value + '';
                                    }
                                });
                            });
                            $scope.$eval($scope.ngModelText + '=' + JSON.stringify(mod) + '');
                        }
                    }, true);
                }
            }
        })
        .directive('formImage', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
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
                    token: '='
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required ') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';

                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var uploadHtml = $scope.token ?
                        '<show-upload-token images="' + $scope.ngModelText + '" ' + name + max + required + disabledRole + '></show-upload-token>' :
                        '<show-upload images="' + $scope.ngModelText + '" ' + name + max + required + disabledRole + '></show-upload>';
                        // '<show-upload images="image" ' + name + max + required + disabledRole + '></show-upload>';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8" style="border: 1px #ccc dashed;">' + uploadHtml +
                            // '<input class="hide" ng-model="' + $scope.ngModelText + '" ' + max + name + required + disabledRole + '>' +
                            // '<input class="" ng-model="' + $scope.ngModelText + '" no-empty-array="" ' + max + name + required + disabledRole + '>' +
                            '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        // console.log($scope.$parent.FormBody[$scope.ngModelText]);
                        // $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                    }, 0);

                    $scope.$watch($scope.ngModelText, function (modelNew) {
                        var err = false;
                        angular.forEach(modelNew, function (val, key) {
                            if (!val.pic_url || !val.pic_width || !val.pic_height) {
                                err = true;
                            }
                        });
                        $scope.ngModel = err ? [] : modelNew;
                    }, true);

                    $scope.$watch('ngModel', function (val) {
                        // console.log(val);
                        if (val) {
                            $scope.image = val;
                            $scope.$eval($scope.ngModelText + '=' + JSON.stringify(val));
                        } else {
                            $scope.image = [];
                            $scope.$eval($scope.ngModelText + '=' + JSON.stringify([]));
                        }
                    }, true);
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
                            '<content_or_img ng-model="' + $scope.ngModelText + '"' + name + required + disabledRole + '></content_or_img>' +
                            '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                    }, 0);

                    $scope.$watch($scope.ngModelText, function (modelNew) {
                        // console.log(modelNew);
                        $scope.ngModel = modelNew || undefined;
                    }, true);

                    $scope.$watch('ngModel', function (val) {
                        // console.log(val);
                        if (val) {
                            $scope.$eval($scope.ngModelText + '=' + JSON.stringify(val));
                        }
                    }, true);

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
                    text: '@',
                    // name: '@',
                    required: '@',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    $scope.editorConfig = {
                        focus: true, //自动把光标放到UEditor中。测试config配置
                        allowDivTransToP: false, //DIV 自动替换 为其他标签
                    }
                    $timeout(function () {
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<ueditor config="editorConfig" ng-model="ngModel">' +
                            '</ueditor>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
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
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    $timeout(function () {
                        var disabledRole = $scope.ngDisabled ? (' disabled-role="aaaaaaaaa"') :
                            (($scope.$parent && $scope.$parent.disabledRole) ?
                                (' disabled-role="' + $scope.$parent.disabledRole + '"') : ' ');
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<hjm_date_time ng-model="' + $scope.ngModelText + '"' + required + disabledRole + '></hjm_date_time>' +
                            '<input class="hide" ng-model="' + $scope.ngModelText + '"' + name + required + disabledRole + '>' +
                            '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                    }, 0);
                    $scope.$watch($scope.ngModelText, function (modelNew) {
                        $scope.ngModel = modelNew;
                    });
                    $scope.$watch('ngModel', function (val) {
                        if (val) {
                            $scope.$eval($scope.ngModelText + '="' + val + '"');
                        } else {
                            $scope.$eval($scope.ngModelText + '=' + undefined + '');
                        }
                    });
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
                            '<hjm_date ng-model="' + $scope.ngModelText + '"' + required + disabledRole + ' ></hjm_date>' +
                            '<input class="hide" ng-model="' + $scope.ngModelText + '"' + name + required + disabledRole + '>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                    }, 0);

                    $scope.$watch($scope.ngModelText, function (modelNew) {
                        $scope.ngModel = modelNew;
                    });
                    $scope.$watch('ngModel', function (val) {
                        if (val) {
                            $scope.$eval($scope.ngModelText + '="' + val + '"');
                        } else {
                            $scope.$eval($scope.ngModelText + '=' + undefined + '');
                        }
                    });
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
                    required: '@',
                    max: '@',
                    callback: '&',
                    ngDisabled: '='
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    $timeout(function () {
                        var columns = $scope.columns ? (' columns=' + JSON.stringify($scope.columns) + '') : ('');
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
                            content += '<json-table ng-model="' + $scope.ngModelText + '"' + columns + config + name +
                                required + max + disabledRole + '></json-table>';

                        }
                        content += '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                    }, 0);

                    $scope.$watch($scope.ngModelText, function (modelNew) {
                        // console.log(modelNew);
                        $scope.ngModel = modelNew || undefined;
                    }, true);

                    $scope.$watch('ngModel', function (val) {
                        // console.log(val);
                        if (val) {
                            $scope.$eval($scope.ngModelText + '=' + JSON.stringify(val));
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

})
