define(['.././common'], function (common) {
    var rtn = {
        marketshareUserList: {
            columns: [
                {name: '用户ID', field: 'user_id|keyVal:\'0\':\'未领取\''},
                {name: '手机号码', field: 'mobile'},
                {name: '用户姓名', field: 'user.name|null2empty', className: 'text-center'},
                {
                    name: '头像',
                    fieldDirective: '<div class="text-center" show-image url="item.user.avatar" width="50"></div>'
                },
                {name: '操作', fieldDirective: ' <span del-marketshare-user data="item" ></span>'},
            ],
            config: {
                title: '观看权限-关联用户列表',
                api: '',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'mobile', text: '手机号码', placeholder: '手机号码', default: ''}
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
                ext: {
                    showNum: [
                        {text: '总数', type: 'total'},
                    ],
                }
            },
        }
    }
    return rtn;
});