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
              $stateProvider.state(cons.state.main + '.appbuyactions', {
                url: '/appbuyactions',
                templateProvider: function($templateCache) {
                  return $templateCache.get('app/' + cons.main_path + 'container.html');
                },
              }).state(cons.state.main + '.appbuyactions.list', {
                url: '/list',
                views: {
                  '': {
                    templateProvider: function($templateCache) {
                      return '<div hjm-grid modid="appbuyactionsList" config="config" columns="columns"></div>';
                    },
                  },
                },
              });
            },
          ]);
    });
