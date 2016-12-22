// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/customersController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.user', {
                            url: "/user",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.user.list', {
                            url: "/list",
                            views: {
                                "": {
                                    // controller: 'accountController'
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="userList" config="config" columns="columns"></div>';
                                        // return $templateCache.get('app/' + cons.biz_path + 'user/list.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.vipuser', {
                            url: "/vipuser",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.vipuser.list', {
                            url: "/list",
                            views: {
                                "": {
                                    // controller: 'accountController'
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="vipUserList" config="config" columns="columns"></div>';
                                        // return $templateCache.get('app/' + cons.biz_path + 'vipuser/list.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.user.customers', {
                            url: "/customers/list",
                            views: {
                                "": {
                                    // controller: 'accountController'
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="customersList" config="config" columns="columns"></div>';
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.user.customersAdd', {
                            url: "/customers/add",
                            views: {
                                "": {
                                    controller: 'user.customersAddController',
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'user/customers.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
