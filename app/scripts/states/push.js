// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/pushController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state('push', {
                            url: "/push",
                            views: {
                                "viewA": {
                                    controller: "pushController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'push.html');
                                    }
                                    //templateUrl: simpleCons.VIEW_PATH + 'message.html'
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        })
                        .state('pushAdd', {
                            url: "/pushAdd",
                            views: {
                                "viewA": {
                                    controller: "pushAddController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'pushAdd.html');
                                    }
                                    //templateUrl: simpleCons.VIEW_PATH + 'message.html'
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        })

                }
            ]);
    })
