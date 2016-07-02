define(['controllers/controllers'], function (mod) {
    mod.run(['$rootScope', '$state', '$stateParams', '$http',
        function ($rootScope, $state, $stateParams, $http) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);
    mod.config(['$httpProvider', '$compileProvider', 'cfpLoadingBarProvider',
        function ($httpProvider, $compileProvider, cfpLoadingBarProvider) {
            // cfpLoadingBarProvider
            // angular-loading-bar  页面头部的loading-bar
            // cfpLoadingBarProvider.includeSpinner = true;
            // cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
            // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';

        }]);
});