// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
      '../../states'
      , '../../../cons/simpleCons'
      , '../../../controllers/support/paymethodsController',
    ],
    function(stateModule, cons) {
      stateModule.config(
          [
            '$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
              $stateProvider.state(cons.state.main + '.paymethods', {
                url: '/paymethods',
                templateProvider: function($templateCache) {
                  return $templateCache.get('app/' + cons.main_path + 'container.html');
                },
              }).state(cons.state.main + '.paymethods.config', {
                url: '/config.html',
                views: {
                  '': {
                    controller: 'paymethods.configController',
                    templateProvider: function($templateCache) {
                      return $templateCache.get('app/' + cons.support_path + 'paymethods/config.html');
                    },
                  },
                },
              });
            },
          ])
      ;
    });
