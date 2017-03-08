var canvas = document.getElementById("checkerBoard");
var ctx = canvas.getContext("2d");
var canDrag = false;
checkersPieces = [[
			{"color":"empty","identifier":-1,"king":false},
			{"color":"red","identifier":1,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"red","identifier":2,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"red","identifier":3,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"red","identifier":4,"king":false}
		],
		[
			{"color":"red","identifier":5,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"red","identifier":6,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"red","identifier":7,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"red","identifier":8,"king":false},
			{"color":"empty","identifier":-1,"king":false}
		],
		[
			{"color":"empty","identifier":-1,"king":false},
			{"color":"red","identifier":9,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"red","identifier":10,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"red","identifier":11,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"red","identifier":12,"king":false}
		],
		[
			{"color":"empty","identifier":-1,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"empty","identifier":-1,"king":false}
		],
		[
			{"color":"empty","identifier":-1,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"empty","identifier":-1,"king":false}
		],
		[
			{"color":"black","identifier":13,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"black","identifier":14,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"black","identifier":15,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"black","identifier":16,"king":false},
			{"color":"empty","identifier":-1,"king":false}
		],
		[
			{"color":"empty","identifier":-1,"king":false},
			{"color":"black","identifier":17,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"black","identifier":18,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"black","identifier":19,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"black","identifier":20,"king":false}
		],
		[
			{"color":"black","identifier":21,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"black","identifier":22,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"black","identifier":23,"king":false},
			{"color":"empty","identifier":-1,"king":false},
			{"color":"black","identifier":24,"king":false},
			{"color":"empty","identifier":-1,"king":false}
		]
	];

var redPiece = new Image();
redPiece.src = '../assets/img/redChip.png';


var blackPiece = new Image();
blackPiece.src = '../assets/img/blackChip.png';

function initialize(){
	draw();
}

function draw(){
	drawBoard();
	drawCheckers(redPiece, blackPiece);
}

function drawBoard(){
	for(i=0;i<8;i++){
		for(j=0;j<8;j++){
			ctx.moveTo(0,70*j);
			ctx.lineTo(560,70*j);
			ctx.stroke();
 
			ctx.moveTo(70*i,0);
			ctx.lineTo(70*i,560);
			ctx.stroke();
			var left = 0;
			drawSingleBlock(left);
		}
	}
}

function drawSingleBlock(left){
	for(var a=0;a<8;a++){
    	for(var b=0; b<8;b+=2){
      		startX = b * 70;
      		if(a%2==0) startX = (b+1) * 70;{
				ctx.fillStyle = '#808080'
      			ctx.fillRect(startX + left,(a*70) ,70,70);
			  }
		}
	}
}

function drawCheckers(redPiece, blackPiece){
	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			var x = j * 70;
			var y = i * 70;
			if(checkersPieces[i][j].color == "black"){
				ctx.drawImage(blackPiece, x, y, 70, 70);
				
			}
			else if(checkersPieces[i][j].color == "red"){
				ctx.drawImage(redPiece, x, y, 70, 70);
			}
		}
	}
}

function resize(){
	var width = window.innerWidth;
	var ratio = canvas.width/canvas.height;
	var height = width * ratio;

	canvas.style.width = width+'px';
	canvas.style.height = height+'px';
}

window.addEventListener('load', resize, false);
window.addEventListener('resize',resize,false);

function mouseMove(e){
	if(canDrag){
		x = e.pageX - canvas.offsetLeft;
		y = e.pageY - canvas.offsetTop;
	}
}

function onClick(e){
	console.log("MOUSE CLICKED");
	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			x = i * 70;
			y = j * 70;

			if (e.pageX < x + 15 + canvas.offsetLeft && e.pageX > x - 15 + canvas.offsetLeft && e.pageY < y + 15 + canvas.offsetTop && e.pageY > y -15 +canvas.offsetTop){
  				x = e.pageX - canvas.offsetLeft;
  				y = e.pageY - canvas.offsetTop;
  				canDrag = true;
  				canvas.onmousemove = mouseMove;
 			}
		}
	}
	
}

function afterClick(){
	console.log("MOUSE LET GO");
	canDrag = false;
	canvas.onmousemove = null;
}

initialize();
canvas.onmousedown = onClick;
canvas.onmouseup = afterClick;