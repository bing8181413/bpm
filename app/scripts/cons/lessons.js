define([], function () {
    var rtn = {
        lessonsList: {
            columns: [
                {name: 'ID', field: 'lesson_id', className: 'text-right'},
                {
                    name: '活动ID/已选择类目', className: 'width200',
                    fieldDirective: '<ul>' +
                    '<li ng-repeat="obj in item.products">' +
                    '<span ng-bind="obj.product_id|null2empty"></span>' +
                    '<span ng-if="obj.option" ng-bind="\' ): \'+obj.option.option_name"></span>' +
                    '<span ng-if="obj.option.option_name" ng-bind="\'/￥\' +obj.option.option_price"></span>' +
                    '</li></ul>'
                },
                {name: '课程名称', field: 'name'},
                {name: '负责教师', field: 'teacher.name', filter: 'null2empty'},
                {
                    name: '任务发布时间',
                    fieldDirective: '<div><p ng-bind="item.pubtime_at|null2empty"></p>' +
                    '<p ng-repeat="obj in item.schedules">' +
                    '<span ng-bind="obj.week|common:\'week\'"></span>' +
                    '<span ng-bind="(obj.hour|common:\'hour\')+\'时\'"></span>' +
                    '<span ng-bind="(obj.minute|common:\'minute\')+\'分\'"></span>' +
                    '</p></div>'
                },
                {name: '报名人数', field: 'stat_student.user_count'},
                {name: '备注', field: 'remark|null2empty'},
                {
                    name: '已上线任务',
                    fieldDirective: // '<div mission-online data="item"></div>' +
                    '<p><a class="btn btn-info btn-rounded btn-sm" ui-sref="main.mission.list({lesson_id:item.lesson_id})" ng-bind="\'已上线(\'+(item.stat_mission && item.stat_mission.mission_count || 0)+\')\'" ></a></p>' +
                    '<div mission-import data="item" ></div>' +
                    '<div lessons-mission-order data="item" ></div>'
                },
                {
                    name: '状态',
                    fieldDirective: '<span ng-bind="item.status|keyVal:\'1\':\'已上线\':\'2\':\'已下线\':\'3\':\'草稿\'"></span>' +
                    '<div lessons-change-status data="item" ></div>'
                },
                {
                    name: '操作',
                    fieldDirective: '<div lessons-mission-add data="item" ></div>' +
                    '<div lessons-edit data="item" ></div>'
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
                        ]
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
                route: [{value: 'main.lessons.add', text: '新增课程'}]
            },
        }
    }
    return rtn;
});