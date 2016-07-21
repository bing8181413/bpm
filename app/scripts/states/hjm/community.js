// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/communityController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.community', {
                            url: "/community",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.community.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    // controller: 'pintuanController'
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="communityList" config="config" columns="columns"></div>';
                                        // return $templateCache.get('app/' + cons.biz_path + 'coupon/list.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.community.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'community.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'community/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.community.update', {
                            url: "/update.html/:community_id",
                            views: {
                                "": {
                                    controller: 'community.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'community/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
