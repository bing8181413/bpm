define([], function() {
    var rtn = {
        lessonsList: {
            columns: [
                {name: 'ID', field: 'lesson_id', className: 'text-right width100'},
                {name: '课程名称', field: 'name', className: 'width200'},
                {
                    name: '已选择类目', className: 'width150 text-center',
                    fieldDirective: '<span show-table size="sm" data="{text:\'类目列表\',modid:\'lessonsList\',config:\'lessonOptionConfig\',columns:\'lessonOptionColumns\',store:item.products}"></span>',
                },
                {name: '负责教师', field: 'teacher.name', filter: 'null2empty', className: 'text-center width200'},
                {
                    name: '任务发布时间', className: 'width150 text-center',
                    fieldDirective: '<p><span ng-bind="item.pubtime_at|null2empty"></span></p><span size="sm" show-table data="{text:\'查看详情\',modid:\'lessonsList\',config:\'lessonSchedulesConfig\',columns:\'lessonSchedulesColumns\',store:item.schedules}"></span>',
                },
                {name: '报名人数', field: 'stat_student.user_count',className: 'width100'},
                {
                    name: '备注', className: 'width150 text-center',
                    fieldDirective: '<div modal-textarea content="item.remark" title="备注" ng-show="item.remark" size="sm"></div>',
                },
                {
                    name: '已上线任务', className: 'width150 text-center',
                    fieldDirective: // '<div mission-online data="item"></div>' +
                    '<p><a class="btn btn-info btn-rounded btn-sm" ui-sref="main.mission.list({lesson_id:item.lesson_id})" ng-bind="\'已上线(\'+(item.stat_mission && item.stat_mission.mission_count || 0)+\')\'" ></a></p>' +
                    '<div mission-import data="item" ></div>' +
                    '<div lessons-mission-order data="item" ></div>',
                },
                {
                    name: '状态', className: 'width150 text-center',
                    fieldDirective: '<p><span ng-bind="item.status|keyVal:\'1\':\'已上线\':\'2\':\'已下线\':\'3\':\'草稿\'"></span></p>' +
                    '<span lessons-change-status data="item" ></span>',
                },
                {
                    name: '操作', className: 'width150 text-center',
                    fieldDirective: '<div lessons-mission-add data="item" ></div>' +
                    '<div lessons-edit data="item" ></div>',
                },
            ],
            config: {
                title: '课程列表',
                api: '/lessons',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'keyword', text: '关键字', placeholder: '关键字', default: ''},
                    {
                        value: 'status', text: '状态', type: 'btnGroup', default: '', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '进行中'},
                            {value: '2', text: '已下线'},
                            {value: '3', text: '草稿'},
                        ],
                    },
                ],
                preSelectionSearch: {
                    status: '',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.lessons.add', text: '新增课程'}],
            },
            lessonOptionColumns: [
                {name: '活动ID', field: 'product_id|null2empty', className: 'text-center'},
                {name: '已选择类目', field: 'option.option_name', className: 'text-center'},
                {name: '价格', field: 'option.option_price', className: 'text-center'},
            ],
            lessonOptionConfig: {
                title: '活动ID/已选择类目',
                api: '/',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
                preSelectionSearch: {},
                paginationSupport: false,
                pageInfo: {
                    count: 20,
                    page: 1,
                },
            },
            lessonSchedulesColumns: [
                {name: '周', field: 'week|common:\'week\'', className: 'text-right'},
                {
                    name: '时间', className: 'text-left',
                    fieldDirective: '<span ng-bind="(item.hour|common:\'hour\')+\'时\'"></span>' +
                    '<span ng-bind="(item.minute|common:\'minute\')+\'分\'"></span>',
                },
            ],
            lessonSchedulesConfig: {
                title: '活动ID/已选择类目',
                api: '/',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
                preSelectionSearch: {},
                paginationSupport: false,
                pageInfo: {
                    count: 20,
                    page: 1,
                },
            },
        },
    };
    return rtn;
});