define(['.././common'], function (common) {
    var rtn = {
        permissionsList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-center'},
                {name: '角色', field: 'role_type', filter: 'live_role_type', className: 'text-center'},
                {name: '用户昵称', field: 'user.name', className: 'text-center'},
                {name: '用户ID', field: 'user_id'},
                {name: '关联视频组', field: 'permissions_count'},
                // {
                //     name: '关联视频组', className: 'text-center',
                //     fieldDirective: '<span show-table data="{text:\'查看\',modid:\'permissionsroomList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/permissions/\'+item.id+\'/rooms\'}"></span>'
                // },
                {
                    name: '管理',
                    fieldDirective: '<div live-permission-edit data="item"></div>' +
                    '<span delete-data data="" config="{url:$root.common.live_domain+\'/live/permissions/\'+item.id}" param="{}"></span> ',
                    className: 'text-center width150'
                },
            ],
            config: {
                title: '权限配置',
                api: common.live_domain + '/live/permissions',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'role_type', text: '角色', type: 'btnGroup', default: '', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '老师'},
                            {value: '2', text: '学生'},
                        ]
                    },
                    {text: '用户ID', value: 'user_id', type: 'text'},
                ],
                preSelectionSearch: {
                    // status: '0',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{routeDirective: '<span live-permission-edit></span>'}],
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