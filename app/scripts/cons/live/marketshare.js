define(['.././common'], function (common) {
    var rtn = {
        marketsharesList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '观看权限名称', field: 'title', className: 'text-center'},
                {name: '视频ID', field: 'obj_id', filter: 'zero2empty'},
                {
                    name: '领取链接', className: 'text-center',
                    fieldDirective: '<div modal-textarea title="查看链接" content="$root.common.wx_domain + \'/marketing/activitycoupon/code/\'+item.market.code"></div>'
                },
                {name: '发放总数量', field: 'total_count', filter: 'null2empty'},
                {
                    name: '已领取', field: 'receive_count',
                    // fieldDirective: '<span activity-coupons data="item"></span>',
                    className: 'text-center'
                },
                {name: '领取对象', field: 'receive_type|keyVal:\'1\':\'不限\':\'2\':\'新用户\':\'3\':\'老用户\''},
                {name: '创建时间', field: 'created_at', filter: 'null2empty'},
                {
                    name: '备注',
                    fieldDirective: '<div modal-textarea title="查看" content="item.remark|null2empty"></div>',
                    className: 'text-center'
                },
                {
                    name: '管理', className: 'text-center',
                    fieldDirective: '<a class="btn btn-primary btn-rounded" ui-sref="main.marketshare.update({id:item.id})">编辑</a>'
                }
            ],
            config: {
                title: '观看权限列表',
                api: common.live_domain + '/live/marketshares',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
                preSelectionSearch: {
                    // status: '0',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.marketshare.add', text: '新增观看权限'}]
            },
        }
    }
    return rtn;
});