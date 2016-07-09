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
                            'x-requested-with': 'XMLHttpRequest'
                        },
                        method: params.method || 'POST',
                        url: params.url.indexOf('http') == 0 ? params.url : (cons.domain + params.url),
                        timeout: 15000
                    };
                    if ($filter('uppercase')(params.method) == 'GET') {
                        ajaxConfig.params = options.data;
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
