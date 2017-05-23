define([], function () {
    var rtn = {
        lessonsList: {
            columns: [
                {name: 'ID', field: 'lesson_id', className: 'text-right'},
                {
                    name: '活动ID/已选择类目',
                    fieldDirective: '<div><p ng-bind="item.products[0].product_id|null2empty"></p>' +
                    '<p ng-repeat="obj in item.products">' +
                    '<span ng-if="obj.option" ng-bind="($index+1)+\'.\'+obj.option.option_name"></span>' +
                    '<span ng-if="obj.option.option_name" ng-bind="\'/￥\' +obj.option.option_price"></span>' +
                    '</p></div>'
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
                {name: '已上线任务', fieldDirective: '<div mission-online data="item"></div>'},
                {name: '报名人数', field: 'stat_student.user_count'},
                {name: '备注', field: 'remark|null2empty'},
                {
                    name: '操作',
                    fieldDirective: '<div lessons-edit data="item" ></div>' +
                    '<div lessons-mission-add data="item" ></div>' +
                    '<div lessons-mission-order data="item" ></div>' +
                    '<div lessons-change-status data="item" ></div>'
                },
            ],
            config: {
                title: '课程列表',
                api: '/lessons',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'status', text: '状态', type: 'btnGroup', default: '1', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '进行中'},
                            {value: '2', text: '已下线'},
                            {value: '3', text: '草稿'},
                        ]
                    },
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
                route: [{value: 'main.lessons.add', text: '新增课程'}]
            },
        }
    }
    return rtn;
});