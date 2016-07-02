// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/inviteController'],
    function (stateModule, simpleCons) {
      stateModule.config(
          ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
              $stateProvider.state("invite", {
                  url: "/invite",
                  views: {
                      "viewA": {
                          controller: "inviteController",
                          templateProvider: function ($templateCache) {
                              return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'invite.html');
                          }
                      },
                      "viewB": {
                          template: ""
                      }
                  }
              }).state("inviteAdd", {
                  url: "/inviteAdd",
                  views: {
                      "viewA": {
                          controller: "inviteAddController",
                          templateProvider: function ($templateCache) {
                              return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'inviteAdd.html');
                          }
                      },
                      "viewB": {
                          template: ""
                      }
                  }
              });
              
            }
          ]);
    })
