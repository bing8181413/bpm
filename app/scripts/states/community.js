// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/communityController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("community", {
                        url: "/community",
                        views: {
                            "viewA": {
                                controller: "communityController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'community.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("communityupdate", {
                        url: "/communityupdate/:communityId",
                        views: {
                            "viewA": {
                                controller: "communityupdateController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'communityupdate.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("communityadd", {
                        url: "/communityadd",
                        views: {
                            "viewA": {
                                controller: "communityaddController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'communityupdate.html');
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
