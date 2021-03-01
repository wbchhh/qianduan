$(function(){
    // 1. 全选 全不选功能模块
    // 就是把全选按钮 (checkall)的状态赋值给三个小的按钮(j-checkbox)就可以了
    // 事件可以使用change,当状态发生变化的时候触发
    $(".checkall").change(function(){
        $(".j-checkbox,.checkall").prop("checked" , $(this).prop("checked") )

        // 选中商品添加背景
        if( $(this).prop("checked") ){
            // 让所有的商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        }else{
            // 移除 check-cart-item 类名
            $(".cart-item").removeClass("check-cart-item");
        }

        getSum();
    })

    // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选
    $(".j-checkbox").change(function(){
        /* if( 被选中的小复选框总个数 === 小复选框总个数){
            全选按钮被选中
        }else{
            全选按钮不选中
        } */

        // console.log( $(".j-checkbox:checked").length );

        if( $(".j-checkbox:checked").length  === $(".j-checkbox").length ){
            $(".checkall").prop( "checked" , true );
        }else{
            $(".checkall").prop( "checked" , false );
        }

        // 选中商品添加背景
        if( $(this).prop("checked") ){
            // 让当前的商品添加 check-cart-item 类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        }else{
            // 移除 check-cart-item 类名
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
        
        getSum();
    })

    // 3. 增加商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框
    $(".increment").click(function(){
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val( n );
        // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格 就是 商品的小计

        // 获取当前商品的单价 p
        var p =  $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price  = (p*n).toFixed(2);
        // 小计模块
        $(this).parents(".p-num").siblings(".p-sum").html( "￥" + price );

        getSum();
    })

    $(".decrement").click(function(){
        var n = $(this).siblings(".itxt").val();
        if( n ==  1){
            return false;
        }
        n--;
        $(this).siblings(".itxt").val( n );

        // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格 就是 商品的小计
        // 获取当前商品的单价 p
        var p =  $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price  = (p*n).toFixed(2);
        // 小计模块
        $(this).parents(".p-num").siblings(".p-sum").html( "￥" + price );

        getSum();
    })


    // 4. 用户修改文本的值  计算 小计模块
    $(".itxt").keyup(function(){
        // 先得到文本框的里面的值 乘以 当前商品的单价
        var n = $(this).val();
        if( n <= 0 ){ // 判断用户输入的值是否小于等于0
            n = 1;
            $(this).val( 1 );
        }
        // 当前商品的单价
        var p =  $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price  = (p*n).toFixed(2);
        // 小计模块
        $(this).parents(".p-num").siblings(".p-sum").html( "￥" + price );

        getSum();
    })

    // 5. 计算总计和总额模块
    function getSum(){
        // 计算总件数
        var count = 0;
        // 计算总价钱
        var money = 0;
        
        $(".j-checkbox:checked").each(function( i , ele){
            count += parseInt( $(this).parent().siblings(".p-num").find(".itxt").val() );

            money += parseFloat( $(this).parent().siblings(".p-sum").text().substr(1) );
        })
        
        $(".amount-sum em").text( count );
        money = money.toFixed(2);
        $(".price-sum em").text( "￥" + money );
    }

    getSum();

    // 6. 删除商品模块
    // 6.1 商品后面的删除按钮
    $(".p-action a").click(function(){
        $(this).parents(".cart-item").remove();
        getSum();
    })
    
    // 6.2 删除选中的商品 
    $(".remove-batch").click(function(){
        // 删除都是小的复选框选中的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    
    // 6.3 清理购物车
    $(".clear-all").click(function(){
        $(".cart-item").remove();
        getSum();
    })
})