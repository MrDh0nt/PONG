(function (document, console, undefined) {
    const CANVAS = document.getElementById("myCanvas"),
          BODY_EL = document.getElementById("myBody"),
          DIFF = document.getElementsByName("moeilijkheid"),
          CONTEXT = CANVAS.getContext("2d"),
          WHITE = "#FFF";

    var game = new Game();
    game.start();

    function Game() {
        var _self = this;

        this.barWidth = 0;
        this.barHeight = 0;
        this.pX = 0;
        this.barWhite = WHITE;
        this.pY = 0;
        this.cX = 0;
        this.cY = 0;
        this.ballR = 0;
        this.ballX = 0;
        this.ballY = 0;
        this.corner = null;
        this.xChange = null;
        this.yChange = null;
        this.barChange = 8;
        this.upPress = false;
        this.downPress = false;
        this.playerScore = 0;
        this.computerScore = 0;
        this.difficultyChoice = 0; //easy as standard
        this.difficulty = [0.45, 0.55, 0.65];
        this.multiplier = 0;
        this.hits = 0;
        this.multiplierBall = 0;

        this.Draw = {
            rectangle: function (x, y, w, h, color) {
                CONTEXT.beginPath();
                CONTEXT.rect(x, y, w, h);
                CONTEXT.fillStyle = color;
                CONTEXT.fill();
                CONTEXT.closePath();
            },

            clearScreen: function () {
                CONTEXT.beginPath();
                CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
                CONTEXT.closePath();
            },

            score: function (scoree, y) {
                CONTEXT.font = '80px VT323';
                CONTEXT.textAlign = 'center';
                CONTEXT.fillText(scoree, CANVAS.width / 2 - y, 50);
            }
        };

        this.start = function () {
            init();
            setDifficultyMultiplier();
            calculateCorners();
            setInterval(loop, 10);
        }

        init = function() {
            // adjust canvas
            CANVAS.width = 600;
            CANVAS.height = 400;
            
            // attach event listeners
            BODY_EL.addEventListener("keydown", keyDownHandler);
            BODY_EL.addEventListener("keyup", keyUpHandler);
            
            // init fields
            _self.barWidth = 15;
            _self.barHeight = 75;
            _self.pY = CANVAS.height / 2 - _self.barHeight / 2;
            _self.cX = CANVAS.width - _self.barWidth;
            _self.cY = CANVAS.height / 2 - _self.barHeight / 2;
            _self.ballR = 20;
            _self.ballX = CANVAS.width / 2 - _self.ballR;
            _self.ballY = CANVAS.height / 2 - _self.ballR / 2;
        }

        loop = function () {
            _self.Draw.clearScreen();
            
            calculateElementPositions();
            drawComponents();
            setDifficultyMultiplier();
        }

        calculateElementPositions = function () {
            //if ball is left or right on screen border
            if (_self.ballX <= _self.barWidth) {
                if (_self.ballY <= (_self.pY + _self.barHeight) && _self.ballY + _self.ballR >= _self.pY) {
                    //ball detection on player side
                    _self.xChange = -_self.xChange;
                    _self.ballX = _self.pX + _self.barWidth;
                    _self.hits++;

                    if (console) {
                        console.log('you hit the ball');
                    }
                } else if (_self.ballX < 0) {
                    _self.ballX = CANVAS.width / 2 - _self.ballR;
                    _self.ballY = CANVAS.height / 2 - _self.ballR;
                    _self.corner = Math.random() * ((Math.PI / 4) - (3 * Math.PI / 4)) + Math.PI / 4;
                    _self.xChange = 5 * Math.cos(_self.corner);
                    _self.yChange = 5 * Math.sin(_self.corner);
                    _self.computerScore += 1;
                    _self.hits = 0;
                }
            } else if (_self.ballX + _self.ballR >= CANVAS.width - _self.barWidth) { //ball detection on pc side
                if (_self.ballY + _self.ballR >= _self.cY && _self.ballY <= (_self.cY + _self.barHeight)) {
                    _self.xChange = -_self.xChange;
                    _self.hits++;
                    _self.ballX = _self.cX - _self.ballR;

                    if (console) {
                        console.log('pc hit the ball');
                    }
                } else if (_self.ballX + _self.ballR > CANVAS.width) {
                    _self.ballX = CANVAS.width / 2 - _self.ballR;
                    _self.ballY = CANVAS.height / 2 - _self.ballR;
                    _self.corner = Math.random() * ((Math.PI / 4) - (3 * Math.PI / 4)) + Math.PI / 4;
                    _self.xChange = 5 * Math.cos(_self.corner);
                    _self.yChange = 5 * Math.sin(_self.corner);
                    _self.playerScore += 1;
                    _self.hits = 0;
                }
            }

            if (_self.ballY < 0) {
                _self.ballY = 0;
                _self.yChange = -_self.yChange;
            } else if (_self.ballY + _self.ballR > CANVAS.height) { //if ball is on top or bottom of the screen border
                _self.ballY = CANVAS.height - _self.ballR;
                _self.yChange = -_self.yChange;
            }

            //change of the paddle
            if (_self.downPress) {
                _self.pY += _self.barChange;
                //cY += barChange;
            } else if (_self.upPress) {
                _self.pY -= _self.barChange;
                //cY -= barChange;
            }

            //paddle borders so the paddles don't wander off screen
            if (_self.pY < 0) {
                _self.pY = 0;
            } else if ((_self.pY + _self.barHeight) > CANVAS.height) {
                _self.pY = CANVAS.height - _self.barHeight
            }

            if (_self.cY < 0) {
                _self.cY = 0;
            } else if ((_self.cY + _self.barHeight) > CANVAS.height) {
                _self.cY = CANVAS.height - _self.barHeight
            }

            if (_self.ballX > CANVAS.width / 2) {
                if (_self.ballY < _self.cY || _self.ballY > _self.cY + _self.barHeight) {
                    if (_self.cY + _self.barHeight / 2 < _self.ballY + _self.ballR / 2) {
                        _self.cY += _self.barChange * _self.multiplier;
                    } else if (_self.cY + _self.barHeight / 2 > _self.ballY + _self.ballR / 2) {
                        _self.cY -= _self.barChange * _self.multiplier;
                    }
                }
            }
        }

        drawComponents = function () {
            _self.Draw.rectangle(_self.pX, _self.pY, _self.barWidth, _self.barHeight, _self.barWhite);
            _self.Draw.rectangle(_self.cX, _self.cY, _self.barWidth, _self.barHeight, _self.barWhite);
            _self.Draw.rectangle(_self.ballX, _self.ballY, _self.ballR, _self.ballR, WHITE);
            for (var i = 0; i < CANVAS.height; i = i + 20) {
                _self.Draw.rectangle((CANVAS.width / 2) - 2.5, i, 5, 13);
            }
            _self.Draw.score(_self.playerScore, 50);
            _self.Draw.score(_self.computerScore, -50);
            _self.Draw.score('-', 0);

            _self.multiplierBall = _self.hits / 10;

            _self.ballX += Math.floor(_self.xChange * _self.multiplierBall) + _self.xChange;
            _self.ballY += Math.floor(_self.yChange * _self.multiplierBall) + _self.yChange;
        }

        setDifficultyMultiplier = function () {
            if (DIFF) {
                for (var i = 0; i < DIFF.length; i++) {
                    if (DIFF[i].checked) {
                        _self.difficultyChoice = DIFF[i].value;
                    }
                }
            }

            _self.multiplier = _self.difficulty[_self.difficultyChoice];
        }

        calculateCorners = function () {
            var _corner = Math.random() * ((Math.PI / 4) - (3 * Math.PI / 4)) + Math.PI / 4;

            _self.xChange = 5 * Math.cos(_corner);
            _self.yChange = 5 * Math.sin(_corner);
            _self.corner = _corner;
        }

        keyDownHandler = function (e) {
            var keyCode = e.keyCode;

            switch (keyCode) {
                case 16:
                    _self.barChange = _self.barChange / 2;
                    break;
                case 32:
                    _self.barHeight = CANVAS.height;
                    _self.barWhite = "#F00";
                    break;
                case 38:
                    _self.upPress = true;
                    break;
                case 40:
                    _self.downPress = true;
                    break;
            }
        }

        keyUpHandler = function (e) {
            var keyCode = e.keyCode;

            switch (keyCode) {
                case 32:
                    _self.barHeight = 75;
                    _self.barWhite = "#FFF";
                    break;
                case 38:
                    _self.upPress = false;
                    break;
                case 40:
                    _self.downPress = false;
                    break;
                case 78:
                    calculateCorners();

                    _self.ballX = CANVAS.width / 2;
                    _self.ballY = CANVAS.height / 2 - _self.ballR / 2;
                    break;
            }
        }
    }

})(window.document, window.console);
