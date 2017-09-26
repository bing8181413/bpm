define(['.././common'], function (common) {
    var rtn = {
        videogroupsoptionList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-center'},
                {name: '类目ID', field: 'option_id', className: 'text-center'},
                {name: '活动名称', field: 'product.title', className: 'text-center'},
                {name: '活动类目', field: 'option.option_name', filter: 'zero2empty'},
            ],
            config: {
                title: '视频组-关联活动类目列表',
                api: common.live_domain + '/live/videogroups',
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
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            },
        }
    }
    return rtn;
});