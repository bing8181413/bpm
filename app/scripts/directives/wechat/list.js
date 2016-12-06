define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('qrcodeDelete', function ($templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="qrcode-delete"></p>',
                link: function ($scope, $element, $attrs) {
                    var status_title = ' 删除 ';
                    var click_text = 'ng-click="change();"';
                    var class_text = 'ng-class={\"btn-warning\":true} ';
                    var status_text = 'ng-bind="\'删除二维码\'"';
                    $scope.change = function (status) {
                        if (confirm('确认' + status_title + '该二维码?')) {
                            widget.ajaxRequest({
                                url: '/wechat/qrcode/' + $scope.data.qrcode_id || 0,
                                method: 'delete',
                                scope: $scope,
                                // data: {},
                                success: function (json) {
                                    widget.msgToast('删除成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }
                    }
                    var content = '<a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text +
                        ' show-role="\'admin,op\'"></a>';
                    $element.find('.qrcode-delete').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
});
