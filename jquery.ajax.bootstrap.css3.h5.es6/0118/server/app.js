// 引入express框架
const express = require("express");

// 引入fs文件模块
const fs = require("fs");

// 引入body-parser模块
const bodyParse = require("body-parser");

// 路径处理模块
const path = require("path");

// 创建web服务器
const app = express();

// 创建 application/x-www-form-urlencoded 编码解析
app.use(  bodyParse.urlencoded({ extended: false }) );

// 解析json编码解析
app.use( bodyParse.json() );

// 静态资源访问服务功能
app.use( express.static(path.join(__dirname, "public") ) );

app.post("/post01",function( req, res ){
    var username = req.body.username;
    var age = req.body.age;
    var sex = req.body.sex;
    res.send( `姓名叫${username},年龄为${age},性别为${sex}` );
});

app.get("/get01",function(req, res ){
    // 使用延时器,延迟两秒响应数据
    setTimeout(function(){
        res.send("get01返回的数据");
    },2000)
})

app.get("/get02",function(req, res ){
    // 输出一个不存在的变量,会报错;会返回500状态码服务器错误
    // console.log( a );

    res.send("get02返回的数据");
})


app.get("/get03",function(req, res ){
    // 通过fs.readFile可以读取指定文件路径的文件
    // readFile第一个参数是路径,第二个参数是回调函数
    // error是错误信息,result读取文件的结果
    fs.readFile("./test.txt",function( error, result ){
        // console.log( error );
        // console.log( result.toString() );

        res.send( result );
    });
})

app.get("/get04",function(req, res ){
    res.send("get04返回的数据");
})

app.get("/ajaxGet",function(req, res ){
    // res.send("ajaxGet请求返回的数据");
    
    // 如何判断一个对象是否为空对象
    if( JSON.stringify( req.query ) == "{}"){
        res.send( "ajaxGet返回的数据6666666" );
    }else{
        // req.query拿到get传递过来的参数
        res.send( req.query );
    }

})

app.post("/ajaxPost",function(req, res ){
    // req.body拿到post传递过来的参数
    res.send( req.body );

    // res.send("abxcvcxv123");
})

// 监听端口
app.listen(3000);

// 控制台输出
console.log("服务器启动成功");