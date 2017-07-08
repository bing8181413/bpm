define(['./common'], function (common) {
    var rtn = {
        recordRoomsList: {
            columns: [
                {name: '点播房间ID', field: 'id', className: 'text-center'},
                {name: '排序', field: 'order_by'},
                {name: '标题', field: 'title'},
                {name: '发布时间', field: 'record.publish_at'},
                {name: '播放次数', field: 'record.play_count'},
                {
                    name: '评论次数',
                    fieldDirective: '<h5><span ng-bind="item.record.comment_count|null2empty|zero2empty"></span>&nbsp;&nbsp;&nbsp;' +
                    '<a class="btn btn-info btn-rounded btn-sm" ui-sref="main.record_comment.list({id:item.id})">详情</a></h5>'
                },
                {
                    name: '状态/开关',
                    fieldDirective: '<h5><span ng-bind="item.status|keyVal:\'1\':\'开启\':\'2\':\'——\'"></span>&nbsp;&nbsp;&nbsp;<span change-live-room-status data="item"></span></h5>'
                },
                {
                    name: '操作',
                    fieldDirective: '<h5><a class="btn btn-success btn-rounded btn-sm" ui-sref="main.record_rooms.update({id:item.id})">编辑</a></h5>'
                },
            ],
            config: {
                title: '点播列表',
                api: common.live_domain + '/live/rooms',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
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