define(['./common'], function (common) {
    var rtn = {
        supportsCitiesList: {
            columns: [
                {name: '编号', field: 'support_city_id', className: 'text-center'},
                {name: '国家', field: 'country'},
                {name: '城市', field: 'city_name'},
                {name: '更新时间', field: 'updated_at'},
            ],
            config: {
                title: '开通城市',
                api: '/supports/cities',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
                preSelectionSearch: {
                    // status: '0',
                },
                paginationSupport: true,
                route: [{value: 'main.support.opencitiesadd', text: '新增开通城市'}],
                pageInfo: {
                    count: 5000,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            }
        },
        supportUpgradeList: {
            columns: [
                {name: '时间', field: 'created_at', className: 'width200'},
                {name: '版本号', field: 'version', className: 'width200'},
                {
                    name: '更新说明',
                    fieldDirective: '<textarea style="resize: none;" class="form-control" style="height: 100%; " rows="7" ng-bind="item.content" disabled></textarea>'
                },
                {
                    name: '环境',
                    field: 'environment|null2empty|keyVal:\'test\':\'测试\':\'product\':\'线上\'',
                    className: 'width200'
                },
                {name: '强制更新', field: 'force_update|keyVal:\'1\':\'是\':\'0\':\'——\'', className: 'width200'},
                {
                    name: '列表管理',
                    fieldDirective: '<h5><a class="btn btn-primary btn-rounded btn-sm" target="_blank" ng-href="{{item.update_url}}">下载</a>' +
                    '<a class="btn btn-success btn-rounded btn-sm" ui-sref="main.support.upgradesUpdate({id:item.id})">编辑</a></h5>'
                },
            ],
            config: {
                title: '版本更新',
                api: common.live_domain + '/supports/upgrades',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
                preSelectionSearch: {
                    // status: '0',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [
                    {routeDirective: '<div support-imei ></div>'},
                    {routeDirective: '<a class="btn btn-success btn-rounded btn-sm pull-right" ui-sref="main.support.upgradesAdd">上传新版本</a>'},
                    // {value: 'main.support.upgradesAdd', text: '上传新版本'}
                ],
            }
        },
        supportsImeiList: {
            columns: [
                {name: '测试手机IMEI', field: 'imei', className: 'text-center'},
                {
                    name: '操作',
                    fieldDirective: '<h5><span change-imei-status data="item"></span></h5>'
                },
            ],
            config: {
                title: '开通城市',
                api: common.live_domain + '/supports/imeis',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
                preSelectionSearch: {
                    status: '1',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 5000,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{routeDirective: '<span support-imei-add></span>'}],
            }
        },
        supportBannerList: {
            columns: [
                {name: '广告ID', field: 'id', className: 'text-center'},
                {name: '当前排序', field: 'sort_num'},
                {
                    name: 'URL',
                    fieldDirective: '<textarea style="resize: none;" class="form-control" style="height: 100%; " rows="2" ng-bind="item.url" disabled></textarea>'
                },
                {name: '广告位置', field: 'category', filter: 'keyVal:\'1\':\'首页\''},
                {name: '缩略图', fieldDirective: '<show_image url="item.pic_url" width="100"></show_image>'},
                // {
                //     name: '展示时间',
                //     fieldDirective: '<p ng-bind="((item.start_time || \'\')+(item.end_time || \'\')) |characters:6:true" ' +
                //     'tooltip-placement="bottom" uib-tooltip="上线时间: {{item.start_time}} 下线时间: {{item.end_time}}">'
                // },
                {
                    name: '创建时间', field: 'created_at', truncateText: true,
                    truncateTextLength: 20,
                    truncateTextBreakOnWord: false,
                    tooltip: 'created_at',
                    tooltipPlacement: 'bottom',
                },
                {
                    name: '状态/开关',
                    fieldDirective: '<h5><span ng-bind="item.status|keyVal:\'1\':\'上线\':\'2\':\'删除\':\'3\':\'——\'"></span>&nbsp;&nbsp;&nbsp;<span change-support-banner-status data="item"></span></h5>'
                },
                {
                    name: '操作',
                    fieldDirective: '<h5><a class="btn btn-success btn-rounded btn-sm" ui-sref="main.support.bannerUpdate({id:item.id})">编辑</a>&nbsp;&nbsp;&nbsp;<a del-support-banner data="item"></a></h5>'
                },
            ],
            config: {
                title: '直播运营位列表',
                api: common.live_domain + '/supports/banners',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    // {// 1 城市首页
                    //     value: 'category', text: '类型', type: 'btnGroup', default: '1', width: '6',
                    //     enum: [
                    //         {value: '1', text: '城市首页'},
                    //         {value: '', text: '全部类型'},
                    //     ]
                    // },
                    // {   // status 1 上线 2 下线
                    //     // available_type 1 有效期内 2 尚未开始	3 已经过期 4 有效期外
                    //     value: 'flag1',
                    //     text: '状态',
                    //     type: 'btnGroupArray',
                    //     default: 1, //有enum_text时 enumde index 的值
                    //     width: '6',
                    //     enum_text: ['status', 'available_type'],//  有  enum_text 说明是数组
                    //     enum: [
                    //         {value: ['', ''], text: '全部'},
                    //         {value: ['1', '1'], text: '正在进行'},
                    //         {value: ['2', ''], text: '已下线'},
                    //         {value: ['1', '2'], text: '待上线'},
                    //     ]
                    // },
                    // {value: 'banner_id', text: '运营位ID'},
                    // {value: 'keyword', text: '关键字', placeholder: '标题,URL,备注'},
                ],
                preSelectionSearch: {
                    status: [1, 3],
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.support.bannerAdd', text: '新增直播运营位'}]
            }
        }
    }
    return rtn;
});