define([], function() {
    var rtn = {
        productstudentshipsList: {
            columns: [
                {name: '课程ID', field: 'product_id', className: 'text-center'},
                {name: '课程名称', field: 'title', className: 'text-left'},
                {
                    name: '开团奖学金 / 订单', className: 'text-center',
                    fieldDirective: '<span ng-bind="item.stat_studentship.tuan_coin+\' / \'+item.stat_studentship.tuan_order"></span>',
                },
                {
                    name: '分销奖学金 / 订单', className: 'text-center',
                    fieldDirective: '<span show-table data="{ext:{product_id:item.product_id,user_id:searchParams.user_id,start_time:searchParams.start_time,end_time:searchParams.end_time},text:item.stat_studentship.dist_coin+\' / \'+item.stat_studentship.dist_order,modid:\'productstudentshipsList\',config:\'studentships_config\',columns:\'studentships_columns\'}"></span>',
                },
                // {name: '退单数量', fieldDirective: '<span ng-bind="searchParams|json"></span>', className: 'text-center'},
                // {name: '未退单奖学金', field: 'stat_studentship', className: 'text-center'},
            ],
            config: {
                title: '奖学金列表',
                api: '/distributions/productstudentships',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'product_id', text: '课程ID', placeholder: '课程ID'},
                    {value: 'user_id', text: '用户ID', placeholder: '用户ID'},
                    {value: 'start_time', text: '开始时间', type: 'datetime'},
                    {value: 'end_time', text: '结束时间', type: 'datetime'},
                ],
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
                // route: [{value: 'main.productstudentships.add', text: '新增运营位'}],
                ext: {
                    showNum: [
                        {text: '课程总数', fieldDirective: '<span class="label label-success" ng-bind="_json.stat.product_count"></span> &nbsp;&nbsp;&nbsp;'},
                        {
                            text: '开团奖学金总数',
                            fieldDirective: '<span class="label label-success" ng-bind="_json.stat.tuan_coin"></span>&nbsp;&nbsp;&nbsp; ',
                        },
                        {
                            text: '分销奖学金总数',
                            fieldDirective: '<span class="label label-success" ng-bind="_json.stat.dist_coin"></span>&nbsp;&nbsp;&nbsp; ',
                        },
                    ],
                },
            },
            studentships_columns: [
                {name: '分销层级', field: 'tuan_type|studentships_type:item.distribution_type', className: 'text-center'},
                {name: '收益人数', field: 'user_num', className: 'text-center'},
                {name: '订单', field: 'order_num', className: 'text-center'},
                {name: '奖学金金额', field: 'coin_total', className: 'text-center'},
            ],
            studentships_config: {
                title: '分销奖学金',
                api: '/distributions/studentships',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    {value: 'product_id', text: '课程ID', placeholder: '课程ID'},
                    {value: 'user_id', text: '用户ID', placeholder: '用户ID'},
                    {value: 'start_time', text: '开始时间', type: 'datetime'},
                    {value: 'end_time', text: '结束时间', type: 'datetime'},
                ],
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
                // route: [{value: 'main.productstudentships.add', text: '新增运营位'}],
                ext: {
                    showNum: [
                        {
                            fieldDirective: '<span ng-bind="\'课程ID：\'+extSearch.product_id+\'  |  用户ID：\'+extSearch.user_id+\'  |  开始时间：\'+(extSearch.start_time||\'\')+\'  |  结束时间：\'+(extSearch.end_time||\'\')"></span> &nbsp;&nbsp;&nbsp;',
                        },
                    ],
                },
            },
        },
    };
    return rtn;
});