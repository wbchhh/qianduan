// 缓动函数的封装（必须理解）
function move(dom, key, value) {
    clearInterval(dom.timer);
    dom.timer = setInterval(function () {
        var currentV = parseInt(getComputedStyle(dom, null)[key]);
        var speed = (value - currentV) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (currentV == value) {
            console.log("停止定时器函数");
            clearInterval(dom.timer);
            return;
        }
        dom.style[key] = currentV + speed + "px";
    }, 30);
}