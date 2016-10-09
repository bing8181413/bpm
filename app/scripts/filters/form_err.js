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
                        result = "长度大于要求长度";
                        break;
                    case "minlength":
                        result = "长度小于要求长度";
                        break;
                }

                return result;
            }
        }])
    ;
});