// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.delivery', {
                            url: "/delivery",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.delivery.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    // controller: 'accountController'
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="deliveryList" config="config" columns="columns"></div>';
                                        // return $templateCache.get('app/' + cons.biz_path + 'order/list.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
