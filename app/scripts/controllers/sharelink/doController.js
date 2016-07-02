define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('sharelink.doController', doController);
    doController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$stateParams', '$state', 'widget'];
    function doController($scope, $http, $rootScope, $modal, $stateParams, $state, widget) {
    };
});
