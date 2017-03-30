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
        //  父菜单  编辑删除时使用 定位菜单位置
        //  子菜单
        //  $scope.index = [sup_index,sub_index]
        $scope.index = [undefined, undefined];
        widget.ajaxRequest({
            url: '/wechat/menu/',
            method: 'GET',
            scope: $scope,
            data: {},
            success: function (json) {
                $scope.menu = angular.toJson(json.data, true);
                $scope.menus = json.data.button;
                $scope.edit_menu(0);//初始化点击一个
            }
        });

        $scope.edit_menu = function (sup_index, sub_index) {
            $scope.index = [sup_index, sub_index];
            $scope.menus_title = [1, 1, 1];
            $scope.menus_title[sup_index]++;
            if (sup_index != undefined && sub_index != undefined) {
                $scope.edit_obj = $scope.menus[sup_index].sub_button[sub_index];
            } else if (sup_index != undefined && sub_index == undefined) {
                $scope.edit_obj = $scope.menus[sup_index];
            }
            // console.log($scope.edit_obj, 1);
            // console.log($scope.index);
        }

        $scope.edit_menu_sub = function (index, sup_index, sub_obj, $event) {
            if (sub_obj) {
                $scope.index = [sup_index, index];
                $scope.edit_obj = sub_obj;
                // console.log($scope.edit_obj, 2);
                $event.stopPropagation();
            }
            // console.log($scope.index);
        }
        $scope.del_menu = function () {
            // console.log($scope.index);
            var sup_index = $scope.index[0];
            var sub_index = $scope.index[1];
            if (sup_index != undefined && sub_index != undefined) {
                if (confirm('确认删除子菜单吗?')) {
                    // console.log($scope.menus[sup_index]);
                    var sub_menu = $scope.menus[sup_index].sub_button;
                    if (sub_menu.length == 1) {
                        delete $scope.menus[sup_index].sub_button;
                    } else if (sub_menu.length > 1) {
                        sub_menu.splice(sub_index, 1);
                    }
                    $scope.edit_menu(sup_index);
                    // console.log(sub_menu);
                }
            } else if (sup_index != undefined && sub_index == undefined) {
                if (confirm('确认删除主菜单吗?')) {
                    if ($scope.menus && $scope.menus.length == 1) {
                        widget.msgToast('不能把菜单全部删除');
                        return false;
                    } else if ($scope.menus && $scope.menus.length > 1) {
                        $scope.menus.splice(sup_index, 1);
                    }
                    $scope.edit_menu(0);
                }
            } else {
                widget.msgToast('请选择一个菜单再删除');
            }

        }
        $scope.add_sub_button = function (index) {
            if (!$scope.menus[index].sub_button) {
                if (confirm('添加子菜单后，一级菜单的内容将被清除。确定添加子菜单？')) {
                    $scope.menus[index] = {
                        name: $scope.menus[index].name,
                        sub_button: [{name: '子菜单名称'}]
                    };
                    // console.log($scope.menus[index]);
                    $scope.edit_menu(index, 0);
                }
            } else {
                $scope.menus[index].sub_button.push({name: '子菜单名称'});
                $scope.edit_menu(index, $scope.menus[index].sub_button.length - 1);
            }
        }
        $scope.add_sup_menu = function () {
            if (!$scope.menus) {
                $scope.menus = [{name: '菜单名称'}];
                $scope.edit_menu(0);
            } else {
                $scope.menus.push({name: '菜单名称'});
                $scope.edit_menu($scope.menus.length - 1);
            }
        }
        $scope.show_tmp_msg = function (msg, flag) {
            if (flag) {
                // console.log(msg);
                widget.msgToast(msg);
            }
            return false;
        }
        $scope.verify = function () {
            var flag = true;
            angular.forEach($scope.menus, function (val, key) {
                if (!val.name) {
                    flag = $scope.show_tmp_msg('第' + (key + 1) + ' 个菜单没有名称', flag);
                } else if (!val.sub_button || val.sub_button.length == 0) {
                    // console.log(val.name, val.type);
                    if (val.type == 'view' && !val.url) {
                        flag = $scope.show_tmp_msg(val.name + ' 未添加URL地址', flag);
                    } else if (val.type == 'click' && (!val.key || !val.reply_info.type || !val.reply_info.content)) {
                        console.log(val);
                        flag = $scope.show_tmp_msg(val.name + ' 有选项未添加完整', flag);
                    }
                    else if (!val.type) {
                        flag = $scope.show_tmp_msg(val.name + ' 没有选择类型', flag)
                    }
                } else if (val.sub_button && val.sub_button.length > 0) {
                    angular.forEach(val.sub_button, function (v, k) {
                        if (!v.name) {
                            flag = $scope.show_tmp_msg(val.name + ' 的第' + (k + 1) + ' 个子菜单的没有名称', flag);
                        } else if (!v.sub_button || v.sub_button.length == 0) {
                            if (v.type == 'view' && !v.url) {
                                flag = $scope.show_tmp_msg(val.name + ' 的子菜单 ' + v.name + ' 未添加URL地址', flag);
                            } else if (v.type == 'click' && (!v.key || !v.reply_info.type || !v.reply_info.content)) {
                                flag = $scope.show_tmp_msg(val.name + ' 的子菜单 ' + v.name + ' 有选项未添加完整', flag);
                            } else if (!v.type) {
                                flag = $scope.show_tmp_msg(val.name + ' 的子菜单 ' + v.name + ' 没有选择类型', flag)
                            }
                        }
                    });

                }
            });
            return flag;
        }
        $scope.submit = function () {
            if (!$scope.verify()) {
                return false;
            }

            widget.ajaxRequest({
                url: '/wechat/menu/',
                method: 'POST',
                scope: $scope,
                // data: {menu: $scope.menu},
                data: {menu: angular.toJson({button: $scope.menus}, true)},
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
            // console.log($scope.auto_reply.keyword_autoreply_info);
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
