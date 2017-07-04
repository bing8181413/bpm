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
                        .state(cons.state.main + '.demo.datetime', {
                            url: "/datetime.html",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.demo_path + 'datetime.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
