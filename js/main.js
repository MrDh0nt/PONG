function make(width, height, id){
    var thisobject = document.getElementById(id);
    document.getElementById(id).style.width = width;
    document.getElementById(id).style.height = height;
    document.getElementById(id).style.position = "absolute";
    document.getElementById(id).style.left = "0px";
    document.getElementById(id).style.top = "0px";
}
function gameLoop(){
    var exit = false;
    while(!exit){
        setInterval(function(){alert('hello')}, 3000);
    }
}
function isKeyPressed(test){
    console.log('yeps: ' + test);
}