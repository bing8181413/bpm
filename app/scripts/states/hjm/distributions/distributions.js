// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../../states'
        , '../../../cons/simpleCons'
        , './productstudentships'
        , './batchlogs',// 手动增减 奖学金
    ],
    function(stateModule, cons) {
        stateModule.config(
            [
                '$stateProvider', '$urlRouterProvider',
                function($stateProvider, $urlRouterProvider) {
                    $stateProvider.state(cons.state.main + '.distributions', {
                        url: '/distributions',
                        templateProvider: function($templateCache) {
                            return $templateCache.get('app/' + cons.main_path + 'container.html');
                        },
                    });
                },
            ]);
    });
