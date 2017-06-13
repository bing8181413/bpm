// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/redPacketCouponsController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.red_packet_coupons', {
                            url: "/red_packet_coupons",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.red_packet_coupons.update', {
                            url: "/update.html",
                            views: {
                                "": {
                                    controller: 'redPacketCoupons.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'red_packet_coupons/update.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
