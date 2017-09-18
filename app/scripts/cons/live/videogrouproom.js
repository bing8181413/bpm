define(['.././common'], function (common) {
    var rtn = {
        videogroupsroomList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '名称', field: 'room.title', className: 'text-center'},
                {name: '播放次数', field: 'room.record.play_count', filter: 'zero2empty'},
                {name: '评论次数', field: 'room.record.comment_count', filter: 'zero2empty'},
            ],
            config: {
                title: '视频组-关联视频列表',
                api: common.live_domain + '/live/videogroups/{id}/rooms',
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