// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/libraryController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("library", {
                        url: "/library",
                        views: {
                            "viewA": {
                                controller: "libraryController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'library.html');
                                }
                                //templateUrl: simpleCons.VIEW_PATH + 'activemod.html'
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("libTmp", {
                        url: "/libTmp",
                        views: {
                            "viewA": {
                                controller: "libTmpController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'libTmp.html');
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
