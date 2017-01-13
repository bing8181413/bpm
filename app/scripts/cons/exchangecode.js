define([], function () {
    var rtn = {
        exchangecodeList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '总量', field: 'total'},
                {name: '适用范围', field: 'category', filter: 'coupon_category'},
                {name: '商品品类', field: 'sku', filter: 'coupon_sku'},
                {name: '商品类型(频率)', field: 'frequency_type', filter: 'coupon_frequency_type'},
                {name: '金额', field: 'price'},
                {name: '优惠券名称', field: 'title'},
                {name: '优惠券领取数', field: 'coupon_receive_num'},
                {name: '优惠券有效天数', field: 'valid_days'},
                {
                    name: '生成时间', field: 'created_at', truncateText: true,
                    truncateTextLength: 10,
                    truncateTextBreakOnWord: false,
                    tooltip: 'created_at',
                    tooltipPlacement: 'bottom',
                },
                {
                    name: '有效期',
                    fieldDirective: '<p ng-bind="((item.start_time || \'\')+(item.expire_time || \'\')) |characters:6:true" ' +
                    'tooltip-placement="bottom" tooltip="上线时间: {{item.start_time}} 过期时间: {{item.expire_time}}">'
                },
                {
                    name: '导出兑换码',
                    fieldDirective: '<div exchangecode-export data="item"></div>'
                },
                {name: '操作账户', field: 'account.username'}
            ],
            config: {
                title: '兑换码',
                api: '/exchangecodes',
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
                route: [{value: 'main.exchangecode.add', text: '新增兑换码'}]
            }
        }
    }
    return rtn;
});