  // 定义animate函数（缓动函数）
  function animate(dom,obj,callback){
    // 清除定时器
    clearInterval(dom.timer);
    // 执行定时器
    dom.timer = setInterval(function(){
        // 定义布尔值 （用于判断是否停止定时器函数）
        var isChange = true;
        // 循环对象
        for(var key in obj){
            // 获取目标属性值
            var targetV = parseInt(obj[key]);
            // 获取当前属性值 
            var currentV = parseInt(getComputedStyle(dom)[key]);
            // 计算步长
            var speed = (targetV - currentV) / 10;
            // 处理小数点
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            // 判断
            // 当前属性值没有达到目标属性值的时候，一直执行定时器函数
            if(currentV != targetV){
                 // 把布尔值设置为false
                isChange = false;
            }
            // 设置dom的样式
            dom.style[key] = currentV + speed + "px";
        }
        // 判断所有属性是否达到目标属性值
        if(isChange){
            // 停止定时器函数
            clearInterval(dom.timer);
            // 判断是否存在函数，存在则调用
            if(callback) callback();
        }
    },30)
}