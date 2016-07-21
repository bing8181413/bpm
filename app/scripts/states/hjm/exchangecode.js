// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/exchangecodeController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.exchangecode', {
                            url: "/exchangecode",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.exchangecode.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    // controller: 'pintuanController'
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="exchangecodeList" config="config" columns="columns"></div>';
                                        // return $templateCache.get('app/' + cons.biz_path + 'coupon/list.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.exchangecode.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'exchangecode.addController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'exchangecode/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
