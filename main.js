function randomMap(){
var random = Math.random()*2;
if (random < 1){    
engine.spawn("SINK", Math.random()*550, Math.random()*200 + 400);
}
if (Math.random() * 2 < 1 || random > 1){
engine.spawn("SINK", Math.random()*200 + 400, Math.random()*5500);    
}
    

}
randomMap();
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