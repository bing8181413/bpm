// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/refundController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state('refund', {
                        url: "/refund",
                        views: {
                            "viewA": {
                                controller: "refundController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'refund.html');
                                }
                                //templateUrl: simpleCons.VIEW_PATH + 'feed.html'
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    });
                }
            ]);
    })
