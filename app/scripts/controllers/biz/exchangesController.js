// This is a file copied by your subgenerator
define([
  './../controllers'
  , '../../cons/simpleCons',
], function(mod, con) {
  mod.controller('exchanges.updateController', updateController);

  updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', 'comfunc', '$filter', '$timeout'];

  function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $timeout) {
    $scope.param = {};

    if ($stateParams.id) {
      widget.ajaxRequest({
        url: '/markets/exchanges/' + $stateParams.id,
        method: 'GET',
        scope: $scope,
        success: function(json) {
          $scope.param = json.data;
        },
      });
    }

    $scope.$watch('param.video_group_id', function(val) {
      if (val) {
        $scope.param.video_group_id = $scope.param.video_group_id.replace(/\n/g, ',').replace(/，/g, ',');
      }
    }, true);

    $scope.submit = function(status) {
      widget.ajaxRequest({
        url: '/markets/exchanges' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
        method: $stateParams.id ? 'PUT' : 'POST',
        scope: $scope,
        data: $scope.param,
        success: function(json) {
          widget.msgToast('发布成功！');
          $state.go(con.state.main + '.exchanges.list');
        },
      });
    };
  };
});
