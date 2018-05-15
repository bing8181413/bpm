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
                        .state(cons.state.main + '.export', {
                            url: "/export",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.export.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    // controller: 'pintuanController'
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'export/list.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.export.update', {
                            url: "/update.html/:export_id",
                            views: {
                                "": {
                                    // controller: "pintuan.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'export/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
