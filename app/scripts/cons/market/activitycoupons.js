define([], function () {
    var rtn = {
        activitycouponsList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '优惠券名称', field: 'title', className: 'text-center'},
                {name: '活动ID', field: 'product_id', filter: 'zero2empty'},
                {
                    name: '领取链接',
                    fieldDirective: '<div ng-show="item.type==1" modal-textarea title="查看单个券链接" content="$root.common.wx_domain + \'/marketing/activitycoupon/code/\'+item.code"></div>' +
                    '<div ng-show="item.type==2" modal-textarea title="查看组合券链接" content="$root.common.wx_domain + \'/marketing/combinationcoupons/code/\'+item.code"></div>'
                },
                {name: '满(金额)', field: 'over_price', filter: 'null2empty'},
                {name: '减(金额)', field: 'price', filter: 'null2empty'},
                {
                    name: '兑换有效期',
                    fieldDirective: '<span ng-bind="(item.start_time|null2empty)+\'-\'+(item.end_time|null2empty)"></span>'
                },
                {name: '优惠券时间', field: 'days', filter: 'null2empty'},
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
                    fieldDirective: '<span activity-coupons-update data="item"></span>'
                }
            ],
            config: {
                title: '活动优惠券',
                api: '/markets/activitycoupons',
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
                route: [{value: 'main.activitycoupons.add', text: '新增优惠劵'}]
            },
        }
    }
    return rtn;
});