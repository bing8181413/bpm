define(['.././common'], function(common) {
    var rtn = {
        videoGroupsRoomList: {
            columns: [
                {name: '房间/视频ID', field: 'room_id', className: 'text-center'},
                {name: '视频名称', field: 'room.title', className: 'text-center'},
                {name: '播放次数', field: 'room.record.play_count', filter: 'zero2empty'},
                {name: '评论次数', field: 'room.record.comment_count', filter: 'zero2empty'},
                {name: '任务ID', field: 'room.work_tasks.id'},
                {name: '任务更新时间', field: 'room.work_tasks.updated_at'},
                {
                    name: '状态', className: 'text-center',
                    fieldDirective: '<span ng-show="item.room.work_tasks" ng-bind="item.room.work_tasks.status|keyVal:\'0\':\'草稿\':\'1\':\'已发布\':\'2\':\'删除\'"></span> ',
                },
                {
                    name: '操作', className: 'text-center',
                    fieldDirective: '<p>' +
                    '<span video-task-list="item" task-id="item.room.work_tasks.id" title="添加任务" ng-if="!item.room.work_tasks || item.room.work_tasks.status == 2" handle="true"></span> ' +

                    '<span video-task-list="item" task-id="item.room.work_tasks.id" title="查看任务" ng-if="item.room.work_tasks && item.room.work_tasks.status == 1" handle="false"></span> ' +

                    '<span video-task-list="item" task-id="item.room.work_tasks.id" title="修改任务" ng-if="item.room.work_tasks && item.room.work_tasks.status == 0" handle="true"></span> ' +

                    '</p><p>' +
                    '<span delete-data data="" config="{url:$root.common.domain+\'/mobile/live/work/tasks/\'+item.room.work_tasks.id,method:\'DELETE\',text:\'删除任务\'}" param="{}"' +
                    ' callback="updateList()" ng-if="item.room.work_tasks && item.room.work_tasks.status == 0 || $root.hjm && $root.hjm.remark === \'admin\'"></span>' +
                    '</p> ',
                },
            ],
            config: {
                title: '视频组下视频与任务列表',
                api: common.live_domain + '/live/videogroups/{id}/rooms',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'mobile', text: '手机号码', placeholder: '手机号码', default: ''},
                ],
                preSelectionSearch: {
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