// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/smsController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state('sms', {
                            url: "/sms",
                            views: {
                                "viewA": {
                                    controller: "smsController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'sms.html');
                                    }
                                    //templateUrl: simpleCons.VIEW_PATH + 'message.html'
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        })
                        .state('smsAdd', {
                            url: "/smsAdd",
                            views: {
                                "viewA": {
                                    controller: "smsAddController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'smsadd.html');
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
