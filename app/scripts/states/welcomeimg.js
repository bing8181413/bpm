// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/welcomeimgController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("welcomeimg", {
                        url: "/welcomeimg",
                        views: {
                            "viewA": {
                                controller: "welcomeimgController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'welcomeimg/welcomeimg.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("welcomeimgadd", {
                        url: "/welcomeimgadd",
                        views: {
                            "viewA": {
                                controller: "welcomeimgaddController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'welcomeimg/welcomeimgadd.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("welcomeimgupdate", {
                        url: "/welcomeimgupdate/:id",
                        views: {
                            "viewA": {
                                controller: "welcomeimgupdateController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'welcomeimg/welcomeimgupdate.html');
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
