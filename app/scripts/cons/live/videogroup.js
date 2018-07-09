define(['.././common'], function(common) {
    var rtn = {
        videogroupsList: {
            columns: [
                {
                    name: 'ID,排序,显示', className: 'width150 mobile_show',
                    fieldDirective: '<div>' +
                    '<p><span >ID</span>:<span ng-bind="item.id|null2empty"></span></p>' +
                    '<p><span >排序</span>:<span ng-bind="item.order_by|null2empty"></span></p>' +
                    '<p class="label" ' +
                    'ng-class="{\'label-primary\':item.visible==1,\'label-warning\':item.visible!=1}">' +
                    '<span ng-bind="item.visible|keyVal:\'1\':\'显示\':\'2\':\'----\'"></span></p>' +
                    '</div>',
                },
                {
                    name: '视频组信息', className: 'width200 mobile_show',
                    fieldDirective: '<div>' +
                    '<div modal-textarea title="视频组URL" size="sm" content="$root.common.wx_domain+\'/groupvideolist/video_group_id/\'+item.id"></div>' +
                    '<p><span ng-bind="item.group_title"></span></p>' +
                    '</div>',
                },
                {
                    name: '时间', className: 'width250 mobile_show',
                    fieldDirective: '<div>' +
                    '<p><span >发布时间</span>:<span ng-bind="item.created_at|null2empty"></span></p>' +
                    '<p><span >权限发放</span>:<span ng-bind="item.open_time|null2empty"></span></p>' +
                    '<p><span >首播时间</span>:<span ng-bind="item.first_time|null2empty"></span></p>' +
                    '</div>',
                },
                {
                    name: '关联信息', className: 'width150 mobile_show',
                    fieldDirective: '<div>' +
                    '<p><span >房间和作业</span>: <span show-table data="{text:item.video_count||0,modid:\'videoGroupsRoomList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/videogroups/\'+item.id+\'/rooms\'}"></span></p>' +
                    '<p><span >关联活动</span>:<span ng-show="item.pay_type!=2">免费</span> <span ng-show="item.pay_type==2" show-table data="{text:\'查看\',modid:\'videogroupsoptionList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/videogroups/\'+item.id+\'/options\'}"></span></p>' +
                    '<p><span >关联SKU</span>:<span ng-show="item.pay_type!=2">免费</span> <span ng-show="item.pay_type==2" show-table data="{text:\'查看\',modid:\'videogroupsskuoptionList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/videogroups/\'+item.id+\'/skuoptions\'}"></span></p>' +
                    '</div>',
                },
                {
                    name: '视频组权限', className: 'width200 mobile_show',
                    fieldDirective: '<div>' +
                    '<p><span >用户权限导入</span>: <span videogroup-import-user data="item" title="导入" ></span></p>' +
                    '<p><span >用户权限列表</span>: <span show-table data="{text:\'查看\',modid:\'videogroupUserList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/videogroups/\'+item.id+\'/users\'}"></span></p>' +
                    '</div>',
                },
                {
                    name: '备注', className: 'width150 mobile_show',
                    fieldDirective: '<div><p><span ng-bind="item.remark"></span></p>' +
                    '</div>',
                },
                {
                    name: '任务发布情况', className: 'width200 mobile_show',
                    fieldDirective: '<p class="label label-primary"><span ng-bind="item.work_tasks.published+\'/\'+item.work_tasks.total"></span></p>',
                },
                {
                    name: '管理', className: 'text-center',
                    fieldDirective:
                    '<p> <a class="btn btn-primary btn-rounded btn-sm" ui-sref="main.videoGroupsRoom.list({id:item.id})">查看详情</a></p>' +
                    '<a class="btn btn-primary btn-rounded btn-sm" ui-sref="main.videogroups.update({id:item.id})">编辑</a>',
                },
            ],
            config: {
                title: '视频组列表',
                api: common.live_domain + '/live/videogroups',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'visible', text: '是否显示', type: 'btnGroup', default: '', width: '6',
                        enum: [
                            {value: '', text: '全 部'},
                            {value: '1', text: '是'},
                            {value: '2', text: '否'},
                        ],
                    },
                    {text: '关键字', value: 'keyword', type: 'text'},
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
                route: [{value: 'main.videogroups.add', text: '新增视频组'}],
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