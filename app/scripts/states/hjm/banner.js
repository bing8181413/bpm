// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        // , '../controllers/pintuanController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.banner', {
                            url: "/banner",
                            templateProvider: function ($templateCache) {
                                // return $templateCache.get('app/' + cons.main_path + 'banner/list.html');
                                return $templateCache.get('app/' + cons.biz_path + 'banner/list.html');
                            }
                        })
                        .state(cons.state.main + '.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    // controller: 'pintuanController'
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'banner/list.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.update', {
                            url: "/update.html/:activity_id",
                            views: {
                                "": {
                                    // controller: "pintuan.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'banner/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
