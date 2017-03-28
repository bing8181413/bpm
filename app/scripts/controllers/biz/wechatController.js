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
                // $scope.auto_reply = angular.toJson(json.data, true);
                $scope.auto_reply = json.data;
                $scope.add_friend_autoreply_info = {content: json.data.add_friend_autoreply_info.content};
                $scope.message_default_autoreply_info = {content: json.data.message_default_autoreply_info.content};
                $scope.keyword_autoreply_info_list = json.data.keyword_autoreply_info.list;
            }
        });
        $scope.add = function () {
            if ($scope.keyword_autoreply_info_list.length > 25) {
                widget.msgToast('设定规则超出限制数量')
                return false;
            }
            $scope.keyword_autoreply_info_list.push({
                rule_name: '',
                reply_mode: 'reply_all',
                create_time: new Date().getTime(),
                keyword_list_info: [],
                reply_list_info: [],
            });
            $scope.title_info[$scope.keyword_autoreply_info_list.length - 1] = 1;
        }
        $scope.del = function (index) {
            if (confirm('确认删除规则:' + $scope.keyword_autoreply_info_list.rule_name)) {
                $scope.keyword_autoreply_info_list.splice(index, 1);
            }
        }

        $scope.submit = function () {
            $scope.auto_reply.add_friend_autoreply_info.content = $scope.add_friend_autoreply_info.content;
            $scope.auto_reply.message_default_autoreply_info.content = $scope.message_default_autoreply_info.content;
            $scope.auto_reply.keyword_autoreply_info.list = $scope.keyword_autoreply_info_list;
            console.log($scope.auto_reply.keyword_autoreply_info);
            // 这里提交的是 字符串 所以要转化一下
            widget.ajaxRequest({
                url: '/wechat/autoreply/',
                method: 'POST',
                scope: $scope,
                data: {auto_reply: angular.toJson($scope.auto_reply, true)},
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
