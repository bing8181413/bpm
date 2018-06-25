// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../../states',
        '../../../cons/simpleCons',
        '../../../controllers/market/fanlicfgsController',
    ],
    function(stateModule, cons) {
        stateModule.config(
            [
                '$stateProvider', '$urlRouterProvider',
                function($stateProvider, $urlRouterProvider) {
                    $stateProvider.state(cons.state.main + '.market.fanlicfgs', {
                        url: '/fanlicfgs.html',
                        views: {
                            '': {
                                templateProvider: function($templateCache) {
                                    return '<div hjm-grid modid="marketFanliCfgs" config="config" columns="columns"></div>';
                                },
                            },
                        },
                    }).state(cons.state.main + '.market.fanlicfgsUpdate', {
                        url: '/fanlicfgsUpdate/:id',
                        views: {
                            '': {
                                controller: 'fanlicfgs.updateController',
                                templateProvider: function($templateCache) {
                                    return $templateCache.get('app/' + cons.biz_path + 'market/fanlicfgs.html');
                                },
                            },
                        },
                    }).state(cons.state.main + '.market.fanlicfgsAdd', {
                        url: '/fanlicfgsAdd',
                        views: {
                            '': {
                                controller: 'fanlicfgs.updateController',
                                templateProvider: function($templateCache) {
                                    return $templateCache.get('app/' + cons.biz_path + 'market/fanlicfgs.html');
                                },
                            },
                        },
                    });
                },
            ]);
    });
