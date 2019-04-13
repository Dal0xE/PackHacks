

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

document.getElementById("start").onclick = function(){
    document.getElementById("start").style.display = "none";
    var level2 = false;
    var level3 = false;
    var level4 = false; 
    var level5 = false; 
    engine.spawn("SINK", 300, 550); //First Level Sink
    //Spawning First Level Walls goes here
    startLooping();
}

function startLooping(){

    if (level2){
        engine.spawn("SINK", 400, 550);
        engine.spawn("SINK", 550, 350);
        level2 = false; 
    }
    
    while(true){
        engine.loop();
    }
}
