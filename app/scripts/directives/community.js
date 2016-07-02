define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {
    //  1 : community  排除小区 包括小区 全部小区

    mod
        // <community communitys="[]" includes="[{community_id:1,community_name:'金牛大厦'}]"
        // excludes="" communityerr="communityerr"></community>
        // communityerr = {
        //    count: 0,//  错误数量
        //    cursor: 0 // 错误的位置
        //};
        .directive('community', function ($state, $rootScope, $http, $templateCache) {
            return {
                restrict: 'E',
                //replace: false,
                //require: '?ngModel',
                scope: {
                    communitys: '=',
                    includes: '=',//包括的范围  并不是包含的小区 而是包含的小区所造的范围  不填写就是全部范围
                    excludes: '=',// 排除的范围  同上 并不是排除的小区 是排除小区的范围 不填写就是没有排除范围
                    communityerr: '=',// 未填写正确小区的数量  默认是0
                    count: '=',// 可添加小区的数量
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'community.html'),
                link: function ($scope, $element, $attrs) {
                    //console.log($scope.communitys);
                    //console.log($scope.includes);
                    //console.log($scope.excludes);
                    //console.log($scope.communityerr);
                    $scope.init = function () {
                        //$scope.count
                        if (!$scope.communityerr) {
                            $scope.communityerr = {count: 0, cursor: 0};
                        }
                        //$scope.communityerr = 0;
                        //console.log($scope.communityerr);
                    };
                    $scope.init();
                    $scope.add = function () {
                        $scope.verify();
                        if ($scope.communitys.length >= $scope.count) {
                            alert('不能添加更多的小区');
                            $scope.communityerr.count = 0;
                            return false;
                        }
                        if ($scope.communityerr.count == 0) {
                            $scope.communitys.push({community_id: '', community_name: ''});
                            $scope.communityerr.count++;
                            $scope.communityerr.cursor = ($scope.communitys.length - 1);
                        } else {
                            alert('有小区没有选择，或者删除掉没有选择的小区。');
                        }
                    }
                    $scope.del = function (index) {
                        $scope.communitys.splice(index, 1);
                        // 从中间删除时 把自定义的 index 衔接上
                        angular.forEach($scope.communitys, function (val, key) {
                            $scope.communitys[key].index = key;
                        });
                        $scope.verify();
                    }
                    // 验证未选择小区数量
                    $scope.verify = function () {
                        $scope.communityerr.count = 0;
                        angular.forEach($scope.communitys, function (val, key) {
                            if (val.community_id == '') {
                                $scope.communityerr.count++;
                                $scope.communityerr.cursor = key;
                            }
                        });
                    }
                    $scope.search_url = simpleCons.domain + '/manage/plat/internal_community';
                    $scope.search_community = function (index, parent_index, community_keyword) {
                        //  隐藏上次搜索的列表
                        if (!$scope.communitys[parent_index].search_community_list == '') {
                            $scope.communitys[parent_index].search_community_list = '';
                            return false;
                        }
                        angular.forEach($scope.communitys, function (val, key) {
                            val.search_community_list = ''
                        });
                        $http.post($scope.search_url, {keyword: community_keyword})
                            .success(function (json) {
                                if (json.code == 0) {
                                    $scope.communitys[parent_index].search_community_list = json.data.community_list;
                                } else {
                                    alert(json.msg);
                                }
                            });
                    }
                    $scope.select_community = function (index, parent_index, community) {
                        $scope.err = 0;
                        $scope.err_include = 0;
                        $scope.err_exclude = 0;
                        angular.forEach($scope.communitys, function (val, key) {
                            if (val.community_id == community.community_id) {
                                $scope.err++;
                            }
                        });
                        //  优先使用可选小区范围 没有的话 选择排除小区范围
                        if (angular.isArray($scope.includes) && $scope.includes.length > 0) {
                            var includes_scope = 0;
                            angular.forEach($scope.includes, function (v, k) {
                                if (community.community_id == v.community_id) {
                                    includes_scope++;
                                }
                            });
                            if (includes_scope == 0) {
                                $scope.err_include++;
                            }
                        } else if (angular.isArray($scope.excludes) && $scope.excludes.length > 0) {
                            var excludes_scope = 0;
                            angular.forEach($scope.excludes, function (v, k) {
                                if (community.community_id != v.community_id) {
                                    $scope.err_exclude++;
                                }
                            })
                        }
                        //console.log($scope.err_include);
                        if ($scope.err > 0) {
                            alert('所选小区重复');
                            return false;
                        } else if ($scope.err_include > 0) {
                            alert('所选小区不在包括范围');
                            return false;
                        } else if ($scope.err_exclude > 0) {
                            alert('所选小区在排除范围了');
                            return false;
                        } else {
                            $scope.communitys[parent_index].community_name = community.name;
                            $scope.communitys[parent_index].community_id = community.community_id;
                            $scope.communitys[parent_index].search_community_list = '';
                            $scope.verify();
                        }
                    }
                    //$scope.conslog = function () {
                    //    console.log($scope.communitys);
                    //}
                }
            };
        })


});
