// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../../states'
        , '../../../cons/simpleCons',
    ],
    function(stateModule, cons) {
        stateModule.config(
            [
                '$stateProvider', '$urlRouterProvider',
                function($stateProvider, $urlRouterProvider) {
                    $stateProvider.state(cons.state.main + '.productstudentships', {
                        url: '/productstudentships',
                        templateProvider: function($templateCache) {
                            return $templateCache.get('app/' + cons.main_path + 'container.html');
                        },
                    }).state(cons.state.main + '.productstudentships.list', {
                        url: '/list.html',
                        views: {
                            '': {
                                templateProvider: function($templateCache) {
                                    return '<div hjm-grid modid="productstudentshipsList" config="config" columns="columns"></div>';
                                },
                            },
                        },
                    });
                },
            ])
        ;
    });
