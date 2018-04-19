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

        {id:"Level1-1.json", src:"res/Level1-1.json"},
        {id:"Level1-2.json", src:"res/Level1-2.json"},
        {id:"Level1-3.json", src:"res/Level1-3.json"},
        {id:"Level1-4.json", src:"res/Level1-4.json"},
        {id:"Level1-5.json", src:"res/Level1-5.json"},
        {id:"Level1-6.json", src:"res/Level1-6.json"},
        {id:"Level1-7.json", src:"res/Level1-7.json"},
        {id:"Level1-8.json", src:"res/Level1-8.json"},
        {id:"Level1-9.json", src:"res/Level1-9.json"},
        {id:"Level1-10.json", src:"res/Level1-10.json"},
        {id:"Level2-1.json", src:"res/Level2-1.json"},
        {id:"Level2-2.json", src:"res/Level2-2.json"},
        {id:"Level2-3.json", src:"res/Level2-3.json"},
        {id:"Level2-4.json", src:"res/Level2-4.json"},
        {id:"Level2-5.json", src:"res/Level2-5.json"},
        {id:"Level2-6.json", src:"res/Level2-6.json"},
        {id:"Level2-7.json", src:"res/Level2-7.json"},
        {id:"Level2-8.json", src:"res/Level2-8.json"},
        {id:"Level2-9.json", src:"res/Level2-9.json"},
        {id:"Level2-10.json", src:"res/Level2-10.json"},
        {id:"Level3-1.json", src:"res/Level3-1.json"},
        {id:"Level3-2.json", src:"res/Level3-2.json"},
        {id:"Level3-3.json", src:"res/Level3-3.json"},
        {id:"Level3-4.json", src:"res/Level3-4.json"},
        {id:"Level3-5.json", src:"res/Level3-5.json"},
        {id:"Level3-6.json", src:"res/Level3-6.json"},
        {id:"Level3-7.json", src:"res/Level3-7.json"},
        {id:"Level3-8.json", src:"res/Level3-8.json"},
        {id:"Level3-9.json", src:"res/Level3-9.json"},
        {id:"Level3-10.json", src:"res/Level3-10.json"},

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

    var resDict = {};
    var jsonData = {};
    var Resource = window.Resource = Hilo.Class.mix({
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