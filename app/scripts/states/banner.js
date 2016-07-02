// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/bannerController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("banner", {
                        url: "/banner/:category/:isActivityBanner",// isActivity 活动的运营位  1:是 0:不是
                        views: {
                            "viewA": {
                                controller: "bannerController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'banner/banner.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("banneradd", {
                        url: "/banneradd/:category/:isActivityBanner",
                        views: {
                            "viewA": {
                                controller: "bannerAddController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'banner/bannerAdd.html');
                                }
                            },
                            "viewB": {
                                template: ""
                            }
                        }
                    }).state("bannerUpdate", {
                        url: "/bannerUpdate/:category/:isActivityBanner",
                        views: {
                            "viewA": {
                                controller: "bannerUpdateController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'banner/bannerUpdate.html');
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
