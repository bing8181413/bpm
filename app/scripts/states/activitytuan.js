// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/activitytuanController', '../controllers/activitytuanCRUDController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("activitytuan", {
                        url: "/activitytuan",
                        views: {
                            "viewA": {
                                controller: "activitytuanController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activitytuan/activitytuan.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    //}).state("activitytuanByAccount", {
                    //    url: "/activitytuanByAccount/:accountId",
                    //    views: {
                    //        "viewA": {
                    //            controller: "activitytuanByAccountController",
                    //            templateProvider: function ($templateCache) {
                    //                return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activitytuan/activitytuanByAccount.html');
                    //            }
                    //        },
                    //        "viewB": {
                    //            template: ""
                    //        }
                    //    }
                    }).state("activitytuanadd", {
                        url: "/activitytuanadd",
                        views: {
                            "viewA": {
                                controller: "activitytuanaddController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activitytuan/activitytuanadd.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activitytuanupdate", {
                        url: "/activitytuanupdate/:activityId",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function ($stateParams) {
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "activitytuanupdateController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activitytuan/activitytuanupdate.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activitytuan_apply_list", { // 申请活动的详情列表
                        url: "/activitytuan_apply_list/:activityId/:activityTitle",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function ($stateParams) {
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "activitytuanApplyListController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activitytuan/activitytuan_apply_list.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activitytuanFeeds", {
                        url: "/activitytuanFeeds/:activityId/:activityTitle",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function ($stateParams) {
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "activitytuanFeedsController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activitytuan/activitytuanFeeds.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activitytuanComments", {
                        url: "/activitytuanComments/:hasReplied/:accountId/:activityId/:activityTitle",
                        views: {
                            "viewA": {
                                controller: "activitytuanCommentsController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activitytuan/activitytuanComments.html');
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
