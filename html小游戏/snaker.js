//仿枚举
var DIR={
	DIR_LEFT:1,
	DIR_TOP:2,
	DIR_RIGHT:3,
	DIR_BOTTOM:4
};

//全局变量
var map={width:900,height:500};
var box={width:50, height:50};
var nums={
	hNum:map.width/box.width,
	vNum:map.height/box.height
};
var snake=[];//保存蛇身体
var other=[];//除蛇外其他部分
var dir=DIR.DIR_RIGHT;//默认蛇向右移动

window.onload =function(){
    initMap();//生成地图
    showFood();
    setInterval(snakeMove,400);//计时器
    document.onkeyup=function(e){
		switch(e.keyCode){
			case 37:{if(dir==DIR.DIR_RIGHT)break;else{dir=DIR.DIR_LEFT;break;}}///不能反向
			case 38:{if(dir==DIR.DIR_BOTTOM)break;else{dir=DIR.DIR_TOP;break;}}
			case 39:{if(dir==DIR.DIR_LEFT)break;else{dir=DIR.DIR_RIGHT;break;}}
			case 40:{if(dir==DIR.DIR_TOP)break;else{dir=DIR.DIR_BOTTOM;break;}}
			default:break;
		}
	}
}
function initMap(){
    var map_target=document.getElementById("map");//获取map元素
    map_target.style.width=map.width+"px";//定义宽高（”px”）
    map_target.style.height=map.height+"px";
    var newSpan=null;//小格子
    for(let i=1;i<=nums.hNum*nums.vNum;i++){
        newSpan=document.createElement("span");//创造格子
        newSpan.style.width=box.width+"px";//格子样式
        newSpan.style.height=box.height+"px";
        newSpan.id=i;//id标识
        map_target.appendChild(newSpan);//赋给map
        if(i<=5){
            newSpan.className="snake";//前五个格子为蛇
            snake.push(newSpan);
        }else{
            other.push(newSpan);
        }
    }
}
function showFood(){//展示食物
    var index=Math.floor(Math.random()*other.length);
    //Math.random()是令系统随机选取大于等于 0.0 且小于 1.0 的伪随机 double 值
	other[index].className="food";
}
function snakeMove(){
    var headId;//计算下一帧新蛇头的位置id
    switch(dir){
        case DIR.DIR_LEFT://向左
            headId=parseInt(snake[snake.length-1].id) - 1;///计算新蛇头位置，由当前蛇头位置得出 parseInt，文本转化为数字
            if(headId%nums.hNum==0) headId+=nums.hNum;//超出边界处理
            break;
        case DIR.DIR_RIGHT:
            headId=parseInt(snake[snake.length-1].id)+1;
            if(headId%nums.hNum==1) headId-=nums.hNum;
            break;
        case DIR.DIR_TOP:
			headId=parseInt(snake[snake.length-1].id)-nums.hNum;
			if(headId<1) headId+=nums.hNum*nums.vNum;
            break;
        case DIR.DIR_BOTTOM:
			headId=parseInt(snake[snake.length-1].id)+nums.hNum;
			if(headId>nums.hNum*nums.vNum) headId-=nums.hNum*nums.vNum;
            break;
        default:break;
    }
    var head=document.getElementById(headId);//找到蛇头部
    for(let i=1;i<snake.length;i++){
        if(headId==snake[i].id){//撞击自身
            alert("over");
            window.location.href=window.location.href;///当前页面打开页面
        }
    }
    //计算新蛇头在other中的下标位置,为后面把新蛇头从other中移除做准备
    var index;
    for(let i=1;i<other.length;i++){
        if(headId==other[i].id){
            index=i;break;
        }
    }
    other.splice(index,1);
    snake.push(head);
    if(head.className=="food"){
        showFood();//生成新食物
    }else{
        snake[0].className="";//栈头置0
        other.push(snake.shift());
    }
    head.className="snake";
}