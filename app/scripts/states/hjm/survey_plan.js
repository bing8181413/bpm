// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/surveyPlanController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.survey_plan', {
                            url: "/survey_plan",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.survey_plan.list', {
                            url: "/list",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="surveyPlanList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.survey_plan.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'surveyPlan.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'survey_plan/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.survey_plan.update', {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: 'surveyPlan.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'survey_plan/update.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
