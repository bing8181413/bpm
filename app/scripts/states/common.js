// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/commonController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state("success_community_list", {
                            url: "/success_community_list/:id/:title/:success",
                            views: {
                                "viewA": {
                                    resolve: {
                                        'tuan': function ($stateParams) {
                                            return $stateParams;
                                        }
                                    },
                                    controller: "openingCommunityListController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'common/opening_community_list.html');
                                    }
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        })// 成团小区
                        .state("opening_community_list", {
                            url: "/opening_community_list/:id/:title",
                            views: {
                                "viewA": {
                                    resolve: {
                                        'tuan': function ($stateParams) {
                                            return $stateParams;
                                        }
                                    },
                                    controller: "openingCommunityListController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'common/opening_community_list.html');
                                    }
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        })// 未成团小区
                        .state("no_opening_community_list", {
                            url: "/no_opening_community_list/:id/:title",
                            views: {
                                "viewA": {
                                    resolve: {
                                        'tuan': function ($stateParams) {
                                            return $stateParams;
                                        }
                                    },
                                    controller: "noOpeningCommunityListController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'common/no_opening_community_list.html');
                                    }
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        })
                        // 咨询回复列表 操作 type |tuan ：'tuan'| activity ：'activity'| ,区别 左边的选中效果  是团 还是活动
                        .state("consult_reply", {
                            url: "/consult_reply/:type/:id/:title",
                            views: {
                                "viewA": {
                                    resolve: {
                                        'tuan': function ($stateParams) {
                                            return $stateParams;
                                        }
                                    },
                                    controller: "consultReplyController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'common/consult_reply.html');
                                    }
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        });

                }
            ]);
    })
