function initCollision(){
    world._world.addCollisionHandler(1, 1, function(a, b){
        return true;
    }, function(arb){
        return true
    },
    function(arb){
        if(state == "shooting" && (arb.isFirstContact()||1)){
            var len = v.len(arb.totalImpulse());
            world._world.addPostStepCallback(function(){
                var arr = arb.getShapes();
                arr.forEach(function(shape, i){
                    var sp = shape.body.view;
                    if(sp.isPig && arr[1-i].body.view.isBird){
                        world._world.removeShape(shape);
                        scene.removeChild(sp);
                    }
                    else if(len > sp.defense*50){

                        if(!sp.isBird && !sp.isStatic){
                            if(sp.maxHealth > 0){
                                // console.log("s", sp.maxHealth)
                            }
                            sp.maxHealth -= 1//sp.defense;
                            if(!sp.maxHealth){
                                world._world.removeShape(shape);
                                scene.removeChild(sp);
                            }
                            else{
                                // console.log(sp.maxHealth)
                            }
                        }
                    }
                });

            })
        }
        return true;
    });
}