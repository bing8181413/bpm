define([], function() {
    var rtn = {
        batchlogsList: {
            columns: [
                {name: 'ID', field: 'batch_no', className: 'text-center width200'},
                {name: '类型', field: 'in_out_name', className: 'text-center'},
                {name: '奖学金总金额', field: 'coin_sum', className: 'text-center'},
                {
                    name: '用户', className: 'text-center',
                    fieldDirective: '<span show-table data="{text:item.user_count,modid:\'batchLogsUserList\',config:\'config\',columns:\'columns\',extApi:$root.common.domain+\'/distributions/batchlogs/\'+item.batch_no}"></span>',
                },
                {name: '备注', field: 'remark', className: 'text-center'},
                {name: '发放时间', field: 'created_at', className: 'text-center'},
                {name: '操作人', field: 'account.username', className: 'text-center'},
            ],
            config: {
                title: '奖学金发放列表',
                api: '/distributions/batchlogs',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'in_out', text: '奖学金类型', type: 'btnGroup', default: '',
                        enum: [
                            {value: '', text: '不限'},
                            {value: '1', text: '发放'},
                            {value: '2', text: '扣除'},
                        ],
                    },
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
                route: [{routeDirective: '<span batchlogs-add></span>'}],
            },
        },
        batchLogsUserList: {
            columns: [
                {name: '手机号码', field: 'user.mobile', className: 'text-center'},
                {name: '用户ID', field: 'user_id', className: 'text-center'},
                {name: '用户名称', field: 'user.name', className: 'text-center'},
                {name: '金额', field: 'coin', className: 'text-center'},
            ],
            config: {
                title: '奖学金发放的用户列表',
                api: '',
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
        },
    };
    return rtn;
});