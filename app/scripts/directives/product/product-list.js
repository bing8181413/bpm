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
                    console.log($scope.productPattern);
                }
            };
        })


});
