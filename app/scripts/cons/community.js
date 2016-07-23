define([], function () {
    var rtn = {
        communityList: {
            columns: [
                {name: 'ID', field: 'community_id', className: 'text-center'},
                {
                    name: '小区名称', field: 'name',
                    truncateText: true,
                    truncateTextLength: 5,
                    truncateTextBreakOnWord: false,
                    tooltipPlacement: 'bottom',
                    tooltip: 'name',
                },
                {
                    name: '别名', field: 'alias',
                    truncateText: true,
                    truncateTextLength: 4,
                    truncateTextBreakOnWord: false,
                    tooltipPlacement: 'bottom',
                    tooltip: 'alias',
                },
                {name: '城市', field: 'city_name'},
                {name: '行政区', field: 'district'},
                {name: '板块', field: 'area'},
                // {name: '街道', field: 'street'},
                {name: '建筑时间', field: 'completed_time'},
                {
                    name: '住宅类型', field: 'property_type',
                    truncateText: true,
                    truncateTextLength: 4,
                    truncateTextBreakOnWord: false,
                    tooltipPlacement: 'bottom',
                    tooltip: 'property_type',
                },
                {
                    name: '创建时间', field: 'created_at', filter: 'limitTo:10'
                },
                {
                    name: '操作',
                    fieldDirective: '<a class="btn btn-primary" ui-sref="main.community.update({community_id:item.community_id})">编辑</a>'
                },
                {
                    name: '搜房ID', field: 'cell_biz_id',
                    truncateText: true,
                    truncateTextLength: 4,
                    truncateTextBreakOnWord: false,
                    tooltipPlacement: 'bottom',
                    tooltip: 'cell_biz_id',
                },
            ],
            config: {
                title: '小区列表',
                api: '/communities',
                // itemList: 'list',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'poi_type', text: '位置类型', type: 'btnGroup', default: '1', width: '6',
                        enum: [
                            {value: '1', text: '小区'},
                            {value: '2', text: '写字楼'},
                        ]
                    },
                    {value: 'keyword', text: '小区名称'},
                ],
                preSelectionSearch: {
                    // ID: '123',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 50,
                    page: 1,
                    maxSize: 10, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.community.add', text: '新增小区'}]
            }
        }
    }
    return rtn;
});