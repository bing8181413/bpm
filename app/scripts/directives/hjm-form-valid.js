define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {

    mod.directive('noEmptyArray', function () {
        return {
            // require: ['?ngModel'],
            require: 'ngModel',
            link: function (scope, ele, attrs, ctrls) {
                // if (!ngModel) {
                //     return false;
                // }
                // var ngForm = ctrls[0],
                // var ngModel = ctrls[0];
                // var directiveId = 'noEmptyArray';
                // var setValidation = function (isValid) {
                //     ngModel.$setValidity(directiveId, isValid);
                //     ngModel.$processing = ngModel.$pending = false;
                // }
                // var handleChange = function (modelValue) {
                //     console.log(modelValue);
                //     if (typeof modelValue === 'undefined' || modelValue === '' || modelValue.length === 0) {
                //         ngModel.$setPristine();
                //         ngModel.$setValidity(directiveId, true);
                //         return;
                //     }
                //     if (!ngModel.$pending) {
                //         ngModel.$processing = ngModel.$pending = true;
                //     }
                //     console.log(ngModel, modelValue);
                //     if (angular.isArray(modelValue) && modelValue.length > 0) {
                //         console.log(1, modelValue);
                //         setValidation(true);
                //     } else {
                //         console.log(2, modelValue);
                //         setValidation(false);
                //     }
                // }
                // scope.$watch(function () {
                //     console.log(ngModel.$viewValue);
                //     return ngModel.$viewValue;
                // }, handleChange);



                // var flag = false;
                // scope.$watch(scope.ngModel, function() {
                //     if(flag){
                //         flag = false;
                //         ctrls.$setValidity('unique', 'hhhhhhhhhhhhhhhhh');
                //     }else{
                //         flag = true;
                //         ctrls.$setValidity('unique', false);
                //     }
                // });
            }
        };
    });

})
