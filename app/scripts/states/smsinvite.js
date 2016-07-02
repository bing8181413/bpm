// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/smsinviteController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state('smsinvite', {
                            url: "/smsinvite",
                            views: {
                                "viewA": {
                                    controller: "smsinviteController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'smsinvite/smsinvite.html');
                                    }
                                    //templateUrl: simpleCons.VIEW_PATH + 'message.html'
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        })
                        .state('smsinviteAdd', {
                            url: "/smsinviteAdd",
                            views: {
                                "viewA": {
                                    controller: "smsinviteAddController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'smsinvite/smsinviteadd.html');
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
