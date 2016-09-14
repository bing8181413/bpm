define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {

    mod
    //<common_list res_head="" res_data=""></common_list>
        .directive('commonList', function ($rootScope, $state, $http, $modal, $filter, widget, $templateCache) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    res_head: '=resHead',
                    res_data: '=resData',
                    res_extra: '=resExtra',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_LIST_PATH + 'common_list.html'),
                link: function ($scope, $element, $attrs) {
                    // verfiy res_head 的必要参数是否为空
                    $scope.$watch('res_head', function (newval) {
                        if (newval) {
                            angular.forEach(newval, function (val, key) {
                                if (!val.name) {
                                    $scope.msg = 'res_head name 不存在！';
                                    widget.msgToast($scope.msg);
                                    throw  new Error($scope.msg);
                                }
                                if (!val.key && !val.template && !val.on) {
                                    $scope.msg = val.name + '的 key, tamplate, on 不存在！';
                                    widget.msgToast($scope.msg);
                                    throw  new Error($scope.msg);
                                }
                            });
                        }
                    });
                    //// 执行方法
                    //$scope.obj_on = function (eveName, item) {
                    //    if (!angular.isFunction(eval('$scope.$parent.' + eveName))) {
                    //        widget.msgToast(eveName + ' 不是一个function');
                    //    } else if (eveName && angular.isObject(item)) {
                    //        eval('$scope.$parent.' + eveName + '(item,item.idx)');
                    //    }
                    //}
                }
            };
        })
});
