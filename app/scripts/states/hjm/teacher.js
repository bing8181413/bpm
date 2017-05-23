// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/teacherController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.teacher', {
                            url: "/teacher",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.teacher.list', {
                            url: "/list",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="teacherList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.teacher.update', {
                            url: "/update.html/:teacher_id",
                            views: {
                                "": {
                                    controller: "teacher.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'teacher/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.teacher.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: "teacher.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'teacher/update.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
