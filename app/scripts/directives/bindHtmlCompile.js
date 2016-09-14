define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {

    mod
        .directive('bindHtmlCompile', function ($compile, $templateCache, widget) {
            return {
                restrict: "A",
                scope: {
                    result: "=",
                    bindHtmlCompile: "=",
                    res_extra: "=resExtra"
                },
                link: function ($scope, $element) {
                    $scope.$watch("bindHtmlCompile", function (newVal) {
                        $element.html('');
                        angular.extend($scope, $scope.result);
                        $element.append($compile(newVal)($scope));
                    });
                    // 绑定执行方法
                    $scope.obj_on = function (eveName) {
                        var fun = '$scope';
                        var i = 0;
                        while (!angular.isFunction(eval(fun + '.$parent.' + eveName)) && i < 17) {
                            fun = fun + ".$parent";
                            i++;
                        }
                        //console.log(eval(fun + '.$parent.' + eveName));
                        if (!angular.isFunction(eval(fun + '.$parent.' + eveName))) {
                            widget.msgToast(eveName + ' 不是一个function');
                        } else if (eveName && angular.isObject($scope.result)) {
                            eval(fun + '.$parent.' + eveName + '($scope.result,$scope.result.idx)');
                        }
                    }
                }
            };
        });


})
;
