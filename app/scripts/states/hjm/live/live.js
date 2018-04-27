// This is a file copied by your subgenerator
/**
 * 默认的产品首页和默认的跳转规则
 */
define([
      '../../states'
      , '../../../cons/simpleCons'
      , './marketshares'//领取观看权限
      , './videogroups'//视频组
      , './notice'//公告
      , './permissions'//权限
      , './questions'//问题
      , './answers'//答案
      , './appmessage'//app 消息发送
    ],
    function(stateModule, cons) {
      stateModule.config(
          [
            '$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
              $stateProvider.state(cons.state.main + '.live', {
                url: '/live',
                templateProvider: function($templateCache) {
                  return $templateCache.get('app/' + cons.main_path + 'container.html');
                },
              });
            },
          ]);
    });
