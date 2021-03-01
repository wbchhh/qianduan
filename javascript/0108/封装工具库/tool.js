// 1.  获取页面的元素
// 2.  设置元素的样式
// 3.  设置元素的类名 （添加类名，移除类名，是否包含指定类名）
// 4.  设置元素的文本
// 5.  设置元素的动画函数

; (function (window, document) {//函数作用域 
    // 面向对象的思想
    // 构造函数
    function Tool() {
        // 添加属性
        // 记录获取的元素 是个数组
        // this.htmlCollection = [];
    }
    // 原型对象添加方法  获取页面的元素
    Tool.prototype.$ = function (selector) {
        // 判断是否存在 # 字符
        if (selector.indexOf("#") > -1) {
            // 记录获取的元素 是个数组
            this.htmlCollection = [];
            // 处理字符串 #container
            selector = selector.slice(1);
            // console.log(selector,"2.0");
            // 通过id名
            var ele = document.getElementById(selector);
            // 添加获取的标签
            this.htmlCollection.push(ele);
        } else
            if (selector.indexOf(".") > -1) {
                // 记录获取的元素 是个数组
                this.htmlCollection = [];
                // 处理字符串 .box 
                selector = selector.slice(1);
                // 通过类名 
                var elements = document.getElementsByClassName(selector);
                // 循环
                for (var i = 0; i < elements.length; i++) {
                    this.htmlCollection.push(elements[i]);
                }
            } else {
                // 记录获取的元素 是个数组
                this.htmlCollection = [];
                // 通过标签名 button
                var elements = document.getElementsByTagName(selector);
                // 循环
                for (var i = 0; i < elements.length; i++) {
                    this.htmlCollection.push(elements[i]);
                }
            }
        // 返回this ，返回的构造函数产生的对象
        return this;
    }
    // 原型对象添加方法  设置元素的样式
    Tool.prototype.css = function (prop, value) {
        // 判断标签数组 
        if (this.htmlCollection.length == 0) return this;
        // 循环标签数组
        for (var i = 0; i < this.htmlCollection.length; i++) {
            // 设置元素的样式
            this.htmlCollection[i].style[prop] = value;
        }
        // 返回this ，返回的构造函数产生的对象
        return this;
    }
    // 原型对象添加方法  添加类名
    Tool.prototype.addClass = function (className) {
        // 判断标签数组 
        if (this.htmlCollection.length == 0) return this;
        // 循环标签数组
        for (var i = 0; i < this.htmlCollection.length; i++) {
            // 设置元素的样式
            this.htmlCollection[i].classList.add(className);
        }
        // 返回this ，返回的构造函数产生的对象
        return this;
    }
    // 原型对象添加方法  移除类名
    Tool.prototype.removeClass = function (className) {
        // 判断标签数组 
        if (this.htmlCollection.length == 0) return this;
        // 循环标签数组
        for (var i = 0; i < this.htmlCollection.length; i++) {
            // 设置元素的样式
            this.htmlCollection[i].classList.remove(className);
        }
        // 返回this ，返回的构造函数产生的对象
        return this;
    }
    // 原型对象添加方法 是否包含指定类名
    Tool.prototype.hasClass = function (className) {
        // 判断标签数组 
        if (this.htmlCollection.length == 0) return this;
        // 循环标签数组
        for (var i = 0; i < this.htmlCollection.length; i++) {
            // 设置元素的样式
            return this.htmlCollection[i].classList.contains(className);
        }
    }
    // 原型对象添加方法 设置元素的文本
    Tool.prototype.html = function (str) {
        // 判断标签数组 
        if (this.htmlCollection.length == 0) return this;
        // 判断是否传递str参数 
        if (typeof str === "undefined") {
            // 没有 获取标签html文本 
            return this.htmlCollection[0].innerHTML;
        } else {
            // 有 设置标签html文本 
            // 循环标签数组
            for (var i = 0; i < this.htmlCollection.length; i++) {
                // 设置元素的样式
                this.htmlCollection[i].innerHTML = str;
            }
            // 返回this ，返回的构造函数产生的对象
            return this;
        }

    }
    // 原型对象添加方法  设置元素隐藏
    Tool.prototype.hide = function () {
        // 判断标签数组 
        if (this.htmlCollection.length == 0) return this;
        // 循环标签数组
        for (var i = 0; i < this.htmlCollection.length; i++) {
            // 设置元素的样式
            this.htmlCollection[i].style['display'] = "none";
        }
        // 返回this ，返回的构造函数产生的对象
        return this;
    }
    // 原型对象添加方法  设置元素显示
    Tool.prototype.show = function () {
        // 判断标签数组 
        if (this.htmlCollection.length == 0) return this;
        // 循环标签数组
        for (var i = 0; i < this.htmlCollection.length; i++) {
            // 设置元素的样式
            this.htmlCollection[i].style['display'] = "block";
        }
        // 返回this ，返回的构造函数产生的对象
        return this;
    }



    // 原型对象添加方法 设置元素的动画函数
    Tool.prototype.animate = function () {
        // ...
    }
    // 实例对象
    var tool = new Tool();
    // 定义$函数 
    var $ = tool.$.bind(tool);
    // 挂载在全局对象上
    window.$ = $;
})(window, document)