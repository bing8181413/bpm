// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        // , '../../controllers/biz/zhibo_qr_codeController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.zhibo_qr_code', {
                            url: "/zhibo_qr_code",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.zhibo_qr_code.list', {
                            url: "/list",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="zhibo_qr_codeList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
