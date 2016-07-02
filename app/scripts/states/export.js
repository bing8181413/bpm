// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        './states'
        , '../cons/simpleCons'
        , '../controllers/exportController'
    ],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state("export", {
                            abstract: true,
                            url: "/export",
                            views: {
                                "viewA": {
                                    controller: 'exportController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'common/common.html');
                                    }
                                }
                            }
                        })
                        .state("export.list", {
                            url: "/list.html",
                            views: {
                                "": {
                                    controller: 'export.listController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'export/list.html');
                                    }
                                }
                            }
                        })
                        .state("export.post", {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: "export.postController"
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'export/post.html');
                                    }
                                }
                            }
                        })
                        .state("export.update", {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: "export.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'export/post.html');
                                    }
                                }
                            }
                        })
                        .state("export.run", {
                            url: "/new.html/:id",
                            views: {
                                "": {
                                    controller: "export.runController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'export/run.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
