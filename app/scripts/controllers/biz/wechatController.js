// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('wechat.menuController', menuController)
        .controller('wechat.autoreplyController', autoreplyController)
        .controller('wechat.qrcodeController', qrcodeController)

    autoreplyController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', 'comfunc'];
    qrcodeController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', 'comfunc'];
    menuController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', 'comfunc'];
    function menuController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, comfunc, $filter, comfunc) {
        widget.ajaxRequest({
            url: '/wechat/menu/',
            method: 'GET',
            scope: $scope,
            data: {},
            success: function (json) {
                $scope.menu = angular.toJson(json.data, true);
            }
        })
        $scope.submit = function () {
            widget.ajaxRequest({
                url: '/wechat/menu/',
                method: 'POST',
                scope: $scope,
                data: {menu: $scope.menu},
                success: function (json) {
                    widget.msgToast('微信菜单维护成功！');
                }
            })
        }
    };
    function autoreplyController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, comfunc, $filter, comfunc) {
        widget.ajaxRequest({
            url: '/wechat/autoreply/',
            method: 'GET',
            scope: $scope,
            data: {},
            success: function (json) {
                $scope.auto_reply = angular.toJson(json.data, true);
            }
        })
        $scope.submit = function () {
            widget.ajaxRequest({
                url: '/wechat/autoreply/',
                method: 'POST',
                scope: $scope,
                data: {auto_reply: $scope.auto_reply},
                success: function (json) {
                    widget.msgToast('微信自动回复维护成功！');
                }
            })
        }
    };
    function qrcodeController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, comfunc, $filter, comfunc) {
        $scope.submit = function () {
            widget.ajaxRequest({
                url: '/wechat/qrcode/',
                method: 'GET',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    $scope.qrcode = json.data;
                    widget.msgToast('二维码已生成,可以复制地址了');

                }
            })
        }
    };
});
