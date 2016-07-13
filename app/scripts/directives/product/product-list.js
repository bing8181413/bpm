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
                    productPattern: '=',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'product/product-pattern.html'),
                link: function ($scope, $element, $attrs) {
                    // console.log($scope.productPattern);
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
                    $scope.txt = '有效期:' + $filter('num2hour')($scope.groupbuyPattern.group_seconds);
                    $scope.txt += '<br/>起始价:' + $scope.groupbuyPattern.high_price;
                    $scope.txt += '<br/>底价:' + $scope.groupbuyPattern.bottom_price;
                    $scope.txt += '<br/>单人返现:' + $scope.groupbuyPattern.per_cut_amount;
                }
            }
        })

});
