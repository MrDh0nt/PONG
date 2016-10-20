var testerrr = 0;
var loop;
var keypresss;
function init(){
    loop = setInterval(gameLoop(), (60/1000));
}
function make(width, height, id){
    var thisobject = document.getElementById(id);
    document.getElementById(id).style.width = width;
    document.getElementById(id).style.height = height;
    document.getElementById(id).style.position = "absolute";
    document.getElementById(id).style.left = "0px";
    document.getElementById(id).style.top = "0px";
}
function gameLoop(){
    document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 38:
            alert('up');
            break;
        case 40:
            alert('down');
            break;
    }
};
}