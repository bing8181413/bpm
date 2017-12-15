// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../../states'
        , '../../../cons/simpleCons'
        , '../../../controllers/biz/dashboardController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.dashboard', {
                            url: "/dashboard",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.dashboard.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    controller: 'dashboard.listController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'dashboard/list.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.dashboard.orders', {
                            url: "/orders.html",
                            views: {
                                "": {
                                    controller: 'dashboard.ordersController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'dashboard/orders.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.dashboard.groupbuys', {
                            url: "/groupbuys.html",
                            views: {
                                "": {
                                    controller: 'dashboard.groupbuysController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'dashboard/groupbuys.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.dashboard.shares', {
                            url: "/shares.html",
                            views: {
                                "": {
                                    controller: 'dashboard.sharesController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'dashboard/shares.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
