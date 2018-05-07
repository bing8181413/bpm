// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
      '../../states'
      , '../../../cons/simpleCons'
      , '../../../controllers/biz/questionsController',
    ],
    function(stateModule, cons) {
      stateModule.config(
          [
            '$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
              $stateProvider.state(cons.state.main + '.questions', {
                url: '/questions',
                templateProvider: function($templateCache) {
                  return $templateCache.get('app/' + cons.main_path + 'container.html');
                },
              }).state(cons.state.main + '.questions.list', {
                url: '/list',
                views: {
                  '': {
                    controller: 'questions.questionsController',
                    templateProvider: function($templateCache) {
                      return $templateCache.get('app/' + cons.live_path + 'questions/questions.html');
                    },
                    resolve: {
                      resolve_data: function() {
                        return {
                          is_modal: false,
                          room_id: false
                        };
                      },
                    },
                  },
                },
              });
              // .state(cons.state.main + '.questions.list', {
              //     url: "/list",
              //     views: {
              //         "": {
              //             templateProvider: function ($templateCache) {
              //                 return '<div hjm-grid modid="questionsList" config="config" columns="columns"></div>';
              //             }
              //         }
              //     }
              // })
              // .state(cons.state.main + '.questions.add', {
              //     url: "/add.html",
              //     views: {
              //         "": {
              //             controller: 'questions.updateController',
              //             templateProvider: function ($templateCache) {
              //                 return $templateCache.get('app/' + cons.biz_path + 'questions/update.html');
              //             }
              //         }
              //     }
              // })
              // .state(cons.state.main + '.questions.update', {
              //     url: "/update.html/:id",
              //     views: {
              //         "": {
              //             controller: 'questions.updateController',
              //             templateProvider: function ($templateCache) {
              //                 return $templateCache.get('app/' + cons.biz_path + 'questions/update.html');
              //             }
              //         }
              //     }
              // })
            },
          ]);
    });
