define(['./services', '../cons/simpleCons'], function (mod, simpleCons) {
    mod

        .run(['$rootScope', '$state', '$stateParams', '$http', '$modal', '$location', 'widget',
            function ($rootScope, $state, $stateParams, $http, $modal, $location, widget) {
                // 监听路由事件
                $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    //console.log(event, toState, toParams, fromState, fromParams);
                    // 路由改变 初始化 search
                    //初始化每次的 公共查询方法
                    $rootScope.searchkeyword = angular.noop();
                });
                //活动公共数据
                //var account_list_url = simpleCons.domain + '/manage/account/list';
                var account_list_url = simpleCons.domain + '/manage/account/mans';
                // 获取公共数据 初始化
                $rootScope.nowlogintimestamp = new Date().getTime();
                $rootScope.lastlogintimestamp = JSON.parse(localStorage.getItem('lastlogintimestamp')) || 0;
                if (parseInt(($rootScope.nowlogintimestamp - $rootScope.lastlogintimestamp) / (1000 * 60 * 60 * 24)) > 1) {
                    //超过一天就更新
                    $rootScope.lastlogintimestamp = JSON.parse($rootScope.nowlogintimestamp);
                    localStorage.removeItem('hjm');
                    $state.go('login');
                } else {
                    $rootScope.hjm = JSON.parse(localStorage.getItem('hjm'));
                    $rootScope.selected = angular.copy($rootScope.hjm);
                    $rootScope.selected.account_id = '';
                    $rootScope.current_city_name = $rootScope.hjm.current_city_name == '' ? '' : $rootScope.hjm.current_city_name;
                    $http.defaults.headers.common.Authorization = $rootScope.hjm.Authorization || '';
                }
                $rootScope.getaccount_times = 0;
                // 获取account_list
                $rootScope.get_account_list = function () {
                    if ($rootScope.getaccount_times > 1) {
                        widget.msgToast('未获取到账户信息，请尝试 Ctrl+F5 刷新页面获取最新数据。');
                        return false;
                    }
                    $rootScope.getaccount_times++;
                    if ($rootScope.hjm && $rootScope.hjm.Authorization) {
                        $http.post(account_list_url, {count: 1000, role: 'op'})
                            .success(function (json) {
                                if (json.code == 0) {
                                    json.data.unshift({
                                        account_id: "",
                                        city_name: "",
                                        email: "",
                                        mobile: "",
                                        //module_list: "",
                                        role: "",
                                        username: "全部联系人"
                                    })
                                    // account_list 用于可用的负责人列表 不可删除
                                    $rootScope.account_list = json.data;
                                    $rootScope.getaccount_times = 0;
                                    angular.forEach($rootScope.account_list, function (val, key) {
                                        $rootScope.account_list[key].account_id += '';
                                    });
                                } else {
                                    widget.msgToast('没有获取到公共数据');
                                }
                            }).error(function (err) {
                            console.log('没有获取account ，重新获取一次');
                            $rootScope.get_account_list();
                        });
                    }
                }
                $rootScope.get_account_list();
                // 登出
                $rootScope.logout = function () {
                    $http.defaults.headers.common.Authorization = '';
                    delete $rootScope.hjm;
                    delete $rootScope.selected;
                    delete $rootScope.login_account;
                    //$rootScope.account_id = '';
                    //$rootScope.current_city_name = '';
                    localStorage.clear();
                    $rootScope.$state.go('login');
                }

            }
        ])
        .factory('widget', function ($q,
                                     $http,
                                     $state,
                                     $compile,
                                     $timeout,
                                     $location,
                                     $rootScope) {
            var toastTimer = null;

            var widget = {
                /**
                 * toast提示层
                 * @param msg, time
                 */
                msgToast: function (msg, time) {
                    var toastDom = angular.element(document.querySelector('.mod_msg'));

                    if (!toastDom.length) {
                        var toastTpl = $compile('<div class="mod_msg" ng-click="notification=null" ng-show="notification"><span>{{notification}}</span></div>');
                        angular.element(document.getElementsByTagName('body')[0]).append(toastTpl($rootScope));
                    }

                    $timeout(function () {
                        $rootScope.notification = msg;
                    }, 0);

                    $timeout.cancel(toastTimer);

                    toastTimer = $timeout(function () {
                        $rootScope.notification = '';
                    }, time || 2000);

                },

                /** ajax请求
                 * @params:
                 *   scope
                 *   url
                 *   success function
                 *   error: function
                 *   data: object
                 */
                ajaxRequest: function (params) {
                    var self = this;

                    if (!params) return;

                    if (!params.scope) return;

                    var $scope = params.scope,
                        options = {
                            success: function () {
                            }, //---成功回调
                            // failure: function () {}, //--失败回调
                            // error: function() {}, //-----错误回调
                            msgerr: ''
                        };

                    angular.extend(options, params);
                    var ajaxConfig = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        method: 'POST',
                        url: simpleCons.domain + params.url,
                        data: options.data,
                        timeout: 15000
                    };

                    $rootScope.loading = true;
                    $http(ajaxConfig).success(function (res) {
                        if (res.code == 0) {
                            if (typeof options.success === 'function') {
                                options.success(res);
                            }
                        } else {
                            if (options.failure && typeof options.failure === 'function') {
                                options.failure(res);
                            } else {
                                self.msgToast(res.msg);
                            }
                        }
                        $rootScope.loading = false;
                    }).error(function (err) {
                        if (options.error && typeof options.error === 'function') {
                            options.error(err);
                        } else {
                            self.msgToast('网络错误，请稍候再试');
                        }
                        $rootScope.loading = false;
                    });
                },

            };

            return widget;
        });
})
;
