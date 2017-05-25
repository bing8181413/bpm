define([], function () {
    var rtn = {
        surveyQuestionList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-center'},
                {name: '维度类别', fieldDirective: '<div survey-question-category data="item"></div>'},
                {name: '选项带分', field: 'need_score', filter: 'yes1no2'},
                {name: '是否必答', field: 'required', filter: 'yes1no2'},
                {name: '题型', field: 'type', filter: 'survey_question_type'},
                {
                    name: '年龄段',
                    fieldDirective: '<span ng-bind="item.age_min+(item.age_min==10?\'以上\':(\'-\'+item.age_max))"></span>'
                },
                {
                    name: '文字描述',
                    fieldDirective: '<p style="width:300px;" ng-bind="item.title"></p>'
                },
                {name: '答题人次', field: 'problem.count'},
                {name: '做对人次', field: 'problem.right_count'},
                {name: '上线时间', field: 'created_at'},
                {name: '状态', field: 'status', filter: 'survey_question_status'},
                {
                    name: '操作',
                    fieldDirective: '<div survey-question-edit data="item" ></div>' +
                    '<div survey-question-copy data="item" ></div>' +
                    '<div survey-question-del data="item" ></div>' +
                    '<div survey-question-change-status data="item" ></div>'
                },
            ],
            config: {
                title: '题库列表',
                api: '/surveys/questions',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {text: '关键字', value: 'keyword'},
                    {
                        text: '维度',
                        paramDirective: '<select class="form-control" ng-model="params.category_id" ' +
                        'ng-options="item.value as item.text for item in $root.survey_question_category_list_general">' +
                        '</select>'
                    },
                    {
                        value: 'status', text: '状态', type: 'btnGroup', default: '', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '正在进行'},
                            {value: '2', text: '暂停'},
                            {value: '3', text: '删除'},
                            {value: '4', text: '草稿'},
                        ]
                    },
                    {
                        type: 'btnGroupArray',
                        value: 'flag',
                        text: '年龄段',
                        default: 0, //有enum_text 时 enumde index 的值
                        width: '6',
                        enum_text: ['age_min', 'age_max'],//  有  enum_text 说明是数组
                        enum: [
                            {value: ['', ''], text: '全部'},
                            {value: ['0', '3'], text: '0-3'},
                            {value: ['4', '6'], text: '4-6'},
                            {value: ['7', '9'], text: '7-9'},
                            {value: ['10', ''], text: '10岁以上'},
                        ]
                    },
                ],
                preSelectionSearch: {
                    age_min: '',
                    age_max: '',
                    status: '',
                    category_type: '2'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [
                    {value: 'main.survey_question.add', text: '新增题库'},
                    // {routeDirective: '<div survey-question-add data="">新增题库</div>'},
                ],
                ext: {
                    showNum: [
                        {text: '总数', type: 'total'},
                    ]
                }
            },
        },
        surveyQuestionAttachmentList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-center'},
                // {name: '维度类别', fieldDirective: '<div survey-question-category data="item"></div>'},
                {name: '类型', field: 'type', filter: 'survey_question_type'},
                {name: '文字描述', field: 'title'},
                {name: '上线时间', field: 'created_at'},
                // {name: '状态', field: 'status', filter: 'survey_question_status'},
                {
                    name: '操作',
                    fieldDirective: '<div survey-question-edit data="item" attachment="1"></div>' +
                    '<div survey-question-del data="item" ></div>'
                },
            ],
            config: {
                title: '附加信息列表',
                api: '/surveys/questions',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    {
                        value: 'status', text: '状态', type: 'btnGroup', default: '1', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '正在进行'},
                            {value: '2', text: '暂停'},
                            {value: '3', text: '删除'},
                            {value: '4', text: '草稿'},
                        ]
                    },
                ],
                preSelectionSearch: {
                    age_min: '',
                    age_max: '',
                    status: '1',
                    category_type: '1'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [
                    {value: 'main.survey_question_attachment.add', text: '新增附加信息'},
                    // {routeDirective: '<div survey-question-add data="">新增题库</div>'},
                ]
            },
        }
    }
    return rtn;
});