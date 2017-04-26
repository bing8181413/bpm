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
        .directive('richContentOrImg', function ($state, $rootScope, $timeout, $templateCache, $compile) {
            return {
                restrict: 'E',
                replace: true,
                // require: '^?showTextarea',
                scope: {
                    ngModel: '=',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'hjm_content2img.html'),
                link: function ($scope, $element, $attrs) {
                    var init = false;
                    $timeout(function () {
                        $scope.disabled = ($attrs.disabled ? true : false);
                        $scope.disabledRole = $attrs.disabledRole || '';
                        // console.log($element, $attrs, $scope.disabled);
                        var conent_tmp = '<div class="form-group " ng-repeat="item in list">' +
                            '<div class="col-sm-12" ng-class="{contents:onlyContent!=1}">' +
                            '<div class="col-sm-12 form-group" style="margin-bottom: 5px;" ng-class="{\'hide\':' + $scope.disabled + '}">' +
                            '<div class="col-sm-12 form-group" style="margin-bottom: 0;">' +
                            '<a class="btn btn-info btn-rounded" ng-bind="($index+1)"></a>' +
                            '<a class="btn btn-success btn-rounded" ng-show="onlyContent!=1"' +
                            'ng-class="{\'btn-success\':!item.showContent,\'btn-danger\':item.showContent}"' +
                            'ng-click="toggleShow(item,\'showContent\')">' +
                            '<span class="glyphicon"' +
                            'ng-class="{\'glyphicon-plus\':!item.showContent,\'glyphicon-trash\':item.showContent}">' +
                            '</span> {{item.showContentTitle}}' +
                            '</a>' +
                            '<a class="btn btn-success btn-rounded" ng-show="onlyContent!=1"' +
                            'ng-class="{\'btn-success\':!item.showImg,\'btn-danger\':item.showImg}"' +
                            'ng-click = "toggleShow(item,\'showImg\')" > ' +
                            '<span class="glyphicon"' +
                            'ng-class="{\'glyphicon-plus\':!item.showImg,\'glyphicon-trash\':item.showImg}">' +
                            '</span> {{item.showImgTitle}}' +
                            '</a>' +
                            '<a class="btn btn-danger btn-rounded" ng-show="onlyContent!=1" ng-click="del($index);">' +
                            '<span class="glyphicon glyphicon-trash"></span> 删除这一条图文</a>' +
                            '<div class="col-sm-12" ng-show="!!item.showContent" style="margin-top: 5px;">' +
                            '<show-rich-content ng-model="item.content" placeholder="填写你要说的"' +
                            'disabled-role="' + $scope.disabledRole + '"></show-rich-content>' +
                            '</div>' +
                            '<div class="col-sm-12" ng-show="!!item.showImg" style="margin-top: 5px;">' +
                            // '<show-upload images="item.pics" hasimages="" disabled-role="' + $scope.disabledRole + '"></show-upload>' +
                            '<div form-radio name="{{\'pic_padding\'+$index}}" text="图片间距" ng-model="item.pic_padding" default="0"' +
                            ' style="border-top: 1px solid #ccc;" ' +
                            'source="[{text:\'无\',value:0},{text:\'有\',value:20}]" source-api=""></div>' +
                            '<show-upload-token images="item.pics" hasimages="" token="activity" disabled-role="' + $scope.disabledRole + '"></show-upload-token>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        $element.find('.content-and-img').html(conent_tmp);
                        $compile($element.contents())($scope);
                    }, 0);

                    $scope.$watch('ngModel', function (defval) {
                        if (defval && !init) {
                            init = true;
                            // console.log(defval);
                            $scope.list = $scope.list || [];
                            angular.forEach(defval, function (val, key) {
                                var obj = {
                                    pics: val.pics || [],
                                    pic_padding: val.pic_padding || 0,
                                    content_id: val.content_id,
                                    content: $(val.content).text() ? val.content : '',
                                    category: val.category

                                };
                                $scope.list.push(angular.extend(obj, {
                                    showContent: $(obj.content).text() != '',
                                    showImg: obj.pics.length > 0 ? true : false,
                                    showContentTitle: $(obj.content).text() != '' ? '取消文字' : '文字模式',
                                    showImgTitle: obj.pics.length > 0 ? '取消图片' : '图片模式'
                                }));
                                // console.log($scope.list);
                            });
                        }

                    }, true);

                    $scope.$watch('list', function (defval) {
                        if (init) {
                            $scope.ngModel = [];
                            angular.forEach(defval, function (val, key) {
                                var obj = {
                                    pics: val.pics || [],
                                    pic_padding: val.pic_padding || 0,
                                    content_id: val.content_id,
                                    content: $(val.content).text() ? val.content : '',
                                    category: val.category

                                };
                                $scope.ngModel.push(obj);
                            });
                        }
                        // console.log(defval && defval[1] && defval[1].contentData);
                    }, true);

                    $scope.add = function (obj) {
                        init = true;
                        obj = obj || {};
                        $scope.list = $scope.list || [];
                        $scope.list.push(angular.extend({
                            // contentData: {},
                            pics: [],
                            pic_padding: 0,
                            content: '',
                            showContent: false,
                            showImg: false,
                            showContentTitle: '文字模式',
                            showImgTitle: '图片模式'
                        }, obj))
                    }
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
                            item.content = '';
                        }
                        if (typeTitle == 'showContent') {
                            item.showContent = !item.showContent;
                            item.showContentTitle = item.showContent ? '取消文字' : '文字模式';
                            item.content = '';
                            item.category = '';
                            item.pic_padding = 0;
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
                            // '<show-textarea ng-model="item.contentData" placeholder="填写你要说的"' +
                            // 'disabled-role="' + $scope.disabledRole + '"></show-textarea>' +
                            '</div>' +
                            '<div class="col-sm-12" ng-if="!!item.showImg">' +
                            // '<show-upload images="item.pics" hasimages="" disabled-role="' + $scope.disabledRole + '"></show-upload>' +
                            '<show-upload-token images="item.pics" hasimages="" token="activity" disabled-role="' + $scope.disabledRole + '"></show-upload-token>' +
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
                                    showContentTitle: obj.contentData.content != '' ? '取消富文本' : '富文本模式',
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
                            showContentTitle: '富文本模式',
                            showImgTitle: '图片模式'
                        }, obj))
                    }
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
                            item.showContentTitle = '富文本模式';
                            item.contentData.content = null;
                        }
                        if (typeTitle == 'showContent') {
                            item.showContent = !item.showContent;
                            item.showContentTitle = item.showContent ? '取消富文本' : '富文本模式';
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
                        } else { //  初始化过了
                            if (!$scope.init) {
                                $scope.init = true;
                                $scope.dateTime = new Date($scope.ngModel);
                                $scope.dt = $scope.strToDateTime($scope.dateTime);
                                $scope.tp = $scope.strToDateTime($scope.dateTime);
                            }
                            console.log('ngModel', $scope.ngModel);
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
                        // console.log($event);
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
                        console.log('changed', $scope.ngModel);
                    }
                }

            };
        })
        .directive('jsonTable', function ($state, $rootScope, $timeout, $templateCache, $compile, $timeout, widget) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    ngModel: '=',
                    columns: '=',
                    max: '@',
                    config: '=?',
                    callback: '&',
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
                            if (!col.hide) {
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
                        var orderBy = '';
                        angular.forEach(columns, function (col) {
                            if (!col.hide) {
                                var cellContent = cellRender(col, config);
                                rowItem += '<td>' + cellContent + '</td>'
                            }
                        });
                        if (!config.readonly) {
                            rowItem += '<th class="text-center">' +
                                '<a class="btn btn-danger btn-sm btn-bordered" ng-click="del($index)">删除</a></th>';
                        }
                        if (config.orderBy) {
                            orderBy += ' | orderBy:\'' + config.orderBy + '\'';
                        }
                        return '<tbody><tr ' + ' ng-repeat="item in data ' + orderBy + '">' + rowItem + '</tr></tbody>'
                    }

                    function cellRender(col, config) {
                        var cellContent = '';
                        var cellFilter = col.filter ? ('|' + col.filter) : '';
                        var colField = 'item.' + col.field;
                        var typeContent = (col.type == 'number') ? 'type="number"' : '';
                        var requiredContent = (col.required == 'true') ? ' required ' : '';
                        var disabled = (col.disabled) ? ' disabled ' : '';
                        var minContent = (col.min || col.min == 0) ? ('min="' + col.min + '"' ) : '';
                        var maxContent = (col.max || col.max == 0) ? ('max="' + col.max + '"' ) : '';
                        if (!col.readonly) {
                            if (col.textarea) {
                                var rows = col.rows ? ('rows = "+col.rows +"') : ('rows = 5');
                                cellContent = '<textarea class="form-control" ' + rows + minContent + maxContent + disabled + typeContent + requiredContent +
                                    'ng-model="' + colField + cellFilter + '"></textarea>';
                            } else if (col.radioBox) {
                                var date = new Date().getTime() + '{{$index}}';
                                var name = ' name="' + col.field + date + '"';
                                var type = ' type="radio"';
                                // console.log(col.source);
                                col.source_eval = eval('(' + col.source + ')');
                                angular.forEach(col.source_eval, function (val, key) {
                                    var value = '';
                                    if (typeof val.value == 'number') {
                                        value = ' value = "' + parseFloat(val.value) + '"';
                                    } else {
                                        value = ' value = "' + val.value + '"';
                                    }
                                    cellContent += '<label class="radio-inline radio1"><input ' + type + disabled + ' ng-model="' + colField + '"' +
                                        name + value + '><span></span>' + val.text + '</label>';
                                });
                            } else if (col.type == 'search') {
                                var search_param = '$index,item, \'' + col.search_api + '\',\'' + col.search_field + '\',\'' + col.result_field + '\'';
                                cellContent = '<a class="btn btn-success btn-rounded" ' +
                                    'ng-click="search(' + search_param + ')">' + col.name + '</a>';
                            } else if (col.select) {
                                // eval('var source = $rootScope.' + col.source);
                                // console.log(source);
                                var search_param = '<select class="form-control"' + name + ' ng-model="' + colField + '" ' +
                                    'ng-options="item.value as item.text for item in ' + col.source + '">' +
                                    '<option value="">--  请选择  --</option>' +
                                    '</select>';
                                cellContent = search_param;
                            } else if (col.type == 'right_or_error') {
                                //example: '{\'name\': \'正确选项(之一)\', \'field\': \'selected\',type:\'right_or_error\',right:\'1\',error:\'0\'},'
                                col.right = col.right || '';
                                cellContent = '<p class="text-center">' +
                                    '<span ng-show="' + colField + '==' + col.right + ' " class="label label-danger fa fa-check"> </span>' +
                                    // '<span ng-show="' + colField + '==' + col.error + ' " class="label label-primary fa fa-times"> </span>' +
                                    '</p>';
                            } else {
                                cellContent = '<input class="form-control" ' + minContent + maxContent + typeContent + disabled + requiredContent +
                                    'ng-model="' + colField + cellFilter + '"/>';
                            }
                        } else if (config.readonly || col.readonly) {
                            cellContent = '<span ng-bind="' + colField + cellFilter + '" ' + requiredContent + ' ></span>';
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

                            // 为select 补充 一个 非固定的 source
                            //{'name': '设置维度', 'field': 'category_id',required:'true',select:'true',source:'survey_question_category_list2'},
                            angular.forEach($scope.columns, function (val, key) {
                                if (val.select) {
                                    eval('$scope.' + val.source + ' = $rootScope.' + val.source);
                                }
                            })
                            if (!!$attrs.disabled) {
                                $scope.config = angular.extend($scope.config || {}, {readonly: true});
                            }
                            tmpHtml = $ctrl.buildTable($scope.columns, $scope.config);
                            $element.html(tmpHtml);
                            $compile($element.contents())($scope);
                        }
                    }, 0);
                    $scope.search = function (index, item, search_api, search_field, result_field) {
                        eval(' var search_field_val = ' + 'item.' + search_field + ';');
                        // console.log(search_field,search_field_val);
                        if (!search_field_val) {
                            widget.msgToast('缺少查询条件:' + search_field);
                            return false;
                        }
                        var url = search_api.replace(/\(\([^\)]*\)\)/g, search_field_val);
                        widget.ajaxRequest({
                            url: url,
                            method: 'GET',
                            data: {},
                            success: function (json) {
                                $scope.product_id = json.data.product_id;
                                $scope.title = json.data.title;
                                eval('(' + 'item.' + result_field + ' = json.data.' + result_field + ')');
                            },
                            failure: function (err) {
                                widget.msgToast('ID不存在或' + err.message);
                                eval('(' + 'item.' + result_field + ' = "")');
                            }
                        })
                    }

                    $scope.$watch('ngModel', function (defval) {
                        if (defval && angular.isArray(defval)) {
                            $scope.data = defval || [];
                        }
                    }, true);
                    $scope.$watch('data', function (defval) {
                        $scope.ngModel = defval;
                    }, true);

                    $scope.add = function (obj) {
                        $scope.random_date = new Date().getTime(); // radio 等组件 name 使用
                        var obj = obj || {};
                        if ($scope.columns) {
                            angular.forEach($scope.columns, function (val, key) {
                                if (val.default) {
                                    obj[val.field] = val.default;
                                }
                                if (val.select) {
                                    eval('$scope.' + val.source + ' = $rootScope.' + val.source);
                                }
                            })
                        }
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
            }
                ;
        })

})
;
