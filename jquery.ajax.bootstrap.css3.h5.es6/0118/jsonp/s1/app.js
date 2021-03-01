// 引入express框架
const express = require("express");

// 路径处理模块
const path = require("path");

// 引入body-parser模块,处理post发送过来的数据
const bodyParser = require('body-parser');

// 创建web服务器
const app = express();

// 创建 application/x-www-form-urlencoded 编码解析  username=张三&age=23
app.use( bodyParser.urlencoded({ extended: false }) );

// 创建 json 遍历解析
app.use( bodyParser.json() );

// 静态资源访问服务功能
app.use( express.static(path.join(__dirname, "public") ) );

// 监听端口
app.listen(3001);

// 控制台输出
console.log("服务器1号启动成功");