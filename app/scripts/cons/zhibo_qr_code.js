define(['./common'], function (common) {
    var rtn = {
        zhibo_qr_codeList: {
            columns: [
                {name: '描述', field: 'name', className: 'width100'},
                {
                    name: '资源文件',
                    fieldDirective: '<show_image url="item.url" width="100"></show_image>',
                    className: 'width100 text-center '
                },
                {name: '二维码地址', field: 'url', className: 'width200'},
                {
                    name: '操作', className: 'width100',
                    fieldDirective: '<span zhibo-qr-code-change-status data="item"></span>'
                },
            ],
            config: {
                title: '微信拼课二维码',
                api: '/cctalk/qrcodes',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
                preSelectionSearch: {
                    status: 1,
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [],
                ext: {
                    eventBtn: [
                        {
                            text: '新增微信拼课二维码',
                            directive: '<div add-zhibo-qr-code data=""></div>',
                        },
                    ]
                }

            },
        }
    }
    return rtn;
});