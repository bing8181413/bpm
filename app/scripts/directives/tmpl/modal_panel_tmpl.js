define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('modalPanel', function ($state, $rootScope, $templateCache, $modal, $compile) {
            return {
                restrict: 'AE',
                replace: false,
                //require: '?ngModel',
                // scope: {
                //     title: '@',
                //     tmpl: '=',
                //     param: '=',
                //     cancel: '&',
                // },
                scope: false,
                template: '<div class="modalPanel"></div>',
                link: function ($scope, $element, $attrs) {
                    var content = '';
                    $scope.$watch('tmpl', function (defVal) {
                        content = '';
                        if (defVal) {
                            if ($scope.title) {
                                content += '<div class="panel panel-primary" style="margin-bottom: 0;border:0;"> ' +
                                    '           <div class="panel-heading">' +
                                    '           <button type="button" class="close" ng-click="cancel();">×</button>' +
                                    '               <h3 class="panel-title" ng-bind="title"></h3>' +
                                    '           </div>' +
                                    '           <div class="panel-body">' + $scope.tmpl + '</div>' +
                                    '       </div>';
                            } else {
                                content += $attrs.tmpl;
                            }
                            $element.find('.modalPanel').html(content);
                            $compile($element.contents())($scope);
                        }
                    });
                }
            };
        })


})
;
