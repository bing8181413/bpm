define([], function () {
    // accountList roleList
    var rtn = {
        subjectList: {
            columns: [
                {name: '运营专题ID', field: 'subject_id'},
                {name: '名称', field: 'name'},
                {name: '简介', field: 'brief'},
                {name: '缩略图', fieldDirective: '<show_image url="item.share_pic.pic_url" width="100"></show_image>'},
                {name: '专题活动列表', fieldDirective: '<div subject-product data="item"></div>'},
                // {name: '展示时间', fieldDIrective: ''},
                {name: '创建时间', field: 'created_at'},
                {name: '状态', field: 'visible:',filter:'status0or1or2'},
                {
                    name: '操作',
                    fieldDirective: '<div subject-edit data="item"></div>'
                    // +'<div subject-change-status data="item"></div>'
                },
            ],
            config: {
                title: '运营专题列表管理',
                api: '/subjects',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'visible', text: '专题状态', type: 'btnGroup', default: '',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '正在进行'},
                            {value: '2', text: '已下线'},
                        ]
                    },
                    {value: 'subject_id', text: '专题ID', placeholder: ''},
                    {value: 'keyword', text: '专题名称', placeholder: ''},
                ],
                preSelectionSearch: {
                    status: '0',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.subject.add', text: '新增运营专题'}],
            }
        },
    }
    return rtn;
});