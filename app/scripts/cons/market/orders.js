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
        {name: '添加权限', field: 'user_group_status|keyVal:\'1\':\'--\':\'2\':\'添加失败\':\'3\':\'已添加\''},
        {name: '取消权限', field: 'hjm_return_status|keyVal:\'1\':\'--\':\'2\':\'取消失败\':\'3\':\'已取消\''},
        {
          name: '管理',
          fieldDirective:
              '<span delete-data data="" config="{url:$root.common.domain+\'/markets/orders/\'+item.id+\'/cancel\',method:\'PUT\',text:\'取消订单\'}" param="{}"></span> ',
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