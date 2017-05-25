// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/menusController'
        , '../../controllers/biz/accountController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.account', {
                            url: "/account",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.account.list', {
                            url: "/list",
                            views: {
                                "": {
                                    // controller: 'accountController'
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'account/list.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.account.roles', {
                            url: "/role.html",
                            views: {
                                "": {
                                    // controller: 'accountController'
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'role/list.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.account.menus', {
                            url: "/menus.html",
                            views: {
                                "": {
                                    controller: 'menusController',
                                    templateProvider: function ($templateCache) {
                                        // return $templateCache.get('app/' + cons.biz_path + 'menu/list.html');
                                        return $templateCache.get('app/' + cons.biz_path + 'menu/menus.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.account.update', {
                            url: "/update.html/:account_id",
                            views: {
                                "": {
                                    controller: "account.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'account/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.account.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    controller: "account.updateController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'account/update.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.account.profile', {
                            url: "/profile.html",
                            views: {
                                "": {
                                    controller: "account.profileController",
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'account/profile.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
