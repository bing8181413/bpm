define([], function() {
  var rtn = {
    marketOrders: {
      columns: [
        {name: 'ID', field: 'id', className: 'text-right'},
        {name: '订单ID', field: 'order_id', className: 'text-left'},
        {name: 'SKUNO', field: 'skuno'},
        {name: '视频组ID', field: 'video_group_id'},
        {
          name: '用户信息',
          fieldDirective: '用户ID:<span ng-bind="item.user_id"></span>' +
          '<br/>手机:<span ng-bind="item.mobile"></span>',
        },
        {name: '创建时间', field: 'created_at'},
        {name: '状态', field: 'status'},
        {name: '备注', fieldDirective: '<p ng-bind="item.remark"></p>'},
        {
          name: '观看记录',
          fieldDirective: '<div user-video-group-record data="item" class="text-center"></div>',
        },
      ],
      config: {
        title: '云集订单列表',
        api: '/markets/orders',
        rowItemName: 'item',
        searchSupport: true,
        searchItems: [
          {value: 'mobile', text: '电话号码', placeholder: '手机，电话', width: '6'},
          {value: 'video_group_id', text: '视频组ID', placeholder: '视频组ID', width: '6'},
        ],
        preSelectionSearch: {
          // status: '0',
        },
        paginationSupport: true,
        pageInfo: {
          count: 20,
          page: 1,
          maxSize: 5, //最大展示页，默认3
          // showPageGoto: false //属性为true将显示前往第几页。
        },
        route: [],
      },
    },
  };
  return rtn;
});