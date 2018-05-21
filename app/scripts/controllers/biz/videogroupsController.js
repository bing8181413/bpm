// This is a file copied by your subgenerator
define([
  './../controllers'
  , '../../cons/simpleCons',
], function(mod, con) {
  mod.controller('videogroups.updateController', updateController);

  updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', 'comfunc', '$filter', '$timeout'];

  function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $timeout) {
    $scope.param = {skus: [], products: []};
    $scope._tmp = {skus: [], products: []};
    $scope.chapters = [];
    $scope.chapters_length = 0;
    if ($stateParams.id) {
      widget.ajaxRequest({
        url: con.live_domain + '/live/videogroups/' + $stateParams.id,
        method: 'GET',
        scope: $scope,
        success: function(json) {
          $scope.param = json.data;
          // 记录变化使用的临时变量
          $scope._tmp = {
            skus: angular.copy(json.data.skus),
            products: angular.copy(json.data.products),
            chapters_online_time: {},
          };
          $scope.getDataFlag = true;

          // 章节和视频排序 初始化
          angular.forEach($scope.param.chapters, function(val, key) {
            $scope.chapters_length++;
            var tmp_val = angular.copy(val);
            delete tmp_val.videos;
            tmp_val.chapters_index = $scope.chapters_length;
            tmp_val.type = 1;
            $scope.chapters.push(tmp_val);
            angular.forEach(val.videos, function(v, k) {
              v.type = 2;
              $scope.chapters.push(v);
              $scope._tmp.chapters_online_time[v.id] = {online_status: v.online_status, online_time: v.online_time};
            });
          });
        },
      });
    }
    // 与get的原始数据 同步 房间生效时间
    $scope.sync_chapters_online_time = function() {
      angular.forEach($scope.chapters, function(val, key) {
        if (val.type == 2) {
          var current_date_time = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
          var need_change_date_time = new Date(val.online_time).getTime() < new Date().getTime();

          if (val.id) { //  是初始化的老数据 且是房间
            var tmp_room = $scope._tmp.chapters_online_time[val.id];
            if (tmp_room.online_status == 1 && val.online_status == 1) { //    1=>1  还原
              val.online_time = tmp_room.online_time;
            } else if (tmp_room.online_status == 2 && val.online_status == 2 && need_change_date_time//  2=>2  不还原
                || tmp_room.online_status == 2 && val.online_status == 1 // 2=>1  直接 重置到当前时间
                || tmp_room.online_status == 1 && val.online_status == 2 && need_change_date_time) { // 1==2  不还原
              val.online_time = current_date_time;
            }
          } else if (!val.id) {// 新增视频房间
            if (val.online_status == 1  //  1 直接重置为当前时间
                || val.online_status == 2 && need_change_date_time) { // 2 随便改 但必须大于今天
              val.online_time = current_date_time;
            }
          }
        }
      });

    };
    $scope.$watch('chapters', function(chapters_val) {
      if (chapters_val && chapters_val.length > 0 && chapters_val[0].type != 1) {
        // 第一行必须是 章节类型 type : 1
        $scope.chapters.unshift({type: 1, title: ''});
      } else {
        var chapters_index = 0;
        var video_index = 0;
        $scope.param.chapters = [];
        angular.forEach(chapters_val, function(val, key) {
          if (val.type == 1) {//  章节
            chapters_index++;
            val.chapters_index = chapters_index;
            val.order_by = chapters_index;
            var tmp_val = angular.copy(val);
            tmp_val.videos = [];
            delete tmp_val.chapters_index;
            delete tmp_val.type;
            $scope.param.chapters.push(tmp_val);
          } else {// 视频
            val.chapters_index = chapters_index;
            video_index++;
            val.order_by = video_index;
            var tmp_val = angular.copy(val);
            if ($scope.param.chapters[(chapters_index - 1)].id != tmp_val.chapter_id) {
              delete tmp_val.id;
            }
            delete tmp_val.chapters_index;
            delete tmp_val.type;
            $scope.param.chapters[(chapters_index - 1)].videos.push(tmp_val);
          }
        });
        // console.log($scope.param.chapters);
        $scope.sync_chapters_online_time();
      }
    }, true);

    $scope.verify_room = function() {
      var has_room = false;
      angular.forEach($scope.chapters, function(val, key) {
        if (val.room_id == $scope.room_id) {
          has_room = true;
        }
      });
      if ($scope.room_id && !has_room) {
        return true;
      } else if (has_room) {
        return '房间ID已存在!';
      } else {
        return '请输入房间ID!';
      }
    };
    $scope.add_room = function(json) {
      if (json.code == 0) {
        $scope.chapters.push({
          type: 2,
          room_id: json.data.id,
          room: {
            title: json.data.title,
            status: json.data.status,
            plans: json.data.plans,
          },
        });
        $scope.room_id = '';
      } else {
        widget.msgToast('没有相关的房间ID');
        return false;
      }
    };
    $scope.verify_product = function(product_id, index) {
      if (product_id) {
        return true;
      } else {
        return '请输入活动ID!!';
      }
    };
    $scope.add_product = function(json, index) {
      if (json.code == 0) {
        $scope.param.products[index]._tmp_options = [];
        angular.forEach(json.data, function(val, key) {
          $scope.param.products[index]._tmp_options.push({
            option: {
              option_type: val.option_type,
              option_status: val.option_status,
              option_name: val.option_name,
            },
            option_id: val.option_id,
            product_id: val.product_id,
            text: val.option_name + '(' + $filter('product_option_status')(val.option_status) + ')',
            value: val.option_id,
          });
        });
        $scope.param.products[index]._tmp_options_selected = [];
        angular.forEach($scope.param.products[index].options, function(val, key) {
          if (val.option_id) {
            $scope.param.products[index]._tmp_options_selected.push(val.option_id);
            angular.forEach($scope.param.products[index]._tmp_options, function(_tmp_options_val, _tmp_options_key) {
              if (val.option_id == _tmp_options_val.option_id) {
                _tmp_options_val.id = val.id;
              }
            });
          }
        });
        // console.log($scope.param.products[index]._tmp_options_selected);
        // console.log(1);
      }
    };
    $scope.update_option = function() {
      if ($scope.param.products) {
        angular.forEach($scope.param.products, function(product, product_key) {
          if (product._tmp_options && product._tmp_options.length > 0) {
            product.options = [];
            angular.forEach(product._tmp_options, function(_tmp_option_val, _tmp_option_key) {
              angular.forEach(product._tmp_options_selected, function(_tmp_options_selected_val, _tmp_options_selected_key) {
                if (_tmp_option_val.option_id == _tmp_options_selected_val) {
                  var has_option = false;
                  angular.forEach(product.options, function(option_val, option_key) {
                    if (option_val.option_id == _tmp_options_selected_val) {
                      has_option = true;
                    }
                  });
                  if (!has_option) {
                    product.options.push(_tmp_option_val);
                  }
                }
              });
            });
          }
        });
      }
    };
    $scope.$watch('param.product_id', function(product_id) {
      if (product_id && product_id != 0) {
        $scope.param.product_url = $rootScope.common.wx_domain + '/product/detail/product_id/' + product_id + '?utm_source=appbuy';
        $scope.param.miniapp_url = '/pages/product_detail?product_id=' + product_id + '?utm_source=appbuy';
      } else {
        $scope.param.product_url = '';
        $scope.param.miniapp_url = '';
      }
    });
    $scope.reset_open_time = function(type) {
      console.log(type);
      $scope.param.open_time = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
      $scope.param.onoff = '1';
    };

    // products 有变化 自动更新授权的时间
    $scope.$watch('param.products', function(products_val, products_old_val) {
      if (products_val) {
        $scope.update_option();
        if (products_old_val && (products_val.length != $scope._tmp.products.length)) {
          $scope.reset_open_time('products1');
        } else {
          angular.forEach(products_val, function(val, key) {
            if (!$scope._tmp.products[key] || !$scope._tmp.products[key].options) {
              $scope.reset_open_time('products2');
            } else if ($scope._tmp.products[key] && $scope._tmp.products[key].options &&
                JSON.stringify(val.options) != JSON.stringify($scope._tmp.products[key].options)) {
              $scope.reset_open_time('products3');
            }
          });
        }
      } else {
        // console.log('还没有products');
      }
    }, true);

    // skus 有变化 自动更新授权的时间
    $scope.$watch('param.skus', function(sku_val, sku_old_val) {
      if (sku_val) {
        if (sku_old_val && (sku_val.length != $scope._tmp.skus.length)) {
          $scope.reset_open_time('sku1');
        } else {
          angular.forEach(sku_val, function(val, key) {
            if (!$scope._tmp.skus[key] || !$scope._tmp.skus[key].sku) {
              $scope.reset_open_time('sku2');
            } else if ($scope._tmp.skus[key] && $scope._tmp.skus[key].sku && val.sku != $scope._tmp.skus[key].sku) {
              $scope.reset_open_time('sku3');
            }
          });
        }
      } else {
        // console.log('还没有skus');
      }
    }, true);

    $scope.submit = function(status) {
      // $scope.param.video_count = $scope.param.rooms && $scope.param.rooms.length || 0;
      // if ($scope.param.video_count == 0) {
      //     widget.msgToast('视频数量不能为0!');
      //     return false;
      // }
      if (!$scope.param.open_time || $scope.param.open_time == '') {
        $scope.reset_open_time('submit');
      }
      if ($scope.param.pay_type == 1) {
        $scope.param.skus = [];
        $scope.param.products = [];
        $scope.param.product_id = '';
        $scope.param.product_url = '';
        $scope.param.miniapp_url = '';
        $scope.param.onoff = 2;
      } else if ($scope.param.pay_type == 2) {
        if ($scope.param.skus.length == 0 && $scope.param.products.length == 0) {
          widget.msgToast('收费模式下,关联SKU和关联活动类目不能同时为空!');
          return false;
        } else if ($scope.param.products.length > 0) {
          var err_option = false;
          angular.forEach($scope.param.products, function(val, key) {
            if (val.options.length == 0) {
              err_option = true;
            }
          });
          if (err_option) {
            widget.msgToast('收费模式下,关联活动类目不能为空!');
            return false;
          }
        }

      }
      widget.ajaxRequest({
        url: con.live_domain + '/live/videogroups' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
        method: $stateParams.id ? 'PUT' : 'POST',
        scope: $scope,
        data: $scope.param,
        success: function(json) {
          widget.msgToast('发布成功！');
          $state.go(con.state.main + '.videogroups.list');
        },
      });
    };
  };
});
