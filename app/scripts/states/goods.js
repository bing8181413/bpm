// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        './states'
        , '../cons/simpleCons'
        , '../controllers/goodsController'
        //, '../controllers/goods/listController'
        //, '../controllers/goods/addController'
        //, '../controllers/goods/updateController'
    ],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state("goods", {
                            abstract: true,
                            url: "/goods",
                            views: {
                                "viewA": {
                                    controller: 'goodsController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'common/common.html');
                                    }
                                }
                            }
                        })
                        .state("goods.list", {
                            url: "/list.html",
                            views: {
                                "": {
                                    controller: 'goods.listController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'goods/list.html');
                                    }
                                }
                            }
                        })
                        .state("goods.add", {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: "goods.addController"
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'goods/add.html');
                                    }
                                }
                            }
                        })
                        .state("goods.update", {
                            url: "/update.html/:activity_id/:type",
                            views: {
                                "": {
                                    controller: "goods.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'goods/update.html');
                                    }
                                }
                            }
                        })
                        .state("goods.openingCommunityList", {
                            url: "/opening_community_list.html/:id/:title",
                            views: {
                                "": {
                                    controller: "goods.openingCommunityListController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'goods/opening_community_list.html');
                                    }
                                }
                            }
                        })
                        .state("goods.successCommunityList", {
                            url: "/success_community_list.html/:id/:title/:success",
                            views: {
                                "": {
                                    controller: "goods.openingCommunityListController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'goods/opening_community_list.html');
                                    }
                                }
                            }
                        })
                        //人工开团
                        .state("goods.new", {
                            url: "/new.html/:activity_id",
                            views: {
                                "": {
                                    controller: "goods.newController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'goods/new.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
