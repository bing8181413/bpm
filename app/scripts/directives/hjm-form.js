define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {

    mod
        .directive('hjmForm', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form.html'),
                controller: ['$scope', function ($scope) {
                    $scope.initTableRequestSend = false;//是否初始化过 table

                    $scope.modsconfs = angular.copy(cons.modsconfs);
                    this.modsconfs = angular.extend({}, $scope.modsconfs);
                    function buildRouter(config) {
                        var router = '';
                        if (config.route && config.route.length > 0) {
                            angular.forEach(config.route, function (router_val, router_key) {
                                router += '<a class="btn btn-success btn-rounded" ui-sref="' + router_val.value + '" >' + router_val.text + '</a>';
                            });
                            return '<div class="row"><div class="col-sm-12"><div class="panel panel-default"><div class="panel-body">' + router + '</div></div></div></div>';
                        }
                        return '';
                    }

                    this.buildForm = function (columns, config) {
                        var rowDef = buildRows(columns, config);
                        var btnDef = buildBtn(columns, config);
                        return '<div class="panel panel-primary"><div class="panel-body">' + rowDef + ' </div></div>' + buildBtn;
                    }

                    this.buildBtn = function (columns, config) {

                        return '<div class="panel panel-primary"><div class="panel-body">' + rowDef + ' </div></div>' + buildBtn;
                    }

                    function buildRows(columns, config) {
                        // console.log(arguments);
                        var useBindOnce = config.useBindOnce || 'bindonce';
                        var itemList = config.itemList || 'list';
                        var rowItemName = config.rowItemName || 'item';
                        var rowItem = '';
                        angular.forEach(columns, function (col) {
                            var cellContent = cellRender(col, rowItemName, useBindOnce);
                            var cssProperty = col.className ? ' class="' + col.className + '" ' : "";
                            rowItem += '<td' + cssProperty + '>' + cellContent + '</td>'
                        });
                        return '<tbody><tr ' + useBindOnce + ' ng-repeat="' + rowItemName + ' in ' + itemList + '">' + rowItem + '</tr></tbody>'

                    }

                    this.refreshCurrentView = function () {
                        $scope.searchParams = {};
                    }
                }],
                scope: {
                    modid: '@',
                    config: '@',
                    columns: '@'
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var columnsDef = '';
                    var configDef = '';
                    $scope.list = [];
                    $scope.searchParams = {};
                    $scope.filterParams = {};
                    $scope.searchAction = function (searchParams) {
                        $log.info('当前查询条件 :', $scope.searchParams);
                        $scope.pageInfo.currentPage = 1;
                        $scope.updateList();
                    }
                    $scope.updateList = function () {
                        var pageInfo = {
                            page: $scope.pageInfo.currentPage || 1,
                            count: configDef.pageInfo.count || 1,
                        };
                        var searchItemsParamDefault = {};
                        angular.forEach(configDef.searchItems, function (searchItems_val, searchItems_key) {
                            if (searchItems_val.default) {
                                angular.forEach(configDef.searchItems, function (searchItems_val, searchItems_key) {
                                    if (searchItems_val.default || searchItems_val.default == '') {
                                        eval('searchItemsParamDefault.' + searchItems_val.value + ' = ' + searchItems_val.default);
                                    }
                                });
                            }
                        });
                        var searchParam = angular.extend({}, configDef.preSelectionSearch, searchItemsParamDefault, $scope.searchParams, pageInfo);
                        // console.log(configDef.pageInfo);
                        widget.ajaxRequest({
                            method: 'GET',
                            url: configDef.api,
                            scope: $scope,
                            data: searchParam,
                            success: function (json) {
                                $scope.list = json.list;
                                $scope.pageInfo.totalItems = ((json.count == 0) ? 0 : (json.count || $scope.pageInfo.totalItems));//获取总数
                            }
                        });
                    }
                    $scope.$watchCollection('[columns,config,modid]', function (gridDef) {
                            //这里初始化 执行一次 以后不会执行
                            if (gridDef) {
                                var modidDef = gridDef[2];
                                // console.log('$ctrl.modsconfs', $ctrl.modsconfs);
                                angular.forEach($ctrl.modsconfs, function (val, key) {
                                    angular.forEach(val, function (v, k) {
                                        if (k == modidDef) {
                                            $scope.modDef = v;
                                            columnsDef = $scope.$eval('modDef.' + gridDef[0]);
                                            configDef = $scope.$eval('modDef.' + gridDef[1]);
                                            $scope.configDef = configDef;// 提供页面展示
                                        }
                                    });
                                    ;
                                })
                                if (!columnsDef || !configDef) {
                                    $log.error('未找到modid为' + modidDef + '的config,请检查对应配置文件');
                                    return false;
                                }
                                $scope.pageInfo = {
                                    itemsPerPage: configDef.pageInfo.count,
                                    maxSize: configDef.pageInfo.maxSize || 5,
                                    currentPage: configDef.pageInfo.page,
                                }//初始化   开始监听  paginationInfo
                                $scope.searchItems = configDef.searchItems || [];
                                $ctrl.refreshCurrentView();
                                // configDef.refreshCurrentView = $scope.refreshCurrentView;
                                var routerBar = $ctrl.buildRouter(configDef, $element);
                                var formContent = $ctrl.buildForm(columnsDef, configDef);
                                // console.log(searchBar);
                                $element.find('.routerSection').html(routerBar);
                                $element.find(".formSection").html(formContent);
                                $compile($element.contents())($scope);
                                $scope.updateList();
                            }
                        }
                    );
                }
            };
        })
        .directive('hjmFormInput', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
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
                    // console.log('hjmFormElement', $scope, $attrs);
                    // console.log($scope.ngModelText);
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var type = $scope.type ? (' type="' + $scope.type + '"') : '';
                    var placeholder = $scope.placeholder ? (' placeholder="' + $scope.placeholder + '"') : '';
                    var ngMaxlength = $scope.ngMaxlength ? (' ng-maxlength="' + $scope.ngMaxlength + '"') : '';
                    var ngMinlength = $scope.ngMinlength ? (' ng-minlength="' + $scope.ngMinlength + '"') : '';
                    var err_show = ($scope.name || $scope.ngModelText) ?
                        ('<span class="glyphicon glyphicon-ok form-control-feedback"' +
                        'ng-show="$parent.hjmForm[\'' + ($scope.name || $scope.ngModelText) +
                        '\'].$viewValue && $parent.hjmForm[\'' + ($scope.name || $scope.ngModelText) +
                        '\'].$dirty && $parent.hjmForm[\'' + ($scope.name || $scope.ngModelText) + '\'].$valid">' +
                        '</span>') : '';
                    // err_show += '{{$parent.hjmForm["' + ($scope.name || $scope.ngModelText) +
                    //     '"]}}=============={{$parent.hjmForm["' + ($scope.name || $scope.ngModelText) +
                    //     '"].$dirty}}========={{$parent.hjmForm["' + ($scope.name || $scope.ngModelText) + '"].$valid}}';
                    var content = '<label class="col-sm-2 control-label">' + $scope.text + '</label>' +
                        '<div class="col-sm-8">' +
                        '<input class="form-control" ng-model="' + $scope.ngModelText + '"' +
                        type + name + placeholder + ngMaxlength + ngMinlength + required + '>' +
                        err_show + '</div>';
                    $element.find('.form_element').html(content);
                    $compile($element.contents())($scope);
                    $scope.$watch($scope.ngModelText, function (val) {
                        $scope.ngModel = val;
                    });
                }
            }
        })
        .directive('hjmFormRadio', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
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
                    source: '=',
                    sourceApi: '@',
                    callback: '&',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    // console.log('hjmFormElement', $scope, $attrs);
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var type = ' type="radio"';
                    var content = '<label class="col-sm-2 control-label">' + $scope.text + '</label>' +
                        '<div class="col-sm-8">';
                    angular.forEach($scope.source, function (val, key) {
                        var value = ' value = "' + val.value + '"';
                        content += '<label class="radio-inline radio1"><input type="radio" ng-model="' +
                            $scope.ngModelText + '"' + name + required + value + '><span></span>' + val.text + '</label>';
                    });
                    content += '</div>';
                    $element.find('.form_element').html(content);
                    $compile($element.contents())($scope);
                    $scope.$watch($scope.ngModelText, function (val) {
                        $scope.ngModel = val;
                    });
                }
            }
        })
        .directive('hjmFormImage', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
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
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var content = '<label class="col-sm-2 control-label">' + $scope.text + '</label>' +
                        '<div class="col-sm-8">' +
                        '<show-upload images="' + $scope.ngModelText + '" hasImages="" ' + name + max + required + '></show-upload>' +
                        '</div>';
                    // content += '===={{$parent.hjmForm["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                    $element.find('.form_element').html(content);
                    $compile($element.contents())($scope);
                    $scope.$watch($scope.ngModelText, function (modelNew) {
                        var err = false;
                        console.log($scope.$parent.hjmForm);
                        console.log('$scope.$parent.hjmForm["' + ($scope.name || $scope.ngModelText || undefined) + '"]');
                        angular.forEach(modelNew, function (val, key) {
                            if (!val.url || !val.width || !val.height) {
                                err = true;
                            }
                        });
                        $scope.ngModel = err ? undefined : modelNew;
                    });
                }
            }
        })
        .directive('hjmFormImageContent', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
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
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var content = '<label class="col-sm-2 control-label">' + $scope.text + '</label>' +
                        '<div class="col-sm-8">' +
                        '<content_or_img ng-model="' + $scope.ngModelText + '"' + name + required + '></content_or_img>' +
                        '</div>';
                    // content += '===={{$parent.hjmForm["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                    $element.find('.form_element').html(content);
                    $compile($element.contents())($scope);
                    $scope.$watch($scope.ngModelText, function (modelNew) {
                        // console.log(modelNew);
                        // var err = false;
                        // console.log($scope.$parent.hjmForm);
                        // console.log('$scope.$parent.hjmForm["' + ($scope.name || $scope.ngModelText || undefined) + '"]');
                        // angular.forEach(modelNew, function (val, key) {
                        //     if (!val.url || !val.width || !val.height) {
                        //         err = true;
                        //     }
                        // });
                        // $scope.ngModel = err ? undefined : modelNew;
                    });
                }
            }
        })
        .directive('hjmFormDateTime', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
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
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var content = '<label class="col-sm-2 control-label">' + $scope.text + '</label>' +
                        '<div class="col-sm-8">' +
                        '<hjm_date_time ng-model="' + $scope.ngModelText + required + '" ></hjm_date_time>' +
                        '</div>';
                    // content += '===={{$parent.hjmForm["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                    $element.find('.form_element').html(content);
                    $compile($element.contents())($scope);

                    $scope.$watch($scope.ngModelText, function (modelNew) {
                        $scope.ngModel = modelNew;
                    });
                }
            }
        })
        .directive('hjmFormDate', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
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
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var content = '<label class="col-sm-2 control-label">' + $scope.text + '</label>' +
                        '<div class="col-sm-8">' +
                        '<hjm_date ng-model="' + $scope.ngModelText + required + '" ></hjm_date>' +
                        '</div>';
                    // content += '===={{$parent.hjmForm["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                    $element.find('.form_element').html(content);
                    $compile($element.contents())($scope);

                    $scope.$watch($scope.ngModelText, function (modelNew) {
                        $scope.ngModel = modelNew;
                    });
                }
            }
        })

})
