// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('loginController', loginController);

    loginController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'ab-base64', 'widget', '$interval'];
    function loginController($scope, $http, $rootScope, $modal, base64, widget, $interval) {
        $rootScope.tab_sm = !$rootScope.tab_sm;
        if (localStorage.getItem('login_account')) {
            $rootScope.login_account = JSON.parse(base64.decode(localStorage.getItem('login_account')));
        }
        $scope.uname = '';//$rootScope.login_account ? $rootScope.login_account.uname : '';
        $scope.pwd = '';
        $scope.disabled_get_verify_code = false;
        $scope.time_count = 30;
        $scope.remain_time = $scope.time_count;
        $rootScope.current_city_name = localStorage.getItem('hjm') ? localStorage.getItem('hjm').current_city_name : '未登录';
        if (localStorage.getItem('hjm')) {
            $rootScope.$state.go('pintuan.list');
        }
        $rootScope.search = '';
        // 获取短信验证码
        $scope.get_verify_code = function () {
            $scope.disabled_get_verify_code = true;
            $scope.remain_time = $scope.time_count;
            $interval(function (count) {
                $scope.remain_time--;
                if ($scope.remain_time <= 0) {
                    $scope.disabled_get_verify_code = false;
                    $scope.remain_time = $scope.time_count;
                }
            }, 1000, $scope.time_count);
            $http.post(simpleCons.api.user_admin_check, {username: $scope.uname, userpass: $scope.pwd})
                .success(function (json) {
                    if (json.code == 0) {
                        widget.msgToast('短信发送成功,注意手机查收');
                    } else {
                        widget.msgToast(json.msg);
                    }
                })
                .error(function () {
                    widget.msgToast('服务器错误,请联系管理员');
                })
        }
        $scope.login = function () {
            if (!$scope.uname || !$scope.pwd) {
                widget.msgToast('请输入账号和密码');
                return false;
            }
            // var login_url = simpleCons.domain + '/manage/account/login';
            $scope.param = {username: $scope.uname, userpass: $scope.pwd, usercode: $scope.usercode};
            $http.post(simpleCons.api.user_admin_login, $scope.param)
                .success(function (json) {
                    if (json.code == 0) {
                        $rootScope.tab_sm = false;
                        //console.log('menus from login api :',json.data.menus);
                        $scope.baseAuth = 'Basic :' + base64.encode(json.username + ':' + json.password)
                        $rootScope.hjm = {
                            account_id: json.data.account_id,
                            current_city_name: json.data.city_name,
                            current_city_list: json.data.city_list,
                            menus: json.data.menus,
                            username: json.data.username,
                            pwd: $scope.pwd,
                            type: json.data.type,
                            mobile: json.data.mobile,
                            email: json.data.email,
                            weixin_nickname: json.data.weixin_nickname,
                            weixin_qrcode: json.data.weixin_qrcode,
                            remark: json.data.remark,
                            Authorization: $scope.baseAuth
                        };

                        $rootScope.selected = {
                            account_id: '',
                            current_city_name: json.data.city_name,
                            menus: json.data.menus,
                            username: $rootScope.username,
                            Authorization: $scope.baseAuth
                        };
                        $http.defaults.headers.common.Authorization = $scope.baseAuth;
                        $rootScope.nowlogintimestamp = new Date().getTime();
                        $rootScope.lastlogintimestamp = JSON.parse($rootScope.nowlogintimestamp);

                        //  是否获取了 account_list
                        //console.log(angular.isUndefined($rootScope.account_list));
                        //if (angular.isUndefined($rootScope.account_list) || $rootScope.account_list.length == 0) {
                        //    $rootScope.get_account_list();
                        //}
                        $rootScope.get_account_list();
                        $rootScope.login_account = {
                            uname: $scope.uname,
                            pwd: $scope.pwd
                        }
                        localStorage.setItem('login_account', base64.encode(JSON.stringify($rootScope.login_account)));
                        localStorage.setItem('hjm', JSON.stringify($rootScope.hjm));
                        localStorage.setItem('lastlogintimestamp', $rootScope.lastlogintimestamp);
                        if ($rootScope.hjm.type == 'cw') {
                            $rootScope.$state.go('refund');
                        } else {
                            $rootScope.$state.go('pintuan.list');
                        }
                    } else {
                        alert(json.msg);
                    }
                });
        }
        $scope.login_keypress = function (event) {
            if (event.keyCode !== 13) return;
            $scope.login();
        }
    };
});
