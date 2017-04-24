define([], function () {
    var rtn = {
        surveyPlanList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-center'},
                {name: '测评名称', field: 'name'},
                {name: '文字描述', field: 'brief'},
                {
                    name: '操作',
                    fieldDirective: '<div survey-plan-edit data="item" ></div>' +
                    '<div survey-plan-del data="item" ></div>'
                },
            ],
            config: {
                title: '测评列表',
                api: '/surveys/plans',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
                preSelectionSearch: {
                    // key: 'deviceNo',
                    // value: 'testinfo'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
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