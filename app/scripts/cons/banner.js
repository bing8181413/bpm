define([], function () {
    var rtn = {
        bannerList: {
            columns: [
                {name: '运营位ID', field: 'banner_id', className: 'text-right'},
                {
                    name: '标题', field: 'title', truncateText: true,
                    truncateTextLength: 7,
                    truncateTextBreakOnWord: false,
                    tooltipPlacement: 'bottom',
                    tooltip: 'title',
                },
                {name: '类型', field: 'category'},
                {name: '图片', fieldDirective: '<show_image url="item.pic_url" width="100"></show_image>',},
                {
                    name: '备注', field: 'remark',
                    truncateText: true,
                    truncateTextLength: 10,
                    truncateTextBreakOnWord: false,
                    tooltipPlacement: 'bottom',
                    tooltip: 'remark',
                },
                {name: '当前排序', field: 'sort_num'},
                {name: '当前状态', field: 'status'},
                {
                    name: '展示时间',
                    fieldDirective: '<p ng-bind="(item.start_time+item.end_time) |characters:6:true" tooltip-placement="bottom" ' +
                    'tooltip="上线时间: {{item.start_time}} 下线时间: {{item.end_time}}">'
                },
                {
                    name: '创建时间', field: 'created_at', truncateText: true,
                    truncateTextLength: 10,
                    truncateTextBreakOnWord: false,
                    tooltip: 'created_at',
                    tooltipPlacement: 'bottom',

                },
                {name: '操作', fieldDirective: '<a class="btn btn-primary">下线</a>'},
            ],
            config: {
                title: '运营位管理',
                api: '/banners',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'status', text: '状态', type: 'btnGroup', default: '1',
                        enum: [
                            // {value: '', text: '全部'},
                            {value: '1', text: '正在进行'},
                            {value: '0', text: '已下线'},
                        ]
                    },
                    // {value: 'stauts', text: '状态', placeholder: '1:正在进行,0:已下线'}
                ],
                preSelectionSearch: {
                    // status: '0',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 5,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            }
        }
    }
    return rtn;
});