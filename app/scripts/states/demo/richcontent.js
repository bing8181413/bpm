// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/demo/richContentController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.demo.richcontent', {
                            url: "/richcontent.html",
                            views: {
                                "": {
                                    controller: 'richContentController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.demo_path + 'richcontent.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
