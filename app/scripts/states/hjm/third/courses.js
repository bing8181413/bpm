// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../../states'
        , '../../../cons/simpleCons'
        , '../../../controllers/third/coursesController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.courses', {
                            url: "/courses",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.courses.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="coursesList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.courses.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'courses.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.third_path + 'courses/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.courses.update', {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: 'courses.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.third_path + 'courses/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
