define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('userAddress', function (widget, $uibModal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show_user_address()" ng-bind="data.address.count || 0"></a>',
                link: function ($scope, $element, $attrs) {
                    var supScope = $scope;
                    $scope.show_user_address = function (status) {
                        var modalInstance = $uibModal.open({
                            template: '<div hjm-grid modid="addressList" config="config" columns="columns" ext-api="extApi"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.extApi = '';
                                if (supScope.data.user_id) {
                                    $scope.extApi = '/users/' + supScope.data.user_id + '/addresses';
                                }
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
        .directive('userOrder', function (widget, $uibModal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show_user_order()" ng-bind="data.order.count || 0"></a>',
                link: function ($scope, $element, $attrs) {
                    var supScope = $scope;
                    $scope.show_user_order = function (status) {
                        var modalInstance = $uibModal.open({
                            template: '<div hjm-grid modid="orderList" config="config_by_user" columns="columns_by_user" ext-search="extSearch"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.extApi = '';
                                if (supScope.data.user_id) {
                                    $scope.extSearch = {user_id: supScope.data.user_id};
                                }
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
        .directive('userCoupon', function (widget, $uibModal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show_user_coupon()" ng-bind="data.coupon.count || 0"></a>',
                link: function ($scope, $element, $attrs) {
                    var supScope = $scope;
                    $scope.show_user_coupon = function (status) {
                        var modalInstance = $uibModal.open({
                            template: '<div hjm-grid modid="couponList" config="config_by_user" columns="columns_by_user" ext-api="extApi" ext-search="extSearch"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.extApi = '';
                                if (supScope.data.user_id) {
                                    $scope.extApi = '/users/' + supScope.data.user_id + '/coupons';
                                    $scope.extSearch = {user_id: supScope.data.user_id};
                                }
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
        .directive('userToken', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="user-token" ></p>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_user_token = function () {
                        if ('admin,pm'.indexOf($rootScope.hjm.role) == -1) {
                            widget.msgToast('权限不够');
                            return false;
                        }
                        var modalInstance = $uibModal.open({
                            template: '<form modal-panel title="title" tmpl="tmpl"></form>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-textarea text="模拟登陆的URL" ng-model="rtn_url"' +
                                    ' placeholder = "URL" > </div > ' +
                                    '</form>';
                                $scope.title = '模拟登陆';
                                widget.ajaxRequest({
                                    url: '/users/' + supscope.data.user_id + '/token',
                                    method: 'get',
                                    scope: $scope,
                                    data: {},
                                    success: function (json) {
                                        $scope.rtn_url = json.data.url;
                                    }
                                })
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            size: 'lg'
                        });
                    }
                    var content = '<a class="btn btn-warning btn-rounded btn-sm" ng-click="show_user_token();">模拟登陆</a>';
                    $element.find('.user-token').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('userCaptcha', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                            template: '<form modal-panel title="title" tmpl="tmpl"></form>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-input text="验证码" ng-model="captcha" ng-disabled="true"> </div> ' +
                                    '</form>';
                                $scope.title = '获取验证码';
                                widget.ajaxRequest({
                                    url: '/supports/captcha',
                                    method: 'post',
                                    scope: $scope,
                                    data: {"mobile": supscope.data.mobile},
                                    success: function (json) {
                                        $scope.captcha = json.data.code;
                                    }
                                })
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            size: 'sm'
                        });
                    }
                    var content = '<a class="btn btn-primary btn-rounded btn-sm" ng-click="show();">获取验证码</a>';
                    $element.html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('userMobileUnbind', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show = function () {
                        if (confirm('确定解绑该用户手机号码')) {
                            widget.ajaxRequest({
                                url: '/users/' + supscope.data.user_id + '/mobile',
                                method: 'put',
                                scope: $scope,
                                data: {},
                                success: function (json) {
                                    supscope.$parent.searchAction();
                                }
                            })
                        }
                    }
                    $scope.show_bind_mobile = function () {
                        var mobile = prompt('确定解绑该用户手机号码');
                        if (mobile&&mobile.length==11) {
                            widget.ajaxRequest({
                                url: '/users/' + supscope.data.user_id + '/mobile',
                                method: 'put',
                                scope: $scope,
                                data: {mobile:mobile},
                                success: function (json) {
                                    supscope.$parent.searchAction();
                                }
                            })
                        }
                    }
                    var content = '<a class="btn btn-warning btn-rounded btn-sm" ng-click="show();" ng-if="data.mobile">解绑手机号</a>' +
                      '<a class="btn btn-primary btn-rounded btn-sm" ng-click="show_bind_mobile();" ng-if="!data.mobile">绑定手机号</a>';
                    $element.html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('userBlock', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="user-block" ></p>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_user_block = function () {
                        var modalInstance = $uibModal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-radio ng-model="minute" text="禁言分钟数" required="true"' +
                                    ' source="[{text:\'15分钟\',value:15},{text:\'1小时\',value:60},{text:\'2小时\',value:120},{text:\'永久\',value:43200},]"></div>' +
                                    '<div form-input ng-model="minute" text="禁言分钟数" required="true" placeholder="分钟数"></div>' +
                                    '<a class="btn btn-danger btn-rounded pull-right" ng-click="submit();">确定禁言</a>' +
                                    '</form>';
                                $scope.title = '直播禁言';
                                $scope.submit = function () {
                                    widget.ajaxRequest({
                                        url: '/users/' + supscope.data.user_id + '/block',
                                        method: 'put',
                                        scope: $scope,
                                        data: {minute: $scope.minute},
                                        success: function (json) {
                                            if (json.code == 0) {
                                                widget.msgToast('禁言成功', 200);
                                                $scope.cancel();
                                                supscope.$parent.$parent.searchAction();
                                            }
                                        }
                                    })
                                }
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            size: ''
                        });
                    }
                    var content = '<a class="btn btn-warning btn-rounded btn-sm" ng-click="show_user_block();">直播禁言</a>';
                    $element.find('.user-block').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('vipUserInfoUpdate', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-sm btn-warning" ng-click="show_act_change_notice()" >会员信息更新</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_act_change_notice = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '会员信息更新';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate' +
                                        ' disabled-role="\'admin,op\'" >' +
                                        '<h4>会员信息更新，请确认无误后操作。</h4>' +
                                        '<div form-input text="会员编号" ng-model="param.vip_number" required="true"></div>' +
                                        '<div form-input text="会员名称" ng-model="param.name" required="true"></div>' +
                                        '<div form-radio text="会员类型" ng-model="param.is_vip" default="1"' +
                                        'source="[{text:\'仅会员\',value:\'1\'},{text:\'会员+体验会员\',value:\'3\'},{text:\'不限制\',value:\'2\'}]"' +
                                        ' required="true"></div>' +
                                        '<div form-input text="手机号码" ng-model="param.mobile" required="true"></div>' +
                                        '<div form-date-time text="会员开始时间" ng-model="param.vip_start_time" required="true"></div>' +
                                        '<div form-date-time text="会员结束时间" ng-model="param.vip_end_time" required="true"></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $timeout(function () {
                                        $scope.param = {
                                            vip_number: supscope.data.vip_number,
                                            name: supscope.data.name,
                                            is_vip: supscope.data.is_vip,
                                            mobile: supscope.data.mobile,
                                            vip_start_time: supscope.data.vip_start_time,
                                            vip_end_time: supscope.data.vip_end_time,
                                        };
                                        // console.log($scope.param);
                                    }, 0);
                                    $scope.submit = function () {
                                        // console.log($scope);
                                        widget.ajaxRequest({
                                            url: '/users/' + (supscope.data.user_id || 0),
                                            method: 'patch',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                widget.msgToast('会员信息更新成功!');
                                                $scope.cancel();
                                            }
                                        })
                                    }
                                    $scope.cancel = function () {
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg'
                            }
                        );
                    }
                }
            }
        })
        .directive('userLiveBlock', function ($templateCache, $rootScope, $compile, widget, $state, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    var supScope = $scope;
                    //用户列表和禁言用户列表都用到  做了以下判定
                    $scope.data.block_status = $scope.data.block && $scope.data.block.block_status || ($scope.data.block_expire_time ? 2 : 1 );

                    if ($scope.data.block_status == 1) {  //1 未被禁言
                        status_title = '禁止发言';
                        status_text = 'ng-bind="\'禁止发言\'"';
                        class_text = 'ng-class={\"btn-danger\":true} ';
                        click_text = 'ng-click="change(1);"';
                    } else if ($scope.data.block_status == 2) {
                        status_title = '解除禁止';
                        status_text = 'ng-bind="\'解除禁止\'"';
                        class_text = 'ng-class={\"btn-success\":true} ';
                        click_text = 'ng-click="change(2);"';
                    }
                    var content = ' <a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + '></a>';
                    $element.html(content);
                    $compile($element.contents())($scope);
                    $scope.change = function (block_status) {
                        var modalInstance = $uibModal.open({
                            template: function () {
                                return $templateCache.get('app/' + simpleCons.biz_path + 'user/block.html');
                            },
                            controller: function ($scope, $uibModalInstance) {
                                $scope.param = {};
                                $timeout(function () {
                                    if (block_status == 2) {
                                        $scope.block_status = 2;
                                        $scope.param.minute = 0;
                                    } else {
                                        $scope.block_status = 1;
                                    }
                                }, 0);

                                $scope.$watch('param.minute', function (val) {
                                    $scope.param.minute = Number($scope.param.minute);
                                });
                                $scope.submit = function () {
                                    if (Number($scope.param.minute) < 0) {
                                        widget.msgToast('分钟数必须大于0');
                                        return false;
                                    }
                                    widget.ajaxRequest({
                                        url: '/users/' + supScope.data.user_id + '/block ',
                                        method: 'PUT',
                                        scope: $scope,
                                        data: $scope.param,
                                        success: function (json) {
                                            widget.msgToast('操作成功,请刷新查看');
                                            supScope.$parent.searchAction();
                                            $scope.cancel();
                                        }
                                    })
                                }
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            },
                            size: ''
                        });
                    }
                }
            }
        })
        .directive('userVideoGroupRecord', function ($templateCache, $rootScope, $compile, widget, $state, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-sm btn-success" ng-click="open()">查看</a>',
                link: function ($scope, $element, $attrs) {
                    var supScope = $scope;
                    $scope.open = function (block_status) {
                        var modalInstance = $uibModal.open({
                            template: function () {
                                return $templateCache.get('app/' + simpleCons.biz_path + 'user/videogrouprecord.html');
                            },
                            controller: function ($scope, $uibModalInstance) {
                                $scope.param = {mobile:supScope.data.mobile};
                                $scope.$watch('param.mobile', function (val) {
                                  $scope.result = '';
                                });
                                $scope.submit = function () {
                                    widget.ajaxRequest({
                                        url: '/markets/view',
                                        method: 'POST',
                                        scope: $scope,
                                        data: $scope.param,
                                        success: function (json) {
                                            $scope.result = json.data.length;
                                        }
                                    })
                                }
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            },
                            size: ''
                        });
                    }
                }
            }
        })
});
