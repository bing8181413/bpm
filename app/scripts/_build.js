({
  baseUrl: '/',
  dir: 'app/dist',
  modules: [
    {
      name: 'main',
    },
  ],
  // fileExclusionRegExp: /^(r|build)\.js$/,
  //重点设置，防止压缩后变量名报错
  // removeCombined: true,//如果设置为true，在输出目录将会删除掉已经合并了的文件
  optimize: 'uglify',
  uglify: {
    mangle: false  //false 不混淆变量名
  },
  findNestedDependencies: false,
  // mainConfigFile: 'app/scripts/_build.js',
  // name: 'bootstrap', // assumes a production build using almond
  // out: 'tmp/scripts/main2.min.js',
  paths: {
    'jquery': '../vendor/jquery/jquery.min',
    'angular': '../vendor/angular/angular.min',
    'ui.router': '../vendor/angular-ui-router/release/angular-ui-router.min',
    'ng.ueditor': '../vendor/angular-ueditor/dist/angular-ueditor.min',
    'angular-file-upload': '../vendor/angular-file-upload/angular-file-upload.min',
    'bindonce': '../vendor/angular-bindonce/bindonce.min',
    'ab-base64': '../vendor/angular-utf8-base64/angular-utf8-base64.min',
    'ui.bootstrap': '../vendor/angular-bootstrap/ui-bootstrap-tpls.min',
    'perfect-scrollbar': '../vendor/perfect-scrollbar/min/perfect-scrollbar.min',
    'perfect_scrollbar': '../vendor/angular-perfect-scrollbar/src/angular-perfect-scrollbar',
    'angular-loading-bar': '../vendor/angular-loading-bar/build/loading-bar.min',
    'progressButton': '../vendor/angular-progress-button/dist/progress-button.min',
    'angular-animate': '../vendor/angular-animate/angular-animate.min',
    'angular-truncate': '../vendor/angular-truncate/src/truncate',
    'angucomplete-alt': '../vendor/angucomplete-alt/dist/angucomplete-alt.min', // 订单的修改收货地址  使用
    'angular-aria': '../vendor/angular-aria/angular-aria.min', //
    'dndLists': '../vendor/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min', //
    'ng.simditor': '../vendor/ng.simditor/dist/ng-simditor',
    'simple-module': '../vendor/simple-module/lib/module',
    'hotkeys': '../vendor/simple-hotkeys/lib/hotkeys',
    'simditor': '../vendor/simditor/lib/simditor',
    'simple-uploader': '../vendor/simple-uploader/lib/uploader',
  },
  shim: {
    'angular': {
      exports: 'angular',
      deps: ['jquery'],
    },
    'ui.router': {deps: ['angular']},
    'dndLists': {deps: ['angular']},
    'angular-animate': {deps: ['angular']},
    'angucomplete-alt': {deps: ['angular']},
    'angular-aria': {deps: ['angular']},
    'angular-truncate': {deps: ['angular']},
    'ui.bootstrap': {deps: ['angular']},
    'ng.simditor': {deps: ['angular', 'simple-module', 'hotkeys', 'simditor', 'simple-uploader']},
    'perfect_scrollbar': {deps: ['angular', 'perfect-scrollbar']},
    'angular-loading-bar': {deps: ['angular']},
    'progressButton': {deps: ['angular']},
    'angular-file-upload': {deps: ['angular']},
    'bindonce': {deps: ['angular']},
    'ab-base64': {deps: ['angular']},
    'ng.ueditor': {deps: ['angular']},
  },
});