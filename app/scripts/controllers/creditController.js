// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('creditController', creditController)
        .controller('creditAddController', creditAddController)
        .controller('creditUpdateController', creditUpdateController)
        .controller('creditUserController', creditUserController);//使用积分兑换物品的用户详情列表

    creditController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader'];
    creditAddController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state', '$stateParams'];
    creditUpdateController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state', '$stateParams'];
    creditUserController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state', '$stateParams'];
    function creditUserController($scope, $http, $rootScope, $modal, FileUploader, $state, $stateParams) {
        var sup_scope = $scope;
        $scope.title = $stateParams.title;
        $http.post(simpleCons.domain + '/manage/credit/good/users', {good_id: $stateParams.goodId})
            .success(function (json) {
                if (json.code == 0) {
                    $scope.credit_user_list = json.data.list;
                } else {
                    alert(json.msg);
                }
            });
        $scope.updateUserCredit = function (UserCredit, index) {
            var modalInstance = $modal.open({
                templateUrl: 'updateUserCredit.html',
                controller: function ($scope, $modalInstance) {
                    $scope.UserCredit = UserCredit;
                    $scope.sup_index = index;
                    $scope.ok = function () {
                        //if (!$scope.UserCredit.reason || $scope.UserCredit.reason == '') {
                        //    alert('请填写原因');
                        //    return false;
                        //}
                        var update_user_cerdit_url = simpleCons.domain + '/manage/credit/good/users/update';
                        $http.post(update_user_cerdit_url, {
                            item_id: $scope.UserCredit.item_id,
                            express_company: $scope.UserCredit.express_company,
                            express_number: $scope.UserCredit.express_number,
                            name: $scope.UserCredit.name,
                            mobile: $scope.UserCredit.mobile,
                            address: $scope.UserCredit.address
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    alert('结束活动已经操作成功!请刷新列表查看');
                                    sup_scope.credit_user_list[$scope.sup_index] = $scope.UserCredit;
                                    $modalInstance.dismiss('cancel');
                                } else {
                                    alert('失败: ' + json.msg);
                                }
                            });
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };


                },
                size: 'lg'
            });
        }
    }

    function creditController($scope, $http, $rootScope, $modal, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: '/qiniu/controller.php?action=uploadimage'
        });
        var sup_scope = $scope;
    //, good_type: 1
        $scope.list_param = {page: 1, count: 20};
        $scope.list_param.keyword = $scope.search;
        var list_url = simpleCons.domain + '/manage/credit/good/list';
        //list_url = 'http://testapi.huijiame.com/v2/credits/goods';
        $scope.getapi = function (page) {
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.good_list = json.data.list;
                        $scope.totalItems = json.data.total;
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
        var update_url = simpleCons.domain + '/manage/credit/good/update';
        $scope.update = function (good, status, index) {
            if (good.used >= good.stock) {
                alert('库存不足,不能保存！');
                return false;
            }
            if (!confirm('确定要修改这个状态吗？')) {
                return false;
            }
            $scope.creditUpdate_param = {
                good_id: good.good_id,
                status: status
            };
            $http.post(
                update_url,
                $scope.creditUpdate_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('状态更新成功！！');
                        $scope.good_list[index].status = status;
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
    function creditAddController($scope, $http, $rootScope, $modal, FileUploader, $state, $stateParams) {
        var sup_scope = $scope;
        $scope.tiaozhuan = function () {
            if (confirm('确定放弃编辑进入列表吗?')) {
                $state.go('credit');
            }
        }
        $scope.city_names = ['昆明', '上海'];
        var uploader = $scope.uploader = new FileUploader({
            url: '/qiniu/controller.php?action=uploadimage'
        });
        // editor init start
        $scope.ueobj = {};//保存 editor 全局变量到 $scope中
        $scope.ready = function (editor) {
            $scope.ueobj = editor;
        }
        //editor init end

        $scope.creditAdd_param = {
            city: $rootScope.current_city_name,
            good_type: '1',
            intro: '',//简介
            //brief: '',
            sort_num: 0,
            title: '',
            credit: 1,
            indate_min: '',
            indate_max: '',
            stock: 0,
            image: '',
            detail: ''

        };

        // 页面展示的数据
        $scope.creditAdd = {start: {}, end: {}};
        $scope.openedstart = false;
        $scope.openedend = false;
        $scope.creditAdd.start.dt = new Date();
        $scope.creditAdd.start.tp = new Date();
        $scope.creditAdd.end.dt = new Date();
        $scope.creditAdd.end.tp = new Date();
        $scope.format = 'yyyy-MM-dd';
        $scope.hstep = 1;
        $scope.mstep = 5;
        $scope.changed = function () {
            var start = {
                dt: $scope.creditAdd.start.dt,
                tp: $scope.creditAdd.start.tp
            };
            var end = {
                dt: $scope.creditAdd.end.dt,
                tp: $scope.creditAdd.end.tp
            };
            $scope.creditAdd_param.indate_min = (start.dt.getFullYear() + '-' + (start.dt.getMonth() + 1)
            + '-' + start.dt.getDate() + ' ' + start.tp.getHours() + ':' + start.tp.getMinutes() + ':00')
                .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
            $scope.creditAdd_param.indate_max = (end.dt.getFullYear() + '-' + (end.dt.getMonth() + 1)
            + '-' + end.dt.getDate() + ' ' + end.tp.getHours() + ':' + end.tp.getMinutes() + ':00')
                .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
            //console.log($scope.activitynewadd_param.time + '==========' +$scope.activitynewadd_param.end_time );
        };
        $scope.changed();
        $scope.openstart = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedstart = true;
        };
        $scope.openend = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedend = true;
        };

        $scope.save = function () {
            var param_tmp = 0;
            $scope.creditAdd_param.image = '';
            angular.forEach($scope.creditAdd_param, function (value, key) {
                eval('$scope.creditAdd.' + key + '=0')
                // 过滤非必填项
                if (key != 'image' && key != 'city' && key != 'stock' && key != 'sort_num' && value == '') {
                    param_tmp++;
                    $scope.addAlert('有必填项未填写！');
                    eval('$scope.creditAdd.' + key + '=1');
                }
                if ($scope.creditAdd_param.city == '未登录') {
                    param_tmp++;
                    $scope.creditAdd.city = 1;
                    $scope.addAlert('请选择一个商品城市！');
                }
            });
            if ((!uploader.queue[0]) || (!uploader.queue[0].qiniu_url)) {
                param_tmp++;
                alert('还没有上传完图片,请继续上传！');
                return false;
            } else {
                $scope.creditAdd_param.image = uploader.queue[0].qiniu_url;
            }
            if (!$scope.ueobj.getContent()) {
                param_tmp++;
                $scope.addAlert('请填写发布的内容');
                return false;
            } else {
                $scope.creditAdd_param.detail = $scope.ueobj.getContent();
            }
            //console.log($scope.creditAdd_param);
            if (param_tmp > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/credit/good/post';
            $http.post(
                url,
                $scope.creditAdd_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('积分商品发布成功！');
                        $state.go('credit');
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
    function creditUpdateController($scope, $http, $rootScope, $modal, FileUploader, $state, $stateParams) {
        $scope.creditUpdate_param = {};
        $scope.creditUpdate = {};
        $scope.good_id = $stateParams.goodId;
        $scope.strToDateTime = function (str) {
            str = str.toString();
            str = str.replace(/-/g, "/");
            var oDate = new Date(str);
            return oDate;
        }
        $scope.city_names = ['昆明', '上海'];
        //更新
        var uploader = $scope.uploader = new FileUploader({
            url: '/qiniu/controller.php?action=uploadimage'
        });
        // editor init start
        $scope.ueobj = {};//保存 editor 全局变量到 $scope中
        $scope.ready = function (editor) {
            $scope.ueobj = editor;
            $scope.ueobj.addListener('catchremotesuccess', function () {
                alert('替换成功!');
            });
        }
        $scope.good_param = {good_id: $scope.good_id};
        var detail_url = simpleCons.domain + '/manage/credit/good/detail';
        $http.post(detail_url, $scope.good_param)
            .success(function (json) {
                if (json.code == 0) {
                    if (typeof $scope.ueobj.setContent != 'function') {
                        $scope.ready = function (editor) {
                            $scope.ueobj = editor;
                            $scope.ueobj.setContent(json.data.detail);
                        }
                    } else {
                        $scope.ueobj.setContent(json.data.detail);
                    }

                    $scope.init(json.data);
                } else {
                    $scope.addAlert(json.msg);
                }
            });
        $scope.strToDateTime = function (str) {
            str = str.toString();
            str = str.replace(/-/g, "/");
            var oDate = new Date(str);
            return oDate;
        }
        $scope.init = function (data) {
            // 3个时间 相关的数据 页面展示的数据
            console.log(data);
            $scope.image_oldshow = {img: data.image};
            $scope.creditUpdate_param = {
                city: $rootScope.current_city_name,
                //brief:data.brief,
                intro: data.intro,
                good_id: data.good_id,
                good_type: data.good_type,
                sort_num: Number(data.sort_num),
                title: data.title,
                credit: Number(data.credit),
                indate_min: data.indate_min || new Date(),
                indate_max: data.indate_max || new Date(),
                stock: Number(data.stock),
                image: data.image,
                detail: data.detail
            };
            $scope.creditUpdate = {start: {}, end: {}};
            $scope.openstart = false;
            $scope.openend = false;
            $scope.creditUpdate.start.dt = $scope.strToDateTime($scope.creditUpdate_param.indate_min);
            $scope.creditUpdate.start.tp = $scope.strToDateTime($scope.creditUpdate_param.indate_min);
            $scope.creditUpdate.end.dt = $scope.strToDateTime($scope.creditUpdate_param.indate_max);
            $scope.creditUpdate.end.tp = $scope.strToDateTime($scope.creditUpdate_param.indate_max);
            $scope.changed = function () {
                var start = {
                    dt: $scope.creditUpdate.start.dt,
                    tp: $scope.creditUpdate.start.tp
                };
                var end = {
                    dt: $scope.creditUpdate.end.dt,
                    tp: $scope.creditUpdate.end.tp
                };
                $scope.creditUpdate_param.indate_min = (start.dt.getFullYear() + '-' + (start.dt.getMonth() + 1)
                + '-' + start.dt.getDate() + ' ' + start.tp.getHours() + ':' + start.tp.getMinutes() + ':00')
                    .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
                $scope.creditUpdate_param.indate_max = (end.dt.getFullYear() + '-' + (end.dt.getMonth() + 1)
                + '-' + end.dt.getDate() + ' ' + end.tp.getHours() + ':' + end.tp.getMinutes() + ':00')
                    .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
                //console.log($scope.activitynewupdate_param.time + '==========' +$scope.activitynewupdate_param.end_time + "==========" +$scope.activitynewupdate_param.apply_end_time  );
            };
            $scope.changed();
            $scope.open_start = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.openstart = true;
            };
            $scope.open_end = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.openend = true;
            };
        }
        $scope.save = function () {
            console.log($scope.creditUpdate_param);
            var param_tmp = 0;
            angular.forEach($scope.creditUpdate_param, function (value, key) {
                eval('$scope.creditUpdate.' + key + '=0')
                // 过滤非必填项
                if (key != 'image' && key != 'city' && key != 'stock' && key != 'sort_num' && value == '') {
                    param_tmp++;
                    $scope.addAlert('有必填项未填写！');
                    eval('$scope.creditUpdate.' + key + '=1');
                }
                if ($scope.creditUpdate_param.city == '未登录') {
                    param_tmp++;
                    $scope.creditUpdate.city = 1;
                    $scope.addAlert('请选择一个商品城市！');
                }
            });
            //if ((!uploader.queue[0]) || (!uploader.queue[0].qiniu_url)) {
            //    param_tmp++;
            //    alert('还没有上传完图片,请继续上传！');
            //    return false;
            //} else {
            //    $scope.creditUpdate_param.image = uploader.queue[0].qiniu_url;
            //}
            if (!$scope.ueobj.getContent()) {
                param_tmp++;
                $scope.addAlert('请填写发布的内容');
                return false;
            } else {
                $scope.creditUpdate_param.detail = $scope.ueobj.getContent();
            }
            console.log($scope.creditUpdate_param);
            if (param_tmp > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/credit/good/update';
            $http.post(
                url,
                $scope.creditUpdate_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('积分商品发布成功！');
                        $state.go('credit');
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
                $scope.creditUpdate_param.image = response.url;
            }
        };
        $scope.tiaozhuan = function () {
            if (confirm('确定放弃编辑进入列表吗?')) {
                $state.go('credit');
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
});
