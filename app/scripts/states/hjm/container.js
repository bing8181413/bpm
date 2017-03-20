// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        './../states'
        , '../../cons/simpleCons'
        , '../../services/widget'
        , '../../controllers/loginController'
    ],
    function (stateModule, cons, widget) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider', '$httpProvider',
                function ($stateProvider, $urlRouterProvider, $httpProvider) {
                    // 加入 http ajax 拦截器
                    $httpProvider.interceptors.push('bpmHttpInterceptor');

                    $urlRouterProvider.when("", "login");
                    $stateProvider
                        .state("login", {
                            url: "/login",
                            views: {
                                "": {
                                    controller: 'loginController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.VIEW_PATH + 'container/login.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main, {
                            url: "/" + cons.state.main,
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.VIEW_PATH + 'container/main.html');
                                    }
                                }
                            }
                        });
                }
            ]);
    })
