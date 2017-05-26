define([], function () {
    var rtn = {
        workList: {
            columns: [
                {name: '作业ID', field: 'work_id', className: 'text-right'},
                {name: '任务编号', field: 'plan_id', className: 'text-right'},
                {name: '用户', field: 'user_name'},
                {name: '课程', field: 'lesson_name'},
                {name: '任务', field: 'title'},
                {name: '交作业时间', field: 'created_at'},
                {
                    name: '作业状态',
                    fieldDirective: '<span ng-bind=" (item.appraise_at)?\'已评价\':\'未评价\'"></span>',
                },
                {
                    name: '是否有提问',
                    fieldDirective: '<span class="label label-danger fa fa-check" ng-show="item.ask&&!item.appraise_at">&nbsp;</span>'
                },
                {
                    name: '操作',
                    fieldDirective: '<div student-plan-works data="item" ></div>'
                },
            ],
            config: {
                title: '作业列表',
                api: '/planworks',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'keyword', text: '昵称', placeholder: '昵称', default: ''},
                ],
                preSelectionSearch: {
                    // status: '1',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                // route: [{value: 'main.student.add', text: '新增课程'}]
            },
        }
    }
    return rtn;
});