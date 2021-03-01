function ajax( options ){
    // 存储的是默认值
    var defaults = {
        type : "get",
        url : "",
        data : "",
        header:{
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        success:function(){},
        error:function(){},
    };

    // 使用options对象中的属性覆盖defaults对象中的属性
    Object.assign(defaults, options );

    // 创建ajax对象
    var xhr = new XMLHttpRequest();

    // 拼接请求参数的变量
    var params = "";
    // 循环用户传递进来的对象格式参数
    for( var attr in defaults.data ){
        params += attr+"="+defaults.data[attr]+"&";
    }
    // 将参数最后面的&符号截取掉
    params = params.substr( 0 , params.length-1 );
    // 测试参数字符串
    // console.log( params );

    // 如果请求方式为get
    if( defaults.type == "get" ){
        defaults.url = defaults.url + "?" + params;
    }

    // 配置ajax对象
    xhr.open( defaults.type , defaults.url );

    if( defaults.type == "post" ){// 如果请求方式为post
        // 用户希望向服务器端传递的请求参数的类型
        var contentType = defaults.header["Content-Type"];
        // 设置请求参数的类型
        xhr.setRequestHeader("Content-Type",contentType );
        // 判断用户希望的请求参数格式的类型
        if( contentType == "application/json"){
            // 向服务器端传递json数据格式的参数 需要一个json字符串
            xhr.send( JSON.stringify( defaults.data ) );
        }else{
            // 向服务器端传递普通类型的请求参数
            xhr.send( params );
        }
    }else{
        // 发送请求
        xhr.send(  );
    }
    
    
    // 监听ajax状态码变化事件
    xhr.onreadystatechange = function(){
        // 判断ajax状态码是否为4 并且 判断http状态码是否为200
        if( xhr.readyState == 4){
            // 获取响应头中的数据
            // console.log( xhr.getResponseHeader("Content-Type"));
            var contentType = xhr.getResponseHeader("Content-Type");
            
            // 服务器端返回的数据
            var responseText = xhr.responseText;

            // 如果响应类型中包含application/json
            if( contentType.includes("application/json") ){
                responseText = JSON.parse(responseText);
            }


            // 当http状态码等于200的时候
            if( xhr.status == 200 ){
                // 请求成功 调用处理成功情况的函数
                defaults.success( responseText , xhr);
            }else{
                // 请求失败 调用处理失败情况的函数
                defaults.error( responseText , xhr );
            }
        }
    }
}