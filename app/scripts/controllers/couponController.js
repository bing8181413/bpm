// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('couponController', couponController)
        .controller('couponAddController', couponAddController)

    couponController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$stateParams', '$state'];
    couponAddController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$stateParams', '$state'];
    function couponController($scope, $http, $rootScope, $modal, $stateParams) {
        $scope.list_param = {page: 1, count: 20, coupon_status: 3};
        $scope.list_param.keyword = $scope.search;
        var list_url = simpleCons.domain + '/manage/market/coupon/list';
        $scope.getapi = function (page, coupon_status) {
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $scope.list_param.coupon_status = coupon_status ? coupon_status : $scope.list_param.coupon_status;
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.coupon_list = json.data.list;
                        $scope.totalItems = json.data.total;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = page ? page : $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    } else {
                        alert(json.msg);
                    }
                }).error(function (err, status, sss) {
                //$scope.getapi();
            });
        }
        $scope.getapi(1);
        $rootScope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }

        $scope.user_list = function (couidpon_id, index) {
            var modalInstance = $modal.open({
                templateUrl: 'user_list.html',
                controller: function ($scope, $modalInstance) {
                    var sup_index = index;
                    $scope.couidpon_id = couidpon_id;
                    var couponinfo_url = simpleCons.domain + '/manage/market/coupon/info';
                    $http.post(couponinfo_url, {
                        id: $scope.couidpon_id
                    })
                        .success(function (json) {
                            if (json.code == 0) {
                                $scope.user_list = json.data.list;
                            } else {
                                alert('失败: ' + json.msg);
                            }
                        });
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };


                },
                size: 'lg'
            });
        }
    };

    function couponAddController($scope, $http, $rootScope, $modal, $stateParams, $state) {
// 提交的参数
        $scope.openstart_a = false;
        $scope.openend_a = false;
        $scope.couponadd = {
            start_time: new Date(),
            expire_time: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)//  第二个月 加上30天
        };
        $scope.couponadd_param = {
            title: '',
            price: 3,
            scope_type: 3,
            mobile_list: '',
            start_time: '',
            expire_time: '',
            is_nofity: 0,
            notify_content: '',
            category: 0,
            sku: 0,
            commodity_type: 0,

        };
        $scope.changed = function () {
            $scope.couponadd_param.start_time = ($scope.couponadd.start_time.getFullYear() + '-' + ($scope.couponadd.start_time.getMonth() + 1)
            + '-' + $scope.couponadd.start_time.getDate()).replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
            $scope.couponadd_param.expire_time = ($scope.couponadd.expire_time.getFullYear() + '-' + ($scope.couponadd.expire_time.getMonth() + 1)
            + '-' + $scope.couponadd.expire_time.getDate()).replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
            //console.log($scope.activity20add_param.time + '==========' +$scope.activity20add_param.end_time );
        };
        $scope.changed();
        $scope.openstart = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openstart_a = true;
        };
        $scope.openend = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openend_a = true;
        };
        $scope.save = function () {
            if (!$scope.couponadd_param.title || $scope.couponadd_param.title == '') {
                alert('请填写优惠劵介绍');
                return false;
            }
            if (!$scope.couponadd_param.mobile_list || $scope.couponadd_param.mobile_list == '') {
                alert('请填写发送用户的手机号码列表');
                return false;
            }
            $scope.couponadd_param.mobile_list = $scope.couponadd_param.mobile_list.replace(/，/g, ',');
            var add_url = simpleCons.domain + '/manage/market/coupon/add';
            $http.post(add_url, $scope.couponadd_param)
                .success(function (json) {
                    if (json.code == 0) {
                        alert('添加成功！');
                        $state.go('coupon');
                    } else {
                        alert('失败: ' + json.msg);
                    }
                });
        }

    }
});
