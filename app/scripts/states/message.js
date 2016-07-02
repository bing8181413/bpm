/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/messageController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state('message', {
                            url: "/message/:feedback_type",
                            views: {
                                "viewA": {
                                    controller: "messageController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'message.html');
                                    }
                                    //templateUrl: simpleCons.VIEW_PATH + 'message.html'
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        });
                }]);
    })
