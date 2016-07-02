// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/majiasController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("majias", {
                        url: "/majias",
                        views: {
                            "viewA": {
                                controller: "majiasController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'majias/majias.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("majiasadd", {
                        url: "/majiasadd",
                        views: {
                            "viewA": {
                                controller: "majiasaddController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'majias/majiasadd.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("majiasupdate", {
                        url: "/majiasupdate/:activity_id",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function ($stateParams) {
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "majiasupdateController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'majias/majiasupdate.html');
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
