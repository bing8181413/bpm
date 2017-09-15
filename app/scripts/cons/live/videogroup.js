define(['.././common'], function (common) {
    var rtn = {
        videogroupsList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '发布时间', field: 'created_at', filter: 'null2empty'},
                {name: '视频组名称', field: 'group_title', className: 'text-center'},
                {name: '视频数量', field: 'video_count', filter: 'zero2empty'},
                {name: '关联活动', field: 'product_id', filter: 'zero2empty'},
                {name: '直播状态', field: 'receive_type|keyVal:\'1\':\'预告\':\'2\':\'直播中\':\'3\':\'结束\''},
                {
                    name: '直播日期',
                    fieldDirective: '<span ng-bind="(item.start_time|null2empty)+\'-\'+(item.end_time|null2empty)"></span>'
                },
                {
                    name: '备注',
                    fieldDirective: '<div modal-textarea title="查看" content="item.remark|null2empty"></div>',
                    className: 'text-center'
                },
                {
                    name: '管理', className: 'text-center',
                    fieldDirective: '<a class="btn btn-primary btn-rounded" ui-sref="main.videogroups.update({id:item.id})">编辑</a>'
                }
            ],
            config: {
                title: '视频组列表',
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
                route: [{value: 'main.videogroups.add', text: '新增观看权限'}]
            },
        }
    }
    return rtn;
});