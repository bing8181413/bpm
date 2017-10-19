define(['.././common'], function (common) {
    var rtn = {
        marketsharesList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '视频ID', field: 'obj_id', filter: 'zero2empty'},
                {name: '视频组名称', field: 'videgroup.group_title', className: 'text-center'},
                {
                    name: '领取链接', className: 'text-center',
                    fieldDirective: '<div modal-textarea title="查看链接" content="$root.common.wx_domain + \'/marketvideoshare/code/\'+item.market.code"></div>'
                },
                {name: '发放总数量', field: 'total_count', filter: 'null2empty'},
                {
                    name: '已领取', className: 'text-center',
                    fieldDirective: '<span show-table data="{text:item.receive_count,modid:\'marketsharesreceiveList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/marketshares/\'+item.id+\'/receives\'}"></span>'
                },
                {name: '领取对象', field: 'receive_type|keyVal:\'1\':\'不限\':\'2\':\'新用户\':\'3\':\'老用户\':\'4\':\'手机号码列表\''},
                {
                    name: '手机号码列表', className: 'text-center',
                    fieldDirective: '<span show-table ng-show="item.receive_type==4" data="{text:\'查看\',modid:\'marketshareUserList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/marketshares/\'+item.id+\'/mobiles\'}"></span>'
                },
                {
                    name: '导入用户', className: 'text-center',
                    fieldDirective: '<span marketshare-import-user ng-show="item.receive_type==4"  data="item" ></span>'
                },
                {name: '创建时间', field: 'created_at', filter: 'null2empty'},
                {
                    name: '备注',
                    fieldDirective: '<div modal-textarea title="查看" content="item.remark|null2empty"></div>',
                    className: 'text-center'
                },
                {
                    name: '管理', className: 'text-center',
                    fieldDirective: '<a class="btn btn-primary btn-rounded btn-sm" ui-sref="main.marketshare.update({id:item.id})">编辑</a>'
                }
            ],
            config: {
                title: '运营分享视频组权限列表',
                api: common.live_domain + '/live/marketshares',
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
                route: [{value: 'main.marketshare.add', text: '新增运营分享视频组权限'}]
            },
        }
    }
    return rtn;
});