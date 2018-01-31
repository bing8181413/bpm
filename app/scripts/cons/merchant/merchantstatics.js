define([], function () {
    var rtn = {
        merchantStaticsList: {
            columns: [
                {name: '供应商ID', field: 'account_id', className: 'text-right'},
                {name: '供应商全名', field: 'company_name|null2empty'},
                {name: 'utm_source', field: 'utm_source|null2empty'},
                {name: '关联活动', fieldDirective: '<div merchant-product data="item" class="text-center"></div>'},
                {name: '总订单数', field: 'stat.count|null2empty'},
                {name: '已售份数', field: 'stat.copies|null2empty'},
                {name: '退订数', field: 'stat.refund_count|null2empty'},
                {name: '总金额', field: 'stat.amount|null2empty'},
                {
                    name: '管理',
                    fieldDirective:'<div add-merchant-product data="item" class="text-center"></div>'
                },
            ],
            config: {
                title: '供应商管理',
                api: '/merchant/merchantstatics',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'company_name', text: '供应商名称'}
                ],
                paginationSupport: true,
                pageInfo: {
                    count: 10,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                // route: [{value: 'main.merchant.add', text: '新增供应商'}]
            },
        },
    }
    return rtn;
});