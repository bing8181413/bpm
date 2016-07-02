/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        './states'
        , '../cons/simpleCons'
        , '../controllers/exchangecodeController'
    ],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state("exchangecode", {
                            abstract: true,
                            url: "/exchangecode",
                            views: {
                                "viewA": {
                                    controller: 'exchangecodeController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'common/common.html');
                                    }
                                }
                            }
                        })
                        .state("exchangecode.list", {
                            url: "/list.html",
                            views: {
                                "": {
                                    controller: 'exchangecode.listController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'exchangecode/list.html');
                                    }
                                }
                            }
                        })
                        .state("exchangecode.add", {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: 'exchangecode.addController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'exchangecode/add.html');
                                    }
                                }
                            }
                        })
                }
            ]);
    })
