// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/wechatController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.wechat', {
                            url: "/wechat",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.wechat.menu', {
                            url: "/menu",
                            views: {
                                "": {
                                    controller: 'wechat.menuController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'wechat/menu.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.wechat.autoreply', {
                            url: "/autoreply",
                            views: {
                                "": {
                                    controller: 'wechat.autoreplyController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'wechat/autoreply.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.wechat.qrcode', {
                            url: "/qrcode",
                            views: {
                                "": {
                                    controller: 'wechat.qrcodeController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'wechat/qrcode.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
