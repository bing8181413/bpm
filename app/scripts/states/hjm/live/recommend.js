define([
        '../../states'
        , '../../../cons/simpleCons'
        , '../../../controllers/biz/recommendController',
    ],
    function(stateModule, cons) {
        stateModule.config(
            [
                '$stateProvider', '$urlRouterProvider',
                function($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.recommend', {
                            url: '/recommend',
                            templateProvider: function($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            },
                        })
                        .state(cons.state.main + '.recommend.list', {
                            url: '/list.html',
                            views: {
                                '': {
                                    controller: 'recommend.recommendController',
                                    templateProvider: function($templateCache) {
                                        return $templateCache.get('app/' + cons.live_path + 'recommend/recommend.html');
                                    },
                                },
                            },
                        });
                },
            ])
        ;
    });
