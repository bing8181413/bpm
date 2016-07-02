// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        './states'
        , '../cons/simpleCons'
        , '../controllers/accountController'
    ],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state("account", {
                            abstract: true,
                            url: "/account",
                            views: {
                                "viewA": {
                                    controller: 'accountController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'common/common.html');
                                    }
                                }
                            }
                        })
                        .state("account.list", {
                            url: "/list.html",
                            views: {
                                "": {
                                    controller: 'account.listController'
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'account/list.html');
                                    }
                                }
                            }
                        })
                        .state("account.add", {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: "account.addController"
                                    , templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'account/add.html');
                                    }
                                }
                            }
                        })
                        .state("account.update", {
                            url: "/update.html/:account_id",
                            views: {
                                "": {
                                    controller: "account.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'account/update.html');
                                    }
                                }
                            }
                        })
                        .state("change_pwd", {
                            url: "/change_pwd",
                            views: {
                                "viewA": {
                                    controller: "account.changePwdController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'account/change_pwd.html');
                                    }
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        })
                        .state("change_user_info", {
                            url: "/change_user_info",
                            views: {
                                "viewA": {
                                    controller: "account.changeUserInfoController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'account/change_user_info.html');
                                    }
                                },
                                "viewB": {
                                    template: ""
                                }
                            }
                        })

                }
            ]);
    })
