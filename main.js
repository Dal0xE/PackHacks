

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
    document.getElementById("music").play();
    document.getElementById("start").style.display = "none";
    document.getElementById("name").style.display = "none";
    document.getElementById("goal").style.display = "none";
    document.getElementById("win_box").style.display = "block";
     document.getElementById("h1").style.display = "block";
    document.getElementById("h2").style.display = "block";
    document.getElementById("h3").style.display = "block";
    document.getElementById("level").style.display = "block";
    var level2 = false;
    var level3 = false;
    
     engine.spawn("SINK", 300, 550); //First Level Sink
    engine.spawn("WALL", 135, 550);
    engine.spawn("WALL", 135, 390);
    engine.spawn("WALL", 135, 230);
    engine.spawn("WALL", 550, 550);
    engine.spawn("WALL", 700, 550);

    engine.spawn("WALL", 700, 0);
    engine.spawn("WALL", 700, 150);
    engine.spawn("WALL", 535, 0);
    engine.spawn("WALL", 0, 230);
    engine.spawn("WALL", 0, 230);
    engine.spawn("WALL", 700, 630); 
    startLooping();
}

function startLooping(){
    
    
    setInterval(engine.loop, 5);
}
  /* //Second Level 
    engine.spawn("SINK", 300, 550);
    var sink = engine.spawn("SINK", 535, 50);
    engine.rotate(sink, 270);
    
    
    engine.spawn("WALL", 135, 550);
    engine.spawn("WALL", 135, 390);
    engine.spawn("WALL", 135, 230);
    engine.spawn("WALL", 550, 550);
    engine.spawn("WALL", 700, 550);
    engine.spawn("WALL", 580, 245)

    engine.spawn("WALL", 0, 230);
    engine.spawn("WALL", 0, 230);
    engine.spawn("WALL", 700, 630); 
    
    //Third Level
    engine.spawn("SINK", 300, 550);
    var sink = engine.spawn("SINK", 535, 50);
    engine.rotate(sink, 270);
    var sink3 = engine.spawn("SINK", 845, 260);
    engine.rotate(sink3, 180);
    engine.spawn("WALL", 678, 245);
    engine.spawn("WALL", 135, 550);
    engine.spawn("WALL", 135, 390);
    engine.spawn("WALL", 135, 230);
    engine.spawn("WALL", 550, 550);
    engine.spawn("WALL", 580, 550);
    engine.spawn("WALL", 700, 550);
    engine.spawn("WALL", 585, 245); //THIS ONE
    engine.spawn("WALL", 0, 230);
    engine.spawn("WALL", 700, 630);*/