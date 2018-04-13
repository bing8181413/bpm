define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('modalPanel', function ($state, $rootScope, $templateCache, $uibModal, $compile) {
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
        .directive('modalTextarea', function ($state, $rootScope, $templateCache, $uibModal, $compile, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                //require: '?ngModel',
                scope: {
                    title: '@',
                    size: '@',
                    content: '=',
                },
                // scope: false,
                template: '<a class="btn btn-primary btn-rounded btn-sm" ng-click="open();" ng-bind="title||\'查看\'"></a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    var content = '';
                    $scope.open = function () {
                        var modalInstance = $uibModal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.title = supscope.title;
                                // console.log(supscope);
                                $timeout(function () {
                                    $scope.content = supscope.content;
                                }, 0);
                                $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                    '<blockquote><p>{{content}}</p></blockquote>'+
                                    // '<div form-textarea text="{{title}}" ng-model="content"> </div > ' +
                                    '</form>';
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            size: supscope.size||'lg'
                        });
                    }
                }
            };
        })


})
;
