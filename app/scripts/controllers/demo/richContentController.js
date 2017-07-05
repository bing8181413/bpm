// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('richContentController', richContentController);

    richContentController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];

    function richContentController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $timeout) {

        $scope.init = function () {
            widget.ajaxRequest({
                url: '/products/500463',
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.rich_text = json.data.rich_text;
                }
            })
        }

        $scope.init();
    };
});
