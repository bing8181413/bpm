define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {

    mod
        .directive('navMessage', function ($rootScope, $state, $http, $modal, $filter, widget, $templateCache) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {},
                // template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'nav-top/nav-message.html'),
                link: function ($scope, $element, $attrs) {

                }
            };
        })
        .directive('navAccount', function ($rootScope, $state, $http, $modal, $filter, widget, $templateCache) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {},
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'nav-top/nav-account.html'),
                link: function ($scope, $element, $attrs) {
                    $scope.logout = function () {
                        $http.defaults.headers.common.Authorization = '';
                        delete $rootScope.hjm;
                        delete $rootScope.selected;
                        delete $rootScope.login_account;
                        localStorage.clear();
                        // console.log('登出');
                        $rootScope.$state.go('login');
                    }
                    $scope.change_city = function () {
                        var modalInstance = $modal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl" callback="callback"></div>',
                            controller: function ($scope, $modalInstance, $timeout) {
                                $scope.title = '切换城市';
                                $scope.open_citys = '[';
                                angular.forEach($rootScope.hjm.pubData.open_citys, function (val, key) {
                                    $scope.open_citys += '{text: \'' + val + '\', value: \'' + val + '\'},';
                                })
                                $scope.open_citys += ']';
                                // console.log($scope.open_citys);
                                $timeout(function () {
                                    $scope.city_name = $rootScope.hjm.city_name;
                                }, 0);
                                $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-radio text="切换城市" ng-model="city_name" ' + ' source="' + $scope.open_citys + '"> </div> ' +
                                    '<a class="btn btn-primary btn-rounded pull-right" ng-click="change_city_name()">确定</a>' +
                                    '</form>';
                                $scope.change_city_name = function () {
                                    widget.ajaxRequest({
                                        url: '/account/' + $rootScope.hjm.account_id,
                                        method: 'PUT',
                                        scope: $scope,
                                        data: {city_name: $scope.city_name},
                                        success: function (json) {
                                            widget.msgToast('切换城市成功');
                                            $rootScope.hjm.city_name = $scope.city_name;
                                            $scope.cancel();
                                        }
                                    })
                                }
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: 'lg'
                        });
                    }
                    if ($rootScope.hjm) {
                        $scope.hjm = $rootScope.hjm || {};
                    } else {
                        $scope.logout();
                    }
                }
            };
        })


})
;
