window.onload = function(){

	// 获取相关元素
	var score = document.getElementById("score");
	var map = document.getElementById("snake_map");

	//1.0 定义地图 （方格大小）
	var rowNumber = 25;//定义行数
	var colNumber = 25; //定义列数
	var mapWidth = colNumber*20+"px";
	var mapHeight = rowNumber*20 +"px";
	
	map.style.width =mapWidth; //舞台的宽度
	map.style.height = mapHeight;//舞台的高度
	// 创建一个二维数组 ，用来记录舞台上所有的div（方格）的位置
	var snakeDivPosition=[];
	// 通过双重for循环创建地图方格
	for(var i = 0 ; i < rowNumber;i++){
		// 创建行div
		var rowDiv = document.createElement("div");
		// 设置div样式
		rowDiv.className="row";
		// 将行div添加到路径地图map中
		map.appendChild(rowDiv);
		// 创建一个行级数组
		// 用于储存当前行中的每个方格div
		var rowArray = [];
		for(var j =0 ; j < colNumber;j++){
			//创建每一个行的方格
			var columnDiv = document.createElement("div");
			// 设置每一行的方格样式
			columnDiv.className="col";
			//将方格添加到当前行中
			rowDiv.appendChild(columnDiv);
			// 同时将方格添加到行数组中
			rowArray.push(columnDiv);

		}

		// 当前内层循环结束，将行数组添加搭配二维数组中
		snakeDivPosition.push(rowArray);

	}
	// console.log(snakeDivPosition)

	//2.0  创建蛇
	// 定义一个数组，用来存放设置的方格（蛇身体）
	var snake = [];
	// 打开页面默认蛇的身体为3个方格
	for(var i =0 ; i < 3; i++){
		// 设置蛇的身体为不同颜色的div
		snakeDivPosition[0][i].className="col activeSnake";
		// 记录蛇身体的数组
		snake[i] = snakeDivPosition[0][i];
	}
	console.log(snake)
	// 3.0 让蛇活动
	var x = 2;
	var y = 0;//蛇的头部起始位置
	var scoreCount =0;//记录得分 吃了多少蛋
	var eggX = 0;
	var eggY = 0; //记录食物（蛋）位置

	var direction = "right";//定义蛇移动的方向 ，默认 右边
	var changeDir = true; //判断是否需要改变蛇移动的方向
	var delayTimer = null; //延迟定时器


	// 4.0 通过键盘事件控制蛇的运动方向
	document.onkeydown = function(event){

		// 做个标识，判断是否需要,true需要  false不需要 
		if(!changeDir){
			return ;//终止代码，不执行后续代码
		}
		// 事件对象
		event = event||window.event;
		// 为了合理处理蛇的移动，需要判断蛇头和蛇身体
		// 假设蛇向右移动，那么再次按下 向右，向左按键的时候，不再做出响应
		if(direction == 'right' && event.keyCode==37 ){
			return ; //终止事件
		}
		if(direction == 'left' && event.keyCode==39 ){
			return ; //终止事件
		}
		if(direction == 'up' && event.keyCode==40 ){
			return ; //终止事件
		}
		if(direction == 'down' && event.keyCode==38 ){
			return ; //终止事件
		}

		// 通过keyCode 确定蛇要移动的方向
		switch (event.keyCode) {
				case 37 :
					direction="left";
				break;
				case 39 :
					direction="right";
				break;
				case 38 :
					direction="up";
				break;
				case 40 :
					direction="down";
				break;

			}

			// 松开按键 不再改变蛇方向
			changeDir = false;

			delayTimer = setTimeout(function(){

				changeDir = true;

			},300);

	}
	console.log(direction)
	// 5.0 开始设置蛇的移动逻辑
	// 蛇在移动的函数
	function snakeMove(){
		// 根据按下的键盘方向 设置蛇头的位置
		switch (direction){

			case 'left':
				x--;
			break;

			case 'right':
				x++;
			break;
			case 'up':
				y--;
			break;
			case 'down':
				y++;
			break;
		}

		// 判断是否结束游戏
		if( x< 0 || y < 0 || x >=colNumber || y >=rowNumber){
			// alert("游戏结束！");
			console.log("game over!")
			// 清除定时器
			clearInterval(moveTimer);
			return;
		}
	
		for(var i = 0 ; i < snake.length; i++){
			// 将蛇头移动后的位置 与之前吃到食物组成的蛇的方格div位置进行比较
			// 如果相同说明 蛇头碰到身体了
			if(snake[i] == snakeDivPosition[y][x]){
				// alert("游戏结束！");
				console.log("game over!")
				clearInterval(moveTimer);
				return;
			}

		}

		// 6.0 判断蛇移动的轨迹是否有蛋
		console.log(eggX)
		console.log(eggY)
		if(eggX==x && eggY ==y){
			snakeDivPosition[y][x].className='col activeSnake ';
			snake.push(snakeDivPosition[eggY][eggX]);//加入蛇的身体
			scoreCount++;//加一分
			score.innerHTML = scoreCount;//记录当前的分数
			createNewEgg();//随机产生一个蛋
		}else {
			
			//蛇在没碰到蛋的情况下
			//让蛇继续移动
			snake[0].className = "col";
			snake.shift();//将蛇尾div从数组中移除
			// 定位到新的蛇头加入到数组中
			snakeDivPosition[y][x].className='col activeSnake';
			snake.push(snakeDivPosition[y][x])
		}
	};
	// 让蛇移动
	// var moveTimer = setInterval(snakeMove , 300);
	var moveTimer = null;

	// 随机生成min max之间的随机函数
	function random(min,max){
		return Math.floor(Math.random()*(max-min));
	};
	// 创建食物
	function createNewEgg (){
		// 随机产生egg的坐标
		eggX = random(0,colNumber);
		eggY = random(0,rowNumber);
		
		// 判断如果随机产生的蛋与蛇重合，就产生一个新的蛋蛋
		if(snakeDivPosition[eggY][eggX].className=='col activeSnake'){
			createNewEgg();//随机产生一个蛋
		}else {
			snakeDivPosition[eggY][eggX].className='col egg';
		}

	}

	createNewEgg();

	// 暂停
	var PauseId = document.getElementById("PauseId");
	PauseId.onclick = function(){
		// 清除定时器
		clearInterval(moveTimer);
	}

	// 开始游戏
	var StartId = document.getElementById("StartId");
	StartId.onclick = function(){
		// 先清除定时器
		clearInterval(moveTimer)
		// 在执行
		moveTimer=setInterval(snakeMove,300);
	}
	// 刷新游戏
	var RefreshId =document.getElementById("RefreshId");
	RefreshId.onclick = function (){
		window.location.reload();//重新加载..
	}
	// 加速
	var sp = 300;//定义速度
	var SpeedId = document.getElementById("SpeedId");
	SpeedId.onclick = function(){
		sp-=20;
		clearInterval(moveTimer);
		moveTimer = setInterval(snakeMove,sp);
	}
}