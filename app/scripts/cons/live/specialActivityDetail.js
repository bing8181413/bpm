define(['.././common'], function(common) {
    var rtn = {
        specialActivityDetailList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-center'},
                {name: '专题名称', field: 'title', className: 'text-center'},

                {
                    name: '专题头图', className: 'text-center',
                    fieldDirective: '<show_image url="item.head_pic_url" width="100"></show_image>',
                },
                {name: '上线时间', field: 'online_time'},

                {name: '状态', field: 'status', filter: 'keyVal:\'1\':\'正常\':\'2\':\'删除\''},

                {
                    name: '管理',
                    fieldDirective: '<div live_special_activity_detail_edit data="item"></div>' +
                    // '<span delete-data data="" config="{url:$root.common.live_domain+\'/live/permissions/\'+item.id}" param="{}"></span> ' +
                    '',
                    className: 'text-center width150',
                },
            ],
            config: {
                title: 'APP专题列表',
                api: common.live_domain + '/live/special/activity/details',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'id', text: '专题ID', type: 'text',
                    },
                    {
                        value: 'title', text: '专题名称', type: 'text',
                    },
                    {
                        value: 'status', text: '状态', type: 'btnGroup', default: '', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '正常'},
                            {value: '2', text: '删除'},
                        ],
                    },
                ],
                preSelectionSearch: {
                    status: '1',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{routeDirective: '<div live_special_activity_detail_edit></div>'}],
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