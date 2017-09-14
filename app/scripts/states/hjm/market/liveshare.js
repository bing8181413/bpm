// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../../states'
        , '../../../cons/simpleCons'
        , '../../../controllers/biz/liveShareController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.liveShare', {
                            url: "/liveShare",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.liveShare.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="liveShareList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.liveShare.update', {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: 'liveShare.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'liveShare/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.liveShare.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'liveShare.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'liveShare/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
