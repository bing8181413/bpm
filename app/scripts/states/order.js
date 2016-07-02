// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/orderController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state('order', {
                            url: "/order",
                            views: {
                                "viewA": {
                                    controller: "orderController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'order.html');
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
