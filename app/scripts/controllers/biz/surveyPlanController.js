// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('surveyPlan.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: '/surveys/plans/' + $stateParams.id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.param = angular.copy(json.data);
                    $scope.banner = $scope.param.banner ? [{pic_url: $scope.param.banner}] : [];
                    $scope.search_product_id();
                    var age_min = $scope.param.age_min + '';
                    switch (age_min) {
                        case "0":
                            $scope.age = '1';
                            break;
                        case "4":
                            $scope.age = '2';
                            break;
                        case "7":
                            $scope.age = '3';
                            break;
                        case "10":
                            $scope.age = '4';
                            break;
                    }
                }
            })
        } else {
            // 新增的分数段成长建议
            $scope.param = {
                suggestions: [
                    {score_min: 0, score_max: 33},
                    {score_min: 34, score_max: 67},
                    {score_min: 68, score_max: 100}
                ]
            }
        }

        // 查询活动ID
        $scope.search_product_id = function () {
            if (!$scope.param.product_id) {
                widget.msgToast('没有活动ID');
                return false;
            }
            widget.ajaxRequest({
                url: '/products',
                method: 'GET',
                data: {product_id: $scope.param.product_id, sku: '2', page: 1, count: 1},
                success: function (json) {
                    if (json.data[0]) {
                        $scope.product_id = json.data[0].product_id;
                        $scope.product_title = json.data[0].title;
                    } else {
                        widget.msgToast('未找到测评的活动ID');
                    }
                }
            })
        }

        $scope.$watch('param.product_id', function (val) {
            $scope.product_title = '';
        });
        $scope.$watch('age', function (val) {
            $scope.param = $scope.param || {};
            switch (val) {
                case "1":
                    $scope.param.age_min = 0;
                    $scope.param.age_max = 3;
                    break;
                case "2":
                    $scope.param.age_min = 4;
                    $scope.param.age_max = 6;
                    break;
                case "3":
                    $scope.param.age_min = 7;
                    $scope.param.age_max = 9;
                    break;
                case "4":
                    $scope.param.age_min = 10;
                    $scope.param.age_max = undefined;
                    break;
            }
        });
        $scope.submit = function (status) {
            // console.log($scope.param.contents);
            if ($scope.banner && $scope.banner.length == 1) {
                $scope.param.banner = $scope.banner[0].pic_url;
            }
            var tmp_categories_err = 0;
            var hash_categories = {};
            angular.forEach($scope.param.categories, function (val, key) {
                if (hash_categories[val.pivot.category_id]) {
                    tmp_categories_err++;
                    return true;
                }
                hash_categories[val.pivot.category_id] = true;
            });
            if (tmp_categories_err > 0) {
                console.log(hash_categories);
                widget.msgToast('涉及维度有重复');
                return false;
            }
            widget.ajaxRequest({
                url: '/surveys/plans' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！', 500);
                    $state.go(con.state.main + '.survey_plan.list');
                },
                failure: function (err) {
                    widget.msgToast(err.message + '\n点击取消', 2000);
                }
            })
        }
    };
});
