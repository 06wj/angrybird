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

    camera.follow(currentBird);
    camera.scroll.y = 50;

    document.body.addEventListener(Hilo.event.POINTER_END, function(e){
        if(currentBird && currentBird.mousedown){
            var x = 30 - currentBird.x ;
            var y = handY - currentBird.y ;
            currentBird.setBody(currentBird.x, currentBird.y);
            currentBird.body.ApplyImpulse(v(x, y), currentBird.body.GetWorldCenter());
            currentBird.body.SetActive(true);
            g.clear();

            setTimeout(function(){
                state = "shooting";
            }, 3000);
            Hilo.Tween.to(scene, {
                scaleX:1,
                scaleY:1
            },{
                duration:1000
            });

            currentBird.mousedown = false;
        }
    });

    var g = new Hilo.Graphics({
        x:0,
        y:0
    });
    scene.addChildAt(back, 0);
    scene.addChildAt(g, 0);

    stage.on(Hilo.event.POINTER_MOVE, function(e){
        if(currentBird && currentBird.mousedown){
            currentBird.x = e.stageX/scene.scaleX + currentBird.mouse.x;
            currentBird.y = e.stageY/scene.scaleY + currentBird.mouse.y;

            g.clear().lineStyle(5, "#f00").beginPath().moveTo(10, handY+2).lineTo(currentBird.x, currentBird.y).lineTo(60, handY+2).endFill();
        }
    });
}