define(['.././common'], function(common) {
    var rtn = {
        workUserList: {
            columns: [
                {name: '作业ID', field: 'id', className: 'text-center'},
                {
                    name: '用户', className: 'text-left width150',
                    fieldDirective: '<p>ID:<span bo-text="item.user_id"></span></p> ' +
                    '<p>用户名:<span bo-text="item.user.name|null2empty"></span></p> ',
                },
                {
                    name: '房间', className: 'text-left width150',
                    fieldDirective: '<p>房间ID:<span bo-text="item.room_id"></span></p> ' +
                    '<p>房间名:<span bo-text="item.room.title|null2empty"></span></p> ',
                },
                {
                    name: '视频组的课程', className: 'text-left',
                    fieldDirective: '<p>课程ID:<span bo-text="item.video_group_id"></span></p> ' +
                    '<p>课程名:<span bo-text="item.video_group.group_title|null2empty"></span></p> ',
                },
                {
                    name: '任务', className: 'text-left',
                    fieldDirective: '<p>任务ID:<span bo-text="item.work_task_id"></span></p> ' +
                    '<p>任务状态:<span bo-text="item.work_task.status|keyVal:\'0\':\'草稿\':\'1\':\'已发布\':\'2\':\'删除\'"></span></p> ',
                },
                {name: '提交时间', field: 'created_at'},
                {
                    name: '操作', className: 'text-center',
                    fieldDirective: '<span video-task-list="item" work-user-id="item.id" title="查看任务" type="user" handle="false"></span> ',
                },
            ],
            config: {
                title: '答题用户列表',
                api: common.live_domain + '/live/work/users',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'mobile', text: '用户ID', placeholder: '', default: ''},
                    {value: 'mobile', text: '任务ID', placeholder: '', default: ''},
                    {value: 'mobile', text: '课程ID', placeholder: '', default: ''},
                    {value: 'mobile', text: '作业ID', placeholder: '', default: ''},
                    {value: 'mobile', text: '关键词', placeholder: '', default: ''},
                ],
                preSelectionSearch: {},
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