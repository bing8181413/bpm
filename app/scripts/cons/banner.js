define([], function () {
    var rtn = {
        bannerList: {
            columns: [
                {name: '编号', field: 'banner_id', className: 'text-right'},
                {name: '用户名', field: 'username'},
                {
                    name: '手机',
                    field: 'mobile',
                    truncateText: true,
                    truncateTextLength: 11,
                    truncateTextBreakOnWord: false,
                },
                {
                    name: '邮箱',
                    field: 'email',
                    truncateText: true,
                    truncateTextLength: 5,
                    truncateTextBreakOnWord: false,
                    htmlField: false
                },
                {name: '定位城市', field: 'city_name'},
                {name: '微信昵称', field: 'weixin_nickname'},
            ],
            config: {
                title: '运营位管理',
                api: '/banners',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'account_id',
                        text: '账户ID',
                        placeholder: '账户ID',
                        paramDirective: '<div hjm-search hjm-select=""></div>'
                    },
                    {value: 'mobile', text: '手机号码', placeholder: '手机号码'},
                    {value: 'email', text: '邮箱', placeholder: '邮箱'},
                    {value: 'cityname', text: '城市', placeholder: '城市', type: 'date'}
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