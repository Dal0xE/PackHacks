var randomMap = function(){
    for(var sinkX = 0; sinkX<5; sinkX++){
        for(var sinkY = 0; sinkY<140; sinkY++){
            if (Math.random() < 0.2){
                //var sink = null; Sink object here
                //sink positioning goes here.
                
            }
        }
    }
    for (var refX = 0; refX<5; refX++){
        for (var refY = 0; refY<5; refY++){
            if (Math.random() < 0.2){
                //var ref = null; refrigerator object goes here
                //Sink positioning goes here.
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

randomMap();