define([], function () {
    var rtn = {
        skuList: {
            columns: [
                // {name: 'ID', field: 'id', className: 'text-center'},
                {name: '名称', field: 'name|null2empty'},
                {name: '对应值', field: 'value|null2empty',},
                {name: '标签', field: 'tags|arraySub2String:\'name\'',},
                {
                    name: '管理', className: 'text-center',
                    fieldDirective: '<span support-sku-update data="item"></span>'
                },
            ],
            config: {
                title: 'SKU列表',
                api: '/supports/skus',
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
                route: [
                    {routeDirective: '<span support-sku-add></span>'},
                    {routeDirective: '<span show-table data="{text:\'SKU标签列表\',modid:\'tagList\',config:\'config\',columns:\'columns\'}" class="pull-right"></span>'}
                ],
            },
        },
    }
    return rtn;
});