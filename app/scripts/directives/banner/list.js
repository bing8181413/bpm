define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    // <div product-pattern="patterns"></div>
    mod
        .directive('bannerUpdate', function ($templateCache, $filter, $compile, widget, $state, $rootScope) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-success" ng-click="update();">编辑</a>',
                link: function ($scope, $element, $attrs) {
                    $scope.update = function () {
                        $state.go('main.banner.update', {banner_id: $scope.data.banner_id});
                    }
                }
            }
        })
        .directive('bannerChangeStatus', function ($templateCache, $filter, $compile, widget) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="change-status" ></p>',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '下线';
                        status_text = 'ng-bind="\'下线\'"';
                        click_text = 'ng-click="change(2);"';
                        $scope.show_text = true;
                    } else if ($scope.data.status == 2) {
                        status_title = '上线';
                        status_text = 'ng-bind="\'上线\'"';
                        click_text = 'ng-click="change(1);"';
                        $scope.show_text = true;
                    }else{
                        $scope.show_text = false;
                    }
                    $scope.change = function (status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: '/banners/' + $scope.data.banner_id || 0,
                                method: 'patch',
                                scope: $scope,
                                data: {status: status},
                                success: function (json) {
                                    widget.msgToast('修改成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }
                    }
                    var content = '<a class="btn btn-primary "' + status_text + click_text + ' ng-show="show_text"></a>';
                    $element.find('.change-status').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
});
