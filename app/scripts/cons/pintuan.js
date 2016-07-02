define([], function () {
    var rtn = {
        pintuanList: {
            store: '/manage/tuan/items/list',
            search: [
                {name: 'ID', param: 'activity_id'},
                {name: 'account_id', param: 'account_id', paramDirective: '<div hjm-search hjm-select=""></div>'},
            ],
            pageInfo: {
                pageSize: 20,
                page: 1,
                maxSize: 5, //最大展示页，默认3
                showPageGoto: false //属性为true将显示前往第几页。
            },
            columns: [
                {name: 'ID', field: 'activity_id'},
                {name: '状态', field: 'activity_title', filter: 'vpcInstanceStatusFilter'},
                {name: '操作', className: 'text-right', fieldDirective: '<div vpc-instance-list-actions></div>'}
            ]
        }
    }
    return rtn;
});