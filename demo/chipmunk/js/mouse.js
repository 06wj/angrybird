function initMouse(){
     var back = new Hilo.Bitmap({
        image:Resource.get("SLINGSHOT_01_BACK"),
        x:30,
        y:handY,
        pointerEnabled:false
    }).addTo(scene);

    var front = new Hilo.Bitmap({
        image:Resource.get("SLINGSHOT_01_FRONT"),
        y:handY,
        pointerEnabled:false
    }).addTo(scene);

    _bird_1.on(Hilo.event.POINTER_START, function(e){
        _bird_1.mousedown = true;
        _bird_1.mouse = {
            x:_bird_1.x - e.stageX/scene.scaleX,
            y:_bird_1.y - e.stageY/scene.scaleY
        }
    });

    camera.follow(_bird_1);
    camera.scroll.y = 50;

    document.body.addEventListener(Hilo.event.POINTER_END, function(e){
        if(_bird_1.mousedown){
            var x = 30 - _bird_1.x ;
            var y = handY - _bird_1.y ;
            _bird_1.body.p.x = _bird_1.x;
            _bird_1.body.p.y = _bird_1.y;
            _bird_1.physics = true;
            _bird_1.body.applyImpulse(v(x*25, y*25), v(0, 0));

            g.clear();

            state = "shooting";
            Hilo.Tween.to(scene, {
                scaleX:1,
                scaleY:1
            },{
                duration:1000
            });
        }
        _bird_1.mousedown = false;
    });


    var g = new Hilo.Graphics({
        x:0,
        y:0
    });
    scene.addChildAt(back, 0);
    scene.addChildAt(g, 0);

    stage.on(Hilo.event.POINTER_MOVE, function(e){
        if(_bird_1.mousedown){
            _bird_1.x = e.stageX/scene.scaleX + _bird_1.mouse.x;
            _bird_1.y = e.stageY/scene.scaleY + _bird_1.mouse.y;

            g.clear().lineStyle(5, "#f00").beginPath().moveTo(10, handY+2).lineTo(_bird_1.x, _bird_1.y).lineTo(60, handY+2).endFill();
        }
    });
}