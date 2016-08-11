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
                numMulti: function (num1, num2) {
                    var baseNum = 0;
                    try {
                        baseNum += (num1 || 0).toString().split(".")[1].length;
                    } catch (e) {
                        baseNum += 0;
                    }
                    try {
                        baseNum += (num2 || 0).toString().split(".")[1].length;
                    } catch (e) {
                        baseNum += 0;
                    }
                    return Number((num1 || 0).toString().replace(".", "")) * Number((num2 || 0).toString().replace(".", "")) / Math.pow(10, baseNum);
                },
                numAdd: function (num1, num2) {
                    var baseNum, baseNum1, baseNum2;
                    try {
                        baseNum1 = num1.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum1 = 0;
                    }
                    try {
                        baseNum2 = num2.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum2 = 0;
                    }
                    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
                    return (this.numMulti(num1, baseNum) + this.numMulti(num2, baseNum)) / baseNum;
                }
            };
            return comfunc;
        });
});
