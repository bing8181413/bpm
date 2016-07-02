// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/rolesController'],
    function (stateModule, simpleCons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state("roles", {
                        url: "/roles",
                        views: {
                            "viewA": {
                                controller: "rolesController",
                                templateProvider: function ($templateCache) {
                                    return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'roles/roles.html');
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
