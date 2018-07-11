define(['./services', '../cons/simpleCons'], function(mod, cons) {
    mod.factory('videoGroupVerify', function($q, $state, $compile, $location, $rootScope, $log, $filter) {
        var videoGroupVerify = {
            // 判定视频组下任务的题目 提交数据是否正确
            workSubmit: function(work) {
                var ERROR = [];
                if (work.answer === '') {
                    ERROR.push('没有正确答案');
                }

                if (work.type == 1) {// 单选题
                    if (work.answer.split(',').length > 1) {
                        ERROR.push('单选题只能有一个正确答案');
                    }
                    if (work.options.length < 2 || work.options.length > 4) {
                        ERROR.push('单选题选项为 2~4 个');
                    }
                } else if (work.type == 2) {// 多选题
                    if (work.answer.split(',').length < 2) {
                        ERROR.push('多选题只能有一个正确答案');
                    }
                    if (work.options.length < 3 || work.options.length > 7) {
                        ERROR.push('单选题选项为 3~7 个');
                    }
                }
                var options = work.options;
                option:
                    for (var i = 0; i < options.length; i++) {
                        if (options[i].body_value == '') {
                            ERROR.push('第 ' + (i + 1) + '个选项没有值');
                            break option;
                        }

                    }
                if (work.option_type == 1) { // 文字选项

                } else if (work.option_type == 2) { // 图片选项
                    if (work.options.length > 4) {
                        ERROR.push('图片类型，选项最多为 4 个');
                    }

                } else if (work.option_type == 3) { // 语音选项

                }
            },
        };
        return videoGroup;
    });
});
