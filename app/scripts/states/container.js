// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        './states'
        , '../cons/simpleCons'
        , '../controllers/loginController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $urlRouterProvider.when("", "login");
                    $stateProvider
                        .state("login", {
                            url: "/login",
                            views: {
                                "": {
                                    controller: 'loginController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.VIEW_PATH + 'contatiner/login.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main, {
                            url: "/" + cons.state.main,
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.VIEW_PATH + 'contatiner/main.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
