define(['.././common'], function (common) {
    var rtn = {
        noticeList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                // {name: '生成时间', field: 'created_at', className: 'text-center'},
                {name: '公告标题', field: 'title', className: 'text-center'},
                {name: '公告内容', field: 'content', className: 'text-center'},
                {name: '发公告人', field: 'account.username'},
                {
                    name: '公告房间列表', className: 'text-center',
                    fieldDirective: '<span show-table data="{text:\'查看\',modid:\'noticeroomList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/notice/\'+item.id+\'/rooms\'}"></span>'
                },
                {name: '管理', fieldDirective: '<div live-notice-sending data="item"></div>'},
            ],
            config: {
                title: '公告管理',
                api: common.live_domain + '/live/notices',
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
                route: [{routeDirective: '<span live-notice-add></span>'}],
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