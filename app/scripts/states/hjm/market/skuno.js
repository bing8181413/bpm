// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
      '../../states'
      , '../../../cons/simpleCons'
    ],
    function(stateModule, cons) {
      stateModule.config(
          [
            '$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
              $stateProvider.state(cons.state.main + '.market.skunos', {
                url: '/market/skunos.html',
                views: {
                  '': {
                    templateProvider: function($templateCache) {
                      return '<div hjm-grid modid="skunos" config="config" columns="columns"></div>';
                    },
                  },
                },
              });
            },
          ])
      ;
    });
