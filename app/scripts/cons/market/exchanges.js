define([], function() {
  var rtn = {
    exchangesList: {
      columns: [
        {name: 'ID', field: 'exchange_id', className: 'text-right'},
        {name: '渠道名', field: 'channel_name', className: 'text-center'},
        // {name: '视频组名', field: 'group.group_title', filter: 'null2empty'},
        {
          name: '视频组',
          fieldDirective: '<show_str class="text-center" str="item.exchange_groups | arraySub2String:\'groups.group_title\'" split="," title="\'视频组\'" btn_str="item.exchange_groups&&item.exchange_groups.length||\'查看\'"></show_str>',
        },
        {name: '视频组ID', field: 'video_group_id', filter: 'null2empty'},
        {name: '发放总数量', field: 'number', filter: 'null2empty'},
        {
          name: '操作',
          fieldDirective: '<span open-url="$root.common.domain + item.url" class="text-center">下载Excel</span>',
        },
      ],
      config: {
        title: '生成兑换码列表',
        api: '/markets/exchanges',
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
        route: [{value: 'main.exchanges.add', text: '生成兑换码'}],
      },
    },
  };
  return rtn;
});