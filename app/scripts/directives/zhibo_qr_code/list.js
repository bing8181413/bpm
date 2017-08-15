define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('zhiboQrCodeChangeStatus', function ($templateCache, $filter, $compile, widget) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '删除';
                        status_text = 'ng-bind="\'删除\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="del();"';
                        $scope.show_text = true;
                    }
                    $scope.del = function () {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: '/cctalk/qrcodes/' + $scope.data.id + '/status/2',
                                method: 'put',
                                scope: $scope,
                                data: {},
                                success: function (json) {
                                    widget.msgToast('修改成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }
                    }
                    var content = '<a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + ' ng-show="show_text"></a>';
                    $element.html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('addZhiboQrCode', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout, comfunc) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-primary pull-right" ng-click="add_qr_code()" >新增CCtalk二维码</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.add_qr_code = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '新增CCtalk二维码';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                                        '<div form-image-single text="二维码" ng-model="url" required="true"></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $scope.submit = function () {
                                        if (!$scope.url) {
                                            widget.msgToast('还没有完成上传二维码图片');
                                            return false;
                                        }
                                        widget.ajaxRequest({
                                            url: '/cctalk/qrcodes',
                                            method: 'post',
                                            scope: $scope,
                                            data: {url: $scope.url},
                                            success: function (json) {
                                                widget.msgToast('上传成功,请刷新查看');
                                                $scope.$parent.$$childHead.$$childTail.$$childHead.$$childHead.searchAction();
                                            }
                                        })

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
