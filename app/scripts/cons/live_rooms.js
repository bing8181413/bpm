define(['./common'], function (common) {
    var rtn = {
        liveRoomsList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-center'},
                {name: '房间号', field: 'room_no'},
                {name: '排序', field: 'order_by'},
                {name: '标题', field: 'title'},
                {
                    name: '直播时间',
                    fieldDirective: '<div><p ng-show="item.start_time">开始时间:<br/> <span ng-bind="item.start_time"></span></p>' +
                    '<p ng-show="item.end_time">结束时间:<br/><span ng-bind="item.end_time"></span></p></div>'
                },
                {
                    name: '关联测评',
                    fieldDirective: '<p ng-show="item.survey">测评ID:<span ng-bind="item.survey.plan_id"></span></p>' +
                    '<p ng-show="item.survey">查看答案有效时间:<span ng-bind="item.survey.show_result_time+\'s\'"></span></p>' +
                    '<span live-room-plan-add data="item"></span>'
                },

                {name: '订单类型', field: 'sku|common:\'live_sku\''},
                {
                    name: '房间状态/开关',
                    fieldDirective: '<h5><span ng-bind="item.status|keyVal:\'1\':\'开启\':\'2\':\'——\'"></span>&nbsp;&nbsp;&nbsp;<span change-live-room-status data="item"></span></h5>'
                },
                {
                    name: '直播流状态/开关',
                    fieldDirective: '<h5><span ng-bind="item.live_status|keyVal:\'1\':\'未开启&nbsp;&nbsp;&nbsp;&nbsp;\':\'2\':\'直播中&nbsp;&nbsp;&nbsp;&nbsp;\':\'3\':\'直播结束\'"></span>&nbsp;&nbsp;&nbsp;<span change-live-room-live-status data="item"></span></h5>'
                },
                {
                    name: '直播预告',
                    fieldDirective: '<h5><span ng-bind="\'开始:\'+item.plans[0].start_time" ng-show="item.plans[0].start_time"></span></h5>' +
                    '<h5><span ng-bind="\'结束:\'+item.plans[0].end_time" ng-show="item.plans[0].end_time"></span></h5>' +
                    '<h5 ng-show="!item.plans[0].start_time||!item.plans[0].end_time"><span ng-bind="\'无\'"></span>&nbsp;&nbsp;&nbsp;</h5>'
                },
                {
                    name: '操作',
                    fieldDirective: '<p><span live-room-edit data="item" ></span>&nbsp;&nbsp;&nbsp;' +
                    '<span live-room-plan data="item" ></span>&nbsp;&nbsp;&nbsp;' +
                    '<span live-room-download data="item"></span>&nbsp;&nbsp;&nbsp;</p>' +
                    '<span live-room-block data="item"></span>&nbsp;&nbsp;&nbsp;' +
                    '<span to-record-room-edit data="item" ></span>'
                },
            ],
            config: {
                title: '直播列表',
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
                    type: 1
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
                    {routeDirective: '<div live-room-add data=""></div>'},
                ]
            },
        }
    }
    return rtn;
});