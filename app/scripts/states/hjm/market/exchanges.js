// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../../states'
        , '../../../cons/simpleCons'
        , '../../../controllers/biz/exchangesController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.exchanges', {
                            url: "/exchanges",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.exchanges.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="exchangesList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.exchanges.update', {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: 'exchanges.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'exchanges/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.exchanges.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'exchanges.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'exchanges/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
