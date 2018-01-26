define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {

    mod
        .directive('hjmGrid', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-grid.html'),
                controller: ['$scope', function ($scope) {
                    $scope.initTableRequestSend = false;//是否初始化过 table

                    $scope.modsconfs = angular.copy(cons.modsconfs);
                    this.modsconfs = angular.extend({}, $scope.modsconfs);
                    this.buildSearchBar = function (config, element) {
                        var ext = buildExt(config);
                        var searchHtml = '';
                        if (config.searchSupport) {
                            var preSelectionSearch = '';
                            if (config.preSelectionSearch) {
                                preSelectionSearch = ' pre-selection="searchParams"';
                            }
                            searchHtml = '<div hjm-search-bar search-items="searchItems" search-text="searchParams"' +
                                preSelectionSearch +
                                'reset-search="refreshCurrentView" search-action="searchAction(searchParams)"></div>'
                        }
                        if (ext) {
                            return searchHtml + ext;
                        } else {
                            return searchHtml;
                        }
                        return '';
                    }

                    this.buildTable = function (columns, config) {
                        var header = buildHeader(columns, config);
                        var rowDef = buildRows(columns, config);
                        // var tpigination = buildTfoot(columns, config);
                        return '<table class="table table-bordered table-striped table-hover">' + header + rowDef + '</table>';
                        // tpigination;
                    }
                    this.buildPagination = function (columns, config) {
                        var tpigination = buildTfoot(columns, config);
                        return tpigination;
                    }


                    this.buildRouter = function (config) {
                        var close = '';
                        var router = '';
                        if (angular.isFunction($scope.$parent.$close)) {//弹框的 关闭按钮
                            close += '<button type="button" class="close" ng-click="$parent.$close();">×</button>';
                        }
                        if (config.route && config.route.length > 0) {
                            angular.forEach(config.route, function (router_val, router_key) {
                                if (router_val.routeDirective) {
                                    router += router_val.routeDirective;
                                } else {
                                    router += '<a class="btn btn-success btn-rounded btn-sm pull-right" ' +
                                        'style="margin-top: -5.5px;" ui-sref="' + router_val.value + '" >' + router_val.text + '</a>';
                                }
                            });
                            return router + '<h3 class="panel-title">' + (config.title || '') + '</h3>';
                            // return '<div class="row"><div class="col-sm-12">
                            // <div class="panel panel-default"><div class="panel-body">' + router + '</div></div></div></div>';
                        }
                        return close + '<h3 class="panel-title">' + (config.title || '') + '</h3>';
                    }

                    function buildExt(config) {
                        var showNum = '';
                        var eventBtn = '';
                        if (config.ext) {
                            if (config.ext.showNum) {
                                angular.forEach(config.ext.showNum, function (showNum_val, showNum_key) {
                                    if (showNum_val.type == 'total') {
                                        showNum += (showNum_val.text || '总数') + ':  {{ total }}   ';
                                    } else if (showNum_val.type == 'selected') {
                                        showNum += (showNum_val.text || '已选') + ':  {{ _selected_num }}';
                                    } else if (showNum_val.field) {
                                        showNum += (showNum_val.text || '符合条件的') + ':  {{ _json.' + showNum_val.field + ' }}';
                                    }
                                });
                            }
                            if (config.ext.eventBtn) {
                                angular.forEach(config.ext.eventBtn, function (eventBtn_val, eventBtn_key) {
                                    if (eventBtn_val.event == 'all_select') {
                                        eventBtn += ' <a class="btn btn-info btn-rounded btn-sm" ng-click="all_select();" >' +
                                            eventBtn_val.text + '</a> ';
                                    } else if (eventBtn_val.event == 'cancel_all_select') {
                                        eventBtn += ' <a class="btn btn-info btn-rounded btn-sm" ng-click="cancel_all_select();">' +
                                            eventBtn_val.text + '</a> ';
                                    } else if (eventBtn_val.fieldFirective) {
                                        eventBtn += eventBtn_val.fieldFirective;
                                    }
                                });
                            }
                            return '<div class="row"><div class="col-sm-12"><div class="panel panel-default"><div class="panel-body">' +
                                '<div class="form-group form-control-static col-sm-12">' + eventBtn + '&nbsp;' + showNum +
                                '</div></div></div></div></div>';
                        }
                        return '';
                    }

                    function buildHeader(columns, config) {
                        var headerContent = '';
                        if (config.ext && config.ext.checked) {
                            headerContent += '<th class="text-center">' + config.ext.checked.text + '</th>';
                        }
                        angular.forEach(columns, function (col) {
                            var cssProperty = col.className ? ' class="text-center ' + col.className + '" ' : ' class="text-center" ';
                            headerContent += '<th' + cssProperty + '>' + col.name + '</th>';
                        });
                        // console.log('headerContent :: ', '<thead><tr>' + headerContent + '</tr></thead>');
                        return '<thead><tr>' + headerContent + '</tr></thead>';
                    }

                    function buildRows(columns, config) {
                        // console.log(arguments);
                        var useBindOnce = config.useBindOnce || 'bindonce';
                        var itemList = config.itemList || 'data';
                        var rowItemName = config.rowItemName || 'item';
                        var rowItemClass = config.rowItemClass || '';
                        var rowItem = '';
                        if (config.ext && config.ext.checked) {
                            rowItem += '<td>' +
                                '<label class="checkbox-inline checkbox1" style="padding: 0;">' +
                                '<input type="checkbox" name="name{{$index}}"' +
                                ' ng-model="item._checked"' +
                                ' ng-true-value="true" ' +
                                ' ng-false-value="false" ' +
                                ' ng-change = "toggle_checked($index);" ' +
                                '><span></span></label></td>';

                        }
                        angular.forEach(columns, function (col) {
                            // var rowClass = (rowItemClass[0].product_id == $rootScope[rowItemClass[0].product_id]) ? '' : '';
                            var cellContent = cellRender(col, rowItemName, useBindOnce);
                            var cssProperty = (col.className || col.fieldDirective) ? (' class="' + (col.className || '') + '" ') : ' class="text-center" ';
                            rowItem += '<td' + cssProperty + '>' + cellContent + '</td>'
                        });
                        return '<tbody><tr ' + useBindOnce + ' ng-repeat="' + rowItemName + ' in ' + itemList + '">' +
                            rowItem + '</tr></tbody>'

                    }

                    function buildTfoot(columns, config) {
                        if (config.paginationSupport)
                            return '<div hjm-pagination-bar page-info="pageInfo"><div>';
                        return '';
                    }

                    function cellRender(colDef, rowItemName, useBindOnce) {
                        var cellContent = '';
                        var cellFilter = colDef.filter;
                        var colField = colDef.field;
                        var itemString = rowItemName + '.' + colField;
                        var fieldDirective = colDef.fieldDirective;
                        if (fieldDirective) {
                            return fieldDirective;
                        }
                        if (colField) {
                            if (cellFilter) {
                                if (angular.isArray(cellFilter)) {
                                    itemString += '|' + cellFilter;
                                } else if (angular.isString(cellFilter)) {
                                    itemString += '|' + cellFilter;
                                }
                            }
                            if (colDef.truncateText) {
                                var textLength = colDef.truncateTextLength;
                                var textBreakOnWord = colDef.truncateTextBreakOnWord;
                                itemString += '|' + ('characters: ' + textLength || 10) + ' : ' + textBreakOnWord;
                                if (!!colDef.tooltip) {
                                    cellContent = '<span ng-bind="' + itemString + '" uib-tooltip="{{' + rowItemName + '.' +
                                        colDef.tooltip + '}}"' +
                                        ' tooltip-placement="' + (colDef.tooltipPlacement || 'bottom') + '" ></span>';
                                } else {
                                    cellContent = '<span  a ng-bind="' + itemString + '" ></span>';

                                }
                            } else {
                                if (useBindOnce == false) {
                                    if (colDef.htmlField) {
                                        cellContent = '<span ng-bind=' + itemString + ' ></span>'
                                    } else {
                                        cellContent = '{{' + itemString + '}}'
                                    }
                                } else {
                                    var bindTag = colDef.htmlField ? 'bo-html' : 'bo-text';
                                    cellContent = '<span ' + bindTag + '="' + itemString + '"></span>'
                                }
                            }
                        }
                        return cellContent;
                    }

                    this.refreshCurrentView = function () {
                        // $scope.searchParams = configDef.preSelectionSearch || {};
                        // $scope.filterParams = configDef.preSelectionFilter || [];
                        $scope.searchParams = {};
                        // console.log($scope.searchParams);
                    }
                }],
                scope: {
                    modid: '@',
                    config: '@',
                    columns: '@',
                    extSearch: '=',
                    extApi: '=',
                    extApiString: '@',
                    extDomain: '=',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    // console.log(angular.isFunction($scope.$parent.$close));

                    var columnsDef = '';
                    var configDef = '';
                    $scope.data = [];
                    $scope.searchParams = {};
                    $scope.filterParams = {};
                    $scope.all_select = function () {
                        $scope._selected_num = 0;
                        angular.forEach($scope.data, function (val, key) {
                            $scope._selected_num++;
                            val._checked = true;
                        });
                    }
                    $scope.cancel_all_select = function () {
                        $scope._selected_num = 0;
                        angular.forEach($scope.data, function (val, key) {
                            val._checked = false;
                        });
                    }
                    $scope.toggle_checked = function (index) {
                        $scope._selected_num = 0;
                        angular.forEach($scope.data, function (val, key) {
                            if (val._checked) {
                                $scope._selected_num++;
                            }
                        });
                        // console.log($scope._selected_num);
                    }
                    $scope.searchAction = function () {
                        $log.info('当前查询条件 :', $scope.searchParams);
                        $scope.pageInfo.currentPage = 1;
                        $scope.updateList();
                    }
                    $scope.updateList = function () {
                        $scope.api = $scope.extApi || $scope.extApiString || configDef.api;
                        $scope.domain = $scope.extDomain || configDef.domain;
                        var pageInfo = {
                            page: $scope.pageInfo.currentPage || 1,
                            count: configDef.pageInfo.count || 1,
                        };
                        var searchItemsParamDefault = {};
                        angular.forEach(configDef.searchItems, function (searchItems_val, searchItems_key) {
                            if ((searchItems_val.type == 'btnGroup') && (searchItems_val.default || searchItems_val.default == 0)) {
                                eval('searchItemsParamDefault.' + searchItems_val.value + ' = "' + searchItems_val.default + '"');
                            } else if (searchItems_val.type == 'btnGroupArray' && (searchItems_val.default || searchItems_val.default == 0)) {
                                angular.forEach(searchItems_val.enum_text, function (enum_val, enum_key) {
                                    eval('searchItemsParamDefault.' + enum_val + ' = "' + searchItems_val.enum[searchItems_val.default].value[enum_key] + '"');
                                });
                            } else if (searchItems_val.type == 'btnGroupArray2' && (searchItems_val.default || searchItems_val.default == 0)) {
                                eval('searchItemsParamDefault.' + searchItems_val.enum_text + ' = ' + JSON.stringify(searchItems_val.enum[searchItems_val.default].value));
                            }
                        })
                        // console.log('configDef.preSelectionSearch', configDef.preSelectionSearch);
                        // console.log('$scope.searchParams', $scope.searchParams);
                        // console.log('searchItemsParamDefault', searchItemsParamDefault);
                        // console.log($scope.extSearch);
                        var searchParam = angular.extend({}, configDef.preSelectionSearch, searchItemsParamDefault,
                            $scope.searchParams, pageInfo, $scope.extSearch);
                        // eval('$rootScope.' + configDef.scopeSearchParam + '=' + JSON.stringify(searchParam));

                        // $rootScope.hjm[configDef.scopeSearchParam] = searchParam;
                        // console.log($rootScope.hjm.actPageInfo);

                        // console.log(configDef.pageInfo);
                        // console.log(configDef.api);

                        // console.log(searchParam);

                        widget.ajaxRequest({
                            method: 'GET',
                            domain: $scope.domain,
                            url: $scope.api,
                            scope: $scope,
                            data: searchParam,
                            success: function (json) {
                                // 记录查询条件
                                $scope.record(searchParam);
                                $scope._json = json;
                                $scope.list = json.list;
                                $scope.data = json.data;

                                $scope.total = json.total;

                                $scope._selected_num = 0;
                                $scope.pageInfo.totalItems = ((json.total == 0) ? 0 : (json.total || $scope.pageInfo.totalItems));//获取总数
                            }
                        });
                    }
                    $scope.record = function (searchParam) {
                        // console.log(searchParam);
                        $scope.currentSearchItems = configDef.searchItems;
                        angular.forEach(searchParam, function (val, key) {
                            // console.log(val, key);
                            angular.forEach(configDef.searchItems, function (searchItems_val, searchItems_key) {
                                // console.log(searchItems_val);
                                // if (!searchItems_val.type && searchItems_val.value == key) {
                                //     $scope.currentSearchItems[searchItems_key].default = val;
                                //
                                // } else if (searchItems_val.type == 'btnGroup' && searchItems_val.value == key) {
                                //     $scope.currentSearchItems[searchItems_key].default = val;
                                // }
                                // else if (searchItems_val.type == 'btnGroupArray2' && searchItems_val.enum_text == key) {
                                //     angular.forEach(searchItems_val.enum, function (enum_val, enum_key) {
                                //         if (angular.isArray(val) && angular.isArray(enum_val.value)
                                //             && val.sort().toString() == enum_val.value.sort().toString()) {
                                //             $scope.currentSearchItems[searchItems_key].default = enum_key;
                                //         }
                                //     });
                                // }
                                // else
                                if (searchItems_val.type == 'btnGroupArray' && searchItems_val.enum_text == key) {
                                    $scope.currentSearchItems[searchItems_val.enum_text] = searchItems_val.enum[searchItems_val.default].value;
                                }
                            })
                        })
                        // console.log($scope.currentSearchItems);
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
                                if (!columnsDef) {
                                    $log.error('未找到modid为' + modidDef + '的columns为' + $scope.columns + '的对象,请检查对应配置文件');
                                    return false;
                                }
                                if (!configDef) {
                                    $log.error('未找到modid为' + modidDef + '的config对象为' + $scope.config + '的对象,请检查对应配置文件');
                                    return false;
                                }
                                $scope.pageInfo = {
                                    itemsPerPage: configDef.pageInfo.count,
                                    maxSize: (!configDef.pageInfo.maxSize || configDef.pageInfo.maxSize < 5) ? 5 : configDef.pageInfo.maxSize,
                                    currentPage: configDef.pageInfo.page,
                                }//初始化   开始监听  paginationInfo
                                $scope.searchItems = configDef.searchItems || [];
                                $ctrl.refreshCurrentView();
                                // configDef.refreshCurrentView = $scope.refreshCurrentView;
                                var routerTitleBar = $ctrl.buildRouter(configDef);
                                var searchBar = $ctrl.buildSearchBar(configDef, $element);
                                var tableContent = $ctrl.buildTable(columnsDef, configDef);
                                var paginationContent = $ctrl.buildPagination(columnsDef, configDef);
                                // console.log(searchBar);
                                $element.find('.routerTitleSection').html(routerTitleBar);
                                $element.find('.searchSection').html(searchBar);
                                $element.find(".gridSection").html(tableContent);
                                $element.find(".paginationSection").html(paginationContent);
                                $compile($element.contents())($scope);
                                $scope.updateList();
                            }
                        }
                    );
                    $scope.$watch('pageInfo', function (pageInfoDef, pageInfoOld) {
                        if ($scope.initTableRequestSend == false) {
                            $scope.initTableRequestSend = true;
                        } else {
                            //初始化组件已经获取过一次数据 totalItems 为空 等 totalItems 不是空了就可以走正常的了
                            // console.log(pageInfoDef, pageInfoOld);
                            if (pageInfoDef && (pageInfoDef.currentPage != pageInfoOld.currentPage)) {
                                console.log('pageInfoDef  ', pageInfoDef, pageInfoOld);
                                $scope.updateList('$watch pageInfo');
                            }
                        }
                    }, true)
                }
            };
        })
        .directive('hjmSearchBar', function ($rootScope, $state, $http, $uibModal, $filter, widget, $templateCache, $compile, $log) {
            return {
                restrict: 'EA',
                replace: true,
                require: "^hjmGrid",
                scope: {
                    searchItems: '=',
                    searchText: '=',
                    searchAction: '&'
                    // resetSearch: '&',
                    // searchParams: '='
                    // preSelection: '@',
                },
                controller: ['$scope', function ($scope) {
                    $scope.params = {};
                }],
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-search-bar.html'),
                link: function ($scope, $element, $attrs, $ctrl) {
                    $scope.searchParams = {}
                    $scope.autoSearch = false;//是否自动搜索 有监听 autoSearch = !autoSearch 就能够自动搜索了
                    $scope.$watch('searchItems', function (searchItemsVal) {
                        // console.log(searchItemsVal);
                        if (searchItemsVal) {
                            $scope.searchItems = searchItemsVal;
                            var searchItemsHtml = ''
                            angular.forEach(searchItemsVal, function (val, key) {
                                var placeholder = '';
                                if (val.paramDirective) {
                                    searchItemsHtml += '<div class="form-group col-sm-6">' +
                                        '<label class="col-sm-4 control-label">' + val.text + '</label>' +
                                        '<div class="col-sm-8">' + val.paramDirective +
                                        '</div>' +
                                        '</div>';
                                } else {
                                    if (val.type == 'datetime' || val.type == 'date') {
                                        // if ($scope.currentSearchItems[key]) {
                                        //     $scope.$eval('params.' + val.value + '="' + $scope.currentSearchItems[key].value + '"');
                                        // }
                                        // $scope.$eval('params.' + val.value + '="' + new Date() + '"');


                                        var dateHtml = val.type == "datetime" ?
                                        '<hjm_date_time ng-model="params.' + val.value + '"></hjm_date_time>'
                                            : '<hjm_date ng-model="params.' + val.value + '"></hjm_date>';
                                        if (val.width == 12) {
                                            searchItemsHtml += '<div class="form-group col-sm-' + val.width + '">' +
                                                '<label class="col-sm-2 control-label">' + val.text + '</label>' +
                                                '<div class="col-sm-10">' + dateHtml +
                                                '</div>' +
                                                '</div>';
                                        } else if (val.width == 6 || !val.width) {
                                            searchItemsHtml += '<div class="form-group col-sm-6">' +
                                                '<label class="col-sm-4 control-label">' + val.text + '</label>' +
                                                '<div class="col-sm-8">' + dateHtml +
                                                '</div>' +
                                                '</div>';
                                        }

                                    } else if (val.type == 'btnGroup') {
                                        // 赋予默认值  param 对象
                                        var btnHtml = '';
                                        $scope.$eval('params.' + val.value + '="' + val.default + '"');
                                        if (val.enum.length > 0) {
                                            angular.forEach(val.enum, function (enum_val, enum_key) {
                                                var btnClassHtml = ('"btn-rounded":params.' + val.value + '=="' + enum_val.value + '",' +
                                                '"btn-bordered":params.' + val.value + '!=="' + enum_val.value + '"');
                                                btnHtml += (' <a class="btn btn-primary btn-sm" ' +
                                                ' ng-class={' + btnClassHtml + '}' +
                                                ' ng-model="params.' + val.value + '"' +
                                                ' ng-click="params.' + val.value + ' = \'' + enum_val.value + '\';autoSearch=!autoSearch;">' +
                                                enum_val.text + '</a>');
                                            });
                                            btnHtml = '<div class="">' + btnHtml + '</div>';
                                        }
                                        if (val.width == '6') {
                                            searchItemsHtml += '<div class="form-group col-sm-' + val.width + '">' +
                                                '<label class="col-sm-4 control-label">' + val.text + '</label>' +
                                                '<div class="col-sm-8">' + btnHtml +
                                                '</div>' +
                                                '</div>';
                                        } else {
                                            searchItemsHtml += '<div class="form-group col-sm-12">' +
                                                '<label class="col-sm-2 control-label">' + val.text + '</label>' +
                                                '<div class="col-sm-10">' + btnHtml +
                                                '</div>' +
                                                '</div>';
                                        }
                                    } else if (val.type == 'btnGroupArray2') {
                                        // 赋予默认值  param 对象
                                        var btnHtml = '';
                                        if (val.enum_text) {
                                            angular.forEach(val.enum, function (enum_val) {
                                                if (!angular.isArray(enum_val.value)) {
                                                    $log.warn('btnGroupArray2 enum_text is array, but enum value is not array');
                                                    return false;
                                                }
                                            });
                                            //下面的   =是对的不是双=
                                            if (angular.isNumber(val.default) || (val.default = parseInt(val.default))) {
                                                $scope.$eval(val.value + '="' + val.default + '"');
                                                $scope.$eval('params.' + val.enum_text + '=' + JSON.stringify(val.enum[val.default].value) + '');
                                            }
                                            if (val.enum.length > 0) {
                                                angular.forEach(val.enum, function (enum_val, enum_key) {
                                                    var btnClassHtml = ('"btn-rounded":' + val.value + '==\'' + enum_key + '\',' +
                                                    '"btn-bordered":' + val.value + '!==\'' + enum_key + '\'');
                                                    var btnClickHtml = '';
                                                    btnClickHtml += 'params.' + val.enum_text + '=' + JSON.stringify(enum_val.value) + ';';
                                                    btnClickHtml += 'autoSearch=!!!autoSearch;' + val.value + '=\'' +
                                                        enum_key + '\'';
                                                    btnHtml += (' <a class="btn btn-primary btn-sm" ' +
                                                    ' ng-class={' + btnClassHtml + '}' +
                                                    ' ng-model="' + val.value + '"' +
                                                    ' ng-click="' + btnClickHtml + '">' +
                                                    enum_val.text + '</a>');
                                                });
                                                btnHtml = '<div class="">' + btnHtml + '</div>';
                                            }
                                        }
                                        if (val.width == '6') {
                                            searchItemsHtml += '<div class="form-group col-sm-' + val.width + '">' +
                                                '<label class="col-sm-4 control-label">' + val.text + '</label>' +
                                                '<div class="col-sm-8">' + btnHtml +
                                                '</div>' +
                                                '</div>';
                                        } else {
                                            searchItemsHtml += '<div class="form-group col-sm-12">' +
                                                '<label class="col-sm-2 control-label">' + val.text + '</label>' +
                                                '<div class="col-sm-10">' + btnHtml +
                                                '</div>' +
                                                '</div>';
                                        }
                                    } else if (val.type == 'btnGroupArray') {
                                        // 赋予默认值  param 对象
                                        var btnHtml = '';
                                        if (val.enum_text && angular.isArray(val.enum_text)) {
                                            angular.forEach(val.enum, function (enum_val) {
                                                if (!angular.isArray(enum_val.value)) {
                                                    $log.warn('btnGroupArray enum_text is array, but enum value is not array');
                                                    return false;
                                                }
                                            });
                                            if (angular.isNumber(val.default) || (val.default = parseInt(val.default))) {
                                                $scope.$eval(val.value + '="' + val.default + '"');
                                                angular.forEach(val.enum[val.default].value, function (value_val, value_key) {
                                                    $scope.$eval('params.' + val.enum_text[value_key] + '="' + value_val + '"');
                                                });
                                            }
                                            if (val.enum.length > 0) {
                                                angular.forEach(val.enum, function (enum_val, enum_key) {
                                                    var btnClassHtml = ('"btn-rounded":' + val.value + '==\'' + enum_key + '\',' +
                                                    '"btn-bordered":' + val.value + '!==\'' + enum_key + '\'');
                                                    var btnClickHtml = '';
                                                    angular.forEach(enum_val.value, function (enum_val_arr, enum_key_arr) {
                                                        // console.log(val.enum_text, val.enum_text[enum_key_arr],enum_key_arr);
                                                        btnClickHtml += 'params.' + val.enum_text[enum_key_arr] + ' = \'' +
                                                            enum_val_arr + '\';';
                                                    });
                                                    btnClickHtml += 'autoSearch=!!!autoSearch;' + val.value + '=\'' +
                                                        enum_key + '\'';
                                                    btnHtml += (' <a class="btn btn-primary btn-sm" ' +
                                                    ' ng-class={' + btnClassHtml + '}' +
                                                    ' ng-model="params.' + val.value + '"' +
                                                    ' ng-click="' + btnClickHtml + '">' +
                                                    enum_val.text + '</a>');
                                                });
                                                btnHtml = '<div class="">' + btnHtml + '</div>';
                                            }
                                        }
                                        if (val.width == '6') {
                                            searchItemsHtml += '<div class="form-group col-sm-' + val.width + '">' +
                                                '<label class="col-sm-4 control-label">' + val.text + '</label>' +
                                                '<div class="col-sm-8">' + btnHtml +
                                                '</div>' +
                                                '</div>';
                                        } else {
                                            searchItemsHtml += '<div class="form-group col-sm-12">' +
                                                '<label class="col-sm-2 control-label">' + val.text + '</label>' +
                                                '<div class="col-sm-10">' + btnHtml +
                                                '</div>' +
                                                '</div>';
                                        }
                                    } else {
                                        if (val.placeholder) {
                                            placeholder = 'placeholder="' + val.placeholder + '"';
                                        }
                                        searchItemsHtml += '<div class="form-group col-sm-6">' +
                                            '<label class="col-sm-4 control-label">' + val.text + '</label>' +
                                            '<div class="col-sm-8">' +
                                            '<input type="input" class="form-control" ' + placeholder +
                                            ' ng-model="params.' + val.value + '">' +
                                            '</div>' +
                                            '</div>';
                                    }
                                }
                            })
                            var show_search_btn = false;
                            angular.forEach(searchItemsVal, function (val) {
                                if (val.type !== 'btnGroup' && val.type !== 'btnGroupArray' && val.type !== 'btnGroupArray2') {
                                    show_search_btn = true;
                                }
                            });
                            if (show_search_btn)
                                searchItemsHtml += '<div class="form-group col-sm-6">' +
                                    '<label class="col-sm-4 control-label"></label>' +
                                    ' <button type="button" class="btn btn-success btn-bordered" ng-click="search()">' +
                                    '<i class="fa fa-search"></i>' +
                                    '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;' +
                                    '</button>' +
                                    // ' <button class="btn btn-info btn-bordered" ng-click="resetSearch($event)">' +
                                    // '<i class="fa fa-refresh"></i>' +
                                    // '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;' +
                                    // '</button>' +
                                    '</div>';
                            $element.find('.searchParam').html(searchItemsHtml);
                            $compile($element.contents())($scope);
                        }
                    });
                    $scope.watch = [$scope.params, $scope.autoSearch];

                    $scope.$watch('autoSearch', function (val, oldval) {
                        $scope.watch[1] = val;
                    });
                    $scope.$watch('params', function (val) {
                        $scope.watch[0] = val;
                    }, true);

                    $scope.$watch('watch', function (newVal, oldVal) {
                        angular.extend($scope.searchText, $scope.params);
                        if (newVal[1] != oldVal[1])
                            $scope.search();
                    }, true);

                    $scope.search = function () {
                        $scope.searchAction();
                    }
                    $scope.resetSearch = function () {
                        // 清空对象  清空第一层
                        angular.forEach($scope.params, function (val, key) {
                            $scope.params[key] = undefined;
                        });
                        $ctrl.refreshCurrentView();
                    }
                    $scope.search_keyup = function (event) {
                        if (event.keyCode == 13) {
                            $scope.search();
                        }
                    }
                }
            }
        })
        .directive('hjmPaginationBar', function ($rootScope, $state, $http, $uibModal, $filter, widget, $templateCache, $compile) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    pageInfo: '='
                },
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-pagination-bar.html'),
                link: function ($scope, $element, $attrs, $ctrl) {
                    $scope.$watch('pageInfo', function (pageInfoDef) {
                        $scope.pageInfo = pageInfoDef;
                    });
                    $scope.getapi = function (currentPage) {
                        $scope.pageInfo.currentPage = currentPage;
                    }
                }
            }
        })

})
