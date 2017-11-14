define(['./services', '../cons/simpleCons', './widget', './comfunc'], function (mod, cons, widget, comfunc) {
    mod
        .factory('bpmHttpInterceptor', ['$log', '$rootScope', function ($log, $rootScope) {
            // $log.debug('$log is here to show you that this is a regular factory with injection');
            var bpmHttpInterceptor = {
                'request': function (request) {
                    if (request.url.indexOf('.html') == -1) {
                        // console.log(config);
                        // console.log('config.url.indexOf(\'.html\') == -1 : ' + (config.url.indexOf('.html') == -1));
                        $rootScope.http_notification = '请求等待中...';
                    } else {
                        $rootScope.http_notification = '加载模板中...';
                    }
                    return request;
                },
                'requestError': function (request) {
                    $rootScope.http_notification = null;
                    console.log('requestError:  ' + request);
                },
                'response': function (response) {
                    $rootScope.http_notification = null;
                    if (response && response.data.code == 1000) {
                        delete $rootScope.hjm;
                        delete $rootScope.selected;
                        delete $rootScope.login_account;
                        localStorage.clear();
                        $rootScope.$state.go('login');
                        response.data.message = '账号认证失败,重新登陆';
                    }
                    return response;
                },
                'responseError': function (response) {
                    $rootScope.http_notification = null;
                    console.log('responseError:  ' + JSON.stringify(response));
                    return response;
                }
            };
            return bpmHttpInterceptor;
        }])
        .run(['$rootScope', '$state', '$stateParams', '$http', '$uibModal', '$location', 'widget', '$document', 'base64', '$q',
            function ($rootScope, $state, $stateParams, $http, $uibModal, $location, widget, $document, base64, $q) {
                var arr = [];
                $document.bind("keydown", function (event) {

                });
                $document.bind("keyup", function (event) {
                    // console.log(document.activeElement.tagName);
                    var tagName = document.activeElement.tagName == 'BODY' || document.activeElement.tagName == 'A';
                    if (tagName && $rootScope.hjm && $rootScope.hjm.role == 'admin') {
                        // console.log(event.keyCode);
                        switch (event.keyCode) {
                            case 84:// t uan
                                $rootScope.$state.go(cons.state.main + '.groupbuy.list');
                                break;
                            case 80:// p roduct
                                $rootScope.$state.go(cons.state.main + '.product.list');
                                break;
                            case 65: // a ct
                                $rootScope.$state.go(cons.state.main + '.act.list');
                                break;
                            case 68://d elivery
                                $rootScope.$state.go(cons.state.main + '.delivery.list');
                                break;
                            case 77: // m oney
                                $rootScope.$state.go(cons.state.main + '.refund.list');
                                break;
                            case 79:// o p
                                $rootScope.$state.go(cons.state.main + '.banner.list');
                                break;
                            case 76://h and
                                $rootScope.$state.go(cons.state.main + '.lessons.list');
                                break;
                            // case 72://l esson 课程
                            //     $rootScope.$state.go(cons.state.main + '.coupon.list');
                            //     break;
                        }
                    } else if (tagName && $rootScope.hjm && $rootScope.hjm.role == 'op') {
                        // console.log(event.keyCode);
                        switch (event.keyCode) {
                            case 65: // a ct
                                $rootScope.$state.go(cons.state.main + '.act.list');
                                break;
                            case 76://h and
                                $rootScope.$state.go(cons.state.main + '.lessons.list');
                                break;
                        }
                    }
                });

                // 获取simpleCons.js 里的common 数据
                $rootScope.common = cons.common;
                $rootScope.env_name = cons.env_name;

                // $compileProvider.debugInfoEnabled(true);
                // 监听路由事件
                // $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                // console.log(event, toState, toParams, fromState, fromParams);
                // 路由改变 初始化 search
                //初始化每次的 公共查询方法
                // $rootScope.searchkeyword = angular.noop();
                // $rootScope.current_state = $state.current.name;
                // console.log($rootScope.current_state);
                // console.log($state);
                // console.log($rootScope.hjm.menus);
                // console.log($state.current.name);
                // console.log($rootScope.mainmenu);
                // });
                //活动公共数据
                // 获取公共数据 初始化
                $rootScope.nowlogintimestamp = new Date().getTime();
                $rootScope.lastlogintimestamp = JSON.parse(localStorage.getItem('lastlogintimestamp')) || 0;
                if (parseInt(($rootScope.nowlogintimestamp - $rootScope.lastlogintimestamp) / (1000 * 60 * 60 * 24)) > 1) {
                    //超过一天就更新
                    $rootScope.lastlogintimestamp = JSON.parse($rootScope.nowlogintimestamp);
                    localStorage.removeItem('hjm');
                    // console.log($state);
                    // if($state.current.name!=='login'){
                    //     $state.go('login');
                    // }
                } else {
                    localStorage.setItem('lastlogintimestamp', $rootScope.lastlogintimestamp = new Date().getTime());
                    $rootScope.hjm = JSON.parse(localStorage.getItem('hjm'));
                    // $rootScope.selected = angular.copy($rootScope.hjm);
                    // $rootScope.selected.account_id = '';
                    $rootScope.current_city_name = ($rootScope.hjm && $rootScope.hjm.current_city_name == '') ? '' : ($rootScope.hjm && $rootScope.hjm.current_city_name);
                    $http.defaults.headers.common.Authorization = $rootScope.hjm.Authorization || '';
                }
                $rootScope.func = {};//定义公共函数
                $rootScope.new_version = false;
                $rootScope.func.get_new_version = function () {
                    window.location.reload();
                }
                $rootScope.account_list = [];
                $rootScope.account_list_bd_op = [];
                $rootScope.func.get_accounts = function (accounts) {
                    $rootScope.account_list_bd_op.push({
                        text: '--请选择--',
                        value: undefined
                    });
                    angular.forEach(accounts, function (val, key) {
                        if (val.role == 'bd' || val.role == 'op') {
                            $rootScope.account_list_bd_op.push({
                                text: val.username,
                                value: val.account_id
                            });
                        }
                    });
                    accounts.unshift({
                        account_id: "",
                        city_name: "",
                        email: "",
                        mobile: "",
                        role: "op",
                        username: "全部联系人"
                    })
                    $rootScope.account_list = accounts;
                    angular.forEach($rootScope.account_list, function (val, key) {
                        $rootScope.account_list[key].account_id += '';
                    });
                }


                $rootScope.teacher_list = [];
                $rootScope.func.get_teachers = function (teachers) {
                    $rootScope.teacher_list = [{
                        text: '--请选择--',
                        value: undefined
                    }];
                    angular.forEach(teachers, function (val, key) {
                        $rootScope.teacher_list.push({
                            text: val.name,
                            value: val.teacher_id + ''
                        });
                    });
                }


                $rootScope.func.get_categories = function (categories) {
                    $rootScope.survey_question_category_list = []; // 获取 survey_question_category_list  维度列表
                    $rootScope.survey_question_category_list_attachments = [];//适用于form—table 里的 select  附加信息
                    $rootScope.survey_question_category_list_general = [];//适用于form—table 里的 select  普通信息
                    angular.forEach(categories, function (val, key) {
                        if (val.type == 1) {
                            $rootScope.survey_question_category_list_attachments.push({
                                value: val.id + '',
                                text: val.name
                            });
                        }
                    });
                    $rootScope.survey_question_category_list_general.push({
                        value: undefined,
                        text: '-- 请选择 --'
                    });
                    angular.forEach(categories, function (val, key) {
                        if (val.type == 2) {
                            $rootScope.survey_question_category_list_general.push({
                                value: val.id + '',
                                text: val.name
                            });
                        }
                    });
                    categories.unshift({
                        id: "0",
                        name: "无维度",
                    })
                    $rootScope.survey_question_category_list = [];
                    angular.forEach(categories, function (val, key) {
                        $rootScope.survey_question_category_list.push({id: val.id, name: val.name});
                    });
                }


                $rootScope.func.get_attachments_questions = function (attachments_questions) {
                    $rootScope.survey_question_list_attachments = [];
                    $rootScope.survey_question_list_attachments.push({
                        value: undefined,
                        text: '-- 请选择 --'
                    });
                    angular.forEach(attachments_questions, function (val, key) {
                        $rootScope.survey_question_list_attachments.push({
                            value: val.id + '',
                            text: val.title
                        });
                    });
                }
                $rootScope.func.get_skus = function (skus) {
                    // console.log($rootScope.common, skus)
                    $rootScope.common.sku = skus.map(function (val) {
                        return {text: val.name, value: Number(val.value)};
                    });
                }
                $rootScope.func.get_live_skus = function (live_skus) {
                    // console.log($rootScope.common, skus)
                    $rootScope.common.live_sku = live_skus.map(function (val) {
                        return {text: val.name, value: Number(val.value)};
                    });
                    $rootScope.common.live_sku.push({text: '免费', value: 0});
                }
                $rootScope.func.get_tags = function (tags) {
                    // console.log($rootScope.common, skus)
                    $rootScope.common.tag = tags.map(function (val) {
                        return {text: val.name, value: Number(val.id)};
                    });
                }
                $rootScope.func.get_expires_product = function (expires_product, total) {
                    $rootScope.common.expires_product = {data: expires_product, total: total};
                }
                $rootScope.func.get_inventories_product = function (inventories_product, total) {
                    $rootScope.common.inventories_product = {data: inventories_product, total: total};
                }
                $rootScope.reset = function (request_param) {
                    if (!$http.defaults.headers.common.Authorization || !localStorage.getItem('login_account')) {
                        $rootScope.$state.go('login');
                    } else {
                        var login_account = JSON.parse(base64.decode(localStorage.getItem('login_account')));
                        var param = [];
                        // param = {
                        //     menus: cons.domain + '/account/menus?username=' + login_account.username + '&password=' + login_account.password,
                        //     accounts: cons.api.account_mans + '?count=1000&role=op,majia,bd',
                        //     teachers: cons.domain + '/teachers?count=1000&page=1',
                        //     categories: cons.domain + '/surveys/categories?count=1000&page=1',
                        //     attachments_questions: cons.domain + '/surveys/questions?count=1000&status=1&category_type=1',//适用于form—table 里的 select  附加信息的题目
                        // },
                        if (request_param) {
                            if (angular.isArray(request_param)) {
                                param = param.concat(request_param);
                            } else {
                                param.push(request_param);
                            }
                        } else {
                            param.push(
                                {
                                    "key": 'menus',
                                    "method": 'POST',
                                    "url": cons.domain + '/account/menus',
                                    "data": {"username": login_account.username, "password": login_account.password}
                                },
                                {
                                    "key": 'accounts',
                                    "url": cons.api.account_mans + '?count=1000&role=op,majia,bd', data: {}
                                    // "data": {"count": 1000, "role": "op,majia,bd"}
                                },
                                {
                                    "key": 'teachers',
                                    "url": cons.domain + '/teachers?count=1000', data: {}
                                    // "data": {"count": 1000}
                                },
                                {
                                    "key": 'categories',
                                    "url": cons.domain + '/surveys/categories?count=1000', data: {}
                                    // "data": {"count": 1000}
                                },
                                {
                                    "key": 'attachments_questions',
                                    "url": cons.domain + '/surveys/questions?count=1000&status=1&category_type=1',
                                    data: {}
                                    // "data": {"count": 1000, "status": 1, "category_type": 1}
                                },
                                {
                                    "key": 'skus',
                                    "url": cons.domain + '/supports/tagskus?count=1000&type=product', data: {}
                                    // "data": {"count": 1000, "status": 1}
                                },
                                {
                                    "key": 'live_skus',
                                    "url": cons.domain + '/supports/tagskus?count=1000&type=live', data: {}
                                    // "data": {"count": 1000, "status": 1}
                                },
                                {
                                    "key": 'tags',
                                    "url": cons.domain + '/supports/tags?count=1000', data: {}
                                    // "data": {"count": 1000, "status": 1}
                                },
                                {
                                    "key": 'expires_product',// 过期商品报警
                                    "url": cons.domain + '/products/expires?count=10', data: {}
                                },
                                {
                                    "key": 'inventories_product', //  库存不足商品报警
                                    "url": cons.domain + '/products/inventories?count=10', data: {}
                                }
                            );
                        }
                        widget.ajaxRequest({
                            url: location.protocol + '//' + location.host + ':' + location.port + location.pathname + 'get_common.php',
                            method: 'POST',
                            data: param,
                            success: function (json) {
                                if (json.data.menus && $rootScope.hjm) {
                                    $rootScope.hjm.menus = json.data.menus;
                                }
                                if (json.data.accounts) {
                                    $rootScope.func.get_accounts(json.data.accounts);
                                }
                                if (json.data.teachers) {
                                    $rootScope.func.get_teachers(json.data.teachers);
                                }
                                if (json.data.categories) {
                                    $rootScope.func.get_categories(json.data.categories);
                                }
                                if (json.data.attachments_questions) {
                                    $rootScope.func.get_attachments_questions(json.data.attachments_questions);
                                }
                                if (json.data.skus) {
                                    $rootScope.func.get_skus(json.data.skus);
                                }
                                if (json.data.live_skus) {
                                    $rootScope.func.get_live_skus(json.data.live_skus);
                                }
                                if (json.data.tags) {
                                    $rootScope.func.get_tags(json.data.tags);
                                }
                                if (json.data.expires_product) {
                                    $rootScope.func.get_expires_product(json.data.expires_product, json.total.expires_product);
                                }
                                if (json.data.inventories_product) {
                                    $rootScope.func.get_inventories_product(json.data.inventories_product, json.total.inventories_product);
                                }
                            },
                            error: function (err) {
                                widget.msgToast('网络错误，请稍候再试');
                            }
                        });
                    }
                }
                $rootScope.update_menus = function () {
                    if (!localStorage.getItem('login_account')) {
                        $rootScope.$state.go('login');
                    } else {
                        var login_account = JSON.parse(base64.decode(localStorage.getItem('login_account')));
                        $rootScope.reset({
                            "key": 'menus',
                            "method": 'POST',
                            "url": cons.domain + '/account/menus',
                            "data": {"username": login_account.username, "password": login_account.password}
                        });
                    }
                }
                $rootScope.get_account_list = function () {
                    $rootScope.reset({
                        "key": 'accounts',
                        "url": cons.api.account_mans,
                        "data": {"count": 1000, "role": "op,majia,bd"}
                    });
                }
                $rootScope.get_teacher_list = function () {
                    $rootScope.reset({
                        "key": 'teachers',
                        "url": cons.domain + '/teachers',
                        "data": {"count": 1000}
                    });
                }
                $rootScope.get_survey_question_category_list = function () {
                    $rootScope.reset({
                        "key": 'categories',
                        "url": cons.domain + '/surveys/categories',
                        "data": {"count": 1000}
                    });
                }
                $rootScope.get_survey_question_list = function () {
                    $rootScope.reset({
                        "key": 'attachments_questions',
                        "url": cons.domain + '/surveys/questions',
                        "data": {"count": 1000, "status": 1, "category_type": 1}
                    });
                }

                // $rootScope.update_menus = function () {
                //     if (localStorage.getItem('login_account')) {
                //         var login_account = JSON.parse(base64.decode(localStorage.getItem('login_account')));
                //         widget.ajaxRequest({
                //             method: 'POST',
                //             url: '/account/menus',
                //             scope: {$rootScope},
                //             data: {username: login_account.username, password: login_account.password},
                //             success: function (json) {
                //                 if ($rootScope.hjm) {
                //                     $rootScope.hjm.menus = json.data;
                //                 }
                //             },
                //             failure: function (err) {
                //                 // widget.msgToast(err.message);
                //             }
                //         });
                //     }
                // }
                // $rootScope.getaccount_times = 0;
                // // 获取account_list
                // $rootScope.account_list = [];
                // $rootScope.account_list_bd_op = [];
                // $rootScope.get_account_list = function () {
                //     $rootScope.account_list = [];
                //     $rootScope.account_list_bd_op = [];
                //     if ($rootScope.hjm && $rootScope.hjm.Authorization) {
                //         $rootScope.update_menus();
                //         widget.ajaxRequest({
                //             url: cons.api.account_mans,
                //             method: 'GET',
                //             data: {count: 1000, role: 'op,majia,bd'},
                //             success: function (json) {
                //                 $rootScope.account_list_bd_op.push({
                //                     text: '--请选择--',
                //                     value: undefined
                //                 });
                //                 angular.forEach(json.data, function (val, key) {
                //                     if (val.role == 'bd' || val.role == 'op') {
                //                         $rootScope.account_list_bd_op.push({
                //                             text: val.username,
                //                             value: val.account_id
                //                         });
                //                     }
                //                 });
                //                 json.data.unshift({
                //                     account_id: "",
                //                     city_name: "",
                //                     email: "",
                //                     mobile: "",
                //                     role: "op",
                //                     username: "全部联系人"
                //                 })
                //                 $rootScope.account_list = json.data;
                //                 angular.forEach($rootScope.account_list, function (val, key) {
                //                     $rootScope.account_list[key].account_id += '';
                //                 });
                //
                //             },
                //             failure: function () {
                //                 widget.msgToast('没有获取到公共数据');
                //             }
                //         })
                //     }
                // }
                // if ($rootScope.account_list.length == 0) {
                //     $rootScope.get_account_list();
                // }
                // $rootScope.teacher_list = [];
                // $rootScope.get_teacher_list = function () {
                //     $rootScope.teacher_list = [];
                //     if ($rootScope.hjm && $rootScope.hjm.Authorization) {
                //         widget.ajaxRequest({
                //             url: '/teachers',
                //             method: 'GET',
                //             data: {count: 1000, page: 1},
                //             success: function (json) {
                //                 $rootScope.teacher_list.push({
                //                     text: '--请选择--',
                //                     value: undefined
                //                 });
                //                 angular.forEach(json.data, function (val, key) {
                //                     $rootScope.teacher_list.push({
                //                         text: val.name,
                //                         value: val.teacher_id + ''
                //                     });
                //                 });
                //             },
                //             failure: function () {
                //                 widget.msgToast('没有获取到老师信息');
                //             }
                //         })
                //     }
                // }
                // if ($rootScope.teacher_list.length == 0) {
                //     $rootScope.get_teacher_list();
                // }
                // // 获取 survey_question_category_list  维度列表
                // $rootScope.survey_question_category_list = [];
                // $rootScope.survey_question_category_list_attachments = [];//适用于form—table 里的 select  附加信息
                // $rootScope.survey_question_category_list_general = [];//适用于form—table 里的 select  普通信息
                // $rootScope.get_survey_question_category_list = function () {
                //     if ($rootScope.hjm && $rootScope.hjm.Authorization) {
                //         widget.ajaxRequest({
                //             url: '/surveys/categories',
                //             method: 'GET',
                //             data: {count: 1000, status: 1},
                //             success: function (json) {
                //                 $rootScope.survey_question_category_list_attachments = [];
                //                 $rootScope.survey_question_category_list_general = [];
                //                 angular.forEach(json.data, function (val, key) {
                //                     if (val.type == 1) {
                //                         $rootScope.survey_question_category_list_attachments.push({
                //                             value: val.id + '',
                //                             text: val.name
                //                         });
                //                     }
                //                 });
                //                 $rootScope.survey_question_category_list_general.push({
                //                     value: undefined,
                //                     text: '-- 请选择 --'
                //                 });
                //                 angular.forEach(json.data, function (val, key) {
                //                     if (val.type == 2) {
                //                         $rootScope.survey_question_category_list_general.push({
                //                             value: val.id + '',
                //                             text: val.name
                //                         });
                //                     }
                //
                //                 });
                //                 json.data.unshift({
                //                     id: "0",
                //                     name: "无维度",
                //                 })
                //                 $rootScope.survey_question_category_list = [];
                //                 angular.forEach(json.data, function (val, key) {
                //                     $rootScope.survey_question_category_list.push({id: val.id, name: val.name});
                //                 });
                //
                //             },
                //             failure: function () {
                //                 widget.msgToast('没有获取到测评维度');
                //             }
                //         })
                //     }
                // }
                // if ($rootScope.survey_question_category_list.length == 0) {
                //     $rootScope.get_survey_question_category_list();
                // }
                // // 获取 survey_question_list_attachments
                // $rootScope.survey_question_list_attachments = [];//适用于form—table 里的 select  附加信息的题目
                // $rootScope.get_survey_question_list = function () {
                //     if ($rootScope.hjm && $rootScope.hjm.Authorization) {
                //         widget.ajaxRequest({
                //             url: '/surveys/questions',
                //             method: 'GET',
                //             data: {count: 1000, status: 1, category_type: 1},
                //             success: function (json) {
                //                 $rootScope.survey_question_list_attachments = [];
                //                 $rootScope.survey_question_list_attachments.push({
                //                     value: undefined,
                //                     text: '-- 请选择 --'
                //                 });
                //                 angular.forEach(json.data, function (val, key) {
                //                     $rootScope.survey_question_list_attachments.push({
                //                         value: val.id + '',
                //                         text: val.title
                //                     });
                //                 });
                //             },
                //             failure: function () {
                //                 widget.msgToast('没有获取到附加问题数据');
                //             }
                //         })
                //     }
                // }
                // if ($rootScope.survey_question_list_attachments.length == 0) {
                //     $rootScope.get_survey_question_list();
                // }
                $rootScope.reset();
                $rootScope.login_init = function () {
                    $rootScope.reset();
                }
            }
        ])

});
