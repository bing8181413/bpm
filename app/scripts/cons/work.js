define([], function () {
    var rtn = {
        workList: {
            columns: [
                {name: '作业ID', field: 'work_id', className: 'text-right'},
                {name: '任务编号', field: 'plan_id', className: 'text-right'},
                {name: '用户', field: 'user_name'},
                {name: '手机号码', field: 'mobile'},
                {name: '课程', field: 'lesson_name'},
                {name: '任务', field: 'title'},
                {name: '交作业时间', field: 'created_at'},
                {
                    name: '作业状态',className: 'text-center',
                    fieldDirective: '<span ng-bind=" (item.appraise_at)?\'已评价\':\'未评价\'"></span>',
                },
                {
                    name: '是否有提问',className: 'text-center',
                    fieldDirective: '<span class="label label-danger fa fa-check" ng-show="item.ask&&!item.appraise_at">&nbsp;</span>'
                },
                {
                    name: '操作',className: 'text-center',
                    fieldDirective: '<div student-plan-works data="item" ></div>'
                },
            ],
            config: {
                title: '作业列表',
                api: '/planworks',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'date_min', text: '交作业时间-开始', type: 'datetime'},
                    {value: 'date_max', text: '结束', type: 'datetime'},
                    {value: 'keyword', text: '关键字', placeholder: '关键字', default: ''},
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