define([
        'angular',
        './getCommonMock',//  不需要的 mock 数据文件 =====注释掉=====
        './lessonsMock',
    ],
    function(angular) {
        var mock = angular.module('ahaMock', []);
        var mockFileList = [];

        angular.copy(arguments, mockFileList);

        Array.prototype.shift.call(mockFileList); // 获取 除了 angular 其他参数

        mock.run([
            '$httpBackend', '$rootScope', '$http',
            function($httpBackend, $rootScope, $http) {
                var mock = false;
                // 域名的 host 有 mock 字符 例如 mockbpm.hjm.com
                if (location.host.indexOf('mock') > -1) {
                    mock = true;
                }

                // 循环2次   第一次找文件，第二次找文件里的多个配置对象
                if (mock) {
                    for (var i = 0; i < mockFileList.length; i++) {
                        (function cyclePush(mockList) {
                            for (var i in mockList) {
                                var mockObject = mockList[i];
                                var keyList = Object.keys(mockObject);

                                // url 必须是个正则表达式
                                if (keyList.indexOf('url') !== -1 && keyList.indexOf('data') !== -1
                                    && Object.prototype.toString.call(keyList.indexOf('url')) !== '[object RegExp]') {
                                    $httpBackend.when(mockObject.method || 'GET', mockObject.url)
                                        .respond(200, mockObject.data, [], 'mock 数据');

                                } else {
                                    var errList = [];
                                    keyList.indexOf('url') === -1 && errList.push('url');
                                    keyList.indexOf('data') === -1 && errList.push('data');

                                    console.error('mock 数据 配置 缺少:', errList.join(','), mockObject);
                                }
                            }
                        })(mockFileList[i]);
                    }
                }
                // 真是 ajax 常规路线
                $httpBackend.whenGET(/views\/(.+).html/).passThrough(); //对于html模板的请求不拦截
                $httpBackend.when('GET', /.*/).passThrough();   // 忽略 GET
                $httpBackend.when('POST', /.*/).passThrough();  // 忽略 POST
                $httpBackend.when('PUT', /.*/).passThrough();   // 忽略 PUT
                $httpBackend.when('DELETE', /.*/).passThrough();// 忽略 DELETE

            },
        ]);
        return mock;
    });

