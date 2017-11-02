define(['./common'], function (common) {
    var rtn = {
        certList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-center'},
                {name: '名称', field: 'name'},
                {name: '视频组ID', field: 'video_group_id'},
                {name: '测评活动', field: 'activity.title||(item.activity_id|null2empty)'},
                {
                    name: '正确率',
                    fieldDirective: '<span ng-bind="item.pass_rate+\'%\'" ng-show="item.pass_rate"></span>',
                    className: 'text-center'
                },
                {
                    name: '证书获取情况', className: 'text-center',
                    fieldDirective: '<span show-table data="{text:\'证书获取用户列表\',modid:\'certUserList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/certs/\'+item.id+\'/users\'}"></span>'
                },
                {name: '证书预览', field: 'created_at', className: 'text-center'},
                {name: '备注', field: 'remark|null2empty'},
                {
                    name: '操作',
                    fieldDirective: '<div cert-update data="item"></div>'
                },
            ],
            config: {
                title: '问答证书列表',
                api: common.live_domain + '/live/certs',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    // {value: 'mobile', text: '手机号码', placeholder: '手机号码'},
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
                route: [{value: 'main.cert.add', text: '新增问答证书'}]
            }
        }
    }
    return rtn;
});