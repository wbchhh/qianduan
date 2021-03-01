// 编码思维逻辑
// 1. 页面初始化 ，打乱图片摆放顺序
// 2. 交换的图片的位置（设置img标签的src）
// 3. 获取当前点击的标签的数据（行，列）
// 4. 如何检测拼图完成


// 面向对象
// 页面加载完成
window.onload = function () {
    // 创建 Game 的实例对象
    var obj = new Game();
    // 调用初始化的函数
    obj.init();
    // 事件绑定
    obj.addClickEvent();
}




// 构造函数
function Game() {
    // 添加属性
    this.wrapper = document.getElementsByClassName("wrapper")[0];
    this.items = this.wrapper.getElementsByTagName("li");
    // console.log(this);
}
// 原型对象  添加方法
// 初始化
Game.prototype.init = function () {
    //创建1 ~ 16 的数据
    this.createData();
    // 定义计数器变量
    var count = 16;
    // 循环 用于排版
    for (var j = 0; j < 16; j++) {
        var index = this.random(count);
        // 从数组 arr 取出索引值对应的数据并删除，取出的数据在数组中，
        var v1 = this.arr.splice(index, 1)[0];
        // 设置图片路径
        this.items[j].children[0].setAttribute("src", "./images/" + v1 + ".png");
        // 设置图片alt属性值
        this.items[j].children[0].setAttribute("alt", v1);
        // 判断
        if (v1 == "16") {
            this.items[j].children[0].className = "empty";
        }
        // 改变计数器的值
        count--;
    }
}
// 创建数据
Game.prototype.createData = function () {
    // 定义数组 记录1 ~ 16 的数据
    this.arr = [];
    // 循环 用于产生数据
    for (var i = 0; i < 16; i++) {
        this.arr.push((i + 1) + "");
    }
}
// 随机数
Game.prototype.random = function (num) {
    // 返回 0 ~ index 之间的随机数
    return Math.floor(Math.random() * num);
}
// 交换图片
Game.prototype.changeImage = function (currentImage, emptyImage) {
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
// 添加点击事件
Game.prototype.addClickEvent = function(){ //函数作用域1 
    // 当前函数作用域的this
    var _this = this;
    // 循环
    for (var i = 0; i < this.items.length; i++) {
        // 绑定事件
        this.items[i].onclick = function () {// 函数作用域2
            // this 事件的调用者
            // row 行
            var row = this.parentElement.className.substr(-1, 1);
            // col 列
            var col = this.className.substr(-1, 1);
            // console.log("第"+row+"行,第"+col+"列");
            // 围绕空白的图片 四个方向的标签坐标位置
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
            // 水平方向
            if (left == empty_col || right == empty_col) {
                if (row == empty_row) {
                    // console.log("满足条件，是相邻关系 , X ")
                    // 当前点击的标签下的img标签
                    var currentElement = this.children[0];
                    // 交换位置
                    _this.changeImage(currentElement, emptyElement);
                }
            }
            // 垂直方向
            if (up == empty_row || down == empty_row) {
                if (col == empty_col) {
                    // console.log("满足条件，是相邻关系 , Y ")
                    // 当前点击的标签下的img标签
                    var currentElement = this.children[0];
                    // 交换位置
                    _this.changeImage(currentElement, emptyElement);
                }
            }
            // 检测图片是否拼接完成
            _this.isSuccess();
        }
    }
}
// 判断是否完成拼图
Game.prototype.isSuccess = function(){
     // 定义字符串
     this.str = "";
     // 所有的图片标签
     var elements = this.wrapper.getElementsByTagName("img");
     // 循环
     for(var i = 0 ; i < elements.length ; i ++){
        this.str += elements[i].alt;
     }
     if(this.str == "12345678910111213141516"){
         // 拼图完成
         console.log("恭喜你，在短短的N秒内击败全国95%的用户");
     }
}

