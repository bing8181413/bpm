define(['./services', '../cons/simpleCons'], function (mod, cons) {
    mod
        .factory('formBody', function ($q, $state, $compile, $location, $rootScope, $log, $filter) {
            var formBody = {
                getScope: function (scope) {
                    var is_form = false;
                    var num = 0;
                    var formScope = null;
                    var loop = function (tmp_scope) {
                        num++;
                        if (num > 20) {
                            // 20层 就不验证了
                            return null;
                        } else if (!tmp_scope.FormBody) {
                            // 继续向上找
                            return loop(tmp_scope.$parent);
                        } else {
                            // 成功了
                            return tmp_scope;
                        }
                    }
                    return loop(scope);
                }
            }
            return formBody;
        });
});
