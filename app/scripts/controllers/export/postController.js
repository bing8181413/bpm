// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('export.postController', postController);

    postController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function postController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        $scope.param = {
            name: '',
            sql_statement: '',
            sql_param: {}
        };
        $scope.tmp_param = {sql_param: [], sql_field: []};
        $scope.add_param = function () {
            $scope.tmp_param.sql_param.push({name: '', des: '', type: '1', value: ''});
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
            //console.log($scope.param.sql_param);
            angular.forEach($scope.param, function (value, key) {
                if (key == 'name' && value == '') {
                    widget.msgToast('描述未填写');
                    err++;
                }
                if (key == 'sql_statement' && value == '') {
                    widget.msgToast('SQL语句未填写');
                    err++;
                }
                if (key == 'sql_field' && value.length == 0) {
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
            var url = simpleCons.domain + '/manage/export/post';
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
