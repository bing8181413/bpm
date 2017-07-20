define(['./common'], function (common) {
    var rtn = {
        recordCommentsList: {
            columns: [
                {name: '禁用用户', field: 'user_id'},
            ],
            config: {
                title: '禁用用户列表',
                api: common.live_domain + '/live/block',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    // {value: 'keyword', text: '关键字', placeholder: '标题', default: ''},
                    // {value: 'user_id', text: '用户ID', placeholder: '用户ID', default: ''},
                ],
                preSelectionSearch: {
                    status: 1,
                },
                paginationSupport: true,
                pageInfo: {
                    count: 500,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: []

            },
        }
    }
    return rtn;
});