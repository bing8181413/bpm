define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {

    mod
        .directive('hjmGrid', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-grid.html'),
                controller: ['$scope', function ($scope) {
                    $scope.initTableRequestSend = false;//是否初始化过 table

                    $scope.modsconfs = angular.copy(cons.modsconfs);
                    this.modsconfs = angular.extend({}, $scope.modsconfs);
                    this.buildSearchBar = function (config, element) {
                        if (config.searchSupport) {
                            var preSelectionSearch = '';
                            if (config.preSelectionSearch) {
                                preSelectionSearch = ' pre-selection="searchParams"';
                            }
                            var searchHtml = '<div hjm-search-bar search-items="searchItems" search-text="searchParams"' + preSelectionSearch +
                                'reset-search="refreshCurrentView" search-action="searchAction(searchParams)"></div>'
                            return searchHtml;
                        }
                        return '';
                    }

                    this.buildTable = function (columns, config) {
                        var header = buildHeader(columns, config);
                        var rowDef = buildRows(columns, config);
                        var tpigination = buildTfoot(columns, config);
                        return '<table class="table table-bordered table-striped table-hover">' + header + rowDef + '</table>' + tpigination;
                    }

                    function buildHeader(columns, config) {
                        var headerContent = '';
                        angular.forEach(columns, function (col) {
                            var cssProperty = col.className ? ' class="' + col.className + '" ' : "";
                            headerContent += '<th' + cssProperty + '>' + col.name + '</th>';
                        });
                        // console.log('headerContent :: ', '<thead><tr>' + headerContent + '</tr></thead>');
                        return '<thead><tr>' + headerContent + '</tr></thead>';
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

                    function buildTfoot(columns, config) {
                        if (config.paginationSupport)
                            return '<div hjm-pigination-bar page-info="pageInfo"><div>';
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
                                itemString += '|' + cellFilter;
                            }
                            if (colDef.truncateText) {
                                var textLength = colDef.truncateTextLength;
                                var textBreakOnWord = colDef.truncateTextBreakOnWord;
                                itemString += '|' + ('characters: ' + textLength || 10) + ' : ' + textBreakOnWord;
                                cellContent = '<span ng-bind="' + itemString + '" ></span>';
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
                    columns: '@'
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var columnsDef = '';
                    var configDef = '';
                    $scope.list = [];
                    $scope.searchParams = {};
                    $scope.searchParams = {};
                    $scope.filterParams = {};
                    $scope.searchAction = function (searchParams) {
                        console.log($scope.searchParams);
                        // $scope.searchParams = searchParams;
                        $scope.pageInfo.currentPage = 1;
                        $scope.updateList();
                    }
                    $scope.updateList = function () {
                        var pageInfo = {
                            page: $scope.pageInfo.currentPage || 1,
                            count: configDef.pageInfo.count || 1,
                        };
                        var searchParam = angular.extend({}, configDef.preSelectionSearch, $scope.searchParams, pageInfo);
                        // console.log(configDef.pageInfo);
                        widget.ajaxRequest({
                            method: 'GET',
                            url: configDef.api,
                            scope: $scope,
                            data: searchParam,
                            success: function (json) {
                                $scope.list = json.list;
                                $scope.pageInfo.totalItems = json.count || 20;//获取总数
                            }
                        });
                    }
                    $scope.$watchCollection('[columns,config,modid]', function (gridDef) {
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
                                });
                                $scope.pageInfo = {
                                    itemsPerPage: configDef.pageInfo.count,
                                    maxSize: configDef.pageInfo.maxSize || 5,
                                    currentPage: configDef.pageInfo.page,
                                }//初始化   开始监听  paginationInfo
                                $scope.searchItems = configDef.searchItems || [];
                                $ctrl.refreshCurrentView();
                                // configDef.refreshCurrentView = $scope.refreshCurrentView;
                                var searchBar = $ctrl.buildSearchBar(configDef, $element);
                                var tableContent = $ctrl.buildTable(columnsDef, configDef);
                                console.log(searchBar);
                                $element.find('.searchSection').html(searchBar)
                                $element.find(".gridSection").html(tableContent);
                                $compile($element.contents())($scope);
                                $scope.updateList();
                            }
                        }
                    );
                    $scope.$watch('pageInfo', function (pageInfoDef, pageInfoOld) {
                        if ($scope.initTableRequestSend == false) {
                            $scope.initTableRequestSend = true;
                        } else {
                            //初始化组件已经获取过一次数据 totalItems 为空 等totalItems不是空了就可以走正常的了
                            if (pageInfoDef && pageInfoOld.totalItems) {
                                $scope.updateList('$watch pageInfo');
                            }
                        }
                    }, true)
                }
            };
        })
        .directive('hjmSearchBar', function ($rootScope, $state, $http, $modal, $filter, widget, $templateCache, $compile) {
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
                    $scope.$watch('searchItems', function (searchItemsVal) {
                        if (searchItemsVal) {
                            $scope.searchItems = searchItemsVal;
                            var searchItemsHtml = ''
                            angular.forEach(searchItemsVal, function (val, key) {
                                var placeholder = '';
                                if (val.placeholder) {
                                    placeholder = 'placeholder="' + val.placeholder + '"';
                                }
                                searchItemsHtml += '<div class="form-group col-sm-6">' +
                                    '<label class="col-sm-2 control-label">' + val.text + '</label>' +
                                    '<div class="col-sm-10">' +
                                    '<input type="input" class="form-control" ' + placeholder +
                                    ' ng-model="params.' + val.value + '">' +
                                    '</div>' +
                                    '</div>';
                            })
                            searchItemsHtml += '<div class="form-group col-sm-6">' +
                                '<label class="col-sm-2 control-label"></label>' +
                                '<button type="button" class="btn btn-success btn-bordered" ng-click="search($event)">' +
                                '<i class="fa fa-search"></i>' +
                                '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;' +
                                '</button>' +
                                // '<button class="btn btn-info btn-bordered" ng-click="resetSearch($event)">' +
                                // '<i class="fa fa-refresh"></i>' +
                                // '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;' +
                                // '</button>' +
                                '</div>';
                            $element.find('.searchParam').html(searchItemsHtml);
                            $compile($element.contents())($scope);
                        }
                    });
                    $scope.$watch('params', function (val) {
                        $scope.searchText = angular.extend($scope.searchText, $scope.params);
                    }, true);
                    $scope.search = function (event) {
                        $scope.searchAction();
                    }
                    $scope.resetSearch = function () {
                        $scope.params = {};
                        $ctrl.refreshCurrentView();
                    }
                    $scope.search_keypress = function (event) {
                        if (event.keyCode == 13) {
                            $scope.search();
                        }
                    }
                }
            }
        })
        .directive('hjmPiginationBar', function ($rootScope, $state, $http, $modal, $filter, widget, $templateCache, $compile) {
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
