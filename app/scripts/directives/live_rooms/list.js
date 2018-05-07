define([
  '../../directives/directives',
  '../../cons/simpleCons',
], function(mod, con) {
  // <div product-pattern="patterns"></div>
  mod.directive('liveRoomDownload', function($rootScope, $templateCache, $filter, $compile, widget) {
    return {
      restrict: 'AE',
      replace: false,
      scope: {
        data: '=',
      },
      template: '<span export-run data="item"></span>',
      // template: '<p class="survey-category-download-html"></p>',
      link: function($scope, $element, $attrs) {
        // console.log($scope.data.id);
        $scope.item = {
          command: 'export:livestream',
          condition: {
            room_id: {
              name: '房间ID', type: 'text', options: [], defaultValue: [], default_val: $scope.data.id,
            },
            start_time: {
              name: '开始时间', type: 'datetime', options: [], defaultValue: [],
            },
            end_time: {
              name: '结束时间', type: 'datetime', options: [], defaultValue: [],
            },
          },
          desc: '导出直播数据',
        };
      },
    };
  }).directive('recordRoomDownload', function($rootScope, $templateCache, $filter, $compile, widget) {
    return {
      restrict: 'AE',
      replace: false,
      scope: {
        data: '=',
      },
      template: '<span export-run data="item"></span>',
      // template: '<p class="survey-category-download-html"></p>',
      link: function($scope, $element, $attrs) {
        // console.log($scope.data.id);
        $scope.item = {
          command: 'export:liverecord',
          condition: {
            room_id: {
              name: '房间ID', type: 'text', options: [], defaultValue: [], default_val: $scope.data.id,
            },
            start_time: {
              name: '开始时间', type: 'datetime', options: [], defaultValue: [],
            },
            end_time: {
              name: '结束时间', type: 'datetime', options: [], defaultValue: [],
            },
          },
          desc: '导出点播数据',
        };
      },
    };
  }).directive('liveRoomAdd', function($rootScope, $templateCache, $filter, $compile, widget) {
    return {
      multiElement: true,
      restrict: 'AE',
      replace: false,
      scope: {
        data: '=',
      },
      template: '<a class="btn btn-success btn-rounded btn-sm pull-right" style="margin-top: -5.5px;margin-left: 5px;" ' +
      'ui-sref="main.live_rooms.add" show-role="\'admin,op\'" >新建直播间</a>',
      link: function($scope, $element, $attrs) {
      },
    };
  }).directive('recordRoomsCopy', function($rootScope, $templateCache, $filter, $compile, widget) {
    return {
      multiElement: true,
      restrict: 'AE',
      replace: false,
      scope: {
        data: '=',
      },
      template: '',
      link: function($scope, $element, $attrs) {
        var content = '<a class="btn btn-success btn-rounded btn-sm"' +
            'ui-sref="main.record_rooms.copy({id:' + $scope.data.id + '})" >复制</a>';
        $element.html(content);
        $compile($element.contents())($scope);
      },
    };
  }).directive('toRecordRoomEdit', function($rootScope, $templateCache, $filter, $compile, widget, $state) {
    return {
      multiElement: true,
      restrict: 'AE',
      replace: false,
      scope: {
        data: '=',
        text: '@',
      },
      template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show()" ng-bind="data.text||\'转为点播房间\'"></a>    ',
      link: function($scope, $element, $attrs) {
        $scope.show = function() {
          if ($scope.data.live_status == 3) {
            $state.go('main.record_rooms.update', {id: $scope.data.id});
          } else {
            widget.msgToast('直播流还没有关闭,不能转为点播房间!');
          }
        };
      },
    };
  }).directive('liveRoomEdit', function($rootScope, $templateCache, $filter, $compile, widget) {
    return {
      multiElement: true,
      restrict: 'AE',
      replace: false,
      scope: {
        data: '=',
      },
      template: '<span class="live-room-edit"></span>',
      link: function($scope, $element, $attrs) {
        var content = '';
        if ('admin,op'.indexOf($rootScope.hjm.role) > -1) {
          content = '<a class="btn btn-success btn-rounded btn-sm"' +
              'ui-sref="main.live_rooms.update({id:' + $scope.data.id + '})" show-role="\'admin,op\'" >编辑</a>';
        } else {
          content = '<a class="btn btn-info btn-rounded btn-sm"' +
              'ui-sref="main.live_rooms.update({id:' + $scope.data.id + '})" show-role="\'!admin,op\'" >详情</a>';
        }
        $element.find('.live-room-edit').html(content);
        $compile($element.contents())($scope);
      },
    };
  }).directive('liveRoomPlan', function($rootScope, $templateCache, $filter, $compile, widget) {
    return {
      multiElement: true,
      restrict: 'AE',
      replace: false,
      scope: {
        data: '=',
      },
      template: '<span class="live-room-edit"></span>',
      link: function($scope, $element, $attrs) {
        var content = '';
        if ('admin,op'.indexOf($rootScope.hjm.role) > -1) {
          content = '<a class="btn btn-success btn-rounded btn-sm"' +
              'ui-sref="main.live_rooms.plan({id:' + $scope.data.id + '})" show-role="\'admin,op\'" >设置预告</a>';
        } else {
          content = '<a class="btn btn-info btn-rounded btn-sm"' +
              'ui-sref="main.live_rooms.plan({id:' + $scope.data.id + '})" show-role="\'!admin,op\'" >预告详情</a>';
        }
        $element.html(content);
        $compile($element.contents())($scope);
      },
    };
  }).directive('liveRoomBlock', function($templateCache, $rootScope, $compile, widget, $state, $uibModal, $timeout) {
    return {
      restrict: 'AE',
      replace: false,
      scope: {
        data: '=',
      },
      template: '',
      link: function($scope, $element, $attrs) {
        var status_text = '';
        var click_text = '';
        var class_text = '';
        var status_title = '';
        if ($scope.data.block_status == 1) {  //1 未被禁言
          status_title = '禁止评论';
          status_text = 'ng-bind="\'禁止评论\'"';
          class_text = 'ng-class={\"btn-warning\":true} ';
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
        var supScope = $scope;
        $scope.change = function(block_status) {
          var modalInstance = $uibModal.open({
            template: function() {
              return $templateCache.get('app/' + con.biz_path + 'live_rooms/block.html');
            },
            controller: function($scope, $uibModalInstance) {
              $scope.param = {};
              $timeout(function() {
                if (block_status == 2) {
                  $scope.block_status = 2;
                  $scope.param.minute = 0;
                } else {
                  $scope.block_status = 1;
                }
              }, 0);
              $scope.$watch('param.minute', function(val) {
                $scope.param.minute = Number($scope.param.minute);
              });
              $scope.submit = function() {
                if (Number($scope.param.minute) < 0) {
                  widget.msgToast('分钟数必须大于0');
                  return false;
                }
                widget.ajaxRequest({
                  url: con.live_domain + '/live/rooms/' + supScope.data.id + '/block',
                  method: 'PUT',
                  scope: $scope,
                  data: $scope.param,
                  success: function(json) {
                    widget.msgToast('发送成功,请刷新查看');
                    supScope.$parent.searchAction();
                    $scope.cancel();
                  },
                });
              };
              $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
              };
            },
            size: '',
          });
        };
      },
    };
  }).directive('liveRoomPlanAdd', function($templateCache, $rootScope, $compile, widget, $state, $uibModal, $timeout) {
    return {
      restrict: 'AE',
      replace: false,
      scope: {
        data: '=',
      },
      template: ' <a class="btn btn-rounded btn-sm {{class_btn}}" ng-click="plan()" ng-bind="text"></a>',
      link: function($scope, $element, $attrs) {
        var supScope = $scope;
        $scope.already_add = $scope.data.survey && $scope.data.survey['id'] ? true : false;
        $scope.text = $scope.already_add ? '删除测评' : '添加测评';
        $scope.class_btn = $scope.already_add ? 'btn-danger' : 'btn-primary';
        $scope.plan = function(block_status) {
          var modalInstance = $uibModal.open({
            template: function() {
              return $templateCache.get('app/' + con.biz_path + 'live_rooms/add_plan.html');
            },
            controller: function($scope, $uibModalInstance) {
              $scope.already_add = supScope.already_add;
              $scope.param = {room_id: supScope.data.id};
              $scope.submit = function() {
                if (!$scope.already_add) {
                  widget.ajaxRequest({
                    url: con.live_domain + '/live/rooms/survey',
                    method: 'POST',
                    scope: $scope,
                    data: $scope.param,
                    success: function(json) {
                      widget.msgToast('添加成功,请刷新列表查看');
                      supScope.$parent.searchAction();
                      $scope.cancel();
                    },
                  });
                } else {
                  widget.ajaxRequest({
                    url: con.live_domain + '/live/rooms/survey/' + supScope.data.survey['id'],
                    method: 'DELETE',
                    scope: $scope,
                    data: {},
                    success: function(json) {
                      widget.msgToast('删除成功,请刷新列表查看');
                      supScope.$parent.searchAction();
                      $scope.cancel();
                    },
                  });
                }
              };
              $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
              };
            },
            size: '',
          });
        };
      },
    };
  }).directive('changeLiveRoomStatus', function($templateCache, $rootScope, $compile, widget, $state) {
    return {
      restrict: 'AE',
      replace: false,
      scope: {
        data: '=',
      },
      template: '<span class="change-live-room-status"></span>',
      link: function($scope, $element, $attrs) {
        var status_text = '';
        var click_text = '';
        var class_text = '';
        var status_title = '';
        if ($scope.data.status == 1) {
          status_title = '关闭';
          status_text = 'ng-bind="\'关闭\'"';
          class_text = 'ng-class={\"btn-danger\":true} ';
          click_text = 'ng-click="change(2);"';
          $scope.show_text = true;
        } else if ($scope.data.status == 2) {
          status_title = '开启';
          status_text = 'ng-bind="\'开启\'"';
          class_text = 'ng-class={\"btn-success\":true} ';
          click_text = 'ng-click="change(1,' + $scope.data.status + ');"';
          $scope.show_text = true;
        }
        var content = ' <a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + ' ng-show="show_text"></a>';
        $element.html(content);
        $compile($element.contents())($scope);

        $scope.change = function(status, live_status) {
          if (confirm('确认修改为' + status_title + '状态?')) {
            widget.ajaxRequest({
              // url: con.live_domain + '/live/rooms/' + $scope.data.id,
              url: con.live_domain + '/live/rooms/' + $scope.data.id + '/status',
              method: 'put',
              scope: $scope,
              data: {status: status},
              success: function(json) {
                widget.msgToast('修改成功,请刷新查看');
                $scope.$parent.$parent.searchAction();
              },
            });
          }

        };
      },
    };
  }).directive('changeLiveRoomLiveStatus', function($templateCache, $rootScope, $compile, widget, $state) {
    return {
      restrict: 'AE',
      replace: false,
      scope: {
        data: '=',
      },
      template: '<p class="change-live-room-live-status"></p>',
      link: function($scope, $element, $attrs) {
        var status_text = '';
        var click_text = '';
        var class_text = '';
        var status_title = '';
        var status_disabled = '';
        if ($scope.data.live_status == 2) {
          status_title = '关闭直播流';
          status_text = 'ng-bind="\'关闭直播流\'"';
          class_text = 'ng-class={\"btn-warning\":true} ';
          click_text = 'ng-click="change(3);"';
          $scope.show_text = true;
        } else if ($scope.data.live_status == 1 || $scope.data.live_status == 3) {
          status_title = '开启直播流';
          status_text = 'ng-bind="\'开启直播流\'"';
          class_text = 'ng-class={\"btn-success\":true} ';
          click_text = 'ng-click="change(2);"';
          $scope.show_text = true;
          if ($scope.data.status == 2) {//  房间关闭 也不能开启直播流
            // status_disabled = 'ng-disabled="true"';
          }
        }
        var content = ' <a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + status_disabled + ' ng-show="show_text"></a>';
        $element.html(content);
        $compile($element.contents())($scope);

        $scope.change = function(status) {
          if (confirm('确认修改为' + status_title + '状态?')) {
            widget.ajaxRequest({
              // url: con.live_domain + '/live/rooms/' + $scope.data.id,
              url: con.live_domain + '/live/rooms/' + $scope.data.id + '/status',
              method: 'put',
              scope: $scope,
              data: {live_status: status},
              success: function(json) {
                widget.msgToast('修改成功,请刷新查看');
                $scope.$parent.$parent.searchAction();
              },
            });
          }
        };
      },
    };
  }).directive('livePoint', function($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
    return {
      restrict: 'EA',
      // transclude: true,
      // require: "ngModel",
      template: $templateCache.get('app/' + con.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
      scope: {
        ngModel: '=ngModel',
        ngModelText: '@ngModel',
        text: '@',
        name: '@',
        required: '=',
        max: '@',
        callBack: '&',
        ngDisabled: '=',
      },
      link: function($scope, $element, $attrs) {
        var $ctrl = null;
        // $ctrl.$validate();

        // console.log(0, $ctrl);
        $scope.tmp_url = 'app/' + con.biz_path + 'live_rooms/point.html';
        $timeout(function() {
          var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
              (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
          var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
          var required = $scope.required ? (' required') : '';
          var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
          var max = $scope.max ? (' max="' + $scope.max + '"') : '';
          var content = '';
          if (!$scope.text) {
            content = '<div class="col-sm-12 ">';
          } else {
            content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                '<div class="col-sm-8">';
          }
          content += '<dnd-array ng-model="ngModel" ' + name +
              required + max + disabledRole + '><div tmp-url="tmp_url" >这是一个可替换的内容</div></dnd-array>';
          // console.log(content);
          // content += '<input class="hide" ng-model="ngModel"' + name + required + '>' ;
          content += '</div>';
          // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
          $element.find('.form_element').html(content);
          $compile($element.contents())($scope);
          if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
            $ctrl = $scope.$parent.FormBody[$scope.ngModelText];
            // $ctrl.$validators.hasPic = function (modelValue, viewValue) {
            //     return hasPic(modelValue, viewValue);
            // }
            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
          }
        }, 0);
        var hasPic = function(modelValue, viewValue) {
          var hasPicFlag = true;
          var value = modelValue || viewValue;
          angular.forEach(value, function(val) {
            if (!val.pics || val.pics.length == 0) {
              hasPicFlag = false;
            } else if (val && val.pics) {
              angular.forEach(val.pics, function(v, k) {
                if (!v || !v.pic_url) {
                  hasPicFlag = false;
                }
              });
            }
          });
          // console.log(hasPicFlag, '验证过程 == 的值是:', modelValue);
          return hasPicFlag;
        };
        $scope.$watch('ngModel', function(val) {
          // if ($ctrl) {
          //     $ctrl.$setValidity('hasPic', hasPic(val));
          // }
          if (!val || val && val.length == 0) {
            $scope.ngModel = [];
          } else {
            angular.forEach(val, function(v, k) {
              v.order_by = (k + 1);
            });
          }
        }, true);

      },
    };
  })
  //  房间问题列表
      .directive('roomQuestion', function($templateCache, $rootScope, $compile, widget, $state, $uibModal, $timeout) {
        return {
          restrict: 'AE',
          replace: false,
          scope: {
            data: '=',
          },
          template: '<a class="btn btn-rounded btn-sm btn-primary" ng-click="open()">查看</a> ',
          link: function($scope, $element, $attrs) {
            var supScope = $scope;
            $scope.open = function() {
              var modalInstance = $uibModal.open({
                template: function() {
                  return $templateCache.get('app/' + con.live_path + 'questions/questions.html');
                },
                controller: 'questions.questionsController',
                resolve: {
                  resolve_data: function() {
                    return {
                      is_modal: true,
                      room_id: supScope.data && supScope.data.id || '',
                    };
                  },
                },
                size: 'lg',
              });
            };
          },
        };
      });
  // .directive('even',function(){
  //     return {
  //         restrict:"A",
  //         require:"ngModel",
  //         link:function(scope,ele,attrs,ngModelController){
  //             console.log(ngModelController.$parsers);
  //             ngModelController.$parsers.push(function(viewValue){
  //                 if(viewValue % 2 === 0){
  //                     console.log(11111);
  //                     ngModelController.$setValidity('even',false);
  //                 }else{
  //                     console.log(222222);
  //                     ngModelController.$setValidity('even',false);
  //                 }
  //                 return viewValue;
  //             });
  //         }
  //     }
  // })
})
;
