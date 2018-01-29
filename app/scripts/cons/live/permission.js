define(['.././common'], function (common) {
    var rtn = {
        permissionsList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '角色', field: 'role_id', filter: '', className: 'text-center'},
                {name: '用户昵称', field: 'user_id', className: 'text-center'},
                {name: '账号', field: 'user_id'},
                {
                    name: '关联视频组', className: 'text-center',
                    fieldDirective: '<span show-table data="{text:\'查看\',modid:\'permissionsroomList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/permissions/\'+item.id+\'/rooms\'}"></span>'
                },
                {name: '管理', fieldDirective: '<div live-permission-edit data="item"></div>', className: 'text-center width150'},
            ],
            config: {
                title: '权限配置',
                api: common.live_domain + '/live/permissions',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    // {text: '公告id', value: 'id', type: 'text'},
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