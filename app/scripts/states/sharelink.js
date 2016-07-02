/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        './states'
        , '../cons/simpleCons'
        , '../controllers/sharelinkController'
    ],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state("sharelink", {
                            abstract: true,
                            url: "/sharelink",
                            views: {
                                "viewA": {
                                    controller: 'sharelinkController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'common/common.html');
                                    }
                                }
                            }
                        })
                        .state("sharelink.do", {
                            url: "/do.html",
                            views: {
                                "": {
                                    controller: 'sharelink.doController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'sharelink/do.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
