define([], function () {
    var rtn = {
        liveRoomsList: {
            columns: [
                {name: '房间ID', field: 'id', className: 'text-center'},
                {name: '排序', field: 'order_by'},
                {name: '标题', field: 'title'},
                {
                    name: '房间开关',
                    fieldDirective: '<h5><span ng-bind="item.status|keyVal:\'1\':\'开启\':\'2\':\'关闭\'"></span>&nbsp;&nbsp;&nbsp;<span change-live-room-status data="item"></span></h5>'
                },
                {
                    name: '直播流开关',
                    fieldDirective: '<h5><span ng-bind="item.live_status|keyVal:\'1\':\'开启\':\'2\':\'关闭\'"></span>&nbsp;&nbsp;&nbsp;<span change-live-room-live-status data="item"></span></h5>'
                },
                {
                    name: '直播预告',
                    fieldDirective: '<h5><span ng-bind="item.updated_at"></span>&nbsp;&nbsp;&nbsp;<span live-room-plan data="item" ></span></h5>'
                },
                {
                    name: '操作',
                    fieldDirective: '<h5> <div live-room-edit data="item" ></div>' +
                    '<div live-room-data data="item" ></div></h5>'
                },
            ],
            config: {
                title: '直播列表',
                api: '/live/rooms',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'keyword', text: '关键字', placeholder: '标题', default: ''},
                    // {
                    //     value: 'status', text: '商品状态', type: 'btnGroup', default: '1', width: '6',
                    //     enum: [
                    //         {value: '', text: '全部'},
                    //         {value: '1', text: '正在进行'},
                    //         {value: '3', text: '已下线'},
                    //         // {value: '0', text: '草稿'},
                    //     ]
                    // },
                    // {   // available_type 1 有效期内 2 尚未开始	3 已经过期 4 有效期外
                    //     type: 'btnGroupArray',
                    //     value: 'flag',
                    //     text: '状态',
                    //     default: 1, //有enum_text时 enumde index 的值
                    //     width: '6',
                    //     enum_text: ['status', 'available_type'],//  有  enum_text 说明是数组
                    //     enum: [
                    //         {value: ['', ''], text: '全部'},
                    //         {value: ['1', '1'], text: '正在进行'},
                    //         {value: ['3', ''], text: '已下线'},
                    //         {value: ['1', '2'], text: '待上线'},
                    //     ]
                    // },
                    // {
                    //     value: 'visible', text: '是否显示', type: 'btnGroup', default: '0', width: '6',
                    //     enum: [
                    //         {value: '0', text: '全部'},
                    //         {value: '1', text: '是'},
                    //         {value: '2', text: '否'},
                    //     ]
                    // },
                ],
                preSelectionSearch: {
                    // category: [1, 2],
                    // key: 'deviceNo',
                    // value: 'testinfo'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [
                    {routeDirective: '<div live-room-add data="">新增商品</div>'},
                ]
            },
        }
    }
    return rtn;
});