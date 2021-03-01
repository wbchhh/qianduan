// 防抖函数
// 基本版本
function debounce(callback,millisecond){
    // 定义变量 记录延迟函数
    var delayer = null;
    // 返回function
    return function(){
        // 判断变量是否有值 ，有，说明正在执行延迟函数，那么就清除延迟函数
        if(delayer) clearTimeout(delayer);
        // 重新执行延迟函数
        delayer = window.setTimeout(callback,millisecond);
    }
}

// function foo(){ var count = 0 ; return function(){ count ++ ; console.log(count)}}
// foo()()
// foo()()
// foo()()

// var f = foo();
// f()
// f()
// f()

// 节流函数
// 基础版本
function throttle(callback,millisecond){
    // 定义变量 记录延迟函数
    var delayer = null;
    // 定义变量 记录开关
    var isOpen = true;
    // 返回一个函数
    return function(){
        // 判断布尔值是否为true , 是 ，进入if语句
        if(isOpen){
            // 设置布尔值为false
            isOpen = false;
            // 执行延迟函数
            delayer = setTimeout(function(){
                // 条件判断
                if(delayer) clearTimeout(delayer);
                // 执行传递的callback函数
                callback();
                // 设置布尔值为true
                isOpen = true;
            },millisecond);
        }
    }
}