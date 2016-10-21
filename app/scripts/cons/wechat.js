define([], function () {
    var rtn = {
        qrcodeList: {
            columns: [
                {name: '二维码ID', field: 'qrcode_id', className: 'text-right'},
                {
                    name: '场景编号',
                    fieldDirective: '<div ng-bind="(item.type==1)?item.scene_id:item.scene_str"></div>'
                },
                {name: '长久or临时', field: 'type', filter: 'qrcode_type'},
                {name: '描述', field: 'desc'},
                {name: '微信二维码', fieldDirective: '<show_image url="item.url" width="200" ></show_image>'},
                {
                    name: '微信二维码地址',
                    fieldDirective: '<textarea class="form-control" style="height: 100%; " rows="5" ng-bind="item.url"></textarea>'
                },
                {name: '创建时间', field: 'created_at'},
            ],
            config: {
                title: '微信二维码管理',
                api: '/wechat/qrcodelist',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    // {value: 'haha', text: '城市', placeholder: '城市', type: 'datetime'},
                ],
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
                route: [{value: 'main.wechat.qrcodeAdd', text: '新增二维码'}],
            }
        },
    }
    return rtn;
});