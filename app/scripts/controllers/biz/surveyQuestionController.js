// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('surveyQuestion.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: '/surveys/questions/' + $stateParams.id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.param = angular.copy(json.data);
                    console.log($scope.param.category_id);
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
        }

        // 查询课程维度
        $scope.search = function () {
            $scope.category_ids = [];
            widget.ajaxRequest({
                url: '/surveys/categories/',
                method: 'GET',
                data: {count: 1000, status: 1, page: 1},
                success: function (json) {
                    angular.forEach(json.data, function (val, key) {
                        $scope.category_ids.push({
                            text: val.name,
                            value: val.id + ''
                        });
                    });
                }
            })
        }
        $scope.search();
        $scope.$watch('age', function (val) {
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
            widget.ajaxRequest({
                url: '/surveys/questions' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！', 500);
                    $state.go(con.state.main + '.survey_question.list');
                },
                failure: function (err) {
                    widget.msgToast(err.message + '\n点击取消', 2000);
                }
            })
        }
    };
});
