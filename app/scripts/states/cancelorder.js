// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        './states'
        , '../cons/simpleCons'
        , '../controllers/cancelorderController'
    ],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state("cancelorder", {
                            abstract: true,
                            url: "/cancelorder",
                            views: {
                                "viewA": {
                                    controller: 'cancelorderController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'common/common.html');
                                    }
                                }
                            }
                        })
                        .state("cancelorder.list", {
                            url: "/list.html",
                            views: {
                                "": {
                                    controller: 'cancelorder.listController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'cancelorder/list.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
