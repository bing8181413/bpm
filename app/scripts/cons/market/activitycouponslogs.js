define([], function () {
    var rtn = {
        activitycouponslogsList: {
            columns: [
                {name: 'ID', field: 'id'},
                {name: '手机号', field: 'user.mobile'},
                {name: '领取时间', field: 'created_at', filter: 'null2empty'},
                {name: '优惠券到期时间', field: 'coupon.expire_time', filter: 'null2empty'},
                {name: '使用时间', field: 'order.order_time', filter: 'null2empty'},
                {name: '支付金额', field: 'order.order_price', filter: 'null2empty'},
                {
                    name: '优惠券状态',
                    field: 'coupon.status',
                    filter: 'keyVal:\'1\':\'正常\':\'2\':\'正在使用\':\'3\':\'已经用过\':\'4\':\'过期\''
                },
            ],
            config: {
                title: '活动优惠券使用情况',
                api: '这个是其他地方关联过来的了',
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
            },
        }
    }
    return rtn;
});