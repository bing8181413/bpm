define([], function() {
    var rtn = {
        marketFanliCfgs: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '课程ID', field: 'product_id', className: 'text-center'},
                {name: '新用户的返利', field: 'new_customer'},
                {name: '老用户的返利', field: 'old_customer'},
                {name: '创建时间', field: 'created_at'},
                {
                    name: '管理', className: 'text-center',
                    fieldDirective: '<a class="btn btn-primary btn-rounded btn-sm" ui-sref="main.market.fanlicfgsUpdate({id:item.id})">编辑</a>' +
                    '<span delete-data data="" config="{url:$root.common.domain+\'/markets/fanlicfgs/\'+item.id,method:\'DELETE\',text:\'删除\'}" param="{}" callback="updateList()"></span> ',
                },
            ],
            config: {
                title: '返利配置列表',
                api: '/markets/fanlicfgs',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'product_id', text: '课程ID', placeholder: '课程ID', width: '6'},
                ],
                preSelectionSearch: {
                    // status: '0',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.market.fanlicfgsAdd', text: '新增'}],
            },
        },
    };
    return rtn;
});