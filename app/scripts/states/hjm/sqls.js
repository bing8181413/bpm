// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
      '../states'
      , '../../cons/simpleCons',
    ],
    function(stateModule, cons) {
      stateModule.config(
          [
            '$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
              $stateProvider.state(cons.state.main + '.sqls', {
                url: '/sqls',
                templateProvider: function($templateCache) {
                  return $templateCache.get('app/' + cons.main_path + 'container.html');
                },
              }).state(cons.state.main + '.sqls.list', {
                url: '/list.html',
                views: {
                  '': {
                    templateProvider: function($templateCache) {
                      return '<div hjm-grid modid="sqlsList" config="config" columns="columns"></div>';
                    },
                  },
                },
              }).state(cons.state.main + '.sqls.update', {
                url: '/update.html/:sqls_id',
                views: {
                  '': {
                    // controller: "pintuan.updateController",
                    templateProvider: function($templateCache) {
                      return $templateCache.get('app/' + cons.biz_path + 'sqls/update.html');
                    },
                  },
                },
              });
            },
          ])
      ;
    });
