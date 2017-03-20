define(['./services', '../cons/simpleCons'], function (mod, cons) {
    mod
        .factory('comfunc', function ($q, $state, $compile, $location, $rootScope, $log) {
            var comfunc = {
                isEmptyArray: function (arr) {
                    if (angular.isArray(arr)) {
                        return (arr.length == 0) || false;
                    } else {
                        console.log(arr + ' 不是一个数组');
                        return true;
                    }
                },
                hasEmptyFieldArray: function (_arr) {
                    var flag = false;
                    angular.forEach(_arr, function (val, key) {
                        angular.forEach(val, function (v, k) {
                            if (v !== 0 && (!v || v == '')) {
                                console.log(k, v);
                                flag = true;
                            }
                        })
                    });
                    return flag;
                },
                //  乘法
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
                //  加法
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
                },
                //  减法
                numSub: function (num1, num2) {
                    var baseNum, baseNum1, baseNum2;
                    var precision;// 精度
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
                    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
                    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
                },
                //  除法
                numDiv: function (num1, num2) {
                    var baseNum1 = 0, baseNum2 = 0;
                    var baseNum3, baseNum4;
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
                    with (Math) {
                        baseNum3 = Number(num1.toString().replace(".", ""));
                        baseNum4 = Number(num2.toString().replace(".", ""));
                        return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
                    }
                }
            };
            return comfunc;
        });
});
