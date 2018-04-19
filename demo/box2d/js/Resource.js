(function(){
    var res = [
        {id:"INGAME_BIRDS.png", src:"res/INGAME_BIRDS.png"},
        {id:"INGAME_BIRDS", src:"res/INGAME_BIRDS.json"},

        {id:"INGAME_PIGS.png", src:"res/INGAME_PIGS.png"},
        {id:"INGAME_PIGS", src:"res/INGAME_PIGS.json"},

        {id:"INGAME_BLOCKS_BASIC.png", src:"res/INGAME_BLOCKS_BASIC.png"},
        {id:"INGAME_BLOCKS_BASIC", src:"res/INGAME_BLOCKS_BASIC.json"},

        {id:"INGAME_BLOCKS_MISC.png", src:"res/INGAME_BLOCKS_MISC.png"},
        {id:"INGAME_BLOCKS_MISC", src:"res/INGAME_BLOCKS_MISC.json"},

        {id:"INGAME_TEXTURES_GROUND.png", src:"res/INGAME_TEXTURES_GROUND.png"},
        {id:"INGAME_TEXTURES_GROUND", src:"res/INGAME_TEXTURES_GROUND.json"},

        {id:"INGAME_STATIC_BLOCKS.png", src:"res/INGAME_STATIC_BLOCKS.png"},
        {id:"INGAME_STATIC_BLOCKS", src:"res/INGAME_STATIC_BLOCKS.json"},

        {id:"Shapes.json", src:"res/Shapes.json"},
        {id:"Objects.json", src:"res/Objects.json"},
        {id:"Materials.json", src:"res/Materials.json"},

        {id:"SLINGSHOT_01_BACK", src:"res/SLINGSHOT_01_BACK.png"},
        {id:"SLINGSHOT_01_FRONT", src:"res/SLINGSHOT_01_FRONT.png"},
        {id:"CLASSIC_BLUE_GRASS_LAYER_0", src:"res/CLASSIC_BLUE_GRASS_LAYER_0.png"},
        {id:"CLASSIC_BLUE_GRASS_LAYER_1", src:"res/CLASSIC_BLUE_GRASS_LAYER_1.png"},
        {id:"CLASSIC_BLUE_GRASS_LAYER_2", src:"res/CLASSIC_BLUE_GRASS_LAYER_2.png"},
        {id:"CLASSIC_BLUE_GRASS_LAYER_3", src:"res/CLASSIC_BLUE_GRASS_LAYER_3.png"},
        {id:"CLASSIC_BLUE_GRASS_LAYER_4", src:"res/CLASSIC_BLUE_GRASS_LAYER_4.png"}
    ];

    var levels = ["1.1-21", "2.1-21", "3.1-21", "4.1-21", "5.1-1", "6.1-1", "7.1-1", "8.1-1", "9.1-1", "10.1-1", "11.1-1", "12.1-1", "13.1-1", "14.1-1"];
    var levelNames = [];
    levels.forEach(function(area){
        var arr = area.split(".");
        var le = arr[1].split("-");
        for(var i = parseInt(le[0]);i <= parseInt(le[1]);i ++){
            var levelName = arr[0] + "-" + i;
            var id = "Level" + levelName + ".json";
            res.push({id:id, src:"res/levels/" + id});
            levelNames.push(levelName);
        }
    });

    var resDict = {};
    var jsonData = {};
    var Resource = window.Resource = Hilo.Class.mix({
        getRandomLevel:function(){
            var i = Math.floor(Math.random()*this.levelNames.length);
            return this.levelNames[i];
        },
        levelNames:levelNames,
        load:function(){
            var that = this;
            var queue = this._queue = new Hilo.LoadQueue();
            queue.add(res);

            queue.on("load", function(e){
                that.fire("load", {
                    num:queue._loaded/queue._source.length
                });
            });

            queue.on("complete", function(){
                res.forEach(function(d){
                    var content = queue.getContent(d.id);
                    if(content.image){
                        for(var prop in content){
                            var d = content[prop];
                            if(d.id){
                                jsonData[d.id] = d;
                                d.image = content.image;
                            }
                        }
                    }
                    else if(content.world){

                    }

                    resDict[d.id] = content;
                });
                that.fire("complete");
            });

            queue.start();

        },
        get:function(id){
            return resDict[id];
        },
        getBmp:function(id){
            var d = jsonData[id];
            var container = new Hilo.Container({});
            var g = new Hilo.Graphics();
            var bmp = new Hilo.Bitmap({
                image:this.get(d.image),
                rect:[d.x, d.y, d.width, d.height],
                pivotX:d.width*.5,
                pivotY:d.height*.5
            });

            container.addChild(bmp);
            // container.addChild(g);
            container.g = g;
            container.bmp = bmp;
            return container;
        }
    }, Hilo.EventMixin);
})();