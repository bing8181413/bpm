// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/activity21Controller', '../controllers/activity21CRUDController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("activity21", {
                        url: "/activity21",
                        views: {
                            "viewA": {
                                controller: "activity21Controller",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activity21/activity21.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    //}).state("activity21ByAccount", {
                    //    url: "/activity21ByAccount/:accountId",
                    //    views: {
                    //        "viewA": {
                    //            controller: "activity21ByAccountController",
                    //            templateProvider: function ($templateCache) {
                    //                return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activity21/activity21ByAccount.html');
                    //            }
                    //        },
                    //        "viewB": {
                    //            template: ""
                    //        }
                    //    }
                    }).state("activity21add", {
                        url: "/activity21add",
                        views: {
                            "viewA": {
                                controller: "activity21addController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activity21/activity21add.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activity21update", {
                        url: "/activity21update/:activityId",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function ($stateParams) {
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "activity21updateController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activity21/activity21update.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activity21_apply_list", { // 申请活动的详情列表
                        url: "/activity21_apply_list/:activityId/:activityTitle",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function ($stateParams) {
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "activity21ApplyListController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activity21/activity21_apply_list.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activity21Feeds", {
                        url: "/activity21Feeds/:activityId/:activityTitle",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function ($stateParams) {
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "activity21FeedsController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activity21/activity21Feeds.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activity21Comments", {
                        url: "/activity21Comments/:hasReplied/:accountId/:activityId/:activityTitle",
                        views: {
                            "viewA": {
                                controller: "activity21CommentsController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activity21/activity21Comments.html');
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
