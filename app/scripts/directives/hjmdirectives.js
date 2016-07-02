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
    // 选择部分小区的功能  含有搜索
    //  <select-community ng-model="communityinfo" ></select-community>
    //list = {
    //    old: [],
    //    new: [{community_name: '', new_community: '', hide: false}]
    //    empty_community_num: 0
    //},

        .directive('selectCommunity', function ($state, $rootScope, $http) {
            return {
                restrict: 'E',
                replace: true,
                require: '?ngModel',
                scope: {ngModel: '=ngModel'},
                template: '<div>' +
                '<style type="text/css">' +
                '.select_name {width: 100%;line-height: 26px;height: 34px;margin-right: 15px;}' +
                '.community_name {position: relative; width: 100% !important;}' +
                '.search_community_list {position: absolute;top: 100%;z-index: 1000;float: left;min-width: 160px;' +
                'padding: 5px 0;margin: 2px 0 0;font-size: 14px;text-align: left;list-style: none;background-color: #fff;' +
                '-webkit-background-clip: padding-box;background-clip: padding-box;border: 1px solid #ccc;' +
                'border: 1px solid rgba(0, 0, 0, .15);border-radius: 4px;-webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);' +
                'box-shadow: 0 6px 12px rgba(0, 0, 0, .175);}' +
                '.search_community_list > li {width: 100%;}' +
                '.search_community_list > li > a.divider {height: 1px;margin: 1px 0;overflow: hidden;background-color: #e5e5e5;' +
                'padding: 0;}' +
                '.search_community_list > li > a {display: block;padding: 3px 20px;clear: both;font-weight: normal;' +
                'line-height: 1.42857143;color: #333;white-space: nowrap;}' +
                '.search_community_list > li > a:hover {background-color: #13c4a5;color: #fff;}' +
                '</style>' +
                '<table class="table table-hover table-bordered">' +
                '<thead>' +
                '<tr>' +
                '<th style="width: 40%; text-align: center;">小区关键字</th>' +
                '<th style="width: 10%; text-align: center;">搜索</th>' +
                '<th style="width: 40%; text-align: center;">验证后小区名称</th>' +
                '<th style="width: 10%; text-align: center;">' +
                '<a class="btn btn-primary" ng-click="add();conslog();">添加</a>' +
                '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr ng-repeat="obj in list.old track by $index" ng-init="obj.index = $index;" ng-if="!obj.hide">' +
                '<td>' +
                '<input type="text" class="form-control" ng-model="obj.community_name" disabled>' +
                '</td>' +
                '<td>' +
                '<div class="community_name"></div>' +
                '</td>' +
                '<td>' +
                '<a type="button" class="btn btn-default select_name"  ng-bind="obj.community_name"></a>' +
                '</td>' +
                '<td></td>' +
                '</tr>' +
                '<tr ng-repeat="obj in list.new track by $index" ng-init="obj.index = $index;" ng-if="!obj.hide">' +
                '<td>' +
                '<input type="text" class="form-control" ng-model="obj.community_name">' +
                '</td>' +
                '<td>' +
                '<div class="community_name">' +
                '<a type="button" class="btn btn-default" ng-click="search_community($index, obj.index, obj.community_name);">' +
                '搜索' +
                '</a>' +
                '<ul class="search_community_list" ng-if="obj.search_community_list">' +
                '<li ng-repeat="searchobj in obj.search_community_list track by $index">' +
                '<a class="btn" ng-click="select_community($index,obj.index,searchobj);" ng-bind="searchobj.name"></a>' +
                '</li>' +
                '<li><a class="divider"></a></li>' +
                '<li>' +
                '<a class="btn" ng-click="obj.search_community_list=\'\';">取消</a>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '</td>' +
                '<td>' +
                '<a type="button" class="btn btn-default select_name" ng-bind="obj.new_community"></a>' +
                '</td>' +
                '<td>' +
                '<a class="btn btn-danger" ng-click="del($index)">删除</a>' +
                '</td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '</div>',

                link: function ($scope, $element, $attrs) {
                    //empty_community_num:有未选择的项
                    $scope.$watch('ngModel', function () {
                        $scope.list = angular.extend({empty_community_num: 0}, $scope.ngModel || {
                                old: [],
                                new: []
                            });
                    });

                    $scope.add = function () {
                        $scope.list.new.push({community_name: '', new_community: '', hide: false});
                        $scope.setval();
                    }
                    // 搜索小区
                    var verify_url = simpleCons.domain + '/manage/plat/internal_community';
                    $scope.search_community = function (index, parent_index, community) {
                        //  隐藏上次搜索的列表
                        if (!$scope.list.new[parent_index].search_community_list == '') {
                            $scope.list.new[parent_index].search_community_list = '';
                            return false;
                        }
                        for (key in $scope.list.new) {
                            $scope.list.new[key].search_community_list = '';
                        }
                        $http.post(verify_url, {keyword: community})
                            .success(function (json) {
                                if (json.code == 0) {
                                    $scope.list.new[parent_index].search_community_list = json.data.community_list;
                                } else {
                                    alert(json.msg);
                                }
                            });
                    }
                    //从搜索的列表中选择小区的ID
                    $scope.select_community = function (index, parent_index, community) {
                        var err = 0;
                        angular.forEach($scope.list.old, function (val, key) {
                            if (val.community_id == community.community_id) {
                                err++;
                            }
                        });
                        angular.forEach($scope.list.new, function (val, key) {
                            if (val.new_community_id == community.community_id) {
                                err++;
                            }
                        });
                        if (err > 0) {
                            console.log('小区重复');
                            return false;
                        } else {
                            $scope.list.new[parent_index].new_community = community.name;
                            $scope.list.new[parent_index].new_community_id = community.community_id;
                            $scope.list.new[parent_index].search_community_list = '';
                            $scope.setval();
                            if ($scope.list.empty_community_num == 0) {
                                $scope.add();
                            }
                        }
                    }
                    //删除一条 list.new 的记录
                    $scope.del = function (index) {
                        $scope.list.new.splice(index, 1);
                        //明细的index 要对应与父对象的index  否则删除功能之后 前面的搜索就有错误
                        angular.forEach($scope.list.new, function (val, key) {
                            $scope.list.new[key].index = key;
                        });
                        $scope.setval();
                    }
                    $scope.conslog = function () {
                        $scope.setval();
                        console.log($scope.list);
                    }
                    // 赋值
                    $scope.setval = function () {
                        $scope.list.empty_community_num = 0;
                        angular.forEach($scope.list.new, function (val, key) {
                            if ($scope.list.new[key].new_community == '') {
                                $scope.list.empty_community_num++;
                            }
                        });
                        $scope.ngModel = $scope.list;
                        //ngModel.$setViewValue($scope.list);
                    }

                }
            };
        })


        // 选择产品类目的功能
        //  <option_info ng-model="list" ></option_info>
        //list = {
        //    old: [],
        //    new: [{community_name: '', new_community: '', hide: false}]
        //    empty_community_num: 0
        //},

        .directive('optionInfo', function ($state, $rootScope, $http, widget) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    inventory: '=',
                    tuantype: '=',
                    iscompleted: '=',
                    category: '=',
                    ngModel: '=',
                    noinventory: '=', //  是否显示库存，tuan不显示库存，直接1；  不写值表示要显示库存
                    count: '=' // 可以添加的条数
                },
                template: '<div>' +
                '<style type="text/css">' +
                '</style>' +
                '<table class="table table-hover table-bordered">' +
                '<thead>' +
                '<tr>' +
                '<th style="width: 20%; text-align: center;">规格</th>' +
                '<th style="width: 20%; text-align: center;">价格</th>' +
                '<th style="width: 20%; text-align: center;">原价</th>' +
                '<th style="width: 20%; text-align: center;" ng-show="noinventory==0"><span ng-bind="tuanTypeTitle"></span></th>' +
                '<th style="width: 20%; text-align: center;">' +
                '<a class="btn btn-primary"ng-click="add();">' +
                '添加' +
                '</a>' +
                '<a class="btn btn-warning" ng-click="conslog()">打印</a>' +
                '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                //'<tr ng-repeat="obj in list.old track by $index">' +
                //'<td>' +
                //'<input type="text" class="form-control" ng-model="obj.name" disabled="true">' +
                //'</td>' +
                //'<td>' +
                //'<input type="text" class="form-control" ng-model="obj.price" disabled="true">' +
                //'</td>' +
                //'<td>' +
                //'<input type="text" class="form-control" ng-model="obj.origin_price" disabled="true">' +
                //'</td>' +
                //'<td>' +
                //'<input type="text" class="form-control" ng-model="obj.origin_inventory" disabled="true">' +
                //'</td>' +
                //'<td>' +
                //'</td>' +
                //'</tr>' +
                '<tr ng-repeat="obj in list.new track by $index" ng-init="obj.index = $index;">' +
                '<td>' +
                '<input type="text" class="form-control" ng-model="obj.name" ng-change="setval()" ng-disabled="obj.option_id">' +
                '</td>' +
                '<td>' +
                '<input type="number" class="form-control" ng-model="obj.price" step="0.01" ng-change="setval()" >' +
                '</td>' +
                '<td>' +
                '<input type="number" class="form-control" ng-model="obj.origin_price" step="0.01" ng-change="setval()"  ng-disabled="category == 1">' +
                '</td>' +
                '<td ng-show="noinventory==0">' +
                '<input type="number" class="form-control"ng-model="obj.origin_inventory"ng-disabled="inventory==0" ng-change="setval()">' +
                '</td>' +
                '<td>' +
                '<a class="btn btn-danger" ng-click="del($index)">删除</a>' +
                '</td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '</div>',

                link: function ($scope, $element, $attrs, ngModel) {
                    $scope.list = angular.extend({empty_obj_num: 0}, $scope.ngModel || {old: [], new: []});

                    $scope.$watch('iscompleted', function () {
                        if ($scope.iscompleted || angular.isUndefined($scope.iscompleted)) {
                            angular.forEach($scope.ngModel.old, function (val, key) {
                                var obj = {
                                    name: val.name,
                                    option_id: val.option_id,
                                    origin_inventory: Number(val.origin_inventory),
                                    origin_price: Number(val.origin_price),
                                    price: Number(val.price)
                                };
                                $scope.list.new.push(obj);
                            });
                            $scope.setval();
                        }
                    });
                    $scope.$watch('tuantype', function () {
                        if ($scope.tuantype == 1) {
                            $scope.tuanTypeTitle = '整体库存数';
                        } else {
                            $scope.tuanTypeTitle = '每个小区库存数';
                        }
                    });
                    $scope.$watch('inventory', function () {

                    });
                    // 是否显示库存
                    $scope.$watch('noinventory', function () {
                        if ($scope.noinventory == 1) {
                            $scope.noinventory = 1;
                        } else {
                            $scope.noinventory = 0;
                        }
                    });
                    //$scope.$watch('list', function () {
                    //    $scope.list = angular.extend({empty_obj_num: 0}, $scope.ngModel || {
                    //            old: [],
                    //            new: []
                    //        });
                    //}, true);
                    $scope.add = function () {
                        if ($scope.count && $scope.list.new.length >= $scope.count) {
                            widget.msgToast('只能添加 ' + $scope.count + ' 条规格');
                        } else {
                            $scope.list.new.push({
                                option_id: '',
                                name: '',
                                price: '',
                                origin_price: '',
                                origin_inventory: 1
                            });
                            $scope.setval();
                        }

                    }
                    //从搜索的列表中选择小区的ID
                    //删除一条 list.new 的记录
                    $scope.del = function (index) {
                        $scope.list.new.splice(index, 1);
                        $scope.setval();
                    }
                    $scope.conslog = function (index) {
                        $scope.setval();
                        console.log($scope.list);
                    }
                    // 赋值
                    $scope.setval = function () {
                        $scope.list.empty_obj_num = 0;
                        if ($scope.list.old.length == 0 && $scope.list.new.length == 0) {// 不能没有一条记录吧
                            $scope.list.empty_obj_num++;
                        }
                        angular.forEach($scope.list.new, function (val, key) {
                            $scope.list.new[key].price = Number($scope.list.new[key].price);
                            $scope.list.new[key].origin_price = Number($scope.list.new[key].origin_price);
                            if ($scope.list.new[key].name == '' || $scope.list.new[key].origin_inventory === '') {
                                $scope.list.empty_obj_num++;
                            }
                        });
                        $scope.ngModel = $scope.list;
                    }
                    //$scope.setval();

                }
            };
        })


        // 选择图文说明
        //  <content_or_img ng-model="list"></content_or_img>
        //list = {
        //    old: [],
        //    new: [{}]
        //},
        //templatehtml:
        //<div class="form-group">
        //    <div class="form-group" ng-repeat="item in activity21add.contents.new track by $index">
        //    <div class="col-sm-9 col-md-offset-3  contents">
        //    <div class="col-sm-12 form-group">
        //    <a class="btn btn-success"
        //ng-class="{'btn-success':!item.showContent,'btn-danger':item.showContent}"
        //ng-click="toggleShow(item,'showContent')" ng-bind="item.showContentTitle"></a>
        //    <a class="btn btn-success"
        //ng-class="{'btn-success':!item.showImg,'btn-danger':item.showImg}"
        //ng-click="toggleShow(item,'showImg')" ng-bind="item.showImgTitle"></a>
        //    <a class="btn btn-danger"
        //ng-click="activity21add.contents.new.splice($index,1);">删除这一条图文</a>
        //    </div>
        //    <div class="col-sm-12" ng-if="!!item.showContent">
        //    <show-textarea ng-model="item.contentData"
        //placeholder="你需要在文本框里默认显示文字"></show-textarea>
        //    </div>
        //    <div class="col-sm-12" ng-if="!!item.showImg">
        //    <show-upload images="item.images" max="9" hasimages=""></show-upload>
        //    </div>
        //    </div>
        //    </div>
        //    <div class="form-group">
        //    <div class="col-sm-9 col-md-offset-3">
        //    <a class="btn btn-primary"
        //ng-click="activity21add.contents.new.push({showContent:false,showImg:false,showContentTitle:'添加文字',showImgTitle:'添加图片'});">新增活动说明</a>
        //    <a class="btn btn-warning"
        //ng-click="console(activity21add.contents.new)">log</a>
        //    </div>
        //    </div>
        //    </div>

        .directive('contentOrImg', function ($state, $rootScope, $timeout) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    ngModel: '=',
                    onlyContent: '=onlyText',
                    iscompleted: '='
                },
                template: '<div class="contentOrImg">' +
                '<style type="text/css">' +
                '.contents {border-top: 1px #ccc solid;padding-top: 10px;margin-bottom: 15px;}' +
                //'.contentOrImg {padding: 0 30px 0 40px;}' +// 这个样式加到全局中最好
                '.contentOrImg .btn {margin-right: 10px;}' +
                '.contentOrImg .panel-body {padding: 0;}' +
                '.contentOrImg .panel-body textarea{border: 0;}' +
                '</style>' +
                '<div class="form-group" ng-repeat="item in list.new track by $index">' +
                '<div class="col-sm-12" ng-class="{contents:onlyContent!=1}">' +
                '<div class="col-sm-12 form-group" >' +
                '<a class="btn btn-info" ng-bind="($index+1)"></a>' +
                '<a class="btn btn-success" ng-if="onlyContent!=1" ng-class="{\'btn-success\':!item.showContent,\'btn-danger\':item.showContent}" ng-click="toggleShow(item,\'showContent\')" ng-bind="item.showContentTitle"></a>' +
                '<a class="btn btn-success" ng-if="onlyContent!=1"  ng-class="{\'btn-success\':!item.showImg,\'btn-danger\':item.showImg}" ng-click="toggleShow(item,\'showImg\')" ng-bind="item.showImgTitle"></a>' +
                '<a class="btn btn-danger" ng-if="onlyContent!=1"  ng-click="del($index);">删除这一条图文</a>' +
                '</div>' +
                '<div class="col-sm-12" ng-if="!!item.showContent">' +
                '<show-textarea ng-model="item.contentData" placeholder="填写你要说的"></show-textarea>' +
                '</div>' +
                '<div class="col-sm-12" ng-if="!!item.showImg">' +
                '<show-upload images="item.images" max="9" hasimages=""></show-upload>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-group">' +
                '<a class="btn btn-primary" ng-click="add();" ng-if="onlyContent!=1" >新增一条</a>' +
                //'<a class="btn btn-warning" ng-click="conslog()">loooooooog</a>' +
                '</div>' +
                '</div>',

                link: function ($scope, $element, $attrs) {
                    //$scope.list = angular.extend({empty_obj_num: 0}, $scope.ngModel || {
                    //        old: [],
                    //        new: []
                    //    });
                    $scope.$watch('iscompleted', function () {
                        $scope.list = angular.extend({empty_obj_num: 0}, $scope.ngModel || {
                                old: [],
                                new: []
                            });
                        if ($scope.iscompleted || angular.isUndefined($scope.iscompleted)) {
                            //old 更新到new 上面  发现不需要new了
                            //console.log($scope.list);
                            angular.forEach($scope.ngModel.old, function (val, key) {
                                var obj = {};
                                obj.images = val.images || [];
                                obj.contentData = angular.extend({
                                    content: '',
                                    category: $scope.ngModel.category,
                                    font_align: '',
                                    font_bold: '',
                                    font_color: '',
                                    font_ita: '',
                                    font_size: '',
                                    font_style: '',
                                    font_italic: ''
                                }, val.contentData || {});
                                $scope.list.new.push(angular.extend(obj, {
                                    //contentData: val,
                                    //images: val.images ||[],
                                    showContent: obj.contentData.content != '',
                                    showImg: obj.images.length > 0 ? true : false,
                                    showContentTitle: obj.contentData.content != '' ? '取消文字' : '添加文字',
                                    showImgTitle: obj.images.length > 0 ? '取消图片' : '添加图片'
                                }));
                            });
                        }
                        //console.log('iscompleted  图文展示 ', $scope.list);
                    });

                    $scope.$watch('list', function () {
                        $scope.setval();
                        $scope.ngModel = $scope.list;
                        //console.log('监控 contents 的 list ', $scope.list);
                    }, true);

                    $scope.init = function () {
                        if ($scope.onlyContent == 1) {
                            $scope.onlyContent = 1;
                            //$scope.add($scope.list.new[0]);
                            //$scope.toggleShow($scope.list.new[0], 'showContent');
                        } else {
                            $scope.onlyContent = 0;
                        }
                    }
                    $scope.add = function (obj) {
                        obj = obj || {};
                        $scope.list.new.push(angular.extend({
                            contentData: {},
                            images: [],
                            showContent: false,
                            showImg: false,
                            showContentTitle: '添加文字',
                            showImgTitle: '添加图片'
                        }, obj))
                        $scope.setval();
                    }
                    //从搜索的列表中选择小区的ID
                    //删除一条 list.new 的记录
                    $scope.del = function (index) {
                        $scope.list.new.splice(index, 1);
                        $scope.setval();
                    }
                    // 切换新增和删除图文
                    $scope.toggleShow = function (item, typeTitle) {
                        if (typeTitle == 'showContent') {
                            item.showContent = !item.showContent;
                            item.showContentTitle = item.showContent ? '取消文字' : '添加文字';
                            if (!item.showContent) {
                                //不需要把所有样式都删除掉
                                item.contentData.content = '';
                            } else if (item.showContent) {
                                item.contentData.content = '';
                                item.contentData.font_align = '';
                                item.contentData.font_bold = '';
                                item.contentData.font_color = '';
                                item.contentData.font_ita = '';
                                item.contentData.font_size = '';
                                item.contentData.font_style = '';
                                item.contentData.font_italic = '';
                            }
                        }
                        if (typeTitle == 'showImg') {
                            item.showImg = !item.showImg;
                            item.showImgTitle = item.showImg ? '取消图片' : '添加图片';
                            if (!item.showImg) {
                                item.images = [];
                            }
                        }
                    }
                    $scope.conslog = function (index) {
                        $scope.setval();
                        console.log($scope.list);
                    }
                    // 赋值
                    $scope.setval = function () {
                        //console.log($scope.list.new);
                        $scope.list.empty_obj_num = 0;
                        if ($scope.list.old.length == 0 && $scope.list.new.length == 0) {// 不能没有一条记录吧
                            $scope.list.empty_obj_num++;
                        }
                        angular.forEach($scope.list.new, function (val, key) {
                            if (!val.showContent && !val.showImg) {//无图无文
                                $scope.list.empty_obj_num++;
                            }
                            if (val.showContent && (!val.contentData.content || val.contentData.content == '')) {
                                $scope.list.empty_obj_num++;
                            }
                            if (val.showImg) {
                                //console.log(val.images);
                                if (!val.images || val.images.length == 0) {
                                    $scope.list.empty_obj_num++;
                                } else {
                                    angular.forEach(val.images, function (v, k) {
                                        if (!v.url || v.url == 'undefined' || typeof v.url == 'undefined') {
                                            $scope.list.empty_obj_num++;
                                        }
                                    })
                                }
                            }
                        });
                    }
                    $scope.init();

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
                    ngModel: '=ngModel'
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
                        if (typeof ($scope.ngModel) == 'undefined') {
                            // console.log('日期必须初始化');
                        } else if (!$scope.init) {// 没有初始化
                            $scope.init = true;
                            // console.log("2 ：初始化 ngModel :$scope.ngModel type " + typeof ($scope.ngModel));
                            $scope.dateTime = $scope.ngModel ? new Date($scope.ngModel) : null;
                            $scope.dt = $scope.strToDateTime($scope.dateTime);
                        } else { //  初始化过了
                            // console.log('初始化过ngModel 进行watch 事件 ');
                            $scope.dateTime = new Date($scope.ngModel) || new Date();
                        }
                    });
                    $scope.open = function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.isopen = true;
                    }
                    // 赋值
                    $scope.changed = function () {
                        if (!$scope.dt)return false;
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
                        //console.log($scope.ngModel);
                        if (typeof ($scope.ngModel) == 'undefined') {
                            //console.log('日期必须初始化');
                        } else if (!$scope.init) {// 没有初始化
                            $scope.init = true;
                            //console.log("2 ：初始化 ngModel :$scope.ngModel type " + typeof ($scope.ngModel));
                            $scope.dateTime = $scope.ngModel ? new Date($scope.ngModel) : null;
                            $scope.dt = $scope.strToDateTime($scope.dateTime);
                            $scope.tp = $scope.strToDateTime($scope.dateTime);
                        } else { //  初始化过了
                            //console.log('初始化过ngModel 进行watch 事件 ');
                            $scope.dateTime = new Date($scope.ngModel) || new Date();
                        }
                    });
                    $scope.open = function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.isopen = true;
                    }
                    // 赋值
                    $scope.changed = function () {
                        if (!$scope.tp || !$scope.dt)return false;
                        $scope.ngModel = ($scope.dt.getFullYear() + '-' + ($scope.dt.getMonth() + 1)
                        + '-' + $scope.dt.getDate() + ' ' + $scope.tp.getHours() + ':' + $scope.tp.getMinutes() + ':00')
                            .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
                    }
                    //$scope.init();
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
