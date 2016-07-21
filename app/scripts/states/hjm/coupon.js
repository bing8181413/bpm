// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/couponController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.coupon', {
                            url: "/coupon",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.coupon.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    // controller: 'pintuanController'
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="couponList" config="config" columns="columns"></div>';
                                        // return $templateCache.get('app/' + cons.biz_path + 'coupon/list.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.coupon.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'coupon.addController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'coupon/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
