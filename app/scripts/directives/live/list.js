define([
    '../../directives/directives',
    '../../cons/simpleCons',
], function(mod, con) {
    // <div product-pattern="patterns"></div>
    mod
    // 房间问题列表
        .directive('postAnswer', function($templateCache, $rootScope, $compile, widget, $state, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-sm btn-primary" ng-click="open()">回答问题</a> ',
                link: function($scope, $element) {
                    var supScope = $scope;
                    $scope.open = function() {
                        var modalInstance = $uibModal.open({
                            template: $templateCache.get('app/' + con.live_path + 'questions/postAnswer.html'),
                            resolve: {
                                resolve_data: function() {
                                    return {
                                        room_id: supScope.data && supScope.data.room_id || '',
                                        question_id: supScope.data && supScope.data.id || '',
                                    };
                                },
                            },
                            controller: function($scope, $uibModalInstance, resolve_data) {
                                $scope.title = '回答问题';
                                $scope.param = {
                                    room_id: resolve_data.room_id,
                                    question_id: resolve_data.question_id,

                                    mobile: '15026906343',
                                    answer: '',
                                    answer_pics: [],
                                }
                                ;
                                $scope.submit = function() {
                                    widget.ajaxRequest({
                                        url: con.live_domain + '/live/answers',
                                        method: 'POST',
                                        scope: $scope,
                                        data: $scope.param,
                                        success: function(json) {
                                            widget.msgToast('发送成功,请刷新查看');
                                            supScope.$parent.searchAction();
                                            console.log(supScope);
                                            $scope.cancel();
                                        },
                                    });
                                };
                                $scope.cancel = function() {
                                    $uibModalInstance.dismiss('cancel');
                                };

                            },
                            size: 'lg',
                        });
                    };
                },
            };
        });
});
