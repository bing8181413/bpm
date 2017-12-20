// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../../states'
        , '../../../cons/simpleCons'
        , '../../../controllers/biz/combinationcouponsController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.combinationcoupons', {
                            url: "/combinationcoupons",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.combinationcoupons.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="combinationcouponsList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.combinationcoupons.update', {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: 'combinationcoupons.addController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'combinationcoupons/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.combinationcoupons.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'combinationcoupons.addController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'combinationcoupons/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
