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
var playerScore = 0;
var computerScore = 0;
var difficultyChoice = 0; //easy as standard
var difficulty = [0.45, 0.55, 0.65];
var multiplier = difficulty[difficultyChoice];
var hits = 0;
var multiplierBall = 0;

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
    },
    score: function (scoree, y) {
        ctx.font = "80px VT323";
        ctx.textAlign = "center";
        ctx.fillText(scoree, ((canvas.width/2) - y), 50);
    }
};
function keyDownHandler(e){
    //console.log("keydown: " + e.keyCode); //upArr: 38 downArr: 40
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
    }else if(e.keyCode === 78){
        corner = Math.random() * ((pi / 4) - (3 * pi / 4)) + pi / 4;
        xchange = 5 * Math.cos(corner);
        ychange = 5 * Math.sin(corner);
        ballx = canvas.width / 2;
        bally = canvas.height / 2 - ballr / 2;
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
        if(bally <= (pY + barheight) && bally + ballr >= pY){ //ball detection on player side
            xchange = -xchange;
			ballx = pX + barwidth;
			hits++;
			console.log('you hit the ball');
        }else if(ballx < 0){
            ballx = canvas.width / 2 - ballr;
            bally = canvas.height / 2 - ballr;
            corner = Math.random() * ((pi / 4) - (3 * pi / 4)) + pi / 4;
            xchange = 5 * Math.cos(corner);
            ychange = 5 * Math.sin(corner);
            computerScore += 1;
			hits = 0;
        }
    }else if(ballx + ballr >= canvas.width - barwidth){ //ball detection on pc side
        if(bally + ballr >= cY && bally <= (cY + barheight)){
            xchange = -xchange;
			hits++;
			console.log('pc hit the ball');
			ballx = cX - ballr;
        }else if(ballx + ballr > canvas.width){
            ballx = canvas.width / 2 - ballr;
            bally = canvas.height / 2 - ballr;
            corner = Math.random() * ((pi / 4) - (3 * pi / 4)) + pi / 4;
            xchange = 5 * Math.cos(corner);
            ychange = 5 * Math.sin(corner);
            playerScore += 1;
			hits = 0;
        }
    }
    if(bally < 0){
		bally = 0;
		ychange = -ychange;
	}else if(bally + ballr > canvas.height) { //if ball is on top or bottom of the screen border
        bally = canvas.height - ballr;
		ychange = -ychange;
	}
    if(downPress){ //change of the paddle
        pY += barChange;
        //cY += barChange;
    }else if(upPress){
        pY -= barChange;
        //cY -= barChange;
    }
    if(pY < 0){ //paddle borders so the paddles don't wander off screen
        pY = 0;
    }else if((pY + barheight) > canvas.height){
        pY = canvas.height - barheight
    }
    if(cY < 0){
        cY = 0;
    }else if((cY + barheight) > canvas.height){
        cY = canvas.height - barheight
    }
    if(ballx > canvas.width/2){
        if(bally < cY || bally > cY + barheight){
            if(cY + barheight / 2 < bally + ballr / 2){
                cY += barChange * multiplier;
            }else if(cY + barheight / 2 > bally + ballr / 2){
                cY -= barChange * multiplier;
            }
        }
    }
    //3 drawing
    draw.rectangle(pX, pY, barwidth, barheight, barWhite);
    draw.rectangle(cX, cY, barwidth, barheight, barWhite);
    draw.rectangle(ballx, bally, ballr, ballr, white);
    for(var i = 0; i < canvas.height; i = i + 20){
        draw.rectangle((canvas.width / 2) - 2.5, i, 5, 13);
    }
    draw.score(playerScore, 50);
    draw.score(computerScore, -50);
    draw.score("-", 0);
    multiplierBall = hits / 10;
	console.log(multiplierBall);
    ballx += Math.floor(xchange * multiplierBall) + xchange;
    bally += Math.floor(ychange * multiplierBall) + ychange;
	//last computations
	//difficultyChoice = difficulty[];
	var difff = document.getElementsByName("moeilijkheid");
	if (difff) {
		for (var i = 0; i < difff.length; i++) {
			if (difff[i].checked){
				difficultyChoice = difff[i].value;
			}
		}
	}
	multiplier = difficulty[difficultyChoice];
	multiplier = difficulty[difficultyChoice];
}
setInterval(gameLoop, 20);