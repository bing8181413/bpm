define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {

    mod.directive('ueditor', function () {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            template: '<script name="content" type="text/plain" ng-transclude>GGG</script>',
            require: '?ngModel',
            scope: {
                config: '='
            },
            link: function (scope, element, attrs, ngModel) {
                var editor = new UE.ui.Editor(scope.config || {});
                editor.render(element[0]);
                editor.ready(function () {
                    // console.log(scope.config,ngModel.$viewValue, ngModel);
                    if (ngModel.$viewValue) {
                        editor.setContent(ngModel.$viewValue);
                    }
                    ngModel.$render = function () {
                        try {
                            editor.setContent(ngModel.$viewValue);
                        } catch (e) {
                            console.log(e);
                        }
                    };
                    editor.addListener('contentChange', function () {
                        setTimeout(function () {
                            scope.$apply(function () {
                                ngModel.$setViewValue(editor.getContent());
                            })
                        }, 0);
                    })
                });
            }
        }
    });

})
