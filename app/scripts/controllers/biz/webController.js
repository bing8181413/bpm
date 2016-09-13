// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('web.updateController', updateController)

    updateController.$injector = ['$scope', '$timeout'];
    function updateController($scope, $timeout) {
        $scope.param = {};
        $timeout(function () {
            // $scope.param = {url: 'https://m.huijiame.com/produnct/detail?product_id=10000'};
            $scope.param = {url: 'https://m.huijiame.com/'};
        }, 0);

        $scope.$watch('param', function (val) {
            if (!!val.url && !!val.utm_source) {
                var tmp = val.url.indexOf('?') > 0 ? '&' : '?';
                $scope.web_url = encodeURI(val.url + tmp +
                    // 'channel=' + val.utm_source + '_' + val.utm_medium +
                    // (val.utm_campaign ? ('_' + val.utm_campaign) : '') +
                    'utm_source=' + val.utm_source +
                    (val.utm_medium ? ('&utm_medium=' + val.utm_medium) : '')+
                    (val.utm_campaign ? ('&utm_campaign=' + val.utm_campaign) : ''));
            } else {
                $scope.web_url = ' ';
            }
        }, true);
    };
});
