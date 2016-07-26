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
        .directive('formInput', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
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
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;&nbsp;';
                    var ngDisabled = $scope.ngDisabled ? (' disabled') : '';
                    var type = $scope.type ? (' type="' + $scope.type + '"') : '';
                    var placeholder = $scope.placeholder ? (' placeholder="' + $scope.placeholder + '"') : '';
                    var ngMaxlength = $scope.ngMaxlength ? (' ng-maxlength="' + $scope.ngMaxlength + '"') : '';
                    var ngMinlength = $scope.ngMinlength ? (' ng-minlength="' + $scope.ngMinlength + '"') : '';
                    var err_show = ($scope.name || $scope.ngModelText) ?
                        ('<span class="glyphicon glyphicon-ok form-control-feedback"' +
                        'ng-show="$parent.FormBody[\'' + ($scope.name || $scope.ngModelText) +
                        '\'].$viewValue && $parent.FormBody[\'' + ($scope.name || $scope.ngModelText) +
                        '\'].$dirty && $parent.FormBody[\'' + ($scope.name || $scope.ngModelText) + '\'].$valid">' +
                        '</span>') : '';
                    // err_show += '{{$parent.FormBody["' + ($scope.name || $scope.ngModelText) +
                    //     '"]}}=============={{$parent.FormBody["' + ($scope.name || $scope.ngModelText) +
                    //     '"].$dirty}}========={{$parent.FormBody["' + ($scope.name || $scope.ngModelText) + '"].$valid}}';
                    var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                        '<div class="col-sm-8">' +
                        '<input class="form-control" ng-model="' + $scope.ngModelText + '"' +
                        type + name + placeholder + ngMaxlength + ngMinlength + required + ngDisabled + '>' +
                        err_show + '</div>';
                    $element.find('.form_element').html(content);
                    $compile($element.contents())($scope);
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
                                $scope.$eval($scope.ngModelText + '=' + (parseFloat(val) || 0) + '');
                            } else {
                                $scope.$eval($scope.ngModelText + '="' + val + '"');
                            }
                        }
                    });
                }
            }
        })
        .directive('formTextarea', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
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
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    // console.log('formElement', $scope, $attrs);
                    // console.log($scope.ngModelText);
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;&nbsp;';
                    // var type = $scope.type ? (' type="' + $scope.type + '"') : '';
                    var placeholder = $scope.placeholder ? (' placeholder="' + $scope.placeholder + '"') : '';
                    var ngMaxlength = $scope.ngMaxlength ? (' ng-maxlength="' + $scope.ngMaxlength + '"') : '';
                    var ngMinlength = $scope.ngMinlength ? (' ng-minlength="' + $scope.ngMinlength + '"') : '';
                    var err_show = ($scope.name || $scope.ngModelText) ?
                        ('<span class="glyphicon glyphicon-ok form-control-feedback"' +
                        'ng-show="$parent.form[\'' + ($scope.name || $scope.ngModelText) +
                        '\'].$viewValue && $parent.form[\'' + ($scope.name || $scope.ngModelText) +
                        '\'].$dirty && $parent.form[\'' + ($scope.name || $scope.ngModelText) + '\'].$valid">' +
                        '</span>') : '';
                    // err_show += '{{$parent.form["' + ($scope.name || $scope.ngModelText) +
                    //     '"]}}=============={{$parent.form["' + ($scope.name || $scope.ngModelText) +
                    //     '"].$dirty}}========={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"].$valid}}';
                    var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                        '<div class="col-sm-8">' +
                        '<textarea class="form-control" rows="5" ng-model="' + $scope.ngModelText + '"' +
                        name + placeholder + ngMaxlength + ngMinlength + required + '>' +
                        err_show + '</div>';
                    $element.find('.form_element').html(content);
                    $compile($element.contents())($scope);
                    $scope.$watch($scope.ngModelText, function (val) {
                        $scope.ngModel = val;
                    });
                    $scope.$watch('ngModel', function (val) {
                        if (val) {
                            $scope.$eval($scope.ngModelText + '="' + val + '"');
                        }
                    });
                }
            }
        })
        .directive('formRadio', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
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
                    sourceApi: '@',
                    callback: '&',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    // console.log('formElement', $scope, $attrs);

                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;&nbsp;';
                    var type = ' type="radio"';
                    var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                        '<div class="col-sm-8">';
                    angular.forEach($scope.source, function (val, key) {
                        var value = '';
                        if (typeof val.value == 'number') {
                            value = ' ng-value = "' + parseFloat(val.value) + '"';
                        } else {
                            value = ' ng-value = "' + val.value + '"';
                        }
                        content += '<label class="radio-inline radio1"><input type="radio" ng-model="' +
                            $scope.ngModelText + '"' + name + value + '><span></span>' + val.text + '</label>';
                    });
                    content += '</div>';
                    $element.find('.form_element').html(content);
                    $compile($element.contents())($scope);
                    $scope.$watch($scope.ngModelText, function (val) {
                        // console.log('ngModel ' + $scope.ngModelText, typeof  val, val);
                        if (typeof val == 'number') {
                            $scope.ngModel = parseFloat(val);
                        } else {
                            $scope.ngModel = val;
                        }
                    });
                    $scope.$watch('ngModel', function (val) {
                        // console.log('ngModel ' + $scope.ngModelText, typeof  val, val);
                        if (val || val == 0) {
                            if (typeof val == 'number') {
                                $scope.$eval($scope.ngModelText + '=' + parseFloat(val) + '');
                            } else {
                                $scope.$eval($scope.ngModelText + '="' + val + '"');
                            }
                        }
                    });
                    $scope.$watch('default', function (val) {
                        // console.log('default ' + $scope.default, typeof  val, val);
                        if (typeof val == 'number') {
                            $scope.ngModel = parseFloat(val);
                        } else {
                            $scope.ngModel = val;
                        }
                    });
                }
            }
        })
        .directive('formCheckbox', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
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
                    sourceApi: '@',
                    callback: '&',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    $scope.tmp_source = [];
                    // console.log('formElement', $scope, $attrs);
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    // var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;&nbsp;';
                    var type = ' type="checkbox"';
                    var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                        '<div class="col-sm-8">';
                    var checked = '';
                    angular.forEach($scope.source, function (val, key) {
                        $scope.source[key].checked = false;
                        content += '<label class="checkbox-inline checkbox1"><input ' + type +
                            ' ng-model="tmp_source[' + key + ']"' + name +
                            ' ng-true-value="\'' + val.value + '\'" ' +
                            ' ng-false-value="false" ' +
                            ' ng-checked = "source[' + key + '].checked" ' +
                            '><span></span>' + val.text + '</label>';
                    });
                    content += '</div>';
                    $element.find('.form_element').html(content);
                    $compile($element.contents())($scope);

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
                                        $scope.tmp_source[key] = source.value+'';
                                    }
                                });
                            });
                            $scope.$eval($scope.ngModelText + '=' + JSON.stringify(mod) + '');
                        }
                        // $scope.$watch('default', function (val) {
                        //     console.log(val);
                        //     $scope.ngModel = val;
                        // });
                    }, true);
                }
            }
        })
        .directive('formImage', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
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
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                        '<div class="col-sm-8">' +
                        '<show-upload images="' + $scope.ngModelText + '" ' + name + max + required + '></show-upload>' +
                        '</div>';
                    // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                    $element.find('.form_element').html(content);
                    $compile($element.contents())($scope);

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
                            $scope.$eval($scope.ngModelText + '=' + JSON.stringify(val));
                        } else {
                            $scope.$eval($scope.ngModelText + '=' + JSON.stringify([]));
                        }
                    }, true);
                }
            }
        })
        .directive('formImageContent', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
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
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                        '<div class="col-sm-8">' +
                        '<content_or_img ng-model="' + $scope.ngModelText + '"' + name + required + '></content_or_img>' +
                        '</div>';
                    // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                    $element.find('.form_element').html(content);
                    $compile($element.contents())($scope);

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
        .directive('formDateTime', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
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
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                        '<div class="col-sm-8">' +
                        '<hjm_date_time ng-model="' + $scope.ngModelText + '"' + required + '></hjm_date_time>' +
                        '</div>';
                    // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                    $element.find('.form_element').html(content);
                    $compile($element.contents())($scope);

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
        .directive('formDate', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
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
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                        '<div class="col-sm-8">' +
                        '<hjm_date ng-model="' + $scope.ngModelText + '"' + required + ' ></hjm_date>' +
                        '</div>';
                    // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                    $element.find('.form_element').html(content);
                    $compile($element.contents())($scope);

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

})
