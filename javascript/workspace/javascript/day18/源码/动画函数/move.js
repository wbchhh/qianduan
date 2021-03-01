// 缓动函数的封装（必须理解）
function move(dom, key, value) {
    // 清除定时器
    clearInterval(dom.timer);
     // 执行定时器
    dom.timer = setInterval(function () {
        // 获取当前属性值 
        var currentV = parseInt(getComputedStyle(dom, null)[key]);
        // 计算步长
        var speed = (value - currentV) / 10;
        //  处理小数点
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        // 判断该属性是否到达目标属性值
        if (currentV == value) {
            // 停止定时器函数
            clearInterval(dom.timer);
            // 终止代码
            return;
        }
        // 设置dom的样式
        dom.style[key] = currentV + speed + "px";
    }, 30);
}