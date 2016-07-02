// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/activity20Controller', '../controllers/activity20CRUDController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("activity20", {
                        url: "/activity20",
                        views: {
                            "viewA": {
                                controller: "activity20Controller",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activity20.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activity20ByAccount", {
                        url: "/activity20ByAccount/:accountId",
                        views: {
                            "viewA": {
                                controller: "activity20ByAccountController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activity20ByAccount.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activity20add", {
                        url: "/activity20add",
                        views: {
                            "viewA": {
                                controller: "activity20addController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activity20add.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activity20update", {
                        url: "/activity20update/:activityId",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function ($stateParams) {
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "activity20updateController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activity20update.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activity20_apply_list", { // 申请活动的详情列表
                        url: "/activity20_apply_list/:activityId/:activityTitle",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function ($stateParams) {
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "activity20ApplyListController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activity20_apply_list.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activity20Feeds", {
                        url: "/activity20Feeds/:activityId/:activityTitle",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function ($stateParams) {
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "activity20FeedsController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activity20Feeds.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activity20Comments", {
                        url: "/activity20Comments/:hasReplied/:accountId",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function ($stateParams) {
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "activity20CommentsController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activity20Comments.html');
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
