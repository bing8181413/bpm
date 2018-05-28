define(['.././common'], function(common) {
  var rtn = {
    appbuyactionsList: {
      columns: [
        {name: '平台', field: 'description|null2empty'},
        {name: '购买类型', field: 'buy_type|keyVal:\'2\':\'拼团\'|null2empty'},
        {
          name: '状态', className: 'text-center',
          fieldDirective:
              '<span class="label" bo-bind="item.onoff|keyVal:\'1\':\'开启\':\'2\':\'关闭\'" ng-class="{\'label-danger\':item.onoff==2,\'label-success\':item.onoff==1}"></span>',
        },
        {
          name: '管理', className: 'text-center',
          fieldDirective:
          '<span ng-if="item.onoff==2" delete-data config="{url:$root.common.live_domain+\'/live/appbuyactions\',method:\'PUT\',text:\'开启\',class:\'btn-success\'}" callback="updateList()" param="{id:item.id,onoff:1}"></span> ' +
          '<span ng-if="item.onoff==1" delete-data config="{url:$root.common.live_domain+\'/live/appbuyactions\',method:\'PUT\',text:\'关闭\'}" callback="updateList()" param="{id:item.id,onoff:2}"></span> ',
        },
      ],
      config: {
        title: 'APP购买管理',
        api: common.live_domain + '/live/appbuyactions',
        rowItemName: 'item',
        searchSupport: false,
        searchItems: [],
        paginationSupport: false,
        pageInfo: {
          count: 1000,
          page: 1,
          maxSize: 2, //最大展示页，默认3
          // showPageGoto: false //属性为true将显示前往第几页。
        },
      },
    },
  };
  return rtn;
});