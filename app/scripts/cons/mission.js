define([], function () {
    var rtn = {
        missionList: {
            columns_by_online: [
                {name: '排序', field: 'order_by', className: 'text-right'},
                {name: '任务ID', field: 'mission_id', className: 'text-right'},
                {name: '任务名称', field: 'title'},
                {name: '任务状态', field: 'status|mission_status'},
                // {name: '知识点', field: 'stat_knowledge.knowledge_count|null2empty'},
                {name: '知识点', fieldDirective: '<div knowledge-edit data="item"></div>'},
                {name: '备注', field: 'remark|null2empty'},
                {
                    name: '操作',
                    fieldDirective: '<a class="btn btn-primary btn-sm btn-bordered" ' +
                    'ui-sref="main.mission.update({lesson_id:item.lesson_id,mission_id:item.mission_id})">编辑</a>' +
                    '<span mission-notify data="item"></span>'
                },
            ],
            config_by_online: {
                title: '课程上线任务',
                api: '/teacher/missions',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
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
                // route: [{value: 'main.add', text: '新增任务'}]
            },
            // columns: [
            //     {name: '任务ID', field: 'mission_id', className: 'text-right'},
            //     {name: '任务名称', field: 'title'},
            //     {name: '负责教师', field: 'teacher.name', filter: 'null2empty'},
            //     {name: '发布时间', field: 'pubtime_at', filter: 'null2empty'},
            //     {name: '已上线任务', fieldDirective: '<div mission-online data="item"></div>'},
            //     {name: '报名人数', fieldDirective: '<div>API未实现功能</div>'},
            //     {name: '课程顺序管理', field: 'send_count'},
            //     {name: '备注', field: 'remark'},
            //     {name: '操作', fieldDirective: '<div>假数据</div>'},
            // ],
            // config: {
            //     title: '任务列表',
            //     api: '/missions',
            //     rowItemName: 'item',
            //     searchSupport: false,
            //     searchItems: [],
            //     preSelectionSearch: {
            //         // status: '0',
            //     },
            //     paginationSupport: true,
            //     pageInfo: {
            //         count: 20,
            //         page: 1,
            //         maxSize: 2, //最大展示页，默认3
            //         // showPageGoto: false //属性为true将显示前往第几页。
            //     },
            //     route: [{value: 'main.add', text: '新增优惠劵'}]
            // },
        }
    }
    return rtn;
});