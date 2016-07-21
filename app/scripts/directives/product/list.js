define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    // <div product-pattern="patterns"></div>
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
                    groupbuyPattern: '=',
                },
                template: '<p ng-bind-html="txt"></p>',
                // template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'product/groupbuy-pattern.html'),
                link: function ($scope, $element, $attrs) {
                    // console.log($scope.groupbuyPattern);
                    if ($scope.groupbuyPattern.category == 1) {
                        $scope.txt = '砍价团';
                        $scope.txt += '<br/>拼团有效时间:' + $filter('second2hour')($scope.groupbuyPattern.group_seconds)+'小时';
                        $scope.txt += '<br/>起始价:' + $scope.groupbuyPattern.high_price;
                        $scope.txt += '<br/>底价:' + $scope.groupbuyPattern.bottom_price;
                        $scope.txt += '<br/>单人返现:' + $scope.groupbuyPattern.per_cut_amount;
                    } else if ($scope.groupbuyPattern.category == 2) {
                        $scope.txt = '人数团';
                        $scope.txt += '<br/>拼团有效时间:' + $filter('second2hour')($scope.groupbuyPattern.group_seconds)+'小时';
                        $scope.txt += '<br/>人数:' + $scope.groupbuyPattern.group_min_num;
                        $scope.txt += '<br/>单价:' + $scope.groupbuyPattern.price;
                    }
                }
            }
        })
        .directive('productStartEnd', function ($templateCache, $filter, $compile, widget) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p ng-bind-html="txt"></p>',
                link: function ($scope, $element, $attrs) {
                    if ($scope.data) {
                        $scope.txt = '上架时间<br/>' + $scope.data.start_time;
                        $scope.txt += '<br/>下架时间<br/>' + $scope.data.end_time;
                    }
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
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '下线';
                        status_text = 'ng-bind="\'下线\'"';
                        click_text = 'ng-click="change(3);"';
                        $scope.show_text = true;
                    } else if ($scope.data.status == 3) {
                        status_title = '上线';
                        status_text = 'ng-bind="\'上线\'"';
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
                    var content = '<a class="btn btn-primary "' + status_text + click_text + ' ng-show="show_text"></a>';
                    $element.find('.change-status').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
});
