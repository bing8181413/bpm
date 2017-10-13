// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../../states'
        , '../../../cons/simpleCons'
        , '../../../controllers/biz/merchantController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.merchant', {
                            url: "/merchant",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.merchant.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="merchantList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.merchant.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'merchant.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'merchant/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.merchant.update', {
                            url: "/update.html/:merchant_id",
                            views: {
                                "": {
                                    controller: 'merchant.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'merchant/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.merchant.products', {
                            url: "/products.html",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="merchantProductList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.merchant.statics', {
                            url: "/merchantstatics.html",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="merchantStaticsList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
