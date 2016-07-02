// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('messageController', messageController)
        .controller('feedbackSendController', feedbackSendController)

    messageController.$injector = ['$scope', '$http', '$modal', '$rootScope', '$stateParams'];
    feedbackSendController.$injector = ['$scope', '$http', '$modalInstance', 'feedback_send_param', 'jsonpscope', '$stateParams'];
    function messageController($scope, $http, $modal, $rootScope, widget, $stateParams) {
        $scope.feedback_type = $stateParams.feedback_type || 0;
        $scope.feedback_type_name = '用户消息';
        switch ($scope.feedback_type) {
            case "1":
                $scope.feedback_type_name = "用户反馈";
                break;
            case "2":
                $scope.feedback_type_name = "小区申请";
                break;
        }
        messagescope = $scope;
        $scope.tab = 0;
        $scope.list_param = {page: 1, count: 20, feedback_type: $scope.feedback_type};
        //初始化参数  使用对象传
        $scope.getapi = function (page) {
            $scope.list_param.keyword = $scope.search;
            $scope.list_param.page = page || $scope.list_param.page;
            var list_url = simpleCons.domain + '/manage/user/feedback/list';
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.feedback_list = json.data.list;
                        $scope.totalItems = json.data.count;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = page || $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    } else {
                        widget.msgToast('服务器请求出错，请联系管理员');
                    }
                });
        }
        //初始化数据列表
        $scope.getapi();
        $rootScope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }
        $scope.feedback_send = function (feedback, index) {
            var modalInstance = $modal.open({
                templateUrl: 'feedback_send.html',
                controller: 'feedbackSendController',
                size: '',
                resolve: {
                    feedback_send_param: function () {
                        var rtn = {
                            feedback_id: feedback.feedback_id,
                            mobile: feedback.mobile,
                            content: ''
                        };
                        return rtn;
                    }
                    , jsonpscope: function () {
                        return messagescope;
                    }
                }
            });
        }
    };
    function feedbackSendController($scope, $http, $modalInstance, feedback_send_param, jsonpscope, $stateParams) {
        $scope.isActivityBanner = $stateParams.isActivityBanner || 0;
        $scope.content = '';
        $scope.mobile = feedback_send_param.mobile;
        $scope.ok = function () {
            feedback_send_param.mobile = $scope.mobile;
            feedback_send_param.content = $scope.content;
            var message_send_url = simpleCons.domain + '/manage/user/feedback/reply';
            $http.post(message_send_url, feedback_send_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('success!');
                        $modalInstance.dismiss('ok');
                    } else {
                        alert('服务器请求出错，请联系管理员');
                    }
                });
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

});
