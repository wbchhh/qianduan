window.onload = function(){
    init();
}
function init(){
    randomImage("16");
    handleClick();
}
// 2.0 处理点击事件函数
function handleClick(){
    // 2.0.1 记录map标签
    var map_element = document.getElementById("map");
    // 2.0.2 获取所有的li标签
    var items = map_element.getElementsByTagName("li");
    // 2.0.3 循环li标签数组
    for(var i = 0 ; i < items.length ; i ++){
        // 2.0.4 所有的li标签绑定事件
        items[i].onclick = function(){
            // 2.0.5 获取当前点击的li标签的id值并截取id最后一个字符(当前列)
            var col = this.id.substr(-1,1);
            // 2.0.6 获取当前点击的li标签父节点的id值并截取id最后一个字符（当前行）
            var row = this.parentNode.id.substr(-1,1);
            // 2.0.7 获取空图片标签
            var empty_element = document.getElementById("empty");
            // 2.0.8 获取空图片标签的父节点（li标签）的id值最后一个字符
            var empty_col = empty_element.parentNode.id.substr(-1,1);
             //2.0.9 获取空图片标签的祖先节点（ul标签）的id值最后一个字符
             var empty_row = empty_element.parentNode.parentNode.id.substr(-1,1);
             //2.0.10 (当前列) 的后一个元素
             var nextCol = parseInt(col)+1;
             //2.0.11 (当前列) 的前一个元素
             var prevCol = parseInt(col)-1;
             //2.0.12（当前行） 的下一个元素
             var nextRow = parseInt(row)+1;
             //2.0.13（当前行） 的上一个元素
             var prevRow = parseInt(row)-1;
             //2.0.14 点击的li标签的子元素图片标签（img）
             var current_Image = this.getElementsByTagName("img")[0]
             //2.0.15  （当前行） 的下一个元素或者（当前行） 的上一个元素 是否等于空标签对应的行
             if(nextRow ==empty_row || prevRow==empty_row){
                //2.0.16 是否等于空标签对应的的列
                if(col==empty_col){
                    //2.0.17 如果是 交互元素的图片
                    changeImage(current_Image,empty_element);
                }
             }

            //2.0.18 判断是否空图片标签在同一行
            if(row==empty_row){
                //2.0.19 如果是 判断(当前列) 的后一个元素或者(当前列) 的前一个元素是否等于空标签对应的的列
                if(nextCol == empty_col || prevCol == empty_col){
                      //2.0.20 如果是 交互元素的图片
                      changeImage(current_Image,empty_element);
                }
            }
        }
    }
}
// 3.0 处理交互图片函数
function changeImage(currentImgae,emptyImage){
    // 3.0.1 记录emptyImag标签的路径
    var v1 = emptyImage.src;
    // 3.0.2 设置emptyImage标签的路径
    emptyImage.src = currentImgae.src;
    // 3.0.3 设置currentImgae标签的路径
    currentImgae.src = v1;

    // 3.0.4 记录emptyImag标签的id
    var v2 = emptyImage.id;
    // 3.0.5 设置emptyImage标签的id
    emptyImage.id = currentImgae.id;
    // 3.0.6 设置currentImgae标签的id
    currentImgae.id = v2;

    // 3.0.7 记录emptyImag标签的data-path
    var v3 = emptyImage.getAttribute("data-path");
    // 3.0.8 设置emptyImage标签的data-path
    emptyImage.setAttribute("data-path",currentImgae.getAttribute("data-path"));
    // 3.0.9 设置currentImgae标签的data-path
    currentImgae.setAttribute("data-path",v3);

    // 3.0.10 调用判断是否拼图成功的函数
    isWin();
}
// 4.0 是否完成拼图函数
function isWin(){
    // 4.0.1 获取所有的img标签
    var imgs = document.getElementsByTagName("img");
    // 4.0.2 图片信息字符串
    var imageColumnInfo ="";
    // 4.0.3 循环
    for(var i = 0 ; i < imgs.length ; i ++){
        // 4.0.4 拼接图片信息
        imageColumnInfo +=imgs[i].getAttribute("data-path");
    }
    // 4.0.5 替换字符串中的 "16"
    var result = imageColumnInfo.replace("16","");
    // 4.0.6 判断结果
    if(result=="123456789101112131415"){
        // 4.0.7 提示拼图成功
        console.log("恭喜,你在x?秒完成拼图!")
    }
}
// 5.0 随机定义图片位置函数
function randomImage(count){
    // 5.0.1 定义数组记录图片名称
    var imageArray = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];
    // 5.0.2 循环
    for(var i = 1 ; i < 5 ; i ++){
        // 5.0.3 循环
        for(var j = 1 ; j < 5 ; j ++){
            // 5.0.4 随机图片索引值
            var randomIndex = Math.floor(Math.random()*count);
            // 5.0.5 拼接id名称
            var _id = "column_"+i+""+j;
            // 5.0.6 获取指定元素
            var image = document.getElementById(_id).getElementsByTagName("img")[0];
            // 5.0.7 图片信息
            var imageInfo = imageArray[randomIndex];
            // 5.0.8 设置图片路径
            image.setAttribute("src","images/"+imageInfo+".png");
            // 5.0.9 设置data-path的值
            image.setAttribute("data-path",imageInfo);
            // 5.0.10 判断第十六张图
            if(imageInfo =="16"){
                // 5.0.11 设置id名
                image.setAttribute("id","empty");
            }
            // 5.0.12 删除数组的对应数据
            imageArray.splice(randomIndex,1);
            // 5.0.13 设置count值
            count --;
        }
    }
}