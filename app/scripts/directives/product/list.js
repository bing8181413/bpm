define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('productPattern', function ($templateCache) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'product/product-pattern.html'),
                link: function ($scope, $element, $attrs) {
                    $scope.cities = [];
                    if ($scope.data.citys) {
                        angular.forEach($scope.data.citys, function (val) {
                            $scope.cities.push(val.city_name);
                        });
                        // console.log($scope.cities.join(','));
                    }
                }
            };
        })
        .directive('groupbuyPattern', function ($templateCache, $filter, $compile) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="txt"></p>',
                // template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'product/groupbuy-pattern.html'),
                link: function ($scope, $element, $attrs) {
                    // console.log($scope.data);
                    // console.log(1);
                    if ($scope.data && $scope.data.category == 1) {
                        $scope.txt = '砍价团';
                        $scope.txt += '<br/>拼团有效时间:' + $filter('second2hour')($scope.data.group_seconds) + '小时';
                        $scope.txt += '<br/>起始价:' + $scope.data.high_price;
                        $scope.txt += '<br/>底价:' + $scope.data.bottom_price;
                        $scope.txt += '<br/>单人返现:' + $scope.data.per_cut_amount;
                    } else if ($scope.data && $scope.data.category == 2) {
                        $scope.txt = '人数团';
                        $scope.txt += '<br/>拼团有效时间:' + $filter('second2hour')($scope.data.group_seconds) + '小时';
                        $scope.txt += '<br/>人数:' + $scope.data.group_min_num;
                        $scope.txt += '<br/>单价:' + $scope.data.price;
                    }
                    $element.find(".txt").html($scope.txt);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('productChangeStatus', function ($templateCache, $filter, $compile, widget) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="change-status" ></p>',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '下线';
                        status_text = 'ng-bind="\'下线\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(3);"';
                        $scope.show_text = true;
                    } else if ($scope.data.status == 3) {
                        status_title = '上线';
                        status_text = 'ng-bind="\'上线\'"';
                        class_text = 'ng-class={\"btn-primary\":true} ';
                        click_text = 'ng-click="change(1);"';
                        $scope.show_text = true;
                    }
                    $scope.change = function (status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: '/products/' + $scope.data.product_id || 0,
                                method: 'patch',
                                scope: $scope,
                                data: {status: status},
                                success: function (json) {
                                    widget.msgToast('修改成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }
                    }
                    var content = '<a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + ' ng-show="show_text"></a>';
                    $element.find('.change-status').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('productOption', function ($templateCache) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'product/product-option.html'),
                link: function ($scope, $element, $attrs) {

                }
            };
        })
});
