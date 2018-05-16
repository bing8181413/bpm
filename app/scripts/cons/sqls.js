define([], function() {
  var rtn = {
    sqlsList: {
      columns: [
        {name: '名称', field: 'name', className: 'text-center width500'},
        {name: '标识', field: 'code', className: 'text-center width300'},
        {name: '备注', field: 'remark|null2empty', className: 'text-left'},
        {name: '操作', fieldDirective: '<div sqls-update data="item" class="text-center"></div>'},
      ],
      config: {
        title: 'SQL管理',
        api: '/exports/sqls',
        rowItemName: 'item',
        searchSupport: true,
        searchItems: [
          {value: 'code', text: '标识', placeholder: '标识'},
          {value: 'keyword', text: '关键字', placeholder: '名称，备注'},
        ],
        preSelectionSearch: {
          // ID: '123',
        },
        paginationSupport: true,
        pageInfo: {
          count: 50,
          page: 1,
          maxSize: 5, //最大展示页，默认3
          // showPageGoto: false //属性为true将显示前往第几页。
        },
        route: [{routeDirective: '<span sqls-update></span>'}],
      },
    },
  };
  return rtn;
});