// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/activemodController'],
    function (stateModule, simpleCons) {
      stateModule.config(
          ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
              $stateProvider.state("activemod", {
                  url: "/activemod",
                  views: {
                      "viewA": {
                          controller: "activemodController",
                          templateProvider: function($templateCache){
                              return $templateCache.get('app/'+simpleCons.VIEW_PATH+'activemod.html');
                          }
                          //templateUrl: simpleCons.VIEW_PATH + 'activemod.html'
                      },
                      "viewB": {
                          template: ""
                      }
                  }
              }).state("addactivemod", {
                  url: "/addactivemod",
                  views: {
                      "viewA": {
                          controller: "activemodController",
                          templateProvider: function($templateCache){
                              return $templateCache.get('app/'+simpleCons.VIEW_PATH+'addactivemod.html');
                          }
                          //templateUrl: simpleCons.VIEW_PATH + 'activemod.html'
                      },
                      "viewB": {
                          template: ""
                      }
                  }
              })
              
            }
          ]);
    })
