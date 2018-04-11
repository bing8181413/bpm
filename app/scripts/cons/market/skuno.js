define([], function() {
  var rtn = {
    skunos: {
      columns: [
        {name: 'ID', field: 'id', className: 'text-right'},
        {name: 'SKUNO', field: 'skuno'},
        {name: '视频组ID', field: 'video_group_id'},
        {name: '创建时间', field: 'created_at'},
        {name: '状态', field: 'status'},
        {name: '操作', fieldDirective: '<div skuno-update data="item" class="text-center"></div>'},
      ],
      config: {
        title: '视频组映射sku',
        api: '/markets/skunos',
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
          maxSize: 5, //最大展示页，默认3
          // showPageGoto: false //属性为true将显示前往第几页。
        },
        route: [{routeDirective: '<div skuno-update></div>'}],
      },
    },
  };
  return rtn;
});