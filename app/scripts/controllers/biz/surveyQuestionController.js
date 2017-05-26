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
                    if ($state.current.name.indexOf('survey_question.add') > -1) { // 复制用的
                        delete json.data.id;
                        delete json.data.status;
                        delete json.data.created_at;
                        delete json.data.updated_at;
                        angular.forEach(json.data.options, function (val, key) {
                            delete val.id;
                            delete val.question_id;
                            delete val.status;
                            delete val.created_at;
                            delete val.updated_at;
                        });
                    }
                    $scope.param = angular.copy(json.data);
                    $scope.image = $scope.param.image ? [{pic_url: $scope.param.image}] : [];
                    if ($scope.param.option_type == 3) {
                        $scope.option_type3_options = angular.copy($scope.param.options);
                        // console.log(JSON.stringify($scope.option_type3_options));
                    }
                    // console.log($scope.param);
                }
            })
        }
        // 选择是9宫格类型  必须是单选题
        $scope.$watch('param.option_type', function (val, defval) {
            if (val == 3 || val == 2) {// 九宫格题目 或 财商题目 1: 需要计分; 2: 单选
                $scope.param.type = 3; //  3 : 单选;  2 : 多选
                $scope.param.need_score = 1; // 1 : 计分 , 2 : 不计分
                $scope.add_option_type_3();
            } else if (val == 1) { //  普通题目 1: 不需要计分, 2: 单选或多选
                $scope.param.need_score = 2;
            }
        });

        $scope.$watch('option_count', function (val) {
            $scope.add_option_type_3();
        });
        //  选择计分类型为3的九宫格题目 要增加新的options
        $scope.add_option_type_3 = function () {
            if ($scope.option_count == 3 && ($scope.param.option_type == 3)
                && (!$scope.option_type3_options || $scope.option_type3_options && $scope.option_type3_options.length != 3)) {
                $scope.option_type3_options = [
                    {name: '', score: 1},
                    {name: '', score: 2},
                    {name: '', score: 3}
                ]
                console.log($scope.option_type3_options);
            }
        }

        $scope.add_option_type3_options = function () {
            if ($scope.option_type3_options && $scope.option_type3_options.length < 3) {
                $scope.option_type3_options.push({
                    name: '',
                    score: $scope.option_type3_options.length + 1
                });
                angular.forEach($scope.option_type3_options, function (val, key) {
                    val.score = key + 1;
                })
            } else {
                widget.msgToast('不能添加超过3个选项');
            }
        }
        $scope.del_option_type3_options = function (index) {
            // console.log($scope.option_type3_options);
            if ($scope.option_type3_options && $scope.option_type3_options.length == 3) {
                $scope.option_type3_options.splice(index, 1);
            } else {
                widget.msgToast('不能删除,至少2个选项');
            }
            angular.forEach($scope.option_type3_options, function (val, key) {
                val.score = key + 1;
            })
        }


        $scope.$watch('param.type', function (val, defval) {
            if (val == 2 && ( $scope.param.option_type == 2 || $scope.param.option_type == 3)) {
                widget.msgToast('选项计分题只能为单选题,已切换为单选题。');
                $scope.param.type = 3;
            }
        });

        $scope.submit = function (status) {
            // console.log($scope.param.contents);
            if ($scope.image && $scope.image.length == 1) {
                $scope.param.image = $scope.image[0].pic_url;
            } else {
                $scope.param.image = '';
            }
            if (!$scope.param.title && !$scope.param.image) {
                widget.msgToast('题目,题图必须有其一才能提交');
                return false;
            }
            // 查询课程维度 和 非默认草稿装填
            if (survey_question_attachment && !$stateParams.id) {
                angular.extend($scope.param, {status: '1'});
                $scope.param.category_id = $rootScope.survey_question_category_list_attachments[0].value;
            }
            // 题型判定 正确选项判定 start
            if ($scope.param.option_type == 1 || $scope.param.option_type == 2) {
                var options_correct_count = 0;
                if (!$scope.param.options || $scope.param.options.length == 0) {
                    widget.msgToast('选项未填写,请添加');
                    return false;
                }

                angular.forEach($scope.param.options, function (val, key) {
                    if (val.selected == 1) {
                        options_correct_count++;
                    }
                });

                if ($scope.param.need_score == 2) {
                    if ($scope.param.type == 3 && options_correct_count != 1) {
                        widget.msgToast('单选题型的正确选项只能是一个');
                        return false;
                    } else if ($scope.param.type == 2 && options_correct_count < 1) {
                        widget.msgToast('多选题型的正确选项至少是一个');
                        return false;
                    }
                }
            } else if ($scope.param.option_type == 3) {
                $scope.param.options = [];
                angular.forEach($scope.option_type3_options, function (val, key) {
                    if (val.id) {
                        $scope.param.options.push({
                            id: val.id || '',
                            name: val.name,
                            score: val.score
                        });
                    } else {
                        $scope.param.options.push({
                            name: val.name,
                            score: val.score
                        });
                    }

                })
            }
            // console.log($scope.param);
            // return false;

            // 题型判定 正确选项判定 end
            widget.ajaxRequest({
                url: '/surveys/questions' + ($scope.param.id ? ('/' + $scope.param.id) : ''),
                method: $scope.param.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！', 500);
                    $rootScope.get_survey_question_list();
                    $state.go(con.state.main + '.' + (survey_question_attachment ? 'survey_question_attachment' : 'survey_question') + '.list');
                },
                failure: function (err) {
                    // console.log(err.code, Object.keys(err.validates), Object.keys(err.validates).length);
                    if ((err.code == 1202 || err.code == 1303) && err.validates && Object.keys(err.validates).length > 0) {
                        console.log(err.code, Object.keys(err.validates),
                            err.validates[Object.keys(err.validates)[0]],
                            Object.keys(err.validates).length);
                        widget.msgToast(err.validates[Object.keys(err.validates)[0]] + '\n点击取消', 5000);
                    } else {
                        widget.msgToast(err.message + '\n点击取消', 2000);
                    }
                }
            })
        }
    };
});
