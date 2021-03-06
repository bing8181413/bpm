define(['./services', '../cons/simpleCons'], function(mod, cons) {
  mod.factory('comfunc', function($q, $state, $compile, $location, $rootScope, $log, $filter) {
    var comfunc = {
      // 是0~1的小数
      isDecimal: function(decimalNum) {
        if (decimalNum === '' || decimalNum === undefined) {
          return false;
        } else if (Number(decimalNum) == decimalNum) {
          // 是否为 大于等于0 小于1的数
          if (this.numMulti(decimalNum, 100) >= 0 && this.numMulti(decimalNum, 100) < 100) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      },
      getDatePeriod: function(period) {
        var day_start = new Date();
        var day_end = new Date();
        var rtn_start = '';
        var rtn_end = '';
        period = period + '';
        switch (period) {
          case '1'://今天
            rtn_start = $filter('date')(day_start, 'yyyy-MM-dd 00:00:00');
            rtn_end = $filter('date')(day_end, 'yyyy-MM-dd 23:59:59');
            break;
          case '2':// 昨天
            day_start.setDate(day_start.getDate() - 1);
            day_end.setDate(day_end.getDate() - 1);
            rtn_start = $filter('date')(day_start, 'yyyy-MM-dd 00:00:00');
            rtn_end = $filter('date')(day_end, 'yyyy-MM-dd 23:59:59');
            break;
          case '3':// 本周
            day_start.setDate(day_start.getDate() - (day_end.getDay() - 1));
            rtn_start = $filter('date')(day_start, 'yyyy-MM-dd 00:00:00');
            rtn_end = $filter('date')(day_end, 'yyyy-MM-dd 23:59:59');
            break;
          case '4':// 本月
            rtn_start = $filter('date')(day_start, 'yyyy-MM-01 00:00:00');
            rtn_end = $filter('date')(day_end, 'yyyy-MM-dd 23:59:59');
            break;
          case '5':// 过去7天
            day_start.setDate(day_start.getDate() - 6);
            rtn_start = $filter('date')(day_start, 'yyyy-MM-dd 00:00:00');
            rtn_end = $filter('date')(day_end, 'yyyy-MM-dd 23:59:59');
            break;
          case '6':// 过去30天
            day_start.setDate(day_start.getDate() - 29);
            rtn_start = $filter('date')(day_start, 'yyyy-MM-dd 00:00:00');
            rtn_end = $filter('date')(day_end, 'yyyy-MM-dd 23:59:59');
            break;
          default:// 其他
            rtn_start = $filter('date')(day_start, 'yyyy-MM-dd 00:00:00');
            rtn_end = $filter('date')(day_end, 'yyyy-MM-dd 23:59:59');
            break;
        }
        return {start_time: rtn_start, end_time: rtn_end};
      },
      isEmptyArray: function(arr) {
        if (angular.isArray(arr)) {
          return (arr.length == 0) || false;
        } else {
          console.log(arr + ' 不是一个数组');
          return true;
        }
      },
      hasEmptyFieldArray: function(_arr) {
        var flag = false;
        angular.forEach(_arr, function(val, key) {
          angular.forEach(val, function(v, k) {
            if (v !== 0 && (!v || v == '')) {
              console.log(k, v);
              flag = true;
            }
          });
        });
        return flag;
      },
      //  乘法
      numMulti: function(num1, num2) {
        var baseNum = 0;
        try {
          baseNum += (num1 || 0).toString().split('.')[1].length;
        } catch (e) {
          baseNum += 0;
        }
        try {
          baseNum += (num2 || 0).toString().split('.')[1].length;
        } catch (e) {
          baseNum += 0;
        }
        return Number((num1 || 0).toString().replace('.', '')) * Number((num2 || 0).toString().replace('.', '')) / Math.pow(10, baseNum);
      },
      //  加法
      numAdd: function(num1, num2) {
        var baseNum, baseNum1, baseNum2;
        try {
          baseNum1 = num1.toString().split('.')[1].length;
        } catch (e) {
          baseNum1 = 0;
        }
        try {
          baseNum2 = num2.toString().split('.')[1].length;
        } catch (e) {
          baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return (this.numMulti(num1, baseNum) + this.numMulti(num2, baseNum)) / baseNum;
      },
      //  减法
      numSub: function(num1, num2) {
        var baseNum, baseNum1, baseNum2;
        var precision;// 精度
        try {
          baseNum1 = num1.toString().split('.')[1].length;
        } catch (e) {
          baseNum1 = 0;
        }
        try {
          baseNum2 = num2.toString().split('.')[1].length;
        } catch (e) {
          baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
        return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
      },
      //  除法
      numDiv: function(num1, num2) {
        var baseNum1 = 0, baseNum2 = 0;
        var baseNum3, baseNum4;
        try {
          baseNum1 = num1.toString().split('.')[1].length;
        } catch (e) {
          baseNum1 = 0;
        }
        try {
          baseNum2 = num2.toString().split('.')[1].length;
        } catch (e) {
          baseNum2 = 0;
        }
        with (Math) {
          baseNum3 = Number(num1.toString().replace('.', ''));
          baseNum4 = Number(num2.toString().replace('.', ''));
          return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
        }
      },
    };
    return comfunc;
  });
});
