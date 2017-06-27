angular.module('demoServices', []).factory('widget', function ($q, $http, $compile, $timeout, $location, $rootScope, $filter, ipCookie, base64, env) {
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
            // 认证 header auth
            if (ipCookie('visitor_id') && ipCookie('auth_token')) {
                var baseAuth = 'Basic :' + base64.encode(ipCookie('visitor_id') + ':' + ipCookie('auth_token'));
                $http.defaults.headers.common.Authorization = baseAuth;
            }
            var self = this;

            if (!params) return;

            // if (!params.scope) return;

            // var $scope = params.scope,
            var options = {
                success: function () {
                }, //---data.code == 0 成功回调
                // failure: function () {}, //--失败回调
                // error: function () {}, //-----错误回调
                msgerr: ''
            };

            angular.extend(options, params);
            var ajaxConfig = {
                headers: {
                    'x-requested-with': 'XMLHttpRequest',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                method: params.method || 'POST',
                url: params.url.indexOf('http') == 0 ? params.url : (env.api_domain + params.url),
                timeout: 60000,
            };
            if ($filter('uppercase')(params.method) == 'GET') {
                ajaxConfig.url += '?';
                angular.forEach(options.data, function (val, key) {
                    var tmp = [];
                    if (angular.isArray(val)) {
                        angular.forEach(val, function (v, k) {
                            ajaxConfig.url += (key + '[]=' + v + '&');
                        });
                    } else if (!angular.isUndefined(val)) {
                        ajaxConfig.url += (key + '=' + val + '&');
                    } else {
                        // 是 undefined 什么都不做
                    }
                });
                if (ajaxConfig.url.charAt(ajaxConfig.url.length - 1) == '&' ||
                    ajaxConfig.url.charAt(ajaxConfig.url.length - 1) == '?') {
                    ajaxConfig.url = ajaxConfig.url.substring(0, ajaxConfig.url.length - 1);
                }
                // ajaxConfig.url.splice('&',-1);
                // ajaxConfig.params = options.data;
            } else {
                ajaxConfig.data = options.data;
            }

            $http(ajaxConfig).then(
                function (res) {
                    if (res.status == 200) {
                        if (res.data.code == 0 || res.data.statusCode == 200) {
                            if (options.success && typeof options.success === 'function') {
                                options.success(res.data);
                            }
                        } else {
                            if (options.failure && typeof options.failure === 'function') {
                                options.failure(res.data);
                            } else {
                                self.msgToast(res.data.message);
                            }
                        }
                    }

                },
                function (err) {
                    if (options.error && typeof options.error === 'function') {
                        options.error(err);
                    } else {
                        self.msgToast('网络错误，请稍候再试');
                    }
                });
        },

    };
    return widget;
});