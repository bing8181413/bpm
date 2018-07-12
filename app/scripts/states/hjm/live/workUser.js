define([
        '../../states'
        , '../../../cons/simpleCons',
    ],
    function(stateModule, cons) {
        stateModule.config(
            [
                '$stateProvider', '$urlRouterProvider',
                function($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.workuser', {
                            url: '/workuser',
                            templateProvider: function($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            },
                        })
                        .state(cons.state.main + '.workuser.list', {
                            url: '/list.html/:id',
                            views: {
                                '': {
                                    templateProvider: function($templateCache, $stateParams) {
                                        return '<div hjm-grid modid="workUserList" config="config" columns="columns" ></div>';
                                    },
                                },
                            },
                        });
                },
            ])
        ;
    });
