define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {

    mod
        .directive('hjmGrid', function ($rootScope, $state, $http, $modal, $filter, widget, $templateCache) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {},
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-grid.html'),
                controller: ['$scope', function ($scope) {
                    // console.log(111, $scope);
                    $scope.modsconf = angular.copy(cons.modsconf[0]);
                    $scope.modsconf = angular.extend({}, $scope.modsconf, {dsdas: 111});
                    this.modsconf = $scope.modsconf;
                }],
                link: function ($scope, $element, $attrs, $ctrl) {
                    $scope.modsconf = $ctrl.modsconf;
                    $scope.biz = {};
                    if ($attrs.store) {//api
                        $scope.biz.store = $scope.$eval('modsconf.' + $attrs.store, $scope);
                    }
                    if ($attrs.columns) {//数据展示配置
                        $scope.biz.columns = $scope.$eval('modsconf.' + $attrs.columns, $scope);
                    }
                    if ($attrs.search) {// search bar 配置
                        $scope.biz.search = $scope.$eval('modsconf.' + $attrs.search, $scope);
                    }
                    if ($attrs.pageInfo) { // 分页配置
                        $scope.biz.pageInfo = angular.extend({
                            totalItems: 20,
                            itemsPerPage: 20,
                            currentPage: 1,
                            maxSize: 5
                        }, $scope.$eval('modsconf.' + $attrs.pageInfo, $scope));
                    } else {
                        $scope.biz.pageInfo = {totalItems: 20, itemsPerPage: 20, currentPage: 1, maxSize: 5};
                    }
                    console.log($scope.biz);
                    this.getStore = function () {
                        // console.log(cons.domain + $scope.biz.store);
                        widget.ajaxRequest({
                            url: $scope.biz.store,
                            scope: $scope,
                            data: {count: 20, page: 1},
                            success: function (data) {
                                console.log(data);
                                $scope.biz.list = data;
                                // $scope.totalItems = 20;
                                // $scope.itemsPerPage = $scope.biz.search;
                                // $scope.currentPage = page ? page : $scope.list_param.page;
                                // $scope.maxSize = '5';
                            },
                            error: function () {

                            }
                        });
                    }
                    this.getStore();
                }
            };
        })
        .directive('hjmSearchBar', function ($rootScope, $state, $http, $modal, $filter, widget, $templateCache, $log) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    hjmSearchBar: '='
                },
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-search-bar.html'),
                link: function ($scope, $element, $attrs, $ctrl) {
                    console.log('hjmSearchBar', $attrs);
                    $log.log(111111);
                    console.log($log);
                }
            };
        })

})
;
