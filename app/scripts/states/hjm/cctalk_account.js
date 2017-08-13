// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/cctalkInfoController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.cctalk_info', {
                            url: "/cctalk_info",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.cctalk_info.sendsms', {
                            url: "/list",
                            views: {
                                "": {
                                    controller: 'cctalkInfo.sendController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'cctalk_info/sendsms.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
