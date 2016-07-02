// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/sysconfController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("sysconf", {
                        url: "/sysconf",
                        views: {
                            "viewA": {
                                controller: "sysconfController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'sysconf/sysconf.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("opencitys", {
                        url: "/opencitys",
                        views: {
                            "viewA": {
                                controller: "opencitysController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'sysconf/opencitys.html');
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
