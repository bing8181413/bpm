// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/userController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state("user", {
                            url: "/user",
                            views: {
                                "viewA": {
                                    controller: "userController",
                                    templateProvider: function($templateCache){
                                        return $templateCache.get('app/'+simpleCons.VIEW_PATH+'user.html');
                                    }
                                    //templateUrl: simpleCons.VIEW_PATH + 'user.html'
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        })

                }
            ]);
    })
