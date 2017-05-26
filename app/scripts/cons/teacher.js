define([], function () {
    var rtn = {
        teacherList: {
            columns: [
                {name: 'ID', field: 'account_id', className: 'text-right'},
                {name: '教师名', field: 'name'},
                {name: '手机', field: 'mobile'},
                {name: '邮箱', field: 'email'},
                {name: '课程类型', field: 'lesson_type|null2empty'},
                {name: '课程', field: 'stat_lesson.lesson_count|null2empty'},
                // {name: '重置密码', fieldDirective: '<div reset-pwd data="item" no-state="true"></div>'},
                {name: '备注', field: 'remark|null2empty'},
                {
                    name: '操作',
                    fieldDirective: '<div teacher-edit data="item" ></div>'
                },
            ],
            config: {
                title: '教师列表',
                api: '/teachers',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    // {
                    //     value: 'status', text: '状态', type: 'btnGroup', default: '3', width: '6',
                    //     enum: [
                    //         {value: '', text: '全部'},
                    //         {value: '1', text: '进行中'},
                    //         {value: '2', text: '已下线'},
                    //         {value: '3', text: '草稿'},
                    //     ]
                    // },
                ],
                preSelectionSearch: {
                    status: '1',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.teacher.add', text: '添加老师'}]
            },
        }
    }
    return rtn;
});