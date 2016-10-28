var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 400;
var barwidth = 15;
var barheigt = 75;
var white = "#FFF";

var draw = {
	rectangle: function(x, y, w, h, color){
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
	}
	
}

var player = draw.rectangle(0,((canvas.height/2)-(barheigt/2)),barwidth, barheigt, white);

function gameLoop(){
	
}