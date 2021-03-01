// options参数是一个对象
function ajax( options ){
    // 默认值对象
    var defaults = {
        type : "get",
        url : "",
        data : {},
        header:{
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        success:function(){},
        error:function(){},
    };

    // 合并对象,把options合并到defaults里面
    Object.assign( defaults , options );

    // 进行赋值,再这样后面的options就不需要改成defaults
    options = defaults;

    // ajax函数功能有哪些 发送get请求 或者 发送post请求
    var xhr = new XMLHttpRequest();

    var params = "";
    // 参数字符串格式: username=张三&age=23&sex=男
    for(var attr in options.data){
        params += "&"+attr+"="+options.data[attr];
    }
    // 截取字符串,去掉第一个&符号
    params = params.substr(1);

    if( options.type == "get" ){// 判断是否为get请求
        if( options.url.indexOf("?") >= 0 ){// 判断options.url是否包含?号
            // get传递传递是通过url拼接的
            xhr.open( options.type , options.url+"&"+params );
        }else{
            // get传递传递是通过url拼接的
            xhr.open( options.type , options.url+"?"+params );
        }
        xhr.send();
    }else if(options.type == "post"){// 判断是否为post请求
        xhr.open( options.type , options.url );
        // 得到options.header传递过来的参数                
        var contentType = options.header["Content-Type"];
        // 设置请求头
        xhr.setRequestHeader("Content-Type", contentType );
        // 判断contentType变量中是否含有json
        if( contentType.indexOf("json") >= 0 ){
            // post传递json格式字符串
            xhr.send( JSON.stringify( options.data ) );
        }else{
            // post传递是通过send()方法传递的
            xhr.send( params );
        }
    }

    // 判断ajax状态码
    xhr.onreadystatechange = function(){
        if( xhr.readyState == 4 ){
            if( xhr.status == 200 ){
                // 获取响应头信息
                if( xhr.getResponseHeader("Content-type").indexOf("json") >= 0 ){
                    options.success( JSON.parse( xhr.responseText ) );// success成功的回调函数
                }else{
                    options.success( xhr.responseText );// success成功的回调函数
                }
            }else{
                options.error( xhr );// error失败的回调函数
            }
        }
    }   
}