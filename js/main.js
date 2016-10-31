
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 400;
var barwidth = 15;
var barheight = 75;
var white = "#FFF";
var pX = 0;
var pY = ((canvas.height / 2) - (barheight / 2));
var cX = canvas.width - barwidth;
var cY = ((canvas.height / 2) - (barheight / 2));
var ballr = 20;
var ballx = 0;
var bally = ((canvas.height / 2) - (ballr / 2));
var xchange = 7;
var ychange = 7;
var upPress = false;
var downPress = false;
var pYchange = 7;
var bodyHtml = document.getElementById("myBody");


var draw = {
	rectangle: function (x, y, w, h, color) {
		ctx.beginPath();
		ctx.rect(x, y, w, h);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
	},
    clearScreen: function () {
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
    }
	
};

function gameLoop() {
    draw.clearScreen();
	//code here...
    //1 detection
    var x = event.keyCode;
    if(x){
        console.log(x);
    }
    //2 logic
    if(ballx < 0 || ballx + ballr > canvas.width) {
        xchange = -xchange;
    }
    if(bally < 0 || bally + ballr > canvas.height) {
        ychange = -ychange;
    }
    //3 drawing
    draw.rectangle(pX, pY, barwidth, barheight, white);
    draw.rectangle(cX, cY, barwidth, barheight, white);
    draw.rectangle(ballx, bally, ballr, ballr, white);
    for(var i = 0; i < canvas.height; i = i + 20){
        draw.rectangle((canvas.width / 2) - 2.5, i, 5, 13);
    }
    
    ballx += xchange;
    bally += ychange;
}
setInterval(gameLoop, 40);