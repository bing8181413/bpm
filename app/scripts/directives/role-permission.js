define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {

    mod
    //  确定某个角色可以看到此元素
        .directive('showRole', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $animate) {
            return {
                restrict: 'A',
                // scope: {},
                link: function ($scope, $element, $attrs) {
                    // console.log($attrs);
                    // $scope.showRole = $attrs.showRole;
                    $scope.showRoleChange = function (val) {
                        if (val && val.indexOf($rootScope.hjm.role) > -1) {
                            $element.addClass((val.indexOf('!') > -1) ? 'hide' : 'hahahahaha');
                            // console.log('showRole', 111111111, val, val.indexOf('!'));
                            // console.log($attrs);
                        } else if (val == '' || val == '\'\'') {
                            $element.removeClass('hide');
                            // console.log('showRole', 2222222222, val, val.indexOf('!'));
                        } else {
                            // console.log('showRole', 3333333333, val, val.indexOf('!'));
                            // $element.addClass('hide');
                            $element.addClass((val.indexOf('!') > -1) ? 'hahahahaha' : 'hide');
                        }
                    }
                    $attrs.$observe('showRole', function (val) {
                        $scope.showRoleChange(val);
                    });
                    // $scope.$watch('showRole', function (val) {
                    //     //不包含的角色
                    //     $scope.showRoleChange(val);
                    // });
                }
            };
        })
        //  确定某个角色可以编辑此元素
        .directive('disabledRole', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $animate) {
            return {
                restrict: 'A',
                link: function ($scope, $element, $attrs) {
                    $scope.disabledRole = $attrs.disabledRole;
                    $scope.$watch('disabledRole', function (val) {
                        //不包含的角色
                        // console.log($attrs.$attr.disabled == 'disabled');
                        if ($attrs.$attr.disabled)return;// 判断之前是否有控制ng-disabled的属性 已经赋值过了  就不要二次赋值了
                        if (val && val.indexOf($rootScope.hjm.role) > -1) {
                            // console.log('disabledRole', 11111111, val, (val.indexOf('!') > -1) ? true : false);
                            $attrs.$set('disabled', (val.indexOf('!') > -1) ? true : false);
                        } else if (val == '' || val == '\'\'') {
                            // console.log('disabledRole', 22222222, val);
                        } else {
                            // console.log('disabledRole', 33333333, val);
                            $attrs.$set('disabled', true);
                        }
                    });
                }
            };
        })
})
