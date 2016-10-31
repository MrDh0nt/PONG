
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
var barwidth = 15;
var barheight = 75;
var white = "#FFF";
var barWhite = "#FFF";
var pi = Math.PI;
var pX = 0;
var pY = ((canvas.height / 2) - (barheight / 2));
var cX = canvas.width - barwidth;
var cY = ((canvas.height / 2) - (barheight / 2));
var ballr = 20;
var ballx = canvas.width / 2 - ballr;
var bally = ((canvas.height / 2) - (ballr / 2));
var corner = Math.random() * ((pi / 4) - (3 * pi / 4)) + pi / 4;
var xchange = 5 * Math.cos(corner);
var ychange = 5 * Math.sin(corner);
var barChange = 8;
var upPress = false;
var downPress = false;
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
function keyDownHandler(e){
    console.log("keydown: " + e.keyCode); //upArr: 38 downArr: 40
    if(e.keyCode === 38){
        upPress = true;
    }else if(e.keyCode === 40){
        downPress = true;
    }else if(e.keyCode === 32){
        barheight = canvas.height;
        barWhite = "#F00";
    }else if(e.keyCode === 16){
        barChange = barChange / 2;
    }
}
function keyUpHandler(e){
    if(e.keyCode === 38){
        upPress = false;
    }else if(e.keyCode === 40){
        downPress = false;
    }else if(e.keyCode === 32){
        barheight = 75;
        barWhite = "#FFF";
    }else if(e.keyCode === 16){
        barChange = barChange * 2;
    }
}

function gameLoop() {
    draw.clearScreen();
	//code here...
    //1 detection
    bodyHtml.addEventListener("keydown", keyDownHandler);
    bodyHtml.addEventListener("keyup", keyUpHandler);
    //2 logic
    if(ballx <= barwidth) { //if ball is left or right on screen border
        if(bally + ballr >= pY && bally <= (pY + barheight)){
            xchange = -xchange;
        }else if(ballx < 0){
            ballx = canvas.width / 2 - ballr;
            corner = Math.random() * ((pi / 4) - (3 * pi / 4)) + pi / 4;
            xchange = 5 * Math.cos(corner);
            ychange = 5 * Math.sin(corner);
        }
    }else if(ballx + ballr >= canvas.width - barwidth){
        if(bally + ballr >= cY && bally <= (cY + barheight)){
            xchange = -xchange;
        }else if(ballx + ballr > canvas.width){
            ballx = canvas.width / 2 - ballr;
            corner = Math.random() * ((pi / 4) - (3 * pi / 4)) + pi / 4;
            xchange = 5 * Math.cos(corner);
            ychange = 5 * Math.sin(corner);
        }
    }
    if(bally < 0 || bally + ballr > canvas.height) { //if ball is on top or bottom of the screen border
        ychange = -ychange;
    }
    if(downPress){ //change of the paddle
        pY += barChange;
        cY += barChange;
    }else if(upPress){
        pY -= barChange;
        cY -= barChange;
    }
    if(pY < 0){
        pY = 0;
    }else if((pY + barheight) > canvas.height){
        pY = canvas.height - barheight
    }
    if(cY < 0){
        cY = 0;
    }else if((cY + barheight) > canvas.height){
        cY = canvas.height - barheight
    }
    //3 drawing
    draw.rectangle(pX, pY, barwidth, barheight, barWhite);
    draw.rectangle(cX, cY, barwidth, barheight, barWhite);
    draw.rectangle(ballx, bally, ballr, ballr, white);
    for(var i = 0; i < canvas.height; i = i + 20){
        draw.rectangle((canvas.width / 2) - 2.5, i, 5, 13);
    }
    
    ballx += xchange;
    bally += ychange;
}
setInterval(gameLoop, 20);