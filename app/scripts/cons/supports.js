define([], function () {
    // accountList roleList
    var rtn = {
        supportsCitiesList: {
            columns: [
                {name: '编号', field: 'support_city_id', className: 'text-center'},
                {name: '国家', field: 'country'},
                {name: '城市', field: 'city_name'},
                {name: '更新时间', field: 'updated_at'},
            ],
            config: {
                title: '支持城市',
                api: '/supports/cities',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [

                ],
                preSelectionSearch: {
                    // status: '0',
                },
                paginationSupport: true,
                route: [{value: 'main.support.opencitiesadd', text: '新增支持城市'}],
                pageInfo: {
                    count: 5000,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            }
        },
    }
    return rtn;
});