// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/certController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.cert', {
                            url: "/cert",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.cert.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="certList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.cert.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'cert.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'cert/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.cert.update', {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: 'cert.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'cert/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
