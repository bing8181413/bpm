// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/supportController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.support', {
                            url: "/support",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.support.opencities', {
                            url: "/opencities/list.html",
                            templateProvider: function ($templateCache) {
                                return '<div hjm-grid modid="supportsCitiesList" config="config" columns="columns"></div>';
                            }
                        })
                        .state(cons.state.main + '.support.opencitiesadd', {
                            url: "/opencities/add.html",
                            controller: 'supports.opencitiesController',
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.biz_path + 'support/opencities.html');
                            }
                        })
                        .state(cons.state.main + '.support.version', {
                            url: "/version.html",
                            controller: 'supports.versionController',
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.biz_path + 'support/version.html');
                            }
                        })
                        .state(cons.state.main + '.support.weappconfig', {// 微信小程序 配置项
                            url: "/weappconfig.html",
                            controller: 'supports.weappconfigController',
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.biz_path + 'support/weappconfig.html');
                            }
                        })
                        // supports/configs
                        .state(cons.state.main + '.support.configs', {
                            url: "/configs.html",
                            controller: 'supports.configsController',
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.biz_path + 'support/configs.html');
                            }
                        })
                        //  直播版本升级
                        .state(cons.state.main + '.support.upgrade', {
                            url: "/upgrade.html",
                            templateProvider: function ($templateCache) {
                                return '<div hjm-grid modid="supportUpgradeList" config="config" columns="columns"></div>';
                            }
                        })
                        .state(cons.state.main + '.support.upgradesAdd', {
                            url: "/upgradesAdd.html",
                            controller: 'supports.upgradesUpdateController',
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.biz_path + 'support/upgradesAdd.html');
                            }
                        })
                        .state(cons.state.main + '.support.upgradesUpdate', {
                            url: "/upgradesUpdate.html/:id",
                            controller: 'supports.upgradesUpdateController',
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.biz_path + 'support/upgradesAdd.html');
                            }
                        })
                        //  直播 banner
                        .state(cons.state.main + '.support.banner', {
                            url: "/banner.html",
                            templateProvider: function ($templateCache) {
                                return '<div hjm-grid modid="supportBannerList" config="config" columns="columns"></div>';
                            }
                        })
                        .state(cons.state.main + '.support.bannerAdd', {
                            url: "/bannerAdd.html",
                            controller: 'supports.bannerUpdateController',
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.biz_path + 'support/bannerUpdate.html');
                            }
                        })
                        .state(cons.state.main + '.support.bannerUpdate', {
                            url: "/bannerUpdate.html/:id",
                            controller: 'supports.bannerUpdateController',
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.biz_path + 'support/bannerUpdate.html');
                            }
                        })
                }
            ])
        ;
    })
