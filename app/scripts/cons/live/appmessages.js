define(['.././common'], function(common) {
  var rtn = {
    appmessagesList: {
      columns: [
        {name: 'ID', field: 'id', className: 'text-center width100'},
        {name: '标题', field: 'title'},
        {
          name: '文案', className: 'text-center width100',
          fieldDirective: '<div modal-textarea title="查看" content="item.description"></div>',
        },
        {name: '跳转', field: 'url'},
      ],
      config: {
        title: '推送记录',
        api: common.live_domain + '/live/appmessages',
        rowItemName: 'item',
        searchSupport: false,
        searchItems: [
          // {text: '公告id', value: 'id', type: 'text'},
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
        route: [{routeDirective: '<span live-appmessages-send></span>'}],
        ext: {
          showNum: [
            {text: '总数', type: 'total'},
          ],
        },
      },
    },
  };
  return rtn;
});