(function () {
    require.config({
        baseUrl: "scripts/",
        //skipDataMain: true,
        paths: {
            "jQuery": '../vendor/jquery/jquery.min',
            //'domready':'../vendor/requirejs-domready/domReady',
            'angular': '../vendor/angular/angular.min',
            // 'highcharts' : '../vendor/highcharts/highcharts',
            "ui.router": '../vendor/angular-ui-router/release/angular-ui-router.min',
            //"ui.select2":'../vendor/angular-ui-select2/src/select2',
            //"ng.ueditor": '../vendor/angular-ueditor/dist/angular-ueditor',
            //"clipboard": '../vendor/zeroclipboard/ZeroClipboard',
            "angular-file-upload": '../vendor/angular-file-upload/angular-file-upload',
            'bindonce': '../vendor/angular-bindonce/bindonce',
            "ab-base64": '../vendor/angular-utf8-base64/angular-utf8-base64',
            //'snap':  '../vendor/Snap.svg/dist/snap.svg-min',
            //'me-pageloading':  '../vendor/me-pageloading/me-pageloading',
            "ui.bootstrap": "../vendor/angular-bootstrap/ui-bootstrap-tpls.min",
            //"angular-async-loader": "../vendor/angular-async-loader/src/angular-async-loader",
            //"ui.bootstrap":"../vendor/bootstrap/ui-bootstrap-tpls.min",
            "twitter": "../vendor/bootstrap/bootstrap.min",
            //'highcharts':'../vendor/highcharts/highcharts',
            //'app': './app',
            'ngSanitize': '../vendor/angular-sanitize/angular-sanitize.min',
            'ngCsv': '../vendor/ng-csv/build/ng-csv',
            'app-tpl': './app-tpl'
        },
        shim: {
            'jQuery': {exports: 'jQuery'},
            'twitter': {deps: ['jQuery']},
            'angular': {
                exports: 'angular',
                deps: ['jQuery']
            },
            //'highcharts': {deps: ['jQuery']},
            'angular-file-upload': {deps: ['angular']},
            'angular-async-loader': {deps: ['angular']},
            'bindonce': {deps: ['angular']},
            'ab-base64': {deps: ['angular']},
            'ui.bootstrap': {deps: ['angular']},
            //'ui.select2': { deps: ['angular']},
            //'ng.ueditor': { deps: ['angular']},
            'ui.router': {deps: ['angular']},
            'ngSanitize': {deps: ['angular']},// 使用csv
            'ngCsv': {deps: ['angular']}, // 使用csv 到处excle 表格
            'app-tpl': { deps: ['angular']},
        },
    });
    //require(['bootstrap']); //  这里不能直接加载 因为要先加载玩main.min.js才能执行 否则会找不到对应的模块文件
})();