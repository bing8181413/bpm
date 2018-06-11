define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('showTable', function ($templateCache, $filter, $compile, widget, $uibModal, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show();" ng-bind="text" ></a>',
                link: function ($scope, $element, $attrs) {
                    $scope.text = $scope.data.text;
                    $scope.config = $scope.data.config;
                    $scope.modid = $scope.data.modid;
                    $scope.columns = $scope.data.columns;
                    $scope.ext = $scope.data.ext;
                    $scope.extApi = $scope.data.extApi;
                    // $scope.ext = {};
                    // $scope.extApi = '/students/' + $scope.data.user_id + '/lessons';
                    if (!$scope.modid) {
                        console.log('没有modid');
                    }
                    if (!$scope.config) {
                        console.log('没有config');
                    }
                    if (!$scope.columns) {
                        console.log('没有columns');
                    }
                    var tmp = '<div hjm-grid modid="' + $scope.modid + '" config="' + $scope.config + '" columns="' + $scope.columns + '" ext-search="ext" ext-api="extApi"></div>'
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                            template: tmp,
                            controller: function ($scope, $uibModalInstance) {
                                $scope.ext = supscope.ext;
                                $scope.extApi = supscope.extApi;
                                // console.log(1, $scope.extApi, $scope.ext);
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
});
