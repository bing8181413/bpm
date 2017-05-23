// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/lessonsController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.lessons', {
                            url: "/lessons",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.lessons.list', {
                            url: "/list",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="lessonsList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.lessons.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'lessons.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'lessons/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.lessons.update', {
                            url: "/update.html/:lesson_id",
                            views: {
                                "": {
                                    controller: 'lessons.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'lessons/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.lessons.order', {
                            url: "/order.html/:lesson_id/:status",
                            views: {
                                "": {
                                    controller: 'order.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'lessons/order.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
