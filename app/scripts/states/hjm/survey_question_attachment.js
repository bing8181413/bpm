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
                        .state(cons.state.main + '.survey_question_attachment', {
                            url: "/survey_question_attachment",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.survey_question_attachment.list', {
                            url: "/list",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="surveyQuestionAttachmentList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.survey_question_attachment.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'surveyQuestion.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'survey_question_attachment/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.survey_question_attachment.update', {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: 'surveyQuestion.updateController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'survey_question_attachment/update.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
