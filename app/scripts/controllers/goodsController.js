// This is a file copied by your subgenerator
define([
    './controllers'
    , './goods/listController'
    , './goods/addController'
    , './goods/updateController'
    , './goods/newController'
    , './goods/openingCommunityListController'

], function (mod) {
    mod.controller('goodsController', goodsController);
    goodsController.$injector = ['$scope', '$injector'];
    function goodsController($scope, $injector) {

    };
});
