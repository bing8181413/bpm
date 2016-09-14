define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {
    //  1 : community  排除小区 包括小区 全部小区

    mod
    // <select_city city_list="" city_name=""></select_city>
    // city_list 保存的是  '上海,北京,厦门' 或者'' 这种格式的 需要转化为 array 再处理
    // city_name 保存的是  '上海' 或者''
        .directive('selectCity', function ($state, $rootScope, $templateCache, $modal) {
            return {
                restrict: 'E',
                replace: true,
                //require: '?ngModel',
                scope: {
                    city_list: '=cityList',
                    city_name: '=cityName'
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'select_city.html'),
                link: function ($scope, $element, $attrs) {
                    // $scope.all_citys = [
                    //     {name: '上海'},
                    //     {name: '北京'},
                    //     {name: '厦门'}
                    // ];
                    $scope.all_citys = [];
                    if ($rootScope.hjm.pubData.open_citys) {
                        angular.forEach($rootScope.hjm.pubData.open_citys, function (val, key) {
                            $scope.all_citys.push({name: val});
                        });
                    }
                    $scope.selected_list = [];
                    $scope.init = function () {
                        if ($scope.city_list && $scope.city_list.split(',').length > 0) {
                            angular.forEach($scope.city_list.split(','), function (value, key) {
                                angular.forEach($scope.all_citys, function (val, k) {
                                    if (value == val.name) {
                                        val.checked = true;
                                    }
                                });
                            });
                        }
                    }
                    $scope.$watch('city_name', function (value) {
                        $scope.init();
                    })
                    $scope.toggle = function (item) {
                        $scope.selected_list = [];
                        item.checked = !item.checked;
                        angular.forEach($scope.all_citys, function (value, key) {
                            if (value.checked) {
                                $scope.selected_list.push(value.name);
                            }
                        });
                        $scope.city_list = $scope.selected_list.join(',');
                    };
                }
            };
        })
        // <select_current_city current_city_list="" current_city_name=""></select_current_city>
        // current_city_list 保存的是  '上海,北京,厦门' 或者'' 这种格式的 需要转化为 array 再处理
        // current_city_name 保存的是  '上海' 或者''
        .directive('selectCurrentCity', function ($state, $rootScope, $templateCache, $modal) {
            return {
                restrict: 'E',
                replace: true,
                //require: '?ngModel',
                scope: {
                    current_city_list: '=currentCityList',
                    current_city_name: '=currentCityName'
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'select_city.html'),
                link: function ($scope, $element, $attrs) {
                    $scope.isradio = true;
                    $scope.selected_list = [];
                    $scope.init = function () {
                        $scope.all_citys = [];// 填充前端html的对象 初始化 checked
                        if ($scope.current_city_list && $scope.current_city_list.split(',').length > 0) {
                            angular.forEach($scope.current_city_list.split(','), function (value, key) {
                                if (value == $scope.current_city_name) {
                                    $scope.all_citys.push({
                                        checked: true,
                                        name: value
                                    });
                                } else {
                                    $scope.all_citys.push({
                                        checked: false,
                                        name: value
                                    });
                                }
                            });
                        }
                    }
                    $scope.$watch('currentCityName', function (value) {
                        $scope.init();
                    })
                    $scope.toggle = function (item) {
                        angular.forEach($scope.all_citys, function (value, key) {
                            if (value.name == item.name) {
                                value.checked = true;
                            } else {
                                value.checked = false;
                            }
                        });
                        $scope.current_city_name = item.name;
                    };
                }
            };
        })


})
;
