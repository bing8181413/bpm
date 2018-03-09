define(['.././common'], function (common) {
    var rtn = {
        videogroupsskuoptionList: {
            columns: [
                {name: '活动类目ID', field: 'option_id', className: 'text-center'},
                {name: '名称', field: 'product.title', className: 'text-center'},
                {name: 'SKU', field: 'product.sku|common:sku|null2empty'},
                {name: '活动类目', field: 'option_name'},
            ],
            config: {
                title: '视频组-关联SKU类目列表',
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