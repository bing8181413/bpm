/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/homeController'],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $urlRouterProvider
                        .otherwise('/login');

                    $stateProvider
                        .state("home", {
                            url: "/",
                            controller: 'homeController',
                            templateProvider: function($templateCache){
                                return $templateCache.get('app/'+simpleCons.VIEW_PATH+'home.html');
                            }
                            //templateUrl: cons.VIEW_PATH + 'home.html'
                        })
                        .state("view1", {
                            url: "/view1",
                            controller: 'view1Controller',
                            templateProvider: function($templateCache){
                                return $templateCache.get('app/'+simpleCons.VIEW_PATH+'view1.html');
                            }
                            //templateUrl: cons.VIEW_PATH + 'view1.html'
                        });
                }])
    })