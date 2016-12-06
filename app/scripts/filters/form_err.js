define([
    './filters',
    '../cons/simpleCons'
], function (mod, simpleCons) {
    mod
    // form_err
        .filter('form_err', [function () {
            return function (val) {
                var result = val;
                val = val + '';
                switch (val) {
                    case "required":
                        result = "必填项未填写";
                        break;
                    case "maxlength":
                        result = "超过最大数据限制";
                        break;
                    case "minlength":
                        result = "至少要有一个数据";
                        break;
                }

                return result;
            }
        }])
    ;
});