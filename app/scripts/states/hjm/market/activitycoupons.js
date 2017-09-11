// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../../states'
        , '../../../cons/simpleCons'
        , '../../../controllers/biz/activityCouponsController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.activitycoupons', {
                            url: "/activitycoupons",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.activitycoupons.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="activitycouponsList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.activitycoupons.update', {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: 'activitycoupons.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'activitycoupons/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.activitycoupons.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'activitycoupons.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'activitycoupons/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
