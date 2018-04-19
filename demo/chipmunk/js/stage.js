var miniScale = .4;

var gameWdith = Math.min(1000, innerWidth);
var gameHeight = 500;
var handY = gameHeight - 190;

var container = document.querySelector(".container");
container.style.width = gameWdith + "px";
container.style.height = gameHeight + "px";
var stage = new Hilo.Stage({
    container:container,
    width:gameWdith,
    height:gameHeight
});

stage.enableDOMEvent([Hilo.event.POINTER_START, Hilo.event.POINTER_MOVE, Hilo.event.POINTER_END])

var scene = new Hilo.Container({
    y:gameHeight,
    pivotY:gameHeight
});
stage.addChild(scene);

var ticker = new Hilo.Ticker(60);
ticker.addTick(stage);
ticker.addTick(Hilo.Tween);
ticker.start();

Resource.on("complete", function(e){
    init();
});
Resource.load();

var camera = new Hilo.Camera({
    width:gameWdith,
    height:gameHeight,
    bounds:[-1000, -2000, gameWdith + 3000, 2000 + gameHeight],
    deadzone:[100, 100, gameWdith - 500, gameHeight - 200]
});

scene.onUpdate = function(){
    camera.tick();
    this.x = -camera.scroll.x + 100;
    this.y = -camera.scroll.y + gameHeight;
}

function initFloor(){
    var floowH = 50;
    var floor = world._world.addShape(new cp.SegmentShape(world._world.staticBody, v(-1000, gameHeight + floowH), v(10000, gameHeight + floowH), floowH));
    floor.setElasticity(1);
    floor.setFriction(1);
    floor.setLayers(NOT_GRABABLE_MASK);

    var floor = world._world.addShape(new cp.SegmentShape(world._world.staticBody, v(-500, gameHeight), v(-500, 0), 0));
    floor.setElasticity(1);
    floor.setFriction(1);
    floor.setLayers(NOT_GRABABLE_MASK);
}