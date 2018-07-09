// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../../states'
        , '../../../cons/simpleCons',
    ],
    function(stateModule, cons) {
        stateModule.config(
            [
                '$stateProvider', '$urlRouterProvider',
                function($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.videoGroupsRoom', {
                            url: '/videoGroupsRoom',
                            templateProvider: function($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            },
                        })
                        .state(cons.state.main + '.videoGroupsRoom.list', {
                            url: '/list.html/:id',
                            views: {
                                '': {
                                    templateProvider: function($templateCache, $stateParams) {
                                        return '<div hjm-grid modid="videoGroupsRoomList" config="config" columns="columns" ext-api-string="/mobile/live/videogroups/' +
                                            $stateParams.id + '/rooms"></div>';
                                    },
                                },
                            },
                        });
                    // .state(cons.state.main + '.videoGroupsRoom.update', {
                    //     url: '/update.html/:id',
                    //     views: {
                    //         '': {
                    //             controller: 'videoGroupsRoom.updateController',
                    //             templateProvider: function($templateCache) {
                    //                 return $templateCache.get('app/' + cons.live_path + 'videoGroupsRoom/update.html');
                    //             },
                    //         },
                    //     },
                    // })
                    // .state(cons.state.main + '.videoGroupsRoom.add', {
                    //     url: '/add.html',
                    //     views: {
                    //         '': {
                    //             controller: 'videoGroupsRoom.updateController',
                    //             templateProvider: function($templateCache) {
                    //                 return $templateCache.get('app/' + cons.live_path + 'videoGroupsRoom/update.html');
                    //             },
                    //         },
                    //     },
                    // });
                },
            ])
        ;
    });
