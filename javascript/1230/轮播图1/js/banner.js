
//获取元素
var sipwerBanner = document.getElementsByClassName("sipwer-banner")[0];
var ulElement = sipwerBanner.getElementsByTagName("ul")[0];
var items = ulElement.getElementsByTagName("li");
var swiperBannerPoint = document.getElementsByClassName("swiper-banner-point")[0];
var points = swiperBannerPoint.getElementsByTagName("li");
var prevBtn = document.getElementsByClassName("prev-box")[0];
var nextBtn = document.getElementsByClassName("next-box")[0];

//记录索引值
var index =0;
//记录宽度
var width = items[0].offsetWidth;
//记录定时器
var timer = null;

//定义公共函数
var setPoint = function(index){
    //排他思想
    for(var i = 0; i < points.length; i ++){
        points[i].className = "";
    }
    //索引值对应的导航点设置类名
    points[index].className = "active";
}
var autoPlay = function(){
    index ++;
    if(index > items.length - 1){
        index = 0;
    }
    animate(ulElement,{
        marginLeft: -(index * width)
    })
    setPoint(index);
}
timer = setInterval(autoPlay , 1000);

//鼠标移入暂停，移出继续
sipwerBanner.onmouseenter = function(){
    clearInterval(timer);
}
sipwerBanner.onmouseleave = function(){
    clearInterval(timer);
    timer = setInterval(autoPlay , 1000)
}
//点击切换轮播图、切换导航点
for(var i = 0; i < points.length; i ++){
    points[i].index = i;
    points[i].onclick = function(){
        index = this.index;
        animate(ulElement , {
            marginLeft: -(index * width)
        })
        setPoint(index);
    }
}
//点击左右按钮切换轮播图
prevBtn.onclick = function(){
    index --;
    if(index < 0){
        index = items.length - 1;
    }
    animate(ulElement , {
        marginLeft: -(index * width)
    })
    setPoint(index);
}
nextBtn.onclick = function(){
    index ++;
    if(index > items.length - 1){
        index = 0;
    }
    animate(ulElement , {
        marginLeft: -(index * width)
    })
    setPoint(index);
}