// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/missionController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.mission', {
                            url: "/mission",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.mission.list', {
                            url: "/:lesson_id/list",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache, $stateParams) {
                                        return '<div hjm-grid modid="missionList" config="config_by_online" columns="columns_by_online" ext-api-string="/teacher/lessons/' + $stateParams.lesson_id + '/missions"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.mission.add', {
                            url: "/add.html/:lesson_id",
                            views: {
                                "": {
                                    controller: 'mission.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'mission/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.mission.update', {
                            url: "/update.html/:lesson_id/:mission_id",
                            views: {
                                "": {
                                    controller: 'mission.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'mission/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.mission.knowledge', {
                            url: "/knowledge.html/:mission_id",
                            views: {
                                "": {
                                    controller: 'knowledge.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'mission/knowledge.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
