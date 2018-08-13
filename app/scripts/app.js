define([
    // 'jquery',
    // 'angular',
    'angular-mocks',
    'ui.router',
    'angular-animate',
    'dndLists',
    'angucomplete-alt',
    'angular-aria',
    'angular-truncate',
    'bindonce',
    'ui.bootstrap',
    'ng.simditor',
    'angular-file-upload',
    // 'ui.select2',
    'ng.ueditor',
    //'angular-async-loader',
    //'me-pageloading',
    //'snap',
    'ab-base64',
    // 'ngSanitize',
    // 'ngCsv',
    'perfect_scrollbar',
    'angular-loading-bar',
    'progressButton',
    // 'ZeroClipboard',
    //'huijiaControllers',
    //'huijiaStates',
    //'huijiaDirectives',
    //'huijiaFilters',
    //'huijiaServices',
    // 'angular-async-loader',
    'controllers/_base',
    'states/_base',
    'directives/_base',
    'filters/_base',
    'services/_base',
    'mock/_base',
    'app-tpl'
], function () {
    //console.log('app.js');

    return angular.module('ahaApp', [
        'ngMockE2E', // ngMock 是 angular-mocks 里面的 一个model
        'ui.router',
        'ngAnimate',
        'dndLists',
        'angucomplete-alt',
        'ngAria',
        'truncate',
        'pasvaz.bindonce',
        'ui.bootstrap',
        'ng.simditor',
        'angularFileUpload',
        // 'ui.select2',
        'ng.ueditor',
        //'asyncLoader',
        //'me-pageloading',
        'ab-base64',
        // 'ngSanitize',
        // 'ngCsv',
        'perfect_scrollbar',
        'angular-loading-bar',
        'progressButton',
        // 'ZeroClipboard',
        // 'asyncLoader',
        'ahaControllers',
        'ahaStates',
        'ahaDirectives',
        'ahaFilters',
        'ahaServices',
        'ahaMock',
        'app-tpl',
    ]);
});