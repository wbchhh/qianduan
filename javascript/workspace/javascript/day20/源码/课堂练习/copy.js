// =======================浅拷贝=============================
// 1.0 封装浅拷贝的逻辑 
function simpleCopy(data){
    // 判断是否传递传参
    if(data === undefined) { return ;}
    // 判断数据集合是数组，还是对象
    var newData = Array.isArray(data) === true ? [] : {} 
    // 循环
    for(var key in data){
        // 往新集合添加数据
        newData[key] = data[key];
    }
     // 返回新数据
    return newData;
}

// =======================深拷贝=============================
// 1.0 封装深拷贝的逻辑
function deepCopy(data){
    // 判断是否数据集合是数组，还是对象
    var newData = Array.isArray(data) == true ? [] : {};
    // 循环数据
    for(var  key  in data){
        // 判断集合下的数据是否为引用类型 
        if(typeof data[key] === 'object'){
            // 如果是引用类型数据 ,那么继续执行递归
            newData[key] = deepCopy(data[key]);
        }else {
            // 如果是基本数据类型,那么不需要执行递归了,直接赋值
            newData[key] = data[key];
        }
    }
    // 返回新数据
    return newData;
}