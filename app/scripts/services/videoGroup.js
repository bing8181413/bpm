define(['./services', '../cons/simpleCons'], function(mod, cons) {
    mod.factory('videoGroupVerify', function($q, $state, $compile, $location, $rootScope, $log, $filter) {
        var videoGroupVerify = {
            // 判定视频组下任务的题目 提交数据是否正确
            workSubmit: function(work) {
                var ERROR = [];
                var options = work.options || [];
                var stems = work.stems || [];

                if (!options || options.length == 0) {
                    ERROR.push('没有选项');
                }

                if (work.answer === '') {
                    ERROR.push('没有正确答案');
                }

                option:
                    for (var i = 0; i < options.length; i++) {
                        if (!options[i].body_value || options[i].body_value == '') {
                            ERROR.push('第 ' + (i + 1) + ' 个选项没有值');
                            break option;
                        }
                    }

                var StemBodyTypeRecordRecord = ',';
                stem:
                    for (var i = 0; i < stems.length; i++) {
                        if (StemBodyTypeRecordRecord.indexOf(stems[i].body_type) > -1) {
                            ERROR.push('题干不能选择多个同类型');
                            break stem;
                        } else if (!stems[i].body_value || stems[i].body_value == '') {
                            ERROR.push('第 ' + (i + 1) + ' 个题干没有值');
                            break stem;
                        }
                        StemBodyTypeRecordRecord += (stems[i].body_type + ',');
                    }

                if (work.type == 1) {// 单选题
                    if (options.length < 2 || options.length > 4) {
                        ERROR.push('单选题选项为 2~4 个');
                    }
                    if (work.answer.split(',').length > 1) {
                        ERROR.push('单选题只能有一个正确答案');
                    }
                } else if (work.type == 2) {// 多选题
                    if (options.length < 3 || options.length > 7) {
                        ERROR.push('多选题选项为 3~7 个');
                    }
                    if (work.answer.split(',').length < 2) {
                        ERROR.push('多选题正确答案为 2~7 个');
                    }
                }

                if (work.option_type == 1) { // 文字选项

                } else if (work.option_type == 2) { // 图片选项
                    if (options.length > 4) {
                        ERROR.push('图片类型选项最多为 4 个');
                    }
                    if (work.type != 1) {// 图片类型只支持单选
                        ERROR.push('图片类型只支持单选');
                    }

                } else if (work.option_type == 3) { // 语音选项

                }
                return ERROR;
            },
        };
        return videoGroupVerify;
    });
});
