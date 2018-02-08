define([], function () {
    var rtn = {
        resourceList: {
            columns: [
                {name: 'ID', field: 'pic_id', className: 'text-center'},
                {name: '名称', field: 'name'},
                {name: '资源文件', fieldDirective: '<show_image url="item.pic_url" width="100"></show_image>'},
                // {name: '老URL', field: 'pic_url'},
                {
                    name: '新URL',
                    fieldDirective: '<span ng-bind="item.pic_url.replace(\'huijiame\',\'bucket.ahaschool\');"' +
                    ' ng-if="item.pic_url.substr(item.pic_url.length-4)!=\'.mp4\'"></span>' +
                    '<span ng-bind="item.pic_url|change_domain_mp4" ng-if="item.pic_url.substr(item.pic_url.length-4)==\'.mp4\'"></span>'
                },
                {name: '创建时间', field: 'created_at', filter: 'null2empty'},
            ],
            config: {
                title: '资源库列表',
                api: '/supports/resources',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'date_min', text: '开始日期', type: 'date'},
                    {value: 'date_max', text: '结束日期', type: 'date'},
                    {value: 'keyword', text: '图片名称', placeholder: ''},
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
                // route: [{value: 'main.resource.add', text: '新增资料库'}],
                ext: {
                    eventBtn: [
                        {
                            text: '新增图片',
                            fieldFirective: '<div add-resource-image data=""></div>',
                        },
                        {
                            text: '新增音频',
                            fieldFirective: '<div add-resource-media data=""></div>',
                        },
                    ]
                }
            }
        }
    }
    return rtn;
});