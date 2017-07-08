// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/liveRoomsController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.live_rooms', {
                            url: "/live_rooms",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.live_rooms.list', {
                            url: "/list",
                            views: {
                                "": {
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="liveRoomsList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.live_rooms.update', {
                            url: "/update.html/:id",
                            views: {
                                "": {
                                    controller: "liveRooms.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'live_rooms/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.live_rooms.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: "liveRooms.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'live_rooms/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.live_rooms.plan', {
                            url: "/plan.html/:id",
                            views: {
                                "": {
                                    controller: "liveRooms.planController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'live_rooms/plan.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
