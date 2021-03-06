define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    // <div product-pattern="patterns"></div>
    mod
        .directive('addResourceImage', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout, comfunc) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-primary pull-left" ng-click="show_add_resource()" >新增资源图片</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_add_resource = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '新增资源图片';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate' +
                                        ' disabled-role="\'admin,op\'" >' +
                                        '<div form-image text="新增资源图片" ng-model="pics" token="resource" max="100"></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $scope.submit = function () {
                                        if ($scope.pics && !comfunc.isEmptyArray($scope.pics)) {
                                            var tmp_pics_err = 0;
                                            angular.forEach($scope.pics, function (val, key) {
                                                if (!val.pic_url) {
                                                    tmp_pics_err++;
                                                }
                                            })
                                            if (tmp_pics_err > 0) {
                                                widget.msgToast('还没有完成上传');
                                                return false;
                                            }
                                        }
                                        $scope.$parent.$$childHead.$$childTail.$$childHead.$$childHead.searchAction();
                                        $scope.cancel();
                                    }
                                    $scope.cancel = function () {
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg'
                            }
                        );
                    }
                }
            }
        })
        .directive('addResourceMedia', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout,comfunc) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-primary pull-left" ng-click="show_add_resource()" >新增媒体资源库</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_add_resource = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '新增媒体资源库';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate' +
                                        ' disabled-role="\'admin,op\'" >' +
                                        ' <h4 class="text-center text-danger">支持格式 | mp3 | mp4 | pdf | doc | docx | xls | xlsx | ppt | pptx | x-rar | zip |</h4>'+
                                        '<div form-media text="新增媒体资源库" ng-model="pics" token="resource" max="100" min="1"></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $scope.submit = function () {
                                        if ($scope.pics && !comfunc.isEmptyArray($scope.pics)) {
                                            var tmp_pics_err = 0;
                                            angular.forEach($scope.pics, function (val, key) {
                                                if (!val.pic_url) {
                                                    tmp_pics_err++;
                                                }
                                            })
                                            if (tmp_pics_err > 0) {
                                                widget.msgToast('还没有完成上传');
                                                return false;
                                            }
                                        }
                                        $scope.$parent.$$childHead.$$childTail.$$childHead.$$childHead.searchAction();
                                        $scope.cancel();
                                    }
                                    $scope.cancel = function () {
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg'
                            }
                        );
                    }
                }
            }
        })
});
