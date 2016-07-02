// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('export.listController', listController);

    listController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function listController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        var sup_scope = $scope;
        $scope.pubdata = '';
        $scope.init_param = angular.extend({}, simpleCons.default_param);
        //console.log($scope.init_param);
        $scope.init_param.keyword = $rootScope.search;
        $scope.init_url = simpleCons.domain + '/manage/export/list';
        $scope.getapi = function (page) {
            //$rootScope.loading = true;
            $scope.init_param.page = page ? page : $scope.init_param.page;
            $scope.init_param.keyword = $rootScope.search || '';
            $http.post($scope.init_url, $scope.init_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.list = json.data.list;
                        $scope.totalItems = json.data.count;
                        $scope.itemsPerPage = $scope.init_param.count;
                        $scope.currentPage = page ? page : $scope.init_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                        $rootScope.loading = false;
                    } else {
                        widget.msgToast(json.msg);
                        $rootScope.loading = false;
                    }
                });
        }
        $scope.getapi(1);
        $rootScope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }

        // 更新
        $scope.update = function (item) {
            $rootScope.hjm.export_obj = item;
            $state.go('export.update', {id: item.id});
        }
        // 更新
        $scope.run = function (item) {
            var size = 'sm';
            if (item.sql_param && angular.isArray(item.sql_param)) {
                var size = 'lg';
            } else {
                size = '';
            }
            var modalInstance = $modal.open({
                templateUrl: 'export_run.html',
                controller: function ($scope, $modalInstance) {
                    $scope.param = {id: item.id};
                    $scope.tmp_param = {id: item.id};
                    if (item.sql_param && angular.isArray(item.sql_param)) {
                        //$scope.tmp_param = eval('(' + item.sql_param + ')');
                        $scope.tmp_param = item.sql_param;
                        angular.forEach($scope.tmp_param, function (obj, key) {
                            if (obj.type == 1) {
                                obj.value = '';
                            } else if (obj.type == 2) {
                                obj.val = '';
                                obj.tmp_value = [];
                                //obj.value = obj.value.split(',');
                                angular.forEach(obj.value.split(','), function (v, k) {
                                    v.des = v.replace('：', ':').split(':')[1];
                                    obj.tmp_value.push({
                                        value: v.replace('：', ':').split(':')[0],
                                        des: v.replace('：', ':').split(':')[1]
                                    });
                                });
                            } else if (obj.type == 3) {
                                obj.val = [];
                                angular.forEach(obj.value.split(','), function (v, k) {
                                    obj.val.push({
                                        checked: false,
                                        value: v.replace('：', ':').split(':')[0],
                                        des: v.replace('：', ':').split(':')[1]
                                    });
                                    //console.log(obj.val);
                                });
                            } else if (obj.type == 4) {
                                obj.value = new Date();
                            } else if (obj.type == 5) {
                                obj.value = new Date();
                            }
                        });
                    } else {
                        $scope.tmp_param = [];
                    }
                    $scope.ok = function () {
                        var run_url = simpleCons.domain + '/manage/export/run';
                        angular.forEach($scope.tmp_param, function (obj, key) {
                            if (obj.type == 1) {
                                if (obj.value) {
                                    eval('($scope.param.' + obj.name + '="' + obj.value + '")');
                                } else {
                                    eval('(delete $scope.param.' + obj.name + ')');
                                }
                            } else if (obj.type == 2) {
                                if (obj.val) {
                                    eval('($scope.param.' + obj.name + '="' + obj.val + '")');
                                } else {
                                    eval('(delete $scope.param.' + obj.name + ')');
                                }
                            } else if (obj.type == 3) {
                                obj.param_val = [];
                                angular.forEach(obj.val, function (v, k) {
                                    if (v.checked) {
                                        obj.param_val.push(v.value);
                                    }
                                });
                                obj.param_val = obj.param_val.join(',');
                                if (obj.param_val) {
                                    eval('($scope.param.' + obj.name + '="' + obj.param_val + '")');
                                } else {
                                    eval('(delete $scope.param.' + obj.name + ')');
                                }
                            } else if (obj.type == 4) {
                                if (obj.value) {
                                    eval('($scope.param.' + obj.name + '="' + $filter('date')(obj.value, 'yyyy-MM-dd H:mm:ss') + '")');
                                } else {
                                    eval('(delete $scope.param.' + obj.name + ')');
                                }
                            } else if (obj.type == 5) {
                                if (obj.value) {
                                    eval('($scope.param.' + obj.name + '="' + $filter('date')(obj.value, 'yyyy-MM-dd') + '")');
                                } else {
                                    eval('(delete $scope.param.' + obj.name + ')');
                                }
                            }
                        });
                        //console.log($scope.param);
                        //return false;

                        $http.post(run_url, $scope.param)
                            .success(function (json) {
                                if (json.code == 0) {
                                    $modalInstance.dismiss('cancel');
                                    var modalInstance = $modal.open({
                                        templateUrl: 'export_review.html',
                                        controller: function ($scope, $modalInstance) {
                                            $scope.data = json.data;
                                            $scope.open = function () {
                                                window.open(json.data.url);
                                            }
                                            $scope.cancel = function () {
                                                $modalInstance.dismiss('cancel');
                                            };
                                        },
                                        size: 'lg'
                                    });

                                } else {
                                    widget.msgToast('失败: ' + json.msg);
                                }
                            });
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: size
            });
        }
    };
});
