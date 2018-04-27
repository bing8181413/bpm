// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../../states'
        , '../../../cons/simpleCons'
        , '../../../controllers/biz/appmessagesController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.appmessages', {
                            url: "/appmessages",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.appmessages.list', {
                            url: "/list",
                            views: {
                                "": {
                                    controller: 'appmessages.appmessagesController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.live_path + 'appmessages/appmessages.html');
                                    },
                                    resolve: {
                                        question: function () {
                                            return '';
                                        }
                                    },
                                }
                            }
                        })
                    // .state(cons.state.main + '.appmessages.list', {
                    //     url: "/list",
                    //     views: {
                    //         "": {
                    //             templateProvider: function ($templateCache) {
                    //                 return '<div hjm-grid modid="appmessagesList" config="config" columns="columns"></div>';
                    //             }
                    //         }
                    //     }
                    // })
                    // .state(cons.state.main + '.appmessages.add', {
                    //     url: "/add.html",
                    //     views: {
                    //         "": {
                    //             controller: 'appmessages.updateController',
                    //             templateProvider: function ($templateCache) {
                    //                 return $templateCache.get('app/' + cons.biz_path + 'appmessages/update.html');
                    //             }
                    //         }
                    //     }
                    // })
                    // .state(cons.state.main + '.appmessages.update', {
                    //     url: "/update.html/:id",
                    //     views: {
                    //         "": {
                    //             controller: 'appmessages.updateController',
                    //             templateProvider: function ($templateCache) {
                    //                 return $templateCache.get('app/' + cons.biz_path + 'appmessages/update.html');
                    //             }
                    //         }
                    //     }
                    // })
                }
            ]);
    })
