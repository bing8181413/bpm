// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../../states'
        , '../../../cons/simpleCons'
        , '../../../controllers/biz/marketsharesController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.marketshare', {
                            url: "/marketshare",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.marketshare.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="marketsharesList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.marketshare.update', {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: 'marketshares.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'marketshare/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.marketshare.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'marketshares.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'marketshare/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
