// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('cert.updateController', updateController);

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $timeout) {

        $scope.verify_activity = function (activiy_id) {
            if (!activiy_id) {
                widget.msgToast('活动ID不存在!')
                return false;
            }
            return true;
        }

        $scope.add_activity = function (json) {
            console.log(json);
            if (json.data && json.data.length > 0) {
                if (!$scope.param.plan_ids) {
                    $scope.param.plan_ids = '';
                }
                angular.forEach(json.data, function (val, key) {
                    if (('|' + $scope.param.plan_ids.split(',').join('|') + '|').indexOf('|' + val.plan_id + '|') > -1) {
                        val.selected = true;
                    } else {
                        val.selected = false;
                    }
                });
                $scope.param.cert_survey = json.data;
            } else {
                $scope.param.cert_survey = [];
            }
        }

        $scope.updateSelection = function ($event, index) {
            var checkbox = $event.target;
            var checked = checkbox.checked;
            if (checked) {
                $scope.param.cert_survey[index].selected = true;
            } else {
                $scope.param.cert_survey[index].selected = false;
            }
            var tmp_plans = $scope.param.cert_survey.filter(function (val) {
                return val.selected;
            });
            $scope.param.plan_ids = $filter('arraySub2String')(tmp_plans, 'plan_id');
            // console.log(tmp_plans, $scope.param.plan_ids);
        };

        if ($stateParams.id) {
            widget.ajaxRequest({
                url: con.live_domain + '/live/certs/' + $stateParams.id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    json.data.order_by = Number(json.data.order_by);
                    $scope.param = angular.copy(json.data);
                    $scope.param.cert_survey = $scope.param.cert_survey.map(function (val) {
                        val = angular.extend(val, {selected: true})
                        return val;
                    });
                }
            })
        }

        $scope.submit = function () {
            if ($scope.param.plan_ids == '') {
                widget.msgToast('没有选择测评计划,不能提交!');
                return false;
            }
            widget.ajaxRequest({
                url: con.live_domain + '/live/certs' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.cert.list');
                }
            })
        }
    };
});
