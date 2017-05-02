// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('surveyQuestion.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        if ($state.current.name.indexOf('survey_question_attachment') > -1) {
            var survey_question_attachment = 1;
        }
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: '/surveys/questions/' + $stateParams.id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.param = angular.copy(json.data);
                    $scope.image = $scope.param.image ? [{pic_url: $scope.param.image}] : [];
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

        // $scope.$watch('survey_question_category_list_attachments', function (val, prev_val) {
        //     console.log(val.toString(), val.length > 0, prev_val);
        // });

        $scope.submit = function (status) {
            // console.log($scope.param.contents);
            if ($scope.image && $scope.image.length == 1) {
                $scope.param.image = $scope.image[0].pic_url;
            }
            // 查询课程维度 和 非默认草稿装填
            if (survey_question_attachment && !$stateParams.id) {
                angular.extend($scope.param, {status: '1'});
                $scope.param.category_id = $rootScope.survey_question_category_list_attachments[0].value;
            }
            // 题型判定 正确选项判定 start
            var options_correct_count = 0;
            angular.forEach($scope.param.options, function (val, key) {
                if (val.selected == 1) {
                    options_correct_count++;
                }
            })
            if ($scope.param.type == 3 && options_correct_count != 1) {
                widget.msgToast('单选题型的正确选项只能是一个');
                return false;
            } else if ($scope.param.type == 2 && options_correct_count < 1) {
                widget.msgToast('多选题型的正确选项至少是一个');
                return false;
            }
            // 题型判定 正确选项判定 end
            widget.ajaxRequest({
                url: '/surveys/questions' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！', 500);
                    $rootScope.get_survey_question_list();
                    $state.go(con.state.main + '.' + (survey_question_attachment ? 'survey_question_attachment' : 'survey_question') + '.list');
                },
                failure: function (err) {
                    widget.msgToast(err.message + '\n点击取消', 2000);
                }
            })
        }
    };
});
