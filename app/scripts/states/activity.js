// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
    './states',
    '../cons/simpleCons',
    '../controllers/activityNoticeController',
], function (
    stateModule,
    simpleCons
) {
    stateModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        // .state("activity", {
        //     url: "/activity",
        //     views: {
        //         "viewA": {
        //             controller: "activityController",
        //             templateProvider: function($templateCache) {
        //                 return $templateCache.get('app/'+simpleCons.VIEW_PATH+'activity.html');
        //             }
        //         },
        //         "viewB": {
        //             template: ""
        //         }
        //     }
        // })

        // 活动通知
        .state("activityNotice", {
            url: '/activity/notice.htm?id&count',
            views: {
                "viewA": {
                    controller: "activityNoticeController",
                    templateProvider: function ($templateCache) {
                        return $templateCache.get('app/'+simpleCons.VIEW_PATH+'activityNotice.html');
                    }
                },
                "viewB": {
                    template: ""
                }
            }
        });

    }]);

});
