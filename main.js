function randomMap(){
    for(var sinkX = 0; sinkX<5; sinkX++){
        for(var sinkY = 0; sinkY<140; sinkY++){
            if (Math.random() < 0.2){
                //var sink = null; Sink object here
                //sink positioning goes here.
                
            }
        }
    }
    for (var wallX = 0; wallX<5; wallX++){
        for (var wallY = 0; wallY<5; wallY++){
            if (Math.random() < 0.2){
                //var wall = wall object. Create new entity here
                //position entity here
            }
        }
    }
}
var hearts = 3; //setting hearts in beginning

function lowerH(){
    for (var i = 3; i>Math.ceil(hearts); i--){
document.getElementById("heart" + i).innerHTML = "<img src='assets/border.png' class = 'heart' id = 'h" + i +  "'>";       
    }
if (hearts > 2 && hearts < 3){
    document.getElementById("h3").style.width = 50*(hearts - Math.floor(hearts) + 0.1) + "px";
    document.getElementById("h3").style.height = 50*(hearts - Math.floor(hearts) + 0.1) + "px";   
}   
if (hearts > 0 && hearts < 1){
    document.getElementById("h1").style.width = 50*(hearts - Math.floor(hearts) + 0.1) + "px";
    document.getElementById("h1").style.height = 50*(hearts - Math.floor(hearts) + 0.1) + "px";   
}  
if (hearts > 1 && hearts < 2){
    document.getElementById("h2").style.width = 50*(hearts - Math.floor(hearts) + 0.1) + "px";
    document.getElementById("h2").style.height = 50*(hearts - Math.floor(hearts) + 0.1) + "px";   
}      
}

lowerH();

var lvl = 1; 

document.getElementById("level").innerHTML = "Level " + lvl;

function startLooping(){
    while(true){
        engine.loop();
    }
}