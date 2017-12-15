define(['./services', '../cons/simpleCons'], function (mod, cons) {
    mod.factory('table2Array', function ($q, $state, $compile, $location, $rootScope, $log) {
        var tr2text = function (rows) {
            var row_content = [];
            angular.forEach(rows.children(), function (row) {
                row_content.push($(row).text());
            })
            return row_content;
        }
        var table2Array = function (id) {
            var rtn_arr = [];
            var head = $("#" + id + ">thead>tr");
            var body = $("#" + id + ">tbody>tr");
            if (head.length > 0) {
                angular.forEach(head, function (tr) {
                    rtn_arr.push(tr2text($(tr)));
                })
            }
            if (body.length > 0) {
                angular.forEach(body, function (tr) {
                    rtn_arr.push(tr2text($(tr)));
                })
            }
            return rtn_arr;
        }
        return table2Array;
    });
});
