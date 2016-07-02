// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define(['./states', '../cons/simpleCons', '../controllers/creditController', '../controllers/boardController'],
    function (stateModule, simpleCons) {
      stateModule.config(
          ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
              $stateProvider.state("credit", {
                  url: "/credit",
                  views: {
                      "viewA": {
                          controller: "creditController",
                          templateProvider: function ($templateCache) {
                              return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'credit.html');
                          }
                      },
                      "viewB": {
                          template: ""
                      }
                  }
              }).state("creditAdd", {
                  url: "/creditAdd",
                  views: {
                      "viewA": {
                          controller: "creditAddController",
                          templateProvider: function ($templateCache) {
                              return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'creditAdd.html');
                          }
                      },
                      "viewB": {
                          template: ""
                      }
                  }
              }).state("creditUpdate", {
                  url: "/creditUpdate/:goodId",
                  views: {
                      "viewA": {
                          controller: "creditUpdateController",
                          templateProvider: function ($templateCache) {
                              return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'creditUpdate.html');
                          }
                      },
                      "viewB": {
                          template: ""
                      }
                  }
              }).state("board", {
                  url: "/board",
                  views: {
                      "viewA": {
                          controller: "boardController",
                          templateProvider: function ($templateCache) {
                              return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'board.html');
                          }
                      },
                      "viewB": {
                          template: ""
                      }
                  }
              }).state("boardAdd", {
                  url: "/boardAdd/:board_type",
                  views: {
                      "viewA": {
                          controller: "boardAddController",
                          templateProvider: function ($templateCache) {
                              return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'boardAdd.html');
                          }
                      },
                      "viewB": {
                          template: ""
                      }
                  }
              }).state("boardUpdate", {
                  url: "/boardUpdate/:boardId",
                  views: {
                      "viewA": {
                          controller: "boardUpdateController",
                          templateProvider: function ($templateCache) {
                              return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'boardUpdate.html');
                          }
                      },
                      "viewB": {
                          template: ""
                      }
                  }
              }).state("creditUser", {
                  url: "/creditUser/:goodId/:title",
                  views: {
                      "viewA": {
                          controller: "creditUserController",
                          templateProvider: function ($templateCache) {
                              return $templateCache.get('app/' + simpleCons.VIEW_PATH + 'creditUser.html');
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
