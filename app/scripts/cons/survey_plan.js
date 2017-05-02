define([], function () {
    var rtn = {
        surveyPlanList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-center'},
                {name: '商品ID', field: 'product_id', filter: 'zero2empty'},
                {name: '年龄段', fieldDirective: '<span ng-bind="item.age_min+\'-\'+item.age_max"></span>'},
                {name: '维度', field: 'categories', filter: 'arraySub2String:\'name\''},
                {name: '测评名称', field: 'name'},
                {
                    name: '文字描述',
                    fieldDirective: '<p style="width:700px;" ng-bind="item.brief"></p>'
                },
                {
                    name: '操作',
                    fieldDirective: '<div survey-plan-edit data="item" ></div>' +
                    '<div survey-plan-del data="item" ></div>' +
                    '<div survey-plan-download data="item"></div>',
                },
            ],
            config: {
                title: '测评列表',
                api: '/surveys/plans',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    {
                        value: 'status', text: '状态', type: 'btnGroup', default: '1',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '正在进行'},
                            {value: '2', text: '已下线'},
                        ]
                    }],
                preSelectionSearch: {
                    // key: 'deviceNo',
                    // value: 'testinfo'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    status: '1'
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [
                    {value: 'main.survey_plan.add', text: '新增测评'},
                ]
            },
        }
    }
    return rtn;
});