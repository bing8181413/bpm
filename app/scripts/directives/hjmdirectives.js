define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {
    //  activity21用到的下列所有的指令

    //  selectCommunity  选择小区
    //  optionInfo       选择类目
    //  content_or_img   图文说明可多个
    //  hjmDateTime      hjm日期时间同时选择
    //  tuan_zhang       选择备用团长
    // order_list        订单支付列表

    mod

    // 选择图文说明
    //  <content_or_img ng-model="list"></content_or_img>
    //list = {
    //    old: [],
    //    new: [{}]
    //},

        .directive('contentOrImg', function ($state, $rootScope, $timeout, $templateCache) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    ngModel: '=',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'hjm_content2img.html'),
                link: function ($scope, $element, $attrs) {
                    var init = false;
                    $scope.$watch('ngModel', function (defval) {
                        if (defval && !init) {
                            init = true;
                            // console.log(defval);
                            $scope.list = $scope.list || [];
                            angular.forEach(defval, function (val, key) {
                                var obj = {};
                                obj.pics = val.pics || [];
                                obj.contentData = {
                                    content_id: val.content_id,
                                    content: val.content,
                                    category: val.category,
                                    font_align: val.font_align,
                                    font_bold: val.font_bold,
                                    font_color: val.font_color,
                                    font_ita: val.font_ita,
                                    font_size: val.font_size,
                                    font_style: val.font_style,
                                    // font_italic: val.font_italic
                                }
                                // $scope.list[key]
                                // console.log(obj);
                                $scope.list.push(angular.extend(obj, {
                                    //contentData: val,
                                    //images: val.images ||[],
                                    showContent: obj.contentData.content != '',
                                    showImg: obj.pics.length > 0 ? true : false,
                                    showContentTitle: obj.contentData.content != '' ? '取消文字' : '添加文字',
                                    showImgTitle: obj.pics.length > 0 ? '取消图片' : '添加图片'
                                }));
                                // console.log($scope.list);
                            });
                        }

                    }, true);
                    $scope.$watch('list', function (defval) {
                        if (init) {
                            // console.log('init', defval);
                            $scope.ngModel = [];
                            angular.forEach(defval, function (val, key) {
                                var obj = {};
                                // obj.pics = val.pics || [];
                                obj.contentData = angular.extend({
                                    content_id: val.content_id || undefined,
                                    pics: val.pics || [],
                                    content: '',
                                    category: 1,
                                    // category: $scope.ngModel.category,
                                    font_align: '',
                                    font_bold: '',
                                    font_color: '',
                                    font_ita: '',
                                    font_size: '',
                                    font_style: '',
                                }, val.contentData || {});
                                $scope.ngModel.push(obj.contentData);
                            });
                        }
                    }, true);

                    $scope.add = function (obj) {
                        init = true;
                        obj = obj || {};
                        $scope.list = $scope.list || [];
                        $scope.list.push(angular.extend({
                            contentData: {},
                            pics: [],
                            showContent: false,
                            showImg: false,
                            showContentTitle: '添加文字',
                            showImgTitle: '添加图片'
                        }, obj))
                    }
                    //从搜索的列表中选择小区的ID
                    //删除一条 list.new 的记录
                    $scope.del = function (index) {
                        $scope.list.splice(index, 1);
                    }
                    // 切换新增和删除图文
                    $scope.toggleShow = function (item, typeTitle) {
                        // if (!window.confirm('图片和文字只能选其一,确定切换吗')) {
                        //     return false;
                        // }
                        // if (!item.showContent) {
                        //     item.showImg = false;
                        //     item.showImgTitle = '添加图片';
                        //     item.pics = [];
                        // } else if (!item.showImg) {
                        //     item.showContent = false;
                        //     item.showContentTitle = '取消文字';
                        //     item.contentData.content = null;
                        // }
                        if (typeTitle == 'showContent') {
                            // if (!item.showContent) {
                            //     item.showImg = false;
                            //     item.showImgTitle = '添加图片';
                            //     item.pics = [];
                            // }

                            item.showContent = !item.showContent;
                            item.showContentTitle = item.showContent ? '取消文字' : '添加文字';
                            item.contentData.content = '';
                            item.contentData.category = '';
                            item.contentData.font_align = '';
                            item.contentData.font_bold = '';
                            item.contentData.font_color = '';
                            item.contentData.font_ita = '';
                            item.contentData.font_size = '';
                            item.contentData.font_style = '';
                        }
                        if (typeTitle == 'showImg') {
                            // if (!item.showImg) {
                            //     item.showContent = false;
                            //     item.showContentTitle = '取消文字';
                            //     item.contentData.content = null;
                            // }

                            item.showImg = !item.showImg;
                            item.showImgTitle = item.showImg ? '取消图片' : '添加图片';
                            item.pics = [];
                        }
                    }
                    $scope.conslog = function (index) {
                        console.log($scope.list);
                    }

                }
            };
        })

        // 日期控件
        //  <hjm_date ng-model="date" ></hjm_date>
        //  date = new date(),

        .directive('hjmDate', function ($parse, $templateCache, $filter) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    ngModel: '=ngModel',
                    ngModelTxt: '@ngModel',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'hjm_date.html'),
                link: function ($scope, $element, $attrs) {
                    $scope.init = false;
                    $scope.strToDateTime = function (str) {
                        if (!str) return new Date();
                        str = str.toString();
                        str = str.replace(/-/g, "/");
                        var oDate = new Date(str);
                        return oDate;
                    }
                    $scope.$watch('ngModel', function () {
                        if (!$scope.ngModel) {
                            $scope.dateTime = null;
                            $scope.dt = '';
                            // if (!$scope.init) {
                            //     // console.log('初始化 赋值');
                            //     $scope.init = true;
                            //     $scope.dateTime = new Date();
                            //     $scope.dt = $scope.strToDateTime($scope.dateTime);
                            //     $scope.changed();
                            // } else {
                            //     // console.log('已初始化 赋值');
                            //     $scope.dateTime = null;
                            //     $scope.dt = '';
                            // }
                        } else { //  初始化过了
                            if (!$scope.init) {
                                $scope.init = true;
                            }
                            // console.log('初始化过ngModel 进行watch 事件 ');
                            $scope.dateTime = new Date($scope.ngModel);
                            $scope.dt = $scope.strToDateTime($scope.dateTime);
                        }
                    });
                    $scope.$watch('dt', function (val) {
                        // 清空日期动作 执行后
                        if (!val) {
                            $scope.ngModel = undefined;
                        }
                    });
                    $scope.open = function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.isopen = true;
                    }
                    // 赋值
                    $scope.changed = function () {
                        if (!$scope.dt) {
                            return false;
                        }
                        $scope.ngModel = $filter('date')($scope.dt, 'yyyy-MM-dd')
                    }
                }

            };
        })
        // 日期时间组合控件
        //  <hjm_date_time ng-model="date" ></hjm_date_time>
        //  date = new date(),

        .directive('hjmDateTime', function ($parse, $templateCache) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    ngModel: '=ngModel',
                    ngModelTxt: '@ngModel',
                    showtip: '=showtip'
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'hjm_date_time.html'),
                link: function ($scope, $element, $attrs) {
                    $scope.init = false;
                    $scope.strToDateTime = function (str) {
                        str = str.toString();
                        str = str.replace(/-/g, "/");
                        var oDate = new Date(str);
                        return oDate;
                    }
                    $scope.$watch('ngModel', function () {
                        if (!$scope.ngModel) {
                            $scope.dateTime = null;
                            $scope.dt = '';
                            // 把时间制为 00:00:00
                            $scope.tp = $scope.strToDateTime(new Date('2000-01-01 00:00:00'));
                            // if (!$scope.init) {
                            //     // console.log('初始化 赋值');
                            //     $scope.init = true;
                            //     $scope.dateTime = new Date();
                            //     $scope.dt = $scope.strToDateTime($scope.dateTime);
                            //     $scope.tp = $scope.strToDateTime($scope.dateTime);
                            //     $scope.changed();
                            // } else {
                            //     // console.log('已初始化 赋值');
                            //     $scope.dateTime = null;
                            //     $scope.dt = '';
                            //     // 把时间制为 00:00:00
                            //     $scope.tp = $scope.strToDateTime(new Date('2000-01-01 00:00:00'));
                            // }
                        } else { //  初始化过了
                            if (!$scope.init) {
                                $scope.init = true;
                            }
                            $scope.dateTime = new Date($scope.ngModel);
                            $scope.dt = $scope.strToDateTime($scope.dateTime);
                            $scope.tp = $scope.strToDateTime($scope.dateTime);
                        }
                    });
                    $scope.$watch('dt', function (val) {
                        // 清空日期
                        if (!val) {
                            $scope.ngModel = undefined;
                        }
                    });
                    $scope.open = function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.isopen = true;
                    }
                    // 赋值
                    $scope.changed = function () {
                        // console.log($scope.tp,$scope.dt);
                        if (!$scope.tp || !$scope.dt)return false;
                        $scope.ngModel = ($scope.dt.getFullYear() + '-' + ($scope.dt.getMonth() + 1)
                        + '-' + $scope.dt.getDate() + ' ' + $scope.tp.getHours() + ':' + $scope.tp.getMinutes() + ':00')
                            .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
                    }
                }

            };
        })


        // 备用团长
        //  <tuan_zhang ng-model="date" ></tuan_zhang>

        .directive('tuanZhang', function ($parse, $http, widget) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    ngModel: '=ngModel',
                    tuanoption: '=tuanoption'
                },
                template: '<div class="panel panel-default">' +
                '<div class="panel-heading" ng-show="show">' +
                //'<h3 class="panel-title">用户</h3>' +
                '<input class="form-control" ng-model="mobile" placeholder="输入11位手机号码自动查询">' +
                '</div>' +
                '<div class="panel-body">' +
                '<div class="col-sm-12">' +
                '<ul class="list-group">' +
                //'<li class="list-group-item">' +
                //'<span>请最终确认信息准确</span>' +
                //'</li>' +
                '<li class="list-group-item">' +
                '<span>用户ID：</span>' +
                '<span ng-bind="user_id"></span>' +
                '</li>' +
                '<li class="list-group-item">' +
                '<span>用户名称：</span>' +
                '<span ng-bind="name"></span>' +
                '</li>' +
                '<li class="list-group-item">' +
                '<span>手机号码：</span>' +
                '<span ng-bind="mobile"></span>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '<div class="col-sm-offset-4 col-sm-9">' +
                '<a class="btn btn-warning" ng-click="show = true;" ng-show="show == false">重选用户</a>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                '<a class="btn btn-success" ng-click="show = false;" ng-show="show == true">确定</a>' +
                '</div>' +
                '</div>' +
                '</div>',

                link: function ($scope, $element, $attrs) {
                    $scope.init = false;
                    $scope.show = true;
                    $scope.$watch('tuanoption', function () {
                        // tuanoption :{
                        //    user_id:'',
                        //    name:'',
                        //    mobile:'',
                        //  }
                        //console.log($scope.tuanoption);
                        if (typeof ($scope.tuanoption) !== 'undefined') {
                            $scope.user_id = $scope.tuanoption.user_id;
                            $scope.name = $scope.tuanoption.name;
                            $scope.mobile = $scope.tuanoption.mobile;
                            $scope.show = false;
                        }
                    }, true);
                    $scope.$watch('mobile', function () {
                        if ($scope.mobile && $scope.mobile.length == 11) {
                            $scope.search();
                        }
                    });
                    $scope.search = function () {
                        var url = simpleCons.domain + '/manage/user/get_user_by_mobile';
                        $http.post(url, {mobile: $scope.mobile})
                            .success(function (json) {
                                if (json.code == 0) {
                                    $scope.user_id = json.data.user_id;
                                    $scope.name = json.data.name;
                                    $scope.mobile = json.data.mobile;
                                    $scope.ngModel = json.data.user_id;
                                } else {
                                    widget.msgToast(json.msg);
                                }
                            });

                    }
                }

            };
        })
})
;
