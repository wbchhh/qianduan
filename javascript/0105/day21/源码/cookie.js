// 1.0  设置cookie 
function setCookie(key, value, hours) {
    // 日期对象 
    var dt = new Date();
    var currentTime = dt.getTime();
    // 默认2个小时
    hours = hours || 2;
    // 设置有效时间
    dt.setTime(currentTime + hours * 60 * 60 * 1000);
    // 设置缓存数据
    document.cookie = key + "=" + value + "; expires=" + dt
}

// 2.0  获取cookie 
function getCookie(key) {
    // 获取cookie
    var dataStr = document.cookie;
    // 判断是否存在cookie ,不存在，直接终止代码
    if (dataStr.length == 0) return;
    // 切割字符串
    var data = dataStr.split("; ");
    // 定义对象
    var obj = {};
    // 循环data数组
    for (var i = 0; i < data.length; i++) {
        // key = value
        var prop = data[i].split("=")[0];
        var v1 = data[i].split("=")[1];
        obj[prop] = v1;
    }
    // 返回指定cookie名称的属性
    return obj[key];
}
// 3.0 删除cookie 
function removeCookie(key) {
    // 有效时间过期
    var dt = new Date(1970 / 01 / 01);
    // 设置对应的cookie为空
    document.cookie = key + "=; expires=" + dt;
}