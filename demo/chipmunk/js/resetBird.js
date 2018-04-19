function resetBird(bird){
    var pos = {
        x:bird.x,
        y:bird.y
    };
    camera.follow(pos);
    Hilo.Tween.to(pos, {
        x:30,
        y:handY
    }, {
        delay:500,
        duration:1500,
        onComplete:function(){
            console.log("reset");
            bird.physics = false;
            bird.body.resetForces();
            bird.body.p.x = 30;
            bird.body.p.y = handY;
            bird.x = 30;
            bird.y = handY;
            bird.rotation = 0;
            scene.y = gameHeight;
            camera.follow(bird);
            Hilo.Tween.to(scene, {
                scaleY:miniScale,
                scaleX:miniScale
            },{
                duration:1000
            });
            Hilo.Tween.to(camera.scroll, {
                y:50
            },{
                duration:1000
            });
        }
    });
}