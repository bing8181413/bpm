define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {

    mod
    //<common_form form_param="" form_init_data="" form_url="" form_title="" ></common_form>
    //form_data = {};
    //form_url:''
        .directive('commonForm', function ($rootScope, $state, $http, $modal, $filter, widget, $templateCache) {
            return {
                restrict: 'E',
                // replace: true,
                scope: {
                    form_param: '=formParam',
                    form_init_data: '=formInitData',
                    form_extra_data: '=formExtraData',
                    form_url: '=formUrl',
                    form_method: '@formMethod',
                    form_param_id: '@formParamId',
                    form_title: '=formTitle',
                    callback: '&callback',
                    btnClass: '@',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'common_form.html'),
                link: function ($scope, $element, $attrs) {
                    var sup_scope = $scope;
                    sup_scope.callback = $scope.callback;
                    $scope.$watch('form_param', function (value) {
                        $scope.form_data = angular.copy($scope.form_param);
                        if ($scope.form_init_data) {
                            angular.forEach($scope.form_param, function (param_val, param_key) {
                                angular.forEach($scope.form_init_data, function (val, key) {
                                    if (param_val.key == key) {
                                        $scope.form_data[param_key].val = val;
                                    }
                                });
                                angular.forEach($scope.form_extra_data, function (val, key) {
                                    if (param_val.key == key) {
                                        $scope.form_data[param_key].val = val;
                                    }
                                });
                            });
                            // console.log($scope.form_param);
                            // console.log($scope.form_data);
                            // console.log($scope.form_init_data);
                        }
                    });
                    $scope.open = function () {
                        var modalInstance = $modal.open({
                            templateUrl: 'form_data.html',
                            controller: function ($scope, $modalInstance) {
                                $scope.form_data = sup_scope.form_data;
                                $scope.form_url = sup_scope.form_url;
                                $scope.form_title = sup_scope.form_title;
                                $scope.form_method = sup_scope.form_method;
                                $scope.form_param_id = sup_scope.form_param_id || '';
                                // console.log($scope.form_data);
                                //console.log(sup_scope.form_param);
                                // console.log(sup_scope.form_extra_data);
                                $scope.submit = function () {
                                    $rootScope.loading = true;
                                    $scope.post_data = {};
                                    var keepGoing = true;
                                    angular.forEach($scope.form_data, function (v, k) {
                                        if (keepGoing) {
                                            if (!v.allownull && !v.val && !v.isprimary) {
                                                widget.msgToast(v.name + '不允许为空');
                                                $rootScope.loading = false;
                                                keepGoing = false;
                                            } else if (v.val) {
                                                eval('$scope.post_data.' + v.key + '="' + v.val + '"');
                                            }
                                        }
                                    });
                                    //console.log($scope.post_data);
                                    if (!keepGoing) return false;
                                    widget.ajaxRequest({
                                        method: $scope.form_method,
                                        url: $scope.form_url + $scope.form_param_id,
                                        scope: $scope,
                                        data: $scope.post_data,
                                        success: function (json) {
                                            sup_scope.callback()();
                                            $rootScope.loading = false;
                                            $scope.cancel();
                                        }
                                    });
                                }
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: ''
                        });
                    }

                }
            };
        })


})
;
