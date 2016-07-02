define([
    './states',
    '../cons/simpleCons',
    '../controllers/talentController'
], function (
    stateModule,
    simpleCons
) {
    stateModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        
        .state("talent", {
            url: "/talent.htm?tab",
            views: {
                "viewA": {
                    controller: "talentController",
                    templateProvider: function ($templateCache) {
                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'talent.html');
                    }
                },
                "viewB": {
                    template: ""
                }
            }
        })

        .state("talentAdd", {
            url: "/talent/add.htm?tel&eid",
            views: {
                "viewA": {
                    controller: "talentAddController",
                    templateProvider: function ($templateCache) {
                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'talentAdd.html');
                    }
                },
                "viewB": {
                    template: ""
                }
            }
        })

        .state("talentTag", {
            url: "/talentTag",
            views: {
                "viewA": {
                    controller: "talentTagController",
                    templateProvider: function ($templateCache) {
                        return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'talentTag.html');
                    }
                },
                "viewB": {
                    template: ""
                }
            }
        })
    }]);
});
