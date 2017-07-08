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
    }
    return rtn;
});