define(function() {
    var lessons = [
        {
            name: 'missed lesson option ', //无用
            url: /lessons\/missedlesson/,
            method: 'POST',
            data: {
                code: 0,
                message: '',
                data: [{a: 1}],
            },
        },
    ];
    return lessons;
});