/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/feedController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state('feed', {
                            url: "/feed",
                            views: {
                                "viewA": {
                                    controller: "feedController",
                                    templateProvider: function($templateCache){
                                        return $templateCache.get('app/'+simpleCons.VIEW_PATH+'feed.html');
                                    }
                                    //templateUrl: simpleCons.VIEW_PATH + 'feed.html'
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        });
                }]);
    })
