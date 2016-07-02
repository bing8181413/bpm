// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('export.updateController', updateController);

    updateController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        if ($rootScope.hjm.export_obj) {
            $scope.export_obj = $rootScope.hjm.export_obj;
            console.log($scope.export_obj);
            if ($scope.export_obj.id == $stateParams.id) {
                $scope.param = {
                    id: $stateParams.id,
                    name: $scope.export_obj.name,
                    sql_statement: $scope.export_obj.sql_statement,
                    sql_field: $scope.export_obj.sql_field,
                    sql_param: angular.isArray($scope.export_obj.sql_param) ? $scope.export_obj.sql_param : ($scope.export_obj.sql_param ? JSON.parse($scope.export_obj.sql_param) : [] )
                }
                $scope.tmp_param = {sql_param: [], sql_field: []};
                angular.forEach($scope.param.sql_param, function (val, key) {
                    $scope.tmp_param.sql_param.push({
                        name: val.name,
                        des: val.des,
                        type: val.type,
                        value: val.value
                    });
                });
                angular.forEach($scope.param.sql_field, function (val, key) {
                    $scope.tmp_param.sql_field.push({
                        field_key: key,
                        field_value: val
                    });
                });
                //console.log($scope.param);
                //console.log($scope.tmp_param.sql_param);
            } else {
                widget.msgToast('请从列表进来更新');
            }
        } else {
            widget.msgToast('请从列表进来更新');
        }
        $scope.add_param = function () {
            $scope.tmp_param.sql_param.push({name: '', des: '', type: 1, value: ''});
        }
        $scope.del_param = function (index) {
            $scope.tmp_param.sql_param.splice(index, 1);
        }
        $scope.add_field = function () {
            $scope.tmp_param.sql_field.push({field_key: '', field_value: ''});
        }
        $scope.del_field = function (index) {
            $scope.tmp_param.sql_field.splice(index, 1);
        }
        $scope.save = function (status) {
            var err = 0;
            $scope.param.sql_param = [];
            angular.forEach($scope.tmp_param.sql_param, function (val, k) {
                $scope.param.sql_param.push({
                    name: val.name,
                    des: val.des,
                    type: val.type,
                    value: val.value
                });
            });
            $scope.param.sql_field = {};
            angular.forEach($scope.tmp_param.sql_field, function (val, k) {
                eval('($scope.param.sql_field.' + val.field_key + '="' + val.field_value + '")');
            });
            //return false;
            angular.forEach($scope.param, function (value, key) {
                if (key == 'name' && value == '') {
                    widget.msgToast('描述未填写');
                    err++;
                }
                if (key == 'sql_statement' && value == '') {
                    widget.msgToast('SQL语句未填写');
                    err++;
                }
                if (key == 'sql_field' && value == '') {
                    widget.msgToast('SQL字段未填写');
                    err++;
                }
                if (key == 'sql_param' && value.length == 0) {
                    $scope.param.sql_param = '';
                    //$scope.param.sql_param = [{name: '', des: '', type: 1, value: ''}];
                }
            });
            //$scope.param.sql_param = JSON.stringify($scope.param.sql_param);
            //console.log($scope.param);
            //return false;
            if (err > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/export/update';
            $http.post(url, $scope.param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('发布成功！');
                        $state.go('export.list');
                    } else {
                        widget.msgToast(data.msg);
                    }
                });
        }
    };
});
