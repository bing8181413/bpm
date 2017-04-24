// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        // , '../../controllers/biz/actController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.survey_category', {
                            url: "/survey_category",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.survey_category.list', {
                            url: "/list",
                            views: {
                                "": {
                                    // controller: 'accountController'
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="surveyCategoryList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.survey_category.add', {
                            url: "/add",
                            views: {
                                "": {
                                    controller: 'survey_category.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'product/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.survey_category.update', {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: 'product.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'product/update.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
