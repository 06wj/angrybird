var v = cp.v;
var massScale = .001;
var DEG2RAD = Math.PI/180;
var RAD2DEG = 180/Math.PI;
var GRABABLE_MASK_BIT = 1<<31;
var NOT_GRABABLE_MASK = ~GRABABLE_MASK_BIT;

var world = {
    createWorld:function(){
        if(!this._world){
            var world = this._world = new cp.Space();
            world.iterations = 20;
            world.gravity = v(0, 500);
            world.sleepTimeThreshold = 0.5;
            world.collisionSlop = 0.5;
            world.sleepTimeThreshold = 0.5;
        }
        return this._world;
    },
    isSleeping:function(body){
        return v.len(body.getVel()) < 4 || body.isSleeping();
    },
    updateWorld:function(dt){
        dt = dt > 20?16:dt;
        this._world.step(dt * .001);
    },
    createRect:function(view, transform, materialData, shapeData){
        var body;
        if(view.isStatic){
            body = this._createStaticBody();
        }
        else{
            var mass = shapeData.width * shapeData.height * materialData.density * massScale;
            body = this._world.addBody(new cp.Body(mass, cp.momentForBox(mass, shapeData.width, shapeData.height)));
        }

        shape = this._world.addShape(new cp.BoxShape(body, shapeData.width, shapeData.height));
        view.g.clear().lineStyle(1, "#f00").beginPath().drawRect(0, 0, shapeData.width, shapeData.height).endFill();

        view.g.pivotX = shapeData.width * .5;
        view.g.pivotY = shapeData.height * .5;

        this._setShape(shape, materialData);
        this._setBody(body, transform);
        this._bindView(view, body);

        return body;
    },
    createCircle:function(view, transform, materialData, shapeData){
        var body;
        if(view.isStatic){
            body._createStaticBody();
        }
        else{
            var mass = Math.PI * shapeData.radius * shapeData.radius * materialData.density * massScale;
            body = this._world.addBody(new cp.Body(mass, cp.momentForCircle(mass, 0, shapeData.radius, v(0, 0))));
        }

        shape = this._world.addShape(new cp.CircleShape(body, shapeData.radius, v(0, 0)));
        view.g.clear().lineStyle(1, "#f00").beginPath().drawCircle(0, 0, shapeData.radius).endFill();

        view.g.pivotX = shapeData.radius;
        view.g.pivotY = shapeData.radius;
        view.bmp.x = -shapeData.offsetX;
        view.bmp.y = -shapeData.offsetY;

        this._setShape(shape, materialData);
        this._setBody(body, transform);
        this._bindView(view, body);

        return body;
    },
    _bindView:function(view, body){
        view.body = body;
        body.view = view;

        view.physics = true;
        view.onUpdate = function(dt, force){
            var that = this;
            if(this.physics || force){
                this.x = this.body.p.x + this.pivotX - this.width *.5;
                this.y = this.body.p.y + this.pivotY - this.height *.5;
                this.rotation = this.body.a * RAD2DEG;
            }
        }

        view.onUpdate();
    },
    _createStaticBody:function(){
        var body = new cp.Body(Infinity, Infinity);
        // body.nodeIdleTime = Infinity;
        return body;
    },
    _setShape:function(shape, materialData){
        shape.setElasticity(materialData.restitution);
        shape.setFriction(materialData.friction);
        shape.setCollisionType(1);
    },
    _setBody:function(body, transform){
        body.a = transform.angle * DEG2RAD;
        body.setPos(v(transform.x, transform.y));
    }
};