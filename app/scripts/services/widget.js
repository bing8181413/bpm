define(['./services', '../cons/simpleCons'], function (mod, cons) {
    mod
        .factory('widget', function ($q,
                                     $http,
                                     $state,
                                     $compile,
                                     $timeout,
                                     $location,
                                     $rootScope,
                                     $filter) {
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
                // cancelMsgToast: function () {
                //     $rootScope.notification = null;
                // },

                /** ajax请求
                 * @params:
                 *   scope
                 *   url
                 *   success function
                 *   error: function
                 *   data: object
                 */
                // 直接地址获取经纬度
                // get_baidu_location: function (address, city_name, rtn_func) {
                //     $http.jsonp('http://api.map.baidu.com/geocoder/v2/?address=' + address +
                //         '&output=json&ak=8wBktwVQM9GWdeP5ldMXogY48glg5sgD&callback=JSON_CALLBACK')
                //         .success(function (data, status, header, config) {
                //             if (angular.isFunction(rtn_func)) {
                //                 rtn_func(data);
                //             }
                //         })
                // },

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
                        url: params.url.indexOf('http') == 0 ? params.url : (cons.domain + params.url),
                        timeout: params.timeout||60000,
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
                                if (res.data.code == 0) {
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
});
