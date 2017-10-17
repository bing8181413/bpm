// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/recordRoomsController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.record_rooms', {
                            url: "/record_rooms",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.record_rooms.list', {
                            url: "/list",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="recordRoomsList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.record_rooms.update', {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: "recordRooms.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'record_rooms/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.record_rooms.copy', {
                            url: "/copy.html/:id",
                            views: {
                                "": {
                                    controller: "recordRooms.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'record_rooms/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.record_rooms.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: "recordRooms.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'record_rooms/update.html');
                                    }
                                }
                            }
                        })
                        //  评论列表
                        .state(cons.state.main + '.record_comment', {
                            url: "/record_room_comments",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.record_comment.list', {
                            url: "/list.html/:id",
                            views: {
                                "": {
                                    controller: function ($stateParams, $scope) {
                                        $scope.ext = {
                                            object_id: $stateParams.id,
                                            object_type: 1,//点播评论
                                        }
                                    },
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="recordCommentsList" config="config" columns="columns" ext-search="ext"></div>';
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
