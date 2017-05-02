define([], function () {
    var rtn = {
        surveyCategoryList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-center'},
                // {name: '类型', field: 'type', filter: 'survey_category_type'},
                {name: '维度', field: 'name'},
                {
                    name: '操作',
                    fieldDirective: '<div survey-category-edit data="item" ></div>&nbsp;&nbsp;&nbsp;' +
                    '<div survey-category-del data="item" ></div>&nbsp;&nbsp;&nbsp;' +
                    '<div survey-category-download data="item" style="display:inline-block"></div>'
                },
            ],
            config: {
                title: '题库维度列表',
                api: '/surveys/categories',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
                preSelectionSearch: {
                    status: 1,
                    type: 2
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [
                    // {value: 'main.product.add', text: '新增商品'},
                    {routeDirective: '<div survey-category-add data="">新增维度</div>'},
                ]
            },
        }
    }
    return rtn;
});