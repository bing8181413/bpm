// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/subjectController'
        // , '../../controllers/biz/accountController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.subject', {
                            url: "/subject",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.subject.list', {
                            url: "/list",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="subjectList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.subject.update', {
                            url: "/update.html/:subject_id",
                            views: {
                                "": {
                                    controller: "subject.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'subject/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.subject.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: "subject.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'subject/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
