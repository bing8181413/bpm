define([], function () {
    var rtn = {
        liveshareList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '观看权限名称', field: 'title', className: 'text-center'},
                {name: '视频ID', field: 'live_id', filter: 'zero2empty'},
                {
                    name: '领取链接',
                    fieldDirective: '<div modal-textarea title="查看链接" content="$root.common.wx_domain + \'/marketing/activitycoupon/code/\'+item.code"></div>'
                },
                {name: '发放总数量', field: 'total', filter: 'null2empty'},
                {
                    name: '已使用/已领取',
                    fieldDirective: '<span activity-coupons data="item"></span>',
                    className: 'text-center'
                },
                {name: '领取对象', field: 'target', filter: 'null2empty'},
                {name: '创建时间', field: 'created_at', filter: 'null2empty'},
                {name: '备注', fieldDirective: '<div modal-textarea title="查看" content="item.remark|null2empty"></div>'},
                {
                    name: '管理',
                    fieldDirective: '<span live-share-update data="item"></span>'
                }
            ],
            config: {
                title: '观看权限列表',
                api: '/markets/liveshare',
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
                route: [{value: 'main.liceshare.add', text: '新增观看权限'}]
            },
        }
    }
    return rtn;
});