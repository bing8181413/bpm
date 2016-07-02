// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/activitynewController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("activitynew", {
                        url: "/activitynew",
                        views: {
                            "viewA": {
                                controller: "activitynewController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activitynew.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activitynewadd", {
                        url: "/activitynewadd",
                        views: {
                            "viewA": {
                                controller: "activitynewaddController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activitynewadd.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activitynewupdate", {
                        url: "/activitynewupdate/:activityId",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function($stateParams){
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "activitynewupdateController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activitynewupdate.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("activitynew_apply_list", {
                        url: "/activitynew_apply_list/:activityId/:activityTitle",
                        views: {
                            "viewA": {
                                resolve: {
                                    'activity': function($stateParams){
                                        return $stateParams.activity;
                                    }
                                },
                                controller: "activitynewApplyListController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'activitynew_apply_list.html');
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
