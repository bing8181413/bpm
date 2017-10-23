define(['.././common'], function (common) {
    var rtn = {
        marketsharesreceiveList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '用户ID', field: 'user.user_id', className: 'text-center'},
                {name: '手机号', field: 'user.mobile', className: 'text-center'},
                {name: '领取时间', field: 'created_at', className: 'text-center'}
            ],
            config: {
                title: '观看权限-已领取列表',
                api: common.live_domain + '/live/marketshares/{id}/receives',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {text: '(领取时间)--开始', value: 'start_time', type: 'datetime'},
                    {text: '(领取时间)--结束', value: 'end_time', type: 'datetime'},
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
                ext: {
                    showNum: [
                        {text: '总数', type: 'total'},
                    ],
                }
            },
        }
    }
    return rtn;
});