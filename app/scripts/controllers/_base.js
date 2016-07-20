define(['controllers/controllers'], function (mod) {
    mod.run(['$rootScope', '$state', '$stateParams', '$http',
        function ($rootScope, $state, $stateParams, $http) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);
    mod.config(['$httpProvider', '$compileProvider', 'cfpLoadingBarProvider', '$provide',
        function ($httpProvider, $compileProvider, cfpLoadingBarProvider, $provide) {
            // cfpLoadingBarProvider
            // angular-loading-bar  页面头部的loading-bar
            // cfpLoadingBarProvider.includeSpinner = true;
            // cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
            // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';
            $provide.decorator('$log', ['$delegate',
                function $logDecorator($delegate) {
                    var originalWarn = $delegate.warn;
                    $delegate.warn = function decoratedWarn(msg) {
                        msg = 'HJM Decorated at controllers Warn: ' + msg;
                        originalWarn.apply($delegate, arguments);
                    };
                    return $delegate;
                }
            ]);
        }]);
});