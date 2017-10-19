define(['.././common'], function (common) {
    var rtn = {
        videogroupsList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '发布时间', field: 'created_at', filter: 'null2empty'},
                {name: '视频组名称', field: 'group_title', className: 'text-center'},
                {
                    name: '视频数量', className: 'text-center',
                    fieldDirective: '<span show-table data="{text:item.video_count||0,modid:\'videogroupsroomList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/videogroups/\'+item.id+\'/rooms\'}"></span>'
                },
                {
                    name: '关联活动', className: 'text-center',
                    fieldDirective: '<span ng-show="item.pay_type!=2">免费</span> <span ng-show="item.pay_type==2" show-table data="{text:\'查看\',modid:\'videogroupsoptionList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/videogroups/\'+item.id+\'/options\'}"></span>'
                },
                {
                    name: '关联SKU', className: 'text-center',
                    fieldDirective: '<span ng-show="item.pay_type!=2">免费</span> <span ng-show="item.pay_type==2" show-table data="{text:\'查看\',modid:\'videogroupsskuoptionList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/videogroups/\'+item.id+\'/skuoptions\'}"></span>'
                },
                // {
                //     name: '观看用户', className: 'text-center',
                //     fieldDirective: '<span show-table data="{text:\'查看\',modid:\'videogroupUserList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/videogroups/\'+item.id+\'/users\'}"></span>'
                // },
                // {
                //     name: '导入用户', className: 'text-center',
                //     fieldDirective: '<span videogroup-import-user data="item" ></span>'
                // },
                {
                    name: '备注',
                    fieldDirective: '<div modal-textarea title="查看" content="item.remark|null2empty"></div>',
                    className: 'text-center'
                },
                {
                    name: '管理', className: 'text-center',
                    fieldDirective: '<a class="btn btn-primary btn-rounded btn-sm" ui-sref="main.videogroups.update({id:item.id})">编辑</a>'
                }
            ],
            config: {
                title: '视频组列表',
                api: common.live_domain + '/live/videogroups',
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
                route: [{value: 'main.videogroups.add', text: '新增视频组'}]
            },
        }
    }
    return rtn;
});