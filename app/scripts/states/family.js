/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/familyController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state('family', {
                            url: "/family",
                            views: {
                                "viewA": {
                                    controller: "familyController",
                                    templateProvider: function($templateCache){
                                        return $templateCache.get('app/'+simpleCons.VIEW_PATH+'family.html');
                                    }
                                    //templateUrl: simpleCons.VIEW_PATH + 'family.html'
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        });
                }]);
    })
