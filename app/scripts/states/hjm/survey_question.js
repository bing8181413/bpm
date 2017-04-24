// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/surveyQuestionController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.survey_question', {
                            url: "/survey_question",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.survey_question.list', {
                            url: "/list",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="surveyQuestionList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.survey_question.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'surveyQuestion.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'survey_question/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.survey_question.update', {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: 'surveyQuestion.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'survey_question/update.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
