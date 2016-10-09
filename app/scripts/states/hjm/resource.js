// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/resourceController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.resource', {
                            url: "/resource",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.resource.list', {
                            url: "/list",
                            views: {
                                "": {
                                    // controller: 'resourceController'
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="resourceList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.resource.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: "resource.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'resource/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
