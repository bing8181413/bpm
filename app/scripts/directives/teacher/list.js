define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('teacherEdit', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="teacher-edit"></p>',
                link: function ($scope, $element, $attrs) {
                    var content = '';
                    if ('admin,op'.indexOf($rootScope.hjm.role) > -1) {
                        content = '<a class="btn btn-primary btn-rounded btn-sm"' +
                            'ui-sref="main.teacher.update({teacher_id:' + $scope.data.teacher_id + '})" show-role="\'admin,op\'" >编辑账户</a>';
                    } else {
                        content = '<a class="btn btn-info btn-rounded btn-sm"' +
                            'ui-sref="main.teacher.update({teacher_id:' + $scope.data.teacher_id + '})" show-role="\'!admin,op\'" >教师详情</a>';
                    }
                    $element.find('.teacher-edit').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
});
