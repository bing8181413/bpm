define(['./services', '../cons/simpleCons'], function (mod, cons) {
    mod
        .factory('comfunc', function ($q, $state, $compile, $location, $rootScope) {
            var comfunc = {
                isEmptyArray: function (arr) {
                    if (angular.isArray(arr)) {
                        return (arr.length == 0) || false;
                    } else {
                        $log.error(arr + ' 不是一个数组');
                        return true;
                    }
                },

            };
            return comfunc;
        });
});
