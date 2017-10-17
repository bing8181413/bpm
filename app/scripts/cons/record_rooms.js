define(['./common'], function (common) {
    var rtn = {
        recordRoomsList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-center'},
                {name: '排序', field: 'order_by'},
                {name: '房间号', field: 'room_no'},
                {name: '标题', field: 'title'},
                {name: '苹果标示', field: 'ios_audit|keyVal:\'1\':\'是\':\'2\':\'——\''},
                {name: '发布时间', field: 'record.created_at'},
                {name: '播放次数', field: 'record.play_count'},
                {
                    name: '评论次数',
                    fieldDirective: '<h5><a class="btn btn-info btn-rounded btn-sm" ui-sref="main.record_comment.list({id:item.record.id})">详情</a>' +
                    '&nbsp;&nbsp;&nbsp;<span ng-bind="item.record.comment_count|null2empty|zero2empty"></span></h5>'
                },
                {
                    name: '状态/开关',
                    fieldDirective: '<h5><span ng-bind="item.status|keyVal:\'1\':\'开启\':\'2\':\'——\'"></span>&nbsp;&nbsp;&nbsp;<span change-live-room-status data="item"></span></h5>'
                },
                {
                    name: '操作',
                    fieldDirective: '<a class="btn btn-success btn-rounded btn-sm" ui-sref="main.record_rooms.update({id:item.id})">编辑</a>' +
                    '&nbsp;&nbsp;&nbsp;<span record-room-download data="item"></span>' +
                    '&nbsp;&nbsp;&nbsp; <span record-rooms-copy data="item"></span>'
                },
            ],
            config: {
                title: '点播列表',
                api: common.live_domain + '/live/rooms',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'status', text: '房间状态', type: 'btnGroup', default: '', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '开启的'},
                            {value: '2', text: '关闭的'},
                            // {value: '0', text: '草稿'},
                        ]
                    },
                    {value: 'keyword', text: '关键字', placeholder: '标题', default: ''},
                    {value: 'id', text: '点播房间ID', placeholder: '点播房间ID', default: ''},
                ],
                preSelectionSearch: {
                    type: 2
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.record_rooms.add', text: '新增视频'}],
            },
        }
    }
    return rtn;
});