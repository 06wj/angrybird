var DEG2RAD = Math.PI/180;
var RAD2DEG = 180/Math.PI;
var velocityIterations = 10;//迭代数
var positionIterations  = 20;//迭代数
var timeStep = 1/60;//每秒30个时间步
var SCALE = 1/30;
var deleteArr = [];
var v = function(x, y){
    return new b2Vec2(x, y);
};

var world = {
    createWorld:function(){
        if(!this._world){
            var g = new b2Vec2(0, 9.8);//设置重力
            this._world = new b2World(g, true);
        }
        return this._world;
    },
    isSleeping:function(body){
        // return body.GetLinearVelocity().Length() < 0
        return body.IsAwake();
    },
    updateWorld:function(dt){
        var that = this;
        this._world.Step(timeStep, velocityIterations, positionIterations);
        this._world.ClearForces();//清除所有的力
        deleteArr.forEach(function(body){
            that._world.DestroyBody(body);
            var view = body.view;
            if(view){
                if(view.parent){
                    view.parent.removeChild(view);
                }
                view.body.view = null;
                view.body = null;
                view = null;
            }
        })
    },
    deleteBody:function(body){
        if(!body.__isDel){
            body.__isDel = true;
            deleteArr.push(body);
        }
    },
    createRect:function(view, transform, materialData, shapeData){
        var bodyType = view.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
        var density = materialData.density;
        var friction = materialData.friction;
        var restitution = materialData.restitution;

        var bodyDef = new b2BodyDef();//声明位置
        bodyDef.angle = transform.angle * DEG2RAD;
        bodyDef.position.Set(transform.x * SCALE, (transform.y) * SCALE);//设置位置向量
        bodyDef.type = bodyType;//是否是动态物体

        var shape = new b2PolygonShape();//声明形状
        shape.SetAsBox(shapeData.width * SCALE * .5, shapeData.height * SCALE * .5);//设置形状，长宽

        var fixtureDef = new b2FixtureDef();//声明材质
        fixtureDef.shape = shape;//设置材质形状
        fixtureDef.density = density;//密度
        fixtureDef.friction = friction;//摩擦力
        fixtureDef.restitution = restitution;//弹力

        var body = this._world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);

        this._bindView(view, body);

        view.g.clear().lineStyle(1, "#f00").beginPath().drawRect(0, 0, shapeData.width, shapeData.height).endFill();

        view.g.pivotX = shapeData.width * .5;
        view.g.pivotY = shapeData.height * .5;
        return body;
    },
    createPolygon:function(view, transform, materialData, shapeData){
        var that = this;
        var bodyType = view.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
        var density = materialData.density;
        var friction = materialData.friction;
        var restitution = materialData.restitution;

        var bodyDef = new b2BodyDef();
        bodyDef.position.Set(transform.x * SCALE, transform.y * SCALE);
        bodyDef.type = bodyType;

        var shape = new b2PolygonShape();//声明形状
        var vertices = shapeData.vertices.map(function(v){
            return new b2Vec2(v[0]*SCALE, v[1]*SCALE)
        })
        shape.SetAsArray(vertices, vertices.length);

        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = shape;
        fixtureDef.density = density;
        fixtureDef.friction = friction;
        fixtureDef.restitution = restitution;

        var body = this._world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        this._bindView(view, body);

        view.g.clear().lineStyle(1, "#f00").beginPath();
        shapeData.vertices.forEach(function(v, i){
            if(i == 0){
                view.g.moveTo(v[0], v[1]);
            }
            else{
                view.g.lineTo(v[0], v[1]);
            }
        });
        view.g.closePath().endFill();
        return body;
    },
    createCircle:function(view, transform, materialData, shapeData){
        var that = this;
        var bodyType = view.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
        var density = materialData.density;
        var friction = materialData.friction;
        var restitution = materialData.restitution;

        var bodyDef = new b2BodyDef();
        bodyDef.position.Set(transform.x * SCALE, transform.y * SCALE);
        bodyDef.type = bodyType;

        var shape = new b2CircleShape(shapeData.radius / 30);//设置为圆型

        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = shape;
        fixtureDef.density = density;
        fixtureDef.friction = friction;
        fixtureDef.restitution = restitution;

        if(view.id.indexOf("BIRD") > -1){
            view.setBody = function(x, y){
                bodyDef.bullet = true;
                bodyDef.position.Set(x * SCALE, y * SCALE);
                var body = that._world.CreateBody(bodyDef);
                body.CreateFixture(fixtureDef);
                body.bullet = true;
                that._bindView(view, body);
            }
        }
        else{
            var body = this._world.CreateBody(bodyDef);
            body.CreateFixture(fixtureDef);
            this._bindView(view, body);
        }
        view.g.clear().lineStyle(1, "#f00").beginPath().drawCircle(0, 0, shapeData.radius).endFill();
        view.g.pivotX = shapeData.radius;
        view.g.pivotY = shapeData.radius;
        view.bmp.x = -shapeData.offsetX;
        view.bmp.y = -shapeData.offsetY;

        return body;
    },
    _bindView:function(view, body){
        view.body = body;
        body.view = view;

        view.bmp.alpha = 1;

        view.onUpdate = function(dt, force){
            var ang = this.body.GetAngle()*RAD2DEG;
            var pos = this.body.GetPosition();

            this.x = pos.x/SCALE + this.pivotX - this.width *.5;
            this.y = pos.y/SCALE + this.pivotY - this.height *.5;
            this.rotation = ang;
        }

        view.onUpdate();
    }
};