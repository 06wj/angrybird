function initCollision(){
    var listener = new b2ContactListener();
    listener.PreSolve = function(contact, oldManifold){
        var a = contact.GetFixtureA();
        var b = contact.GetFixtureB();
    }

    listener.PostSolve = function(contact, impulse){
        var a = contact.GetFixtureA().GetBody();
        var b = contact.GetFixtureB().GetBody();

        var power = impulse.normalImpulses[0];

        check(a);
        check(b);

        function check(body){
            var view = body.view;
            if(view && body.GetType()!==b2Body.b2_staticBody){
                if(!view.isBird){
                    if(power > 100){
                        world.deleteBody(body);
                    }

                    if(view.isPig && power > 20){
                        world.deleteBody(body);
                    }
                }
            }
        }
    }
    world._world.SetContactListener(listener);
}