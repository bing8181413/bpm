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
                                // console.log($scope, $attrs);
                                content += '<div class="panel panel-primary" style="margin-bottom: 0;border:0;"> ' +
                                    '           <div class="panel-heading">' +
                                    '           <button type="button" class="close" ng-click="cancel();">×</button>' +
                                    '           <h3 class="panel-title" ng-bind="title"></h3>' +
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
        .directive('modalTextarea', function ($state, $rootScope, $templateCache, $modal, $compile, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                //require: '?ngModel',
                scope: {
                    title: '@',
                    content: '=',
                },
                // scope: false,
                template: '<div class="show_textarea"></div>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    var content = '';
                    // console.log($scope, $attrs);
                    content = '<a class="btn btn-primary btn-rounded btn-sm" ng-click="show_modal();" ng-bind="title"></a>';
                    $element.find('.show_textarea').html(content);
                    $compile($element.contents())($scope)
                    $scope.show_modal = function () {
                        var modalInstance = $modal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.title = supscope.title;
                                // console.log(supscope);
                                $timeout(function () {
                                    $scope.content = supscope.content;
                                }, 0);
                                $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-textarea text="{{title}}" ng-model="content"> </div > ' +
                                    '</form>';
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: ''
                        });
                    }
                }
            };
        })


})
;
