define(['.././common'], function(common) {
    var rtn = {
        specialActivityList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-center'},
                {name: '专题组名称', field: 'name', className: 'text-center'},

                {name: '类型', field: 'type', filter: 'keyVal:\'1\':\'专题组\':\'2\':\'活动\'', className: 'text-center'},
                {
                    name: '小图', className: 'text-center',
                    fieldDirective: '<show_image url="item.small_pic_url" width="100"></show_image>',
                },
                {
                    name: '头图', className: 'text-center',
                    fieldDirective: '<show_image url="item.head_pic_url" width="100"></show_image>',
                },

                {name: '创建时间', field: 'created_at'},
                {name: '状态', field: 'status', filter: 'keyVal:\'1\':\'上线\':\'2\':\'下线\''},
                {
                    name: '管理',
                    fieldDirective: '<div live-special-activities-edit data="item"></div>' +
                    // '<span delete-data data="" config="{url:$root.common.live_domain+\'/live/permissions/\'+item.id}" param="{}"></span> ' +
                    '',
                    className: 'text-center width150',
                },
            ],
            config: {
                title: 'APP专题组列表',
                api: common.live_domain + '/live/special/activities',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'status', text: '状态', type: 'btnGroup', default: '1', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '上线'},
                            {value: '2', text: '下线'},
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
                // route: [{routeDirective: '<span live-special-activities-edit></span>'}],
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