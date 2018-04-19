function nextBird(){
    setNextBird();
    if(currentBird){
        var pos = {
            x:preBird.x,
            y:preBird.y
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

                scene.y = gameHeight;
                camera.follow(currentBird);
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
}