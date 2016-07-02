// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/listmajiaController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state("listmajia", {
                            url: "/listmajia",
                            views: {
                                "viewA": {
                                    controller: "listmajiaController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'majias/listmajia.html');
                                    }
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        })
                        .state("listmajiaadd", {
                            url: "/listmajiaadd",
                            views: {
                                "viewA": {
                                    controller: "listmajiaaddController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'majias/listmajiaadd.html');
                                    }
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        });

                }
            ]);
    })
