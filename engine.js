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

var engine;

engine.warn = function(message) {
    console.log("[ENGINE, WARN] " + message);
}

engine.distance = function(coord1, coord2) {
    return Math.sqrt(Math.pow(Math.abs(coord1[0] - coord2[0]), 2) + Math.pow(Math.abs(coord1[1] - coord2[1]), 2));
}

engine.move = function(entity, movementVector) {
    entity.element.style.transform = "translate(" + (entity.x + movementVector[0]).toString() + "," + (entity.y + movementVector[1]).toString() + ")";
    entity.x += movementVector[0];
    entity.y += movementVector[1];
}
engine.setPosition(entity, x, y) {
    entity.element.style.transform = "translate(" + x.toString() + "px, " + y.toString() + "px)";
    entity.x = x;
    entity.y = y;
}

engine.attackEntityXY(entity, positionVector, damage) {
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

function Frame() {
    this.vicinityUpdates = [];
    this.receivedCoords = [];
    this.registerVicinityUpdate = registerVicinityUpdate;
}

engine.entities = [];

engine.register = function(entity) {
    this.entities.push(entity);
}

engine.unregister = function(entity) {
    this.entities.splice(this.entities.indexOf(entity), 1);
}

engine.loop = function() {
    this.entities.forEach(function(entity) {
        entity.eventLoopCallback(this.frame);
    });
}

engine.generateId = function() {
    var id = '';
    const alpha = 'abcdefghijklmnopqrstuvwxyz1234567890';
    for (var i = 0; i < 20; i++) {
        id += alpha[Math.random() * alpha.length];
    }
    if (document.getElementById(id) == undefined) return id;
    else return generateId();
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
            break;
        case "SINK":
            var entity = new Sink(this.createAsset('/assets/sink.svg'), x, y);
            break;
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
    this.damageModifier = 0;
    this.damage = function(amount) {
        this.health -= amount * shield;
        if (this.health <= 0) {
            engine.unregister(this);
            this.element.destroy();
        }
    }
}

function AttackEntity(x, y, damage) {
    Entity.call(this, "generalElem");
    engine.setPostition(this, x, y);
    this.type = "ATTACK";
    this.shield = 0; //invulnerable
    this.vicinityCallback = function(entity) {
        if (entity.type == "PLAYER") entity.harm(damage);
    }
    this.eventLoopCallback = function(frame) {
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
    this.damage = function(amount) {
        this.health -= amount * shield;
        lowerH(this.health);
        if (this.health <= 0) gameOver();
    }
}

engine.registerPlayer = function() {
    if (this.player) this.warn("Attempted to spawn a player when one already exists.");
    else engine.spawn("PLAYER", 400, 100);
}