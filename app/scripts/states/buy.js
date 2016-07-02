// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/buyController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("buy", {
                        url: "/buy",
                        views: {
                            "viewA": {
                                controller: "buyController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'buy/buy.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("buyadd", {
                        url: "/buyadd",
                        views: {
                            "viewA": {
                                controller: "buyaddController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'buy/buyadd.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("buyupdate", {
                        url: "/buyupdate/:activity_id",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function ($stateParams) {
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "buyupdateController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'buy/buyupdate.html');
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
