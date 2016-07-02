// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/verifyController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("verify", {
                        url: "/verify/:verifyStatus",
                        views: {
                            "viewA": {
                                controller: "verifyController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'verify.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("verifyAdd", {
                        url: "/verifyAdd",
                        views: {
                            "viewA": {
                                controller: "verifyAddController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'verifyAdd.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("verifyUpdate", {
                        url: "/verifyUpdate/:verifyId",
                        views: {
                            "viewA": {
                                controller: "verifyUpdateController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'verifyUpdate.html');
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
