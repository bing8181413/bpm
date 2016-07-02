/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        './states'
        , '../cons/simpleCons'
        , '../controllers/handpintuanController'
    ],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state("handpintuan", {
                            abstract: true,
                            url: "/handpintuan",
                            views: {
                                "viewA": {
                                    controller: 'handpintuanController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'common/common.html');
                                    }
                                }
                            }
                        })
                        .state("handpintuan.list", {
                            url: "/list.html",
                            views: {
                                "": {
                                    controller: 'handpintuan.listController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'handpintuan/list.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
