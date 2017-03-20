// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/captchaController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.captcha', {
                            url: "/captcha",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.captcha.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    // controller: 'pintuanController'
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="captchaList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.captcha.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: "captcha.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'captcha/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
