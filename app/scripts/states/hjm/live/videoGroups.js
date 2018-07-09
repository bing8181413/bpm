// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../../states'
        , '../../../cons/simpleCons'
        , '../../../controllers/biz/videogroupsController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.videogroups', {
                            url: "/videogroups",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.videogroups.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="videogroupsList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.videogroups.update', {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: 'videogroups.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.live_path + 'videogroups/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.videogroups.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'videogroups.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.live_path + 'videogroups/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
