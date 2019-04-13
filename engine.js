//The KitchenEscape global engine
//Made by Dallas C. at PackHacks 2019

var engine;

engine.assets = {
    sink: "/sink.svg",
    wall: "/wall.svg"
}

engine.distance = function(coord1, coord2) {
    return Math.sqrt(Math.pow(Math.abs(coord1[0] - coord2[0]), 2) + Math.pow(Math.abs(coord1[1] - coord2[1]), 2));
}

engine.move = function(entity, movementVector) {
    entity.style.transform = "translate(" + (entity.x + movementVector[0]).toString() + "," + (entity.y + movementVector[1]).toString() + ")";
    entity.x += movementVector[0];
    entity.y += movementVector[1];
}

engine.attackEntityXY(entity, positionVector) {
    if (this.distance())
}

engine.frame = {};

engine.entities = [];

engine.register = function(entity) {
    this.entities.push(entity);
}

engine.loop = function() {
    this.entities.forEach(function(entity) {
        entity.eventLoopCallback(this.frame);
    });
}

function Entity() {
    this.x = 0;
    this.y = 0;
    this.eventLoopCallback = function(frame) {}
    this.visible = true;
    this.animFrame = 0;
}