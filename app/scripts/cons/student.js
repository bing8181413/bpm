define([], function () {
    var rtn = {
        studentList: {
            columns: [
                {name: 'ID', field: 'user_id', className: 'text-right'},
                {name: '微信昵称', field: 'name'},
                {name: '手机号', field: 'mobile'},
                {name: '课程', fieldDirective: '<div student-lessons data="item" ></div>'},
                {name: '作业', fieldDirective: '<div student-plans data="item" ></div>'},
                // {
                //     name: '操作',
                //     fieldDirective: '<div lessons-mission-order data="item" ></div>'
                // },
            ],
            config: {
                title: '学生列表',
                api: '/students',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
                preSelectionSearch: {},
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                // route: [{value: 'main.student.add', text: '新增课程'}]
            },
            columns_by_lesson: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '课程ID', field: 'lesson_id', className: 'text-right'},
                {name: '课程名称', field: 'lesson.name'},
                {name: '已下发任务', field: 'current_mission'},
                {name: '总课时', field: 'lesson.mission_num'},
                {name: '第一次收到任务时间', field: 'current_mission_at|null2empty'},
                {name: '购买课程时间', field: 'created_at|null2empty'},
                {
                    name: '操作',
                    fieldDirective: '<div student-lessons-change-status data="item"></div>'
                },
            ],
            config_by_lesson: {
                title: '课程列表',
                api: '/students',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
                preSelectionSearch: {},
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                // route: [{value: 'main.student.add', text: '新增课程'}]
            },
            columns_by_plan: [
                {name: '课程ID', field: 'lesson_id', className: 'text-right'},
                {name: '任务编号', field: 'plan_id', className: 'text-right'},
                {name: '上交时间', field: 'works[0].created_at'},
                {
                    name: '作业状态',
                    fieldDirective: '<span ng-bind=" (item.works[0]&&item.works[0].appraise_at)?\'已评价\':\'未评价\'"></span>',
                },
                {
                    name: '是否有提问',
                    fieldDirective: '<span class="label label-danger fa fa-check" ng-show="(item.works[0]&&item.works[0].ask&&!item.appraise_at)">&nbsp;</span>'
                },
                {
                    name: '操作',
                    fieldDirective: '<div student-plan-works data="item" ></div>'
                },
            ],
            config_by_plan: {
                title: '作业列表',
                api: '/students',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
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