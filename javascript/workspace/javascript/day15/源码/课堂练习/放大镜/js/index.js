// 需求：
    // 功能：放大镜效果
    // 鼠标移入小盒子，显示遮罩层，显示大盒子
    // 鼠标移出小盒子，隐藏遮罩层，隐藏大盒子
    // 鼠标在小盒子上移动，改变遮罩层的位置，改变大图片的位置
   
    // 大图片跟随遮罩层移动
    // 计算比例
    // 遮罩层当前移动的距离 / 遮罩层可移动最大距离
    // 图片当前移动的距离 / 图片可移动最大距离


// 编码实现
    // 1.0 获取页面相关的元素
    var smallBox = document.getElementsByClassName("small-box")[0];
    var mask = document.getElementsByClassName("mask")[0];
    var bigBox = document.getElementsByClassName("big-box")[0];
    var bigBoxImage = document.getElementsByClassName("big-box-image")[0];

    // 2.0 定义变量
    // 记录遮罩层的坐标位置
    var x = 0;
    var y = 0;
    // 3.0 定义函数  
    // 显示元素
    function show(dom){
        // 设置显示方式 block
        dom.style.display = "block";
    }
    // 隐藏元素
    function hide(dom){
        // 设置显示方式 block
        dom.style.display = "none";
    }   
    // 4.0 事件绑定
    // 鼠标移入事件
    smallBox.onmouseenter = function(){
        // 显示遮罩层
        show(mask);
        // 显示大盒子
        show(bigBox);
    }
    // 鼠标移出事件
    smallBox.onmouseleave = function(){
        // 隐藏遮罩层
        hide(mask);
        // 隐藏大盒子
        hide(bigBox);
    }
    // 鼠标移动事件
    smallBox.onmousemove = function(event){
        // 事件对象event
        // 记录鼠标在可视区范围的坐标位置
        x = event.clientX;
        y = event.clientY;
        // 计算遮罩层盒子的位置
        // console.log(smallBox.offsetParent);
        x = x - smallBox.offsetLeft - mask.offsetWidth / 2 ;
        y = y - smallBox.offsetTop - mask.offsetHeight / 2 ;

        // 判断遮罩层盒子是否超出小盒子范围
        // 遮罩层可移动的最大距离
        var maxWidth = smallBox.offsetWidth - mask.offsetWidth;
        var maxHeight = smallBox.offsetHeight - mask.offsetHeight;
        // if(x < 0) {x = 0};
        if(x < 0 ) x = 0 ;
        if(x > maxWidth) x = maxWidth;
        if(y < 0) y = 0;
        if(y > maxHeight) y = maxHeight;

        // 设置遮罩层当前的位置（遮罩层当前移动的位置）
        mask.style.left = x +"px";
        mask.style.top = y +"px";

        // 计算图片可移动的最大距离
        var imageMaxWidth = bigBoxImage.offsetWidth - bigBox.offsetWidth;
        var imageMaxHeight = bigBoxImage.offsetHeight - bigBox.offsetHeight;

        // 算术题：
        // a(遮罩层当前移动的位置) /  b (遮罩层可移动的最大距离) =   c (大图片当前移动的位置 ?? )/ d(大图片可移动的最大距离)
        // 已知条件  a,b,d ,求 c ? 
        // c = (a / b) * d 
        // 计算a(遮罩层当前移动的位置) /  b (遮罩层可移动的最大距离)
        var demoX = x / maxWidth;
        var demoY = y / maxHeight;
        // 计算大图片当前移动的位置 ??
        var x2 = demoX * imageMaxWidth;
        var y2 = demoY * imageMaxHeight;
        // 设置大图片当前的位置
        bigBoxImage.style.left = -x2 +"px";
        bigBoxImage.style.top = -y2 +"px";
    }





