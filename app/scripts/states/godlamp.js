// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/godlampController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("godlamp", {
                        url: "/godlamp",
                        views: {
                            "viewA": {
                                controller: "godlampController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'godlamp.html');
                                }
                                //templateUrl: simpleCons.VIEW_PATH + 'activemod.html'
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("godlampArt", {
                            url: "/godlampArt",
                            views: {
                                "viewA": {
                                    controller: "godlampArtController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'godlampArt.html');
                                    }
                                    //templateUrl: simpleCons.VIEW_PATH + 'activemod.html'
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        })

                }
            ]);
    })
