// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('boardController', boardController)
        .controller('boardAddController', boardAddController)
        .controller('boardUpdateController', boardUpdateController);

    boardController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader'];
    boardAddController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state', '$stateParams'];
    boardUpdateController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state', '$stateParams'];
    function boardController($scope, $http, $rootScope, $modal, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: '/qiniu/controller.php?action=uploadimage'
        });
        var sup_scope = $scope;
        $scope.list_param = {page: 1, count: 20, board_type: 1};
        $scope.list_param.keyword = $scope.search;
        var list_url = simpleCons.domain + '/manage/credit/board/list';
        $scope.getapi = function (page, board_type) {
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $scope.list_param.board_type = board_type ? board_type : $scope.list_param.board_type;
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.board_list = json.list;
                        $scope.totalItems = json.data.count;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = page ? page : $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    } else {
                        $scope.addAlert(json.msg);
                    }
                });
        }
        $scope.getapi(1);
        $rootScope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }
        var update_url = simpleCons.domain + '/manage/credit/board/update';
        $scope.update = function (board, status, index) {
            if (!confirm('确定要修改这个状态吗？')) {
                return false;
            }
            $scope.boardUpdate_param = {
                board_id: board.board_id,
                status: status
            };
            $http.post(
                update_url,
                $scope.boardUpdate_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('状态更新成功！！');
                        $scope.board_list[index].status = status;
                    } else {
                        alert(data.msg);
                    }
                });

        }

        $scope.alerts = [
            //{ msg: '用户名或者密码不正确'  }
        ];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        $scope.addAlert = function (msg, type) {
            $scope.alerts = [];
            $scope.alerts.push({msg: msg, type: type});
        };
    };
    function boardAddController($scope, $http, $rootScope, $modal, FileUploader, $state, $stateParams) {
        $scope.board_type = $stateParams.board_type;
        var sup_scope = $scope;
        $scope.boardAdd = {};
        $scope.tiaozhuan = function () {
            $state.go('board');
        }

        var uploader = $scope.uploader = new FileUploader({
            url: '/qiniu/controller.php?action=uploadimage'
        });

        $scope.boardAdd_param = {
            board_type: $scope.board_type || 1,
            title: '',
            image: '',
            sort_num: 0,
            url: ''

        };
        $scope.save = function () {
            var param_tmp = 0;
            $scope.boardAdd_param.image = '';
            angular.forEach($scope.boardAdd_param, function (value, key) {
                eval('$scope.boardAdd.' + key + '=0')
                // 过滤非必填项
                if (key != 'image' && key != 'url' && value == '') {
                    param_tmp++;
                    $scope.addAlert('有必填项未填写！');
                    eval('$scope.boardAdd.' + key + '=1');
                }
            });
            if ((!uploader.queue[0]) || (!uploader.queue[0].qiniu_url)) {
                param_tmp++;
                alert('还没有上传完图片,请继续上传！');
                return false;
            } else {
                $scope.boardAdd_param.image = uploader.queue[0].qiniu_url;
            }
            //console.log($scope.boardAdd_param);
            if (param_tmp > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/credit/board/post';
            $http.post(
                url,
                $scope.boardAdd_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('积分商品发布成功！');
                        $state.go('board');
                    } else {
                        $scope.addAlert(data.msg);
                    }
                });

        }
        // FILTERS
        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        uploader.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 1;
            }
        });
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            if (response) {
                if (response.code == 1001) {
                    alert(response.msg);
                    fileItem.qiniu_url == '';
                    fileItem.isReady = false;
                    return false;
                }
                fileItem.qiniu_url = response.url;

            }
        };
        $scope.alerts = [
            //{ msg: '用户名或者密码不正确'  }
        ];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        $scope.addAlert = function (msg, type) {
            $scope.alerts = [];
            $scope.alerts.push({msg: msg, type: type});
        };
    };
    function boardUpdateController($scope, $http, $rootScope, $modal, FileUploader, $state, $stateParams) {
        $scope.boardUpdate_param = {};
        $scope.boardUpdate = {};
        $scope.board_id = $stateParams.boardId;
        //更新
        var uploader = $scope.uploader = new FileUploader({
            url: '/qiniu/controller.php?action=uploadimage'
        });

        $scope.board_param = {board_id: $scope.board_id};
        var detail_url = simpleCons.domain + '/manage/credit/board/detail';
        $http.post(detail_url, $scope.board_param)
            .success(function (json) {
                if (json.code == 0) {
                    $scope.init(json.data);
                } else {
                    $scope.addAlert(json.msg);
                }
            });
        $scope.init = function (data) {
            //console.log(data);
            $scope.image_oldshow = {img: data.image};
            $scope.boardUpdate_param = {
                board_id: data.board_id,
                board_type: data.board_type || 1,
                sort_num: Number(data.sort_num),
                url: data.url,
                title: data.title,
                image: data.image
            };
        }
        $scope.save = function () {
            //console.log($scope.boardUpdate_param);
            var param_tmp = 0;
            angular.forEach($scope.boardUpdate_param, function (value, key) {
                eval('$scope.boardUpdate.' + key + '=0')
                // 过滤非必填项
                if (key != 'image' && key != 'url' && value == '') {
                    param_tmp++;
                    $scope.addAlert('有必填项未填写！');
                    eval('$scope.boardUpdate.' + key + '=1');
                }
                if ($scope.boardUpdate_param.city == '未登录') {
                    param_tmp++;
                    $scope.boardUpdate.city = 1;
                    $scope.addAlert('请选择一个商品城市！');
                }
            });
            //if ((!uploader.queue[0]) || (!uploader.queue[0].qiniu_url)) {
            //    param_tmp++;
            //    alert('还没有上传完图片,请继续上传！');
            //    return false;
            //} else {
            //    $scope.boardUpdate_param.image = uploader.queue[0].qiniu_url;
            //}
            console.log($scope.boardUpdate_param);
            if (param_tmp > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/credit/board/update';
            $http.post(
                url,
                $scope.boardUpdate_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('更新成功！');
                        $state.go('board');
                    } else {
                        $scope.addAlert(data.msg);
                    }
                });
        }

        // FILTERS
        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        uploader.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 1;
            }
        });
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            if (response) {
                if (response.code == 1001) {
                    alert(response.msg);
                    fileItem.qiniu_url == '';
                    fileItem.isReady = false;
                    return false;
                }
                fileItem.qiniu_url = response.url;
                $scope.image_oldshow = null;
                $scope.boardUpdate_param.image = response.url;
            }
        };
        $scope.tiaozhuan = function () {
            if (confirm('确定放弃编辑进入列表吗?')) {
                $state.go('board');
            }
        }
        $scope.alerts = [
            //{ msg: '用户名或者密码不正确'  }
        ];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        $scope.addAlert = function (msg, type) {
            $scope.alerts = [];
            $scope.alerts.push({msg: msg, type: type});
        };
    };
})
;
