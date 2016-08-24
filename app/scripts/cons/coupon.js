define([], function () {
    var rtn = {
        couponList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '适用范围', field: 'coupon.category', filter: 'coupon_category'},
                {name: '商品品类', field: 'coupon.sku', filter: 'coupon_sku'},
                {name: '商品类型(频率)', field: 'coupon.frequency_type', filter: 'coupon_frequency_type'},
                {name: '金额', field: 'coupon.price'},
                {name: '优惠券名称', field: 'coupon.title'},
                {name: '生成时间', field: 'coupon.created_at'},
                {name: '发送数量', field: 'send_count'},
                {
                    name: '有效期',
                    fieldDirective: '<span ng-bind="item.coupon.start_time+\'-\'+item.coupon.expire_time"></span>'
                },
                {
                    name: '手机号码',
                    fieldDirective: '<div modal-textarea title="查看" content="item.mobile_list"></div>'
                },
                {name: '操作账户', field: 'account.username'}
            ],
            config: {
                title: '优惠券管理',
                api: '/coupons',
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
                route: [{value: 'main.coupon.add', text: '新增优惠劵'}]
            },
            columns_by_user: [
                {name: 'ID', field: 'coupon_id', className: 'text-right'},
                {name: '适用范围', field: 'category', filter: 'coupon_category'},
                {name: '商品品类', field: 'sku', filter: 'coupon_sku'},
                {name: '商品类型(频率)', field: 'frequency_type', filter: 'coupon_frequency_type'},
                {name: '金额', field: 'price'},
                {name: '优惠券名称', field: 'title'},
                {name: '生成时间', field: 'created_at'},
                // {name: '发送数量', field: 'send_count'},
                {
                    name: '有效期',
                    fieldDirective: '<span ng-bind="item.start_time+\'-\'+item.expire_time"></span>'
                },
                // {
                //     name: '手机号码',
                //     fieldDirective: '<div modal-textarea title="查看" content="item.mobile_list"></div>'
                // },
                {name: '操作账户', field: 'account.username'}
            ],
            config_by_user: {
                title: '优惠券',
                api: '/coupons',
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
                // route: [{value: 'main.coupon.add', text: '新增优惠劵'}]
            }
        }
    }
    return rtn;
});