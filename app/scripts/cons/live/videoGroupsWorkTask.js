define(['.././common'], function(common) {
    var rtn = {
        videoGroupsWorkTaskList: {
            columns: [
                {name: '题目ID', field: 'room_id', className: 'text-center'},
                {name: '题型', field: 'room.title', className: 'text-center'},
                {name: '选项数', field: 'room.record.play_count', filter: 'zero2empty'},
                {name: '更新时间', field: 'room.work_tasks.updated_at'},
                {
                    name: '状态', className: 'text-center',
                    fieldDirective: '<span ng-show="item.room.work_tasks" ng-bind="item.room.work_tasks.status|keyVal:\'0\':\'草稿\':\'1\':\'已发布\':\'2\':\'删除\'"></span> ',
                },
                {
                    name: '操作', className: 'text-center',
                    fieldDirective: '<p><a class="btn btn-primary btn-rounded btn-sm" ng-if="!item.room.work_tasks || !item.room.work_tasks.status == 2 ">添加任务</a> ' +

                    '<span ng-show="item.room.work_tasks && item.room.work_tasks.status == 1" ' +
                    ' show-table data="{text:\'查看任务\',modid:\'videoGroupTaskList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/work/tasks/\'+item.room.work_tasks.id}">查看任务</span> ' +

                    '<span ng-show="item.room.work_tasks && item.room.work_tasks.status == 0" ' +
                    ' show-table data="{text:\'修改任务\',modid:\'videoGroupTaskList\',config:\'config\',columns:\'columns\',extApi:$root.common.live_domain+\'/live/work/tasks/\'+item.room.work_tasks.id}">修改任务</span> ' +

                    '</p><p><a class="btn btn-danger btn-rounded btn-sm" ng-if="item.room.work_tasks && item.room.work_tasks.status == 0">删除任务</a></p> ',
                },
            ],
            config: {
                title: '视频任务列表',
                api: common.live_domain + '/live/videogroups/{id}/rooms',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'mobile', text: '手机号码', placeholder: '手机号码', default: ''},
                ],
                preSelectionSearch: {
                    status: '1',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            },
        },
    };
    return rtn;
});