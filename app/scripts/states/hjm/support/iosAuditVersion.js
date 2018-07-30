define([
        '../../states'
        , '../../../cons/simpleCons'
        , '../../../controllers/support/iosAuditVersionController',
    ],
    function(stateModule, cons) {
        stateModule.config(
            [
                '$stateProvider', '$urlRouterProvider',
                function($stateProvider, $urlRouterProvider) {
                    $stateProvider.state(cons.state.main + '.iosauditversion', {
                        url: '/iosauditversion',
                        templateProvider: function($templateCache) {
                            return $templateCache.get('app/' + cons.main_path + 'container.html');
                        },
                    }).state(cons.state.main + '.iosauditversion.config', {
                        url: '/config.html',
                        views: {
                            '': {
                                controller: 'iosAuditVersion.configController',
                                templateProvider: function($templateCache) {
                                    return $templateCache.get('app/' + cons.support_path + 'iosAuditVersion/config.html');
                                },
                            },
                        },
                    });
                },
            ])
        ;
    });
