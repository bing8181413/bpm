define(['.././common'], function (common) {
    var rtn = {
        appmessagesList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '标题', field: 'title', className: 'text-center'},
                {name: '文案', field: 'description', className: 'text-center'},
                {name: '跳转', field: 'url'},
                {name: '管理', fieldDirective: '<div live-appmessages-send data="item"></div>'},
            ],
            config: {
                title: '推送记录',
                api: common.live_domain + '/live/appmessagess',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {text: '公告id', value: 'id', type: 'text'},
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
                route: [{routeDirective: '<span live-appmessages-add></span>'}],
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