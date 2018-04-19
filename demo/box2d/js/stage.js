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
    console.log("initFloor")
    var floowH = 50;
    var bodyDef = new b2BodyDef();//声明位置
    bodyDef.position.Set(gameWdith * .5 * SCALE, (gameHeight + floowH) * SCALE);//设置位置向量
    bodyDef.type = b2Body.b2_staticBody;//是否是动态物体

    var shape = new b2PolygonShape();//声明形状
    shape.SetAsBox(10000 * SCALE, floowH * SCALE);//设置形状，长宽

    var fixtureDef = new b2FixtureDef();//声明材质
    fixtureDef.shape = shape;//设置材质形状
    fixtureDef.friction = 1;
    fixtureDef.restitution = 0;

    var body = world._world.CreateBody(bodyDef);
    body.CreateFixture(fixtureDef);
    window.floor = body;
}