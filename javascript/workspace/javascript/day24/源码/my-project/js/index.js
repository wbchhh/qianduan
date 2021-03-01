// 编码思维逻辑
// 1. 页面初始化 ，打乱图片摆放顺序
// 2. 交换的图片的位置（设置img标签的src）
// 3. 获取当前点击的标签的数据（行，列）
// 4. 如何检测拼图完成


// 面向过程
// 编码实现
// 1.0 加载页面
window.onload = function () {
    // 初始化
    init();
    // 添加事件
    addClickEvent();
    // 测试
    // isSuccess();
    // ...
}

// 2.0 编写处理逻辑
// 获取相关的元素
var wrapper = document.getElementsByClassName("wrapper")[0];
// console.log(wrapper);
// 作为初学者 （非资深开发者） 要经常查看控制台，检查变量是否有值，程序是否执行
var items = wrapper.getElementsByTagName("li");

// 随机数
function random(num) {
    // 返回 0 ~ index 之间的随机数
    return Math.floor(Math.random() * num);
}
// 初始化
function init() {
    // 定义数组 记录1到16
    var arr = [];
    // 循环 用于产生数据
    for (var i = 0; i < 16; i++) {
        arr.push((i + 1) + "");
    }
    // console.log(arr)
    // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"]
    // 计数器变量
    var count = 16;
    // 循环 用于排版
    for (var j = 0; j < 16; j++) {
        var index = random(count);
        // console.log(index);
        // 从数组 arr 取出索引值对应的数据并删除，取出的数据在数组中，
        // 所以需要加[0]
        // arr.splice(索引值,长度) 返回值
        var v1 = arr.splice(index, 1)[0];
        // console.log(v1);
        // 设置图片路径
        items[j].children[0].setAttribute("src", "./images/" + v1 + ".png");
        // 设置图片alt属性值
        items[j].children[0].setAttribute("alt", v1);
        // 判断
        if (v1 == "16") {
            items[j].children[0].className = "empty";
        }
        // 改变计数器的值
        count--;
    }
}
// 交换图片
function changeImage(currentImage, emptyImage) {
    // 记录空白图片的数据（emptyImage）
    var srcV = emptyImage.getAttribute("src");
    var altV = emptyImage.getAttribute("alt");

    // 设置空白图片的数据（emptyImage）
    emptyImage.setAttribute("src", currentImage.getAttribute("src"));
    emptyImage.setAttribute("alt", currentImage.getAttribute("alt"));

    // 设置当前点击图片的数据
    currentImage.setAttribute("src", srcV);
    currentImage.setAttribute("alt", altV);

    // 设置类名
    currentImage.className = "empty";
    emptyImage.className = "";
}
// 测试
// var curImage = items[14].getElementsByTagName("img")[0]
// var emptyImage = items[15].getElementsByTagName("img")[0]
// changeImage(curImage,emptyImage);
// 事件绑定
function addClickEvent() {
    // 循环
    for (var i = 0; i < items.length; i++) {
        // 绑定事件
        items[i].onclick = function () {
            // this 事件的调用者
            // console.log(this);
            // row 行
            var row = this.parentElement.className.substr(-1, 1);
            // col 列
            var col = this.className.substr(-1, 1);
            // console.log("第"+row+"行,第"+col+"列");
            // 围绕空白的图片 分四个方向
            var left = parseInt(col) + 1;
            var right = parseInt(col) - 1;
            var up = parseInt(row) - 1;
            var down = parseInt(row) + 1;

            // 获取空白图片的坐标位置
            var emptyElement = document.getElementsByClassName("empty")[0];
            var empty_col = emptyElement.parentElement.className.substr(-1, 1);
            var empty_row = emptyElement.parentElement.parentElement.className.substr(-1, 1);

            // console.log("空白图片Y:",empty_row,"空白图片X:",empty_col);
            // 检测点击的标签和空白图片的标签是否为相邻关系
            // (X , Y )
            // 水平方向
            if (left == empty_col || right == empty_col) {
                if (row == empty_row) {
                    // console.log("满足条件，是相邻关系 , X ")
                    // 当前点击的标签下的img标签
                    var currentElement = this.children[0];
                    // 交换位置
                    changeImage(currentElement, emptyElement);
                }
            }
            // 垂直方向
            if (up == empty_row || down == empty_row) {
                if (col == empty_col) {
                    // console.log("满足条件，是相邻关系 , Y ")
                    // 当前点击的标签下的img标签
                    var currentElement = this.children[0];
                    // 交换位置
                    changeImage(currentElement, emptyElement);
                }
            }
            // 检测图片是否拼接完成
            isSuccess();
        }
// ==========================================================================
        // 设置鼠标外观
        items[i].style.cursor = "pointer";
        // 鼠标移入
        items[i].onmouseenter = function () {
            // 排他思想
            for (var j = 0; j < items.length; j++) {
                // 设置所有的li标签透明度1
                items[j].style.opacity = "1";
            }
            // 设置当前移入的li标签透明度 .8
            this.style.opacity = "0.8";
        }
    }
// ==========================================================================
}


// 编写函数检测拼接的字符串是否满足按顺序的 1 ~ 15 
// 判断游戏是否成功
function isSuccess(){
    // 定义字符串
    var str = "";
    // 所有的图片标签
    var elements = wrapper.getElementsByTagName("img");
    // console.log(elements)
    // 循环
    for(var i = 0 ; i < elements.length ; i ++){
        str += elements[i].alt;
    }
    // console.log(str);
    if(str == "12345678910111213141516"){
        // 拼图完成
        console.log("恭喜你，在短短的N秒内击败全国95%的用户");
    }
}







