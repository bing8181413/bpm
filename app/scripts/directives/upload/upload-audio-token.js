define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('showUploadAudioToken', function ($state, $rootScope, $timeout, FileUploader, $templateCache, $parse, widget, $interval, $sce, $http) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    audio: '=',
                    required: '@',
                    token: '@',
                    // max: '@',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'upload/showAudioUpload.html'),
                controller: function ($scope, $element, $attrs) {
                    // https://www.cnblogs.com/stoneniqiu/p/7341181.html  分享
                    $scope.audio = $scope.audio || [];
                    var recorder = $rootScope.recorder || undefined;
                    var audio = $('#main_audio');
                    $scope.sce = $sce.trustAsResourceUrl;
                    $scope.audio_url = '';//  主播放器的URL
                    $scope.duration = 0;
                    var gd;// 获取录音时间
                    $scope.stop_duration = function () {
                        $interval.cancel(gd);
                        gd = undefined;
                    }
                    $scope.get_duration = function () {
                        $scope.duration = 1;
                        if (gd) {
                            $interval.cancel(gd);
                        }
                        gd = $interval(function () {
                            $scope.duration++;
                            // console.log($scope.duration);
                            if ($scope.duration >= 55) {
                                $scope.send();
                                console.log('............');
                                $scope.stop_duration();
                                $scope.stopRecord();
                            }
                        }, 1000);
                    }
                    $scope.startRecording = function () {
                        if (recorder) {
                            var data = recorder.getBlob();
                            if (data.duration == 0) {
                                $scope.get_duration();
                                recorder.start();
                                console.log('开始录音!!!');
                            } else {
                                console.log('继续录音!!!');
                            }
                            return;
                        }
                        $scope.get_duration();
                        HZRecorder.get(function (rec) {
                            console.log('第一次录音 !!!');
                            recorder = rec;
                            $rootScope.recorder = recorder;
                            recorder.start();
                        }, {error: showError});
                    }


                    function getStr() {
                        var now = new Date;
                        var str = now.toDateString();
                    }

                    $scope.stopRecord = function () {
                        // console.log($scope.duration);
                        $scope.stop_duration();
                        recorder && recorder.stop() / 10;
                        // console.log($scope.duration);
                        // console.log('时长:' + $scope.duration);
                    };
                    var msg = {};
                    //发送音频片段
                    var msgId = 1;

                    $scope.send = function () {
                        if (!recorder) {
                            $scope.stopRecord();
                            showError("请先录音");
                            return;
                        } else {
                            // console.log($scope.duration);
                            $scope.stopRecord();
                        }
                        var data = recorder.getBlob();
                        // console.log(data, data.duration);
                        if (data.duration == 0) {
                            recorder.clear();
                            showError("时间太短,请重新录音");
                            return;
                        }
                        msg[msgId] = data;
                        recorder.clear();
                        // console.log(data);
                        var dur = Math.ceil(data.duration / 10);
                        $scope.duration = 0;
                        $scope.audio.push({
                            type: 'blob',
                            id: msgId,
                            duration: dur,
                            data: msg[msgId],
                            name: msgId + '.wav'
                        });
                        msgId++;
                        $scope.upload_audio($scope.audio[$scope.audio.length - 1], ($scope.audio.length - 1));//上传
                    }

                    // var ct;

                    function showError(msg) {
                        widget.msgToast(msg);
                        console.error(msg);
                        // clearTimeout(ct);
                        // ct = setTimeout(function () {
                        //     $(".error").html("")
                        // }, 3000);
                    }

                    $('#main_audio').off().on('pause', function () {
                        console.log('监听停止播放');
                        $scope.playRecord();
                    });

                    $scope.playRecord = function (audio_obj) {
                        // console.log($scope.audio, audio_obj);
                        angular.forEach($scope.audio, function (val, key) {
                            val.playing = false;
                        });
                        if (!audio_obj) {
                            return;
                        }
                        audio_obj.playing = true;
                        // console.log(!!audio_obj.url, !!audio.attr('src'), audio_obj.url == audio.attr('src'));
                        if (!!audio_obj.url && !!audio.attr('src') && (audio_obj.url == audio.attr('src'))) {
                            // 还是当前SRC
                            $scope.play_pause();
                        } else {
                            // 替换为其他音频 src
                            if (audio_obj.type == 3) {//type 3 : 音频
                                $scope.audio_url = audio_obj.url;
                            } else if (audio_obj.type == 'blob') {
                                var id = audio_obj.id;
                                var data = msg[id];
                                // console.log(data);
                                if (!recorder) {
                                    showError("请先录音");
                                    return;
                                }
                                audio_obj.url = $scope.audio_url = window.URL.createObjectURL(data.blob);
                            }
                        }
                    };

                    $scope.play_pause = function () {
                        var audio2 = document.getElementById('main_audio');
                        // audio2 = audio;
                        if (audio2.paused) {
                            audio2.play();
                        } else {
                            audio2.pause();
                        }
                    }


                    $scope.upload_audio = function (audio_obj, index) {
                        if (audio_obj.type == 3) {
                            return;
                        }
                        // console.log(audio_obj);
                        var fileItemTmpl = {name: audio_obj.name, type: $scope.token};
                        widget.ajaxRequest({
                            url: '/supports/uptoken',
                            method: 'get',
                            scope: $scope,
                            data: fileItemTmpl,
                            success: function (json) {
                                // console.log(json);
                                // console.log(form, item.formData);
                                // fileItem.formData.push({key: json.data.key, token: json.data.token});
                                $scope.audio[index].name = json.data.key;
                                $scope.audio[index].token = json.data.token;
                                $http({
                                    method: 'POST',
                                    url: 'https://up.qbox.me/',
                                    headers: {
                                        'Content-Type': undefined
                                    },
                                    transformRequest: function (data) {
                                        var formData = new FormData();
                                        formData.append('key', $scope.audio[index].name);
                                        formData.append('token', $scope.audio[index].token);
                                        formData.append('file', msg[$scope.audio[index].id].blob);
                                        return formData;
                                    },
                                    data: {}
                                }).success(function (json) {
                                    $scope.audio[index].type = 3;
                                    $scope.audio[index].url = json.url;
                                    $scope.audio[index].width = json.width || 0;
                                    $scope.audio[index].height = json.height || 0;
                                    $scope.audio[index].size = json.size || 0;
                                    delete $scope.audio[index].id;
                                    delete $scope.audio[index].data;
                                    delete $scope.audio[index].token;
                                    // widget.msgToast('上传成功!');
                                }).error(function (err, status) {
                                    console.log(err);
                                    widget.msgToast('上传失败,请检查网络..');
                                });
                            }
                        })


                    }

                }
            };
        })
})
;
