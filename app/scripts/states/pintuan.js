// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        './states'
        , '../cons/simpleCons'
        , '../controllers/pintuanController'
        //, '../controllers/pintuan/listController'
        //, '../controllers/pintuan/addController'
        //, '../controllers/pintuan/updateController'
    ],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state("pintuan", {
                            abstract: true,
                            url: "/pintuan",
                            views: {
                                "viewA": {
                                    controller: 'pintuanController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'common/common.html');
                                    }
                                }
                            }
                        })
                        .state("pintuan.list", {
                            url: "/list.html",
                            views: {
                                "": {
                                    controller: 'pintuan.listController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'pintuan/list.html');
                                    }
                                }
                            }
                        })
                        .state("pintuan.add", {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: "pintuan.addController"
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'pintuan/add.html');
                                    }
                                }
                            }
                        })
                        .state("pintuan.update", {
                            url: "/update.html/:activity_id",
                            views: {
                                "": {
                                    controller: "pintuan.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'pintuan/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
