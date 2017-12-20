define([], function () {
    var rtn = {
        combinationcouponsList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '优惠券名称', field: 'title'},
                {
                    name: '领取链接',
                    fieldDirective: '<div modal-textarea title="查看链接" content="$root.common.wx_domain + \'/marketing/combinationcoupons/code/\'+item.code"></div>'
                },
                {
                    name: '优惠券数量',
                    // fieldDirective: '<span combinationcoupons-count data="item"></span>'
                    fieldDirective: '<span show-table data="{text:item.combination_count,modid:\'combinationcouponsList\',config:\'listconfig\',columns:\'listcolumns\',extApi:$root.common.domain+\'/markets/combinationcoupons/\'+item.id+\'/lists\'}"></span>'
                },
                {
                    name: '兑换有效期',
                    fieldDirective: '<span ng-bind="item.start_time+\' - \'+item.end_time"></span>'
                },
                {name: '发放总数量', field: 'total'},
                {name: '创建时间', field: 'created_at'},
                {name: '备注', field: 'remark'},
                {
                    name: '操作',
                    fieldDirective: '<a class="btn btn-primary btn-rounded btn-sm" ui-sref="main.combinationcoupons.update({id:item.id})">编辑</a>'
                },
            ],
            config: {
                title: '组合优惠券管理',
                api: '/markets/combinationcoupons',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [{value: 'keyword', text: '关键字', placeholder: ''}],
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
                route: [{value: 'main.combinationcoupons.add', text: '新增组合优惠劵'}]
            },
            listcolumns: [
                {name: '优惠券ID', field: 'id'},
                {name: '名称', field: 'combination_coupon_name'},
                {name: '领取数量', field: 'logs_count'},
                {name: '使用数量', field: 'use_count'},
                {name: '过期数量', field: 'expire_count'},
                {
                    name: '待使用数量',
                    fieldDirective: '<span ng-bind="item.logs_count-item.expire_count-item.use_count"></span>'
                },
            ],
            listconfig: {
                title: '优惠券数量',
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