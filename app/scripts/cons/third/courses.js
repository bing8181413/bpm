define(['.././common'], function(common) {
    var rtn = {
        coursesList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-center'},
                {name: '名称', field: 'title|null2empty', className: 'text-left'},
                {name: '价格', field: 'price|null2empty'},
                {name: 'image', fieldDirective: '<div show-image url="item.image" width="100"></div>'},
                {name: '描述', field: 'desc|null2empty', className: 'text-left'},
                {
                    name: '订单', className: 'text-center',
                    fieldDirective: '<span show-table data="{text:\'查看\',modid:\'coursesOrderList\',config:\'config\',columns:\'columns\',extApi:$root.common.third_domain+\'/orders/\',ext:{course_id:item.id}}"></span>',
                },
                {
                    name: '管理', className: 'text-center',
                    fieldDirective: '<a class="btn btn-primary btn-rounded btn-sm" ui-sref="main.courses.update({id:item.id})">编辑</a>',
                },
            ],
            config: {
                title: '课程列表',
                api: common.third_domain + '/courses',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'title', text: '标题'},
                ],
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.courses.add', text: '新增课程'}],
                ext: {
                    showNum: [
                        {text: '总数', type: 'total'},
                    ],
                },
            },
        },
        coursesOrderList: {
            columns: [
                {name: '用户ID', field: 'user_id', className: 'text-center'},
                {name: 'ID', field: 'id', className: 'text-center'},
                {
                    name: '课程名称/trade_no', className: 'text-left',
                    fieldDirective: '<span bo-text="item.title|null2empty"></span><br><span bo-text="item.trade_no|null2empty"></span>',
                },
                {
                    name: '下单时间/付款时间', className: 'text-left',
                    fieldDirective: '<span bo-text="\'下单时间:\'+(item.created_at|null2empty)"></span><br><span bo-text="\'付款时间:\'+(item.pay_success_time|null2empty)"></span>',
                },
                {name: '价格', field: 'total_fee/100'},
                {name: '付款状态', field: 'pay_status|keyVal:\'1\':\'支付\''},
            ],
            config: {
                title: '订单列表',
                api: common.third_domain + '/order',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'created_date_min', text: '下单时间-开始', type: 'datetime'},
                    {value: 'created_date_max', text: '结束', type: 'datetime'},
                    {value: 'user_id', text: '用户ID'},
                ],
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                ext: {
                    showNum: [
                        {text: '总数', type: 'total'},
                    ],
                },
            },
        },
    };
    return rtn;
});