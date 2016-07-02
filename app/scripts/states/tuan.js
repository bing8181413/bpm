// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/tuanController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("tuan", {
                        url: "/tuan",
                        views: {
                            "viewA": {
                                controller: "tuanController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'tuan/tuan.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("tuanadd", {
                        url: "/tuanadd",
                        views: {
                            "viewA": {
                                controller: "tuanaddController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'tuan/tuanadd.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("tuanupdate", {
                        url: "/tuanupdate/:activity_id",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function ($stateParams) {
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "tuanupdateController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'tuan/tuanupdate.html');
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
