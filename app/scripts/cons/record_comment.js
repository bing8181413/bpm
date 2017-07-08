define(['./common'], function (common) {
    var rtn = {
        recordCommentsList: {
            columns: [
                {name: '时间', field: 'created_at', className: 'width200'},
                {name: '用户id', field: 'user_id', className: 'width200'},
                {
                    name: '评论',
                    fieldDirective: '<textarea style="resize: none;" class="form-control" style="height: 100%; " rows="3" ng-bind="item.content" disabled></textarea>'
                },
                {
                    name: '置顶', className: 'width200',
                    fieldDirective: '<h5><span ng-bind="item.on_top|keyVal:\'1\':\'置顶\':\'2\':\'——\'"></span>&nbsp;&nbsp;&nbsp;<span change-record-comment-ontop data="item"></span></h5>'
                },
                {
                    name: '操作', className: 'width200',
                    fieldDirective: '<h5><div del-record-comment data="item" ></div></h5>'
                },
            ],
            config: {
                title: '评论列表',
                api: common.live_domain + '/live/comments',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'keyword', text: '关键字', placeholder: '标题', default: ''},
                    {value: 'user_id', text: '用户ID', placeholder: '用户ID', default: ''},
                ],
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
                route: []

            },
        }
    }
    return rtn;
});