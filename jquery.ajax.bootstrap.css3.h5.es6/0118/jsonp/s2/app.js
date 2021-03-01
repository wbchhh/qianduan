// 引入express框架
const express = require("express");

// 路径处理模块
const path = require("path");

// 创建web服务器
const app = express();

// 静态资源访问服务功能
app.use( express.static(path.join(__dirname, "public") ) );

app.get("/get02",function(req,res){
    // var obj = {
    //     username : "张三",
    //     age : 23
    // }
    funName = req.query.callback;
    res.send(funName+"('hello')");
})
// 监听端口
app.listen(3002);

// 控制台输出
console.log("服务器2号启动成功");