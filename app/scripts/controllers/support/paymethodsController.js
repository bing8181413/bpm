// This is a file copied by your subgenerator
define([
  './../controllers'
  , '../../cons/simpleCons',
], function(mod, con) {
  mod.controller('paymethods.configController', configController);

  configController.$injector = [
    '$scope',
    '$http',
    '$rootScope',
    '$uibModal',
    '$state',
    '$stateParams',
    'widget',
    '$filter',
    '$templateCache'];

  function configController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $templateCache) {
    $scope.init = function() {
      widget.ajaxRequest({
        url: con.support_domain + '/paymethods',
        method: 'get',
        scope: $scope,
        data: {},
        success: function(json) {
          $scope.data = json.data;
        },
      });
    };
    $scope.init();

    $scope.submit = function(status) {
      widget.ajaxRequest({
        url: con.support_domain + '/paymethods',
        method: 'post',
        scope: $scope,
        data: {items: $scope.data},
        success: function(json) {
          widget.msgToast('已经更新完成!');
          $scope.init();
        },
      });
    };

  }
});
