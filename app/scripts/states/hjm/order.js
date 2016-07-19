// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        // , '../controllers/pintuanController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.order', {
                            url: "/order",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.order.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    // controller: 'accountController'
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'order/list.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.order.deliveries', {
                            url: "/deliveries/list.html",
                            views: {
                                "": {
                                    // controller: 'accountController'
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="orderDeliverList" config="config" columns="columns"></div>';
                                        // return $templateCache.get('app/' + cons.biz_path + 'order/list.html');
                                    }
                                }
                            }
                        })
                    // .state("account.update", {
                    //     url: "/update.html/:account_id",
                    //     views: {
                    //         "": {
                    //             // controller: "account.updateController",
                    //             templateProvider: function ($templateCache) {
                    //                 return $templateCache.get('app/' + cons.biz_path + 'pintuan/update.html');
                    //             }
                    //         }
                    //     }
                    // })
                }
            ])
        ;
    })
