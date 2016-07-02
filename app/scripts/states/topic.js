// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
    './states',
    '../cons/simpleCons',
    '../controllers/topicController',
    '../controllers/hotTopicController',
    '../controllers/topicNoticeController'
], function (stateModule, simpleCons) {
    stateModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        .state("topic", {
            url: "/topic",
            views: {
                "viewA": {
                    controller: "topicController",
                    templateProvider: function ($templateCache) {
                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'topic.html');
                    }
                },
                "viewB": {
                    template: ""
                }
            }
        })

        .state("topicAdd", {
            url: "/topicAdd",
            views: {
                "viewA": {
                    controller: "topicAddController",
                    templateProvider: function ($templateCache) {
                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'topicAdd.html');
                    }
                },
                "viewB": {
                    template: ""
                }
            }
        })

        .state("topicUpdate", {
            url: "/topicUpdate/:topicId",
            views: {
                "viewA": {
                    controller: "topicUpdateController",
                    templateProvider: function ($templateCache) {
                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'topicUpdate.html');
                    }
                },
                "viewB": {
                    template: ""
                }
            }
        })

        .state("hotTopic", {
            url: "/hotTopic",
            views: {
                "viewA": {
                    controller: "hotTopicController",
                    templateProvider: function ($templateCache) {
                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'hotTopic.html');
                    }
                },
                "viewB": {
                    template: ""
                }
            }
        })

        .state("hotTopicAdd", {
            url: "/hotTopicAdd/:topicId",
            views: {
                "viewA": {
                    controller: "hotTopicAddController",
                    templateProvider: function ($templateCache) {
                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'hotTopicAdd.html');
                    }
                },
                "viewB": {
                    template: ""
                }
            }
        })

        .state("hotTopicUpdate", {
            url: "/hotTopicUpdate/:topicId",
            views: {
                "viewA": {
                    controller: "hotTopicUpdateController",
                    templateProvider: function ($templateCache) {
                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'hotTopicUpdate.html');
                    }
                },
                "viewB": {
                    template: ""
                }
            }
        })

        .state("topicNotice", {
            url: "/topic/notice.htm?id",
            views: {
                "viewA": {
                    controller: "topicNoticeController",
                    templateProvider: function ($templateCache) {
                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'topicNotice.html');
                    }
                },
                "viewB": {
                    template: ""
                }
            }
        })
        ;

    }]);
});
