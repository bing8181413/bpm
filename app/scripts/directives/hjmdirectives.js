define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {

    mod

    // 选择图文说明
    //  <content_or_img ng-model="list"></content_or_img>
    //list = {
    //    old: [],
    //    new: [{}]
    //},

        .directive('contentOrImg', function ($state, $rootScope, $timeout, $templateCache, $compile) {
            return {
                restrict: 'E',
                replace: true,
                // require: '^?showTextarea',
                scope: {
                    ngModel: '=',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'hjm_content2img.html'),
                link: function ($scope, $element, $attrs) {
                    $timeout(function () {
                        $scope.disabled = ($attrs.disabled ? true : false);
                        $scope.disabledRole = $attrs.disabledRole || '';
                        // console.log($element, $attrs, $scope.disabled);

                        var conent_tmp = '<div class="form-group " ng-repeat="item in list">' +
                            '<div class="col-sm-12" ng-class="{contents:onlyContent!=1}">' +
                            '<div class="col-sm-12 form-group" ng-class="{\'hide\':' + $scope.disabled + '}">' +
                            '<a class="btn btn-info btn-rounded" ng-bind="($index+1)"></a>' +
                            '<a class="btn btn-success btn-rounded" ng-if="onlyContent!=1"' +
                            'ng-class="{\'btn-success\':!item.showContent,\'btn-danger\':item.showContent}"' +
                            'ng-click="toggleShow(item,\'showContent\')">' +
                            '<span class="glyphicon"' +
                            'ng-class="{\'glyphicon-plus\':!item.showContent,\'glyphicon-trash\':item.showContent}">' +
                            '</span> {{item.showContentTitle}}' +
                            '</a>' +
                            '<a class="btn btn-success btn-rounded" ng-if="onlyContent!=1"' +
                            'ng-class="{\'btn-success\':!item.showImg,\'btn-danger\':item.showImg}"' +
                            'ng-click = "toggleShow(item,\'showImg\')" > ' +
                            '<span class="glyphicon"' +
                            'ng-class="{\'glyphicon-plus\':!item.showImg,\'glyphicon-trash\':item.showImg}">' +
                            '</span> {{item.showImgTitle}}' +
                            '</a>' +
                            '<a class="btn btn-danger btn-rounded" ng-if="onlyContent!=1" ng-click="del($index);">' +
                            '<span class="glyphicon glyphicon-trash"></span> 删除这一条图文</a>' +
                            '</div>' +
                            '<div class="col-sm-12" ng-if="!!item.showContent">' +
                            '<show-textarea ng-model="item.contentData" placeholder="填写你要说的"' +
                            'disabled-role="' + $scope.disabledRole + '"></show-textarea>' +
                            '</div>' +
                            '<div class="col-sm-12" ng-if="!!item.showImg">' +
                            '<show-upload images="item.pics" hasimages="" disabled-role="' + $scope.disabledRole + '"></show-upload>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        $element.find('.content-and-img').html(conent_tmp);
                        $compile($element.contents())($scope);
                    }, 0);
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
                                    showContentTitle: obj.contentData.content != '' ? '取消文字' : '文字模式',
                                    showImgTitle: obj.pics.length > 0 ? '取消图片' : '图片模式'
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
                            showContentTitle: '文字模式',
                            showImgTitle: '图片模式'
                        }, obj))
                    }
                    //从搜索的列表中选择小区的ID
                    //删除一条 list.new 的记录
                    $scope.del = function (index) {
                        $scope.list.splice(index, 1);
                    }
                    // 切换新增和删除图文
                    $scope.toggleShow = function (item, typeTitle) {
                        // 这一组判断是只准图片和文字选其一 去掉可以选择多种
                        if (!item.showContent && item.showImg && typeTitle == 'showContent') {
                            if (!window.confirm('图片和文字只能选其一,确定切换吗')) {
                                return false;
                            }
                            item.showImg = false;
                            item.showImgTitle = '图片模式';
                            item.pics = [];
                        } else if (!item.showImg && item.showContent && typeTitle == 'showImg') {
                            if (!window.confirm('图片和文字只能选其一,确定切换吗')) {
                                return false;
                            }
                            item.showContent = false;
                            item.showContentTitle = '文字模式';
                            item.contentData.content = null;
                        }
                        if (typeTitle == 'showContent') {
                            item.showContent = !item.showContent;
                            item.showContentTitle = item.showContent ? '取消文字' : '文字模式';
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
                            item.showImg = !item.showImg;
                            item.showImgTitle = item.showImg ? '取消图片' : '图片模式';
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

        .directive('hjmDate', function ($parse, $templateCache, $filter, $timeout, $compile) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    ngModel: '=ngModel',
                    ngModelTxt: '@ngModel',
                    disabledRole: '@',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'hjm_date.html'),
                link: function ($scope, $element, $attrs) {
                    $timeout(function () {
                        $scope.disabled = ($attrs.disabled ? true : false);
                        // console.log($scope, $attrs, $scope.disabled);
                    }, 0);
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
                            // $scope.ngModel = '';
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

        .directive('hjmDateTime', function ($parse, $templateCache, $timeout, $compile) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    ngModel: '=ngModel',
                    ngModelTxt: '@ngModel',
                    showtip: '=showtip',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'hjm_date_time.html'),
                link: function ($scope, $element, $attrs) {
                    $timeout(function () {
                        $scope.disabled = ($attrs.disabled ? true : false);
                        $scope.timepicker = '<timepicker class="" ng-model="tp" show-meridian="false" show-spinners="false"' +
                            'mousewheel="true" readonly-input="' + $scope.disabled + '"' +
                            'arrowkeys="true" style="margin-left: 3px;"' +
                            'ng-change="changed();">' +
                            '</timepicker>';
                        $element.find('.appendTimepicker').append($scope.timepicker);
                        $compile($element.contents())($scope);
                        // console.log($scope, $attrs, $scope.disabled);
                    }, 0);
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
                            // $scope.ngModel = '';
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
        .directive('jsonTable', function ($state, $rootScope, $timeout, $templateCache, $compile, $timeout) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    ngModel: '=',
                    columns: '=',
                    max: '@',
                    config: '=?',
                },
                controller: ['$scope', function ($scope) {
                    this.buildTable = function (columns, config) {
                        config = config || {};
                        var header = buildHeader(columns, config);
                        var rowDef = buildRows(columns, config);
                        return '<table class="table table-bordered table-striped">' + header + rowDef + '</table>';
                    }
                    function buildHeader(columns, config) {
                        var headerContent = '';
                        angular.forEach(columns, function (col) {
                            if (!col.disabled) {
                                headerContent += '<th class="text-center">' + col.name + '</th>';
                            }
                        });
                        if (!config.readonly) {
                            headerContent += '<th class="text-center">' +
                                '<a class="btn btn-primary btn-sm btn-bordered" ng-click="add()">添加</a>' +
                                // '<a class="btn btn-primary btn-sm btn-bordered" ng-click="conslog()">log</a>' +
                                '</th>';
                        }

                        return '<thead><tr>' + headerContent + '</tr></thead>';
                    }

                    function buildRows(columns, config) {
                        var rowItem = '';
                        angular.forEach(columns, function (col) {
                            if (!col.disabled) {
                                var cellContent = cellRender(col, config);
                                rowItem += '<td>' + cellContent + '</td>'
                            }
                        });
                        if (!config.readonly) {
                            rowItem += '<th class="text-center">' +
                                '<a class="btn btn-danger btn-sm btn-bordered" ng-click="del($index)">删除</a></th>';
                        }
                        return '<tbody><tr ' + ' ng-repeat="item in data">' + rowItem + '</tr></tbody>'
                    }

                    function cellRender(col, config) {
                        var cellContent = '';
                        var cellFilter = col.filter ? ('|' + col.filter) : '';
                        var colField = 'item.' + col.field;
                        var typeContent = (col.type == 'number') ? 'type="number"' : '';
                        var minContent = (col.min || col.min == 0) ? ('min="' + col.min + '"' ) : '';
                        var maxContent = (col.max || col.max == 0) ? ('max="' + col.max + '"' ) : '';
                        if (!col.disabled) {
                            cellContent = '<input class="form-control" ' + minContent + maxContent + typeContent +
                                'ng-model="' + colField + cellFilter + '"/>';
                        }
                        if (config.readonly || col.readonly) {
                            cellContent = '<span ng-bind="' + colField + cellFilter + '"><span/>';
                        }
                        return cellContent;
                    }
                }],
                template: '',
                link: function ($scope, $element, $attrs, $ctrl) {
                    var tmpHtml = '';
                    $timeout(function () {
                        if (angular.isArray($scope.columns)) {
                            // console.log($attrs.disabled);
                            if (!!$attrs.disabled) {
                                $scope.config = angular.extend($scope.config || {}, {readonly: true});
                            }
                            // console.log($scope.config);
                            tmpHtml = $ctrl.buildTable($scope.columns, $scope.config);
                            $element.html(tmpHtml);
                            $compile($element.contents())($scope);
                        }
                    }, 0);


                    $scope.$watch('ngModel', function (defval) {
                        // console.log(defval);
                        if (defval && angular.isArray(defval)) {
                            $scope.data = defval || [];
                        }
                    }, true);
                    $scope.$watch('data', function (defval) {
                        // console.log(defval);
                        $scope.ngModel = defval;
                    }, true);

                    $scope.add = function (obj) {
                        var obj = obj || {};
                        $scope.data = $scope.data || [];
                        $scope.data.push(obj);
                    }
                    $scope.del = function (index) {
                        $scope.data.splice(index, 1);
                    }
                    $scope.conslog = function () {
                        console.log($scope.data);
                    }

                }
            };
        })

})
;
