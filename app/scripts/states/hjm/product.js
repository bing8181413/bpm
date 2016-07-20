// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons',
        , '../../controllers/biz/productController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.product', {
                            url: "/product",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.product.list', {
                            url: "/list",
                            views: {
                                "": {
                                    // controller: 'accountController'
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'product/list.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.product.add', {
                            url: "/add",
                            views: {
                                "": {
                                    controller: 'product.addController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'product/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.product.update', {
                            url: "/update.html/:product_id",
                            views: {
                                "": {
                                    controller: 'product.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'product/update.html');
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
