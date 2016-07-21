define([], function () {
    var rtn = {
        couponList: {
            columns: [
                {name: 'ID', field: 'coupon_id', className: 'text-right'},
                {
                    name: '标题', field: 'title', truncateText: true,
                    truncateTextLength: 7,
                    truncateTextBreakOnWord: false,
                    tooltipPlacement: 'bottom',
                    tooltip: 'title',
                },
                {name: '当前排序', field: 'sort_num'},
                {name: '缩略图', fieldDirective: '<show_image url="item.pic_url" width="100"></show_image>',},
                {
                    name: 'URL', field: 'url',
                    truncateText: true,
                    truncateTextLength: 10,
                    truncateTextBreakOnWord: false,
                    tooltipPlacement: 'bottom',
                    tooltip: 'url',
                },
                // {
                //     name: '备注', field: 'remark',
                //     truncateText: true,
                //     truncateTextLength: 10,
                //     truncateTextBreakOnWord: false,
                //     tooltipPlacement: 'bottom',
                //     tooltip: 'remark',
                // },
                {name: '当前状态', field: 'status', filter: 'banner_status'},
                {
                    name: '展示时间',
                    fieldDirective: '<p ng-bind="((item.start_time || \'\')+(item.end_time || \'\')) |characters:6:true" ' +
                    'tooltip-placement="bottom" tooltip="上线时间: {{item.start_time}} 下线时间: {{item.end_time}}">'
                },
                {
                    name: '创建时间', field: 'created_at', truncateText: true,
                    truncateTextLength: 10,
                    truncateTextBreakOnWord: false,
                    tooltip: 'created_at',
                    tooltipPlacement: 'bottom',

                },
                {
                    name: '操作',
                    fieldDirective: '<div banner-update data="item"></div>' +
                    '<div banner-change-status data="item"></div>'
                },
            ],
            config: {
                title: '优惠券管理',
                api: '/coupons',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    {value: 'keyword', text: '关键字', placeholder: '标题,URL,备注'},
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
                // route: [{value: 'main.banner.add', text: '新增运营位'}]
            }
        }
    }
    return rtn;
});