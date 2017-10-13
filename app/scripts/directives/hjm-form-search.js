define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {


    // <div form-search text="查询添加直播间"
    // ajax-config="{method:'get',url:$root.common.domain+'/mobile/live/rooms/'+id}"
    // ng-model="id" callback="add_room(json)"></div>
    // videogroups/update.html
    mod
        .directive('formSearch', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    btnText: '@',
                    ajaxConfig: '=',
                    returnData: '=?',
                    placeholder: '@',
                    verify: '&',
                    callback: '&',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    // console.log('formElement', $scope, $attrs);
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var placeholder = $scope.placeholder ? (' placeholder="' + $scope.placeholder + '"') : '';
                    $timeout(function () {
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + '&nbsp;&nbsp;</label>' +
                            '<div class="col-sm-4">' +
                            '<div class="input-group" >' +
                            '<input type="text" class="form-control" placeholder="" ng-model="ngModel">' +
                            '<span class="input-group-addon btn" ng-click="search()">{{btnText||\'查询并添加\'}}</span>' +
                            '</div>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                    }, 0);
                    $scope.search = function () {
                        $scope.ajaxConfig = angular.extend($scope.ajaxConfig, {
                            success: function (json) {
                                $scope.returnData = json.data;
                                $scope.callback({json: json});
                            },
                            failure: function (err) {
                                $scope.callback({json: err});
                            }
                        });
                        // 数据校验
                        var rtn_verify = $scope.verify();   // return true  or  error message
                        if ('boolean' == typeof rtn_verify && rtn_verify == true) {
                            widget.ajaxRequest($scope.ajaxConfig);
                        } else {
                            if ('boolean' == typeof rtn_verify && rtn_verify == false) {
                            } else {
                                widget.msgToast(rtn_verify);
                            }
                        }

                    }
                }
            }
        })

})
