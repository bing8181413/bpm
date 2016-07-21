// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
        '../states'
        , '../../cons/simpleCons'
        , '../../controllers/biz/smsController'
    ],
    function (stateModule, cons) {
        stateModule.config(
            ['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state(cons.state.main + '.sms', {
                            url: "/sms",
                            templateProvider: function ($templateCache) {
                                return $templateCache.get('app/' + cons.main_path + 'container.html');
                            }
                        })
                        .state(cons.state.main + '.sms.list', {
                            url: "/list.html",
                            views: {
                                "": {
                                    // controller: 'pintuanController'
                                    templateProvider: function ($templateCache) {
                                        return '<div hjm-grid modid="smsList" config="config" columns="columns"></div>'
                                        // return $templateCache.get('app/' + cons.biz_path + 'sms/list.html');
                                    }
                                }
                            }
                        })
                        .state(cons.state.main + '.sms.add', {
                            url: "/add.html",
                            views: {
                                "": {
                                    // controller: 'sms.addController',
                                    controller: function ($scope, widget, $state) {
                                        $scope.submit = function (status) {
                                            widget.ajaxRequest({
                                                url: '/markets/sms',
                                                method: 'POST',
                                                scope: $scope,
                                                data: $scope.param,
                                                success: function (json) {
                                                    widget.msgToast('发布成功！');
                                                    $state.go(cons.state.main + '.sms.list');
                                                }
                                            })
                                        }
                                    },
                                    templateProvider: function ($templateCache) {
                                        return $templateCache.get('app/' + cons.biz_path + 'sms/add.html');
                                    }
                                }
                            }
                        })
                }
            ])
        ;
    })
