// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/productController'
        , '../../controllers/biz/productActController'
        , '../../controllers/biz/actController'
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
                        .state(cons.state.main + '.product.act', {
                            url: "/act",
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
                                        return '<div hjm-grid modid="productList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.product.add', {
                            url: "/add",
                            views: {
                                "": {
                                    controller: 'product.updateController',
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
                        .state(cons.state.main + '.product.act.add', {
                            url: "/add",
                            views: {
                                "": {
                                    controller: 'product.act.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'product_act/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.product.act.update', {
                            url: "/update.html/:product_id",
                            views: {
                                "": {
                                    controller: 'product.act.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'product_act/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.act', {
                            url: "/act",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.act.list', {
                            url: "/list",
                            views: {
                                "": {
                                    // controller: 'accountController'
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="productList" config="act_config" columns="act_columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.act.add', {
                            url: "/add",
                            views: {
                                "": {
                                    controller: 'act.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'act/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.act.update', {
                            url: "/update.html/:product_id",
                            views: {
                                "": {
                                    controller: 'act.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'act/update.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
