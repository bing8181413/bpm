define([], function() {
  var rtn = {
    merchantOrderList: {
      columns: [
        {name: '订单ID', field: 'order_id'},
        {
          name: '订单号',
          fieldDirective: '<span ng-bind="item.order_no"></span>',
        },
        {
          name: '课程信息',
          fieldDirective: '<span ng-bind="\'课程ID:\'+item.product_id"></span>' +
          '<br/>标题:<br/><span ng-bind="item.product.title"></span>' +
          '<br/>课程开始时间:<br/><span ng-bind="item.product.start_time"></span>' +
          '<br/>报名截止时间:<br/><span ng-bind="item.product.end_time"></span>',
        },
        {name: '订单类型', field: 'order_type', filter: 'order_type'},
        {
          name: '订单来源',
          fieldDirective: '<div ng-show="item.stat.campaign">' +
          '<span ng-bind="\'ID:\'+item.stat.campaign.id"></span><br/>' +
          '<span ng-bind="item.stat.campaign.utm_campaign"></span>' +
          '</div><div ng-show="!item.stat.campaign">自有</div>',
        },
        {name: '下单时间', field: 'order_time'},
        {name: '订单状态', field: 'order_status', filter: 'order_status'},
        {name: '订单金额', field: 'order_price'},
        {
          name: '下单用户属性',
          fieldDirective: '<span ng-bind="item.life && item.life.times>0?\'老用户\':\'新用户\'" ng-class="{\'label label-warning\':item.life && item.life.times>0,\'label label-success\':(!item.life || item.life.times==0)}"></span>  ',
        },
        // {
        //   name: '结算金额',
        //   fieldDirective: '<span order-balance data="item"></span>',
        // },
        {name: '备注', fieldDirective: '<p ng-bind="item.remark"></p>'},
      ],
      config: {
        title: '订单列表',
        api: '/merchant/merchantorders',
        rowItemName: 'item',
        searchSupport: true,
        searchItems: [
          // {   // order_status 1 待支付,2 支付中,3 已支付,4 支付失败,5 已完成,6 已取消
          //   value: 'flag2', text: '订单状态', type: 'btnGroupArray2',
          //   default: 0, width: '6',
          //   enum_text: 'order_status',//
          //   enum: [
          //     {value: [1, 2, 3, 5], text: '全部'},
          //     {value: [3], text: '已支付'},
          //     {value: [5], text: '已完成'},
          //   ],
          // },
          {
            value: 'times', text: '用户属性', type: 'btnGroup', default: '0', width: '6',
            enum: [
              {value: 0, text: '全 部'},
              {value: 1, text: '新用户'},
              {value: 2, text: '老用户'},
            ],
          },
          {value: 'product_id', text: '课程ID'},
          {value: 'date_min', text: '(下单时间)--开始', type: 'datetime'},
          {value: 'date_max', text: '(下单时间)--结束', type: 'datetime'},
          {value: 'order_no', text: '订单号'},
          // {value: 'contact_name', text: '联系人'},
          // {value: 'contact_mobile', text: '订单手机号'},
        ],
        preSelectionSearch: {
          order_status: [3, 5],
          is_stat: 1,
        },
        paginationSupport: true,
        pageInfo: {
          count: 10,
          page: 1,
          maxSize: 5, //最大展示页，默认3
          // showPageGoto: false //属性为true将显示前往第几页。
        },
        ext: {
          showNum: [
            {text: '订单总数', fieldDirective: '<span class="label label-success" ng-bind="_json.stat.order_count"></span> &nbsp;&nbsp;&nbsp;'},
            {text: '订单总金额', fieldDirective: '<span class="label label-success" ng-bind="_json.stat.order_sum|number:2"></span>&nbsp;&nbsp;&nbsp; '},

            {text: '新用户订单', fieldDirective: '<span class="label label-primary" ng-bind="_json.stat.new_order_count"></span>&nbsp;&nbsp;&nbsp; '},
            {text: '新用户订单总金额', fieldDirective: '<span class="label label-primary" ng-bind="_json.stat.new_order_sum|number:2"></span> &nbsp;&nbsp;&nbsp;'},
            {
              text: '新用户结算金额',
              fieldDirective: '<span class="label label-primary" ng-bind="_json.stat.new_order_balance_sum|number:2"></span>&nbsp;&nbsp;&nbsp; ',
            },

            {text: '老用户订单', fieldDirective: '<span class="label label-warning" ng-bind="_json.stat.old_order_count"></span> &nbsp;&nbsp;&nbsp;'},
            {text: '老用户订单总金额', fieldDirective: '<span class="label label-warning" ng-bind="_json.stat.old_order_sum|number:2"></span>&nbsp;&nbsp;&nbsp; '},
            {
              text: '老用户结算金额',
              fieldDirective: '<span class="label label-warning" ng-bind="_json.stat.old_order_balance_sum|number:2"></span> &nbsp;&nbsp;&nbsp;',
            },

            {fieldDirective: '<br/><br/><h5 class="text-danger">订单状态说明:“已支付”订单中包括已支付的单人购订单与未成团的团购订单，“已完成”订单指已经成团的团购订单。</h5>'},

          ],
        },
      },
    },
  };
  return rtn;
});