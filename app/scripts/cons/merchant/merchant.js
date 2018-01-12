define([], function () {
    var rtn = {
        merchantList: {
            columns: [
                {name: '供应商ID', field: 'account_id', className: 'text-center'},
                {name: '供应商全名', field: 'company_name|null2empty'},
                {name: 'utm_source', field: 'utm_source|null2empty'},
                {name: '联系方式', field: 'contact_mobile|null2empty',},
                {name: '联系人', field: 'contact_name|null2empty'},
                {name: '登录账号', field: 'account.username|null2empty'},
                {
                    name: '营业执照',
                    fieldDirective: '<div ng-repeat="obj in item.business_license"><show-image  url="obj.pic_url" width="100"></show-image></div>'
                },
                // {name: '关联活动', className: 'text-center', fieldDirective: '<div merchant-product data="item"></div>'},
                {name: '负责人', field: 'charge_bd|null2empty'},
                {
                    name: '管理', className: 'text-center',
                    fieldDirective: '<span merchant-forbidden data="item"></span>' +
                    '<a class="btn btn-primary btn-rounded btn-sm" ui-sref="main.merchant.update({merchant_id:item.id})">编辑账户</a>'
                },
            ],
            config: {
                title: '供应商账户管理',
                api: '/merchant/merchants',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'company_name', text: '供应商名称'}
                ],
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.merchant.add', text: '新增供应商'}]
            },
        },
    }
    return rtn;
});