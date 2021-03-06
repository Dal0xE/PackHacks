//The KitchenEscape global engine
//Made by Dallas C. at PackHacks 2019

//DOM augmentations that really shouldn't need to be done
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

var engine = {};

engine.staticVicinityUpdates = [];
engine.solids = [];

engine.keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false
}

document.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 87:
            engine.keys.up = true;
            break;
        case 65:
            engine.keys.left = true;
            break;
        case 68:
            engine.keys.right = true;
            break;
        case 83:
            engine.keys.down = true;
            break;
        case 38:
            engine.keys.up = true;
            break;
        case 37:
            engine.keys.left = true;
            break;
        case 39:
            engine.keys.right = true;
            break;
        case 40:
            engine.keys.down = true;
            break;
    }
});

document.addEventListener("keyup", function(e) {
    switch (e.keyCode) {
        case 87:
            engine.keys.up = false;
            break;
        case 65:
            engine.keys.left = false;
            break;
        case 68:
            engine.keys.right = false;
            break;
        case 83:
            engine.keys.down = false;
            break;
        case 38:
            engine.keys.up = false;
            break;
        case 37:
            engine.keys.left = false;
            break;
        case 39:
            engine.keys.right = false;
            break;
        case 40:
            engine.keys.down = false;
            break;
    }
});

engine.registerStaticVicinityCheck = function(entity, range) {
    this.staticVicinityUpdates.push([entity, range]);
}

engine.frameid = 0;

engine.warn = function(message) {
    console.log("[ENGINE, WARN] " + message);
}

engine.distance = function(coord1, coord2) {
    return Math.sqrt(Math.pow(Math.abs(coord1[0] - coord2[0]), 2) + Math.pow(Math.abs(coord1[1] - coord2[1]), 2));
}

engine.move = function(entity, movementVector) {
    entity.element.style.transform = "translate(" + ((entity.x + movementVector[0] >= 0 ? entity.x + movementVector[0] : 0)).toString() + "px ," + (entity.y + movementVector[1]).toString() + "px)";
    entity.x += movementVector[0];
    entity.y += movementVector[1];
}

engine.setPosition = function(entity, x, y) {
    entity.element.style.transform = "translate(" + x.toString() + "px, " + y.toString() + "px)";
    entity.x = x;
    entity.y = y;
}

engine.rotate = function(entity, degrees) {
    entity.element.style.transform = "translate(" + entity.x + "px, " + entity.y + "px) rotate(" + degrees + "deg)";
    entity.rotate = degrees;
}

engine.attackEntityXY = function(entity, positionVector, damage) {
    if (this.distance([entity.x, entity.y], positionVector) > 5) return;
    this.register(new AttackEntity(positionVector[0], positionVector[1], damage));
}

function registerVicinityUpdate(entity, distance) {
    this.vicinityUpdates.push([entity, distance]);
    this.receivedCoords.forEach(function(coord) {
        if (this.distance([entity.x, entity.y], coord[0]) <= distance) entity.vicinityCallback(coord[1]);
    });
}

function registerEntityToFrame(entity) {
    this.vicinityUpdates.forEach(function(update) {
        if (this.distance([update[0].x, update[0].y], [entity.x, entity.y]) <= update[1]) update[0].vicinityCallback(entity);
    });
}

function Frame(framenumber) {
    this.vicinityUpdates = engine.staticVicinityUpdates;
    this.receivedCoords = [];
    this.registerVicinityUpdate = registerVicinityUpdate;
    this.frame = framenumber;
}

engine.entities = [];

engine.register = function(entity) {
    this.entities.push(entity);
    if (entity.solid) this.solids.push(entity);
}

engine.unregister = function(entity) {
    this.entities.splice(this.entities.indexOf(entity), 1);
}

engine.loop = function() {
    var finalDestination = [engine.player.x, engine.player.y];
    if (engine.keys.up) {
        finalDestination[1] -= 4;
    }
    if (engine.keys.down) {
        finalDestination[1] += 4;
    }
    if (engine.keys.left) {
        finalDestination[0] -= 4;
    }
    if (engine.keys.right) {
        finalDestination[0] += 4;
    }
    var intersected = false;
    engine.solids.forEach(function(solid) {
        if (solid.intersects(finalDestination)) intersected = true;
    });
    //console.log(intersected);
    if (!intersected) {
        //if (engine.endPad.intersects(finalDestination)) level2 = true;
        engine.setPosition(engine.player, finalDestination[0], finalDestination[1]);
    }
    engine.frame = new Frame(this.frameid);
    engine.entities.forEach(function(entity) {
        entity.eventLoopCallback(this.frame);
        engine.frame.vicinityUpdates.forEach(function(update) {
            if (engine.distance([entity.x, entity.y], [update[0].x, update[0].y]) <= update[1]) update[0].vicinityCallback();
        });
    });
    this.frameid++;
}

engine.generateId = function() {
    var id = '';
    var alpha = 'abcdefghijklmnopqrstuvwxyz1234567890';
    for (var i = 0; i < 20; i++) {
        id += alpha[Math.floor(Math.random() * alpha.length)];
    }
    if (document.getElementById(id) == undefined) return id;
    else return engine.generateId();
}

engine.createAsset = function(url) {
    var a = document.createElement("IMG");
    a.src = url;
    a.className = "general-gamepiece";
    a.id = this.generateId();
    document.getElementById("game_window").appendChild(a);
    return a.id;
}

engine.spawn = function(type, x, y) {
    switch (type) {
        case "PLAYER":
            if (engine.player) return;
            var player = new Player(this.createAsset('/assets/player.svg'), x, y);
            engine.player = player;
            engine.register(player);
            return player;
        case "SINK":
            var entity = new Sink(this.createAsset('/assets/sink.svg'), x, y);
            engine.register(entity);
            return entity;
        case "WALL":
            var entity = new Entity(this.createAsset('/assets/wall.svg'));
            engine.setPosition(entity, x, y);
            entity.shield = 0;
            break;
        case "ENDPAD":
            var entity = new Entity(this.createAsset('/assets/stairs.svg'));
            engine.setPosition(entity, x, y);
            entity.shield = 0;
            engine.endPad = entity;
    }
}

function Entity(elemID) {
    this.x = 0;
    this.y = 0;
    this.eventLoopCallback = function(frame) {}
    this.visible = true;
    this.animFrame = 0;
    this.element = document.getElementById(elemID);
    this.type = "UNDEFINED";
    this.health = 2;
    this.shield = 1;
    this.rotation = 0;
    this.damageModifier = 0;
    this.solid = true;
    this.damage = function(amount) {
        this.health -= amount * shield;
        if (this.health <= 0) {
            engine.unregister(this);
            this.element.destroy();
        }
    }
    this.intersects = function(coords) {
        return (this.x < coords[0] && coords[0] < (this.x + this.element.width) && this.y < coords[1] && coords[1] < (this.y + this.element.width));
    }
}

function AttackEntity(x, y, damage) {
    Entity.call(this, "generalElem");
    engine.setPosition(this, x, y);
    this.type = "ATTACK";
    this.solid = false;
    this.shield = 0; //invulnerable
    this.firstFrame = engine.frameid;
    this.vicinityCallback = function(entity) {
        if (entity.type == "PLAYER") entity.harm(damage);
    }
    this.eventLoopCallback = function(frame) {
        if (frame.frame >= this.firstFrame + 2) {
            engine.unregister(this);
            this.element.destroy();
        }
        frame.registerVicinityUpate(this, 5);
    }
}

function Sink(id, x, y) {
    Entity.call(this, id);
    engine.setPosition(this, x, y);
    this.vicinityCallback = function(entity) {
        
    }
    this.type = "SINK";
}

function Player(id, x, y) {
    Entity.call(this, id);
    engine.setPosition(this, x, y);
    this.health = 3;
    this.damageModifier = 0;
    this.shield = 1;
    this.solid = false;
    this.damage = function(amount) {
        this.health -= amount * this.shield;
        lowerH(this.health);
        if (this.health <= 0) gameOver();
    }
}

engine.registerPlayer = function() {
    if (this.player) this.warn("Attempted to spawn a player when one already exists.");
    else engine.spawn("PLAYER", 400, 100);
}
