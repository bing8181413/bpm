define([], function () {
    var rtn = {
        tagList: {
            columns: [
                // {name: 'ID', field: 'id', className: 'text-center'},
                {name: '名称', field: 'name|null2empty'},
                {name: '类型值', field: 'type|null2empty',},
                {
                    name: '管理', className: 'text-center',
                    fieldDirective: '<span support-tag-update data="item"></span>'
                },
            ],
            config: {
                title: '标签列表',
                api: '/supports/tags',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    // {value: 'company_name', text: '供应商名称'}
                ],
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{routeDirective: '<span support-tag-add></span>'}],
            },
        },
    }
    return rtn;
});