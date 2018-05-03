const webpack = require('webpack');
const path = require('path');

// let base = {  //下面的 entry 入口字段，可以是字符串、对象、数组、函数等 ，这里使用 对象形式
//   index: path.join(__dirname, 'app/scripts/main'),
// };
let base = [
  //'app/scripts/partials/**/*.html',
  // 'app/scripts/views/**/*.html',
  'app/scripts/views/container/**/*.html',
  'app/scripts/views/main/**/*.html',
  'app/scripts/views/biz/**/*.html',
  'app/scripts/views/demo/**/*.html',
  'app/scripts/views/live/**/*.html',
  'app/scripts/views/directive/**/*.html'
]
// console.log(path.join(__dirname, 'app/scripts/views);
module.exports = {
  entry: base,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app-tpl.js',
  },
  module: {
    loaders: [
      // {test: /\.css$/, loader: 'style-loader!css-loader'},
      {
        test: /\.html$/,
        use: [
          {loader: 'ngtemplate-loader?relativeTo=' + (path.join(__dirname, 'app/scripts/views/'))},
          {loader: 'html-loader'},
        ],
      },
    ],
  },
};