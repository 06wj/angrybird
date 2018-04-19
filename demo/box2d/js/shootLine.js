function initShootLine(){
    var shootLine = new Hilo.Graphics();
    shootLine.t = 0;
    shootLine.num = 8;
    shootLine.onUpdate = function(dt){
        this.t += dt;
        if(state === "shooting"){
            if(!this.start){
                this.start = true;
                this.clear();
                this.beginPath();
                this.beginFill("#fff", 1);
                this.num = 15;
            }
            else{
                this. t++;
                if(this.t > Math.random()*50 + 100 && currentBird.x > 60 && this.num){
                    this.t = 0;
                    this.num --;
                    this.moveTo(currentBird.x, currentBird.y)
                    this.drawCircle(currentBird.x, currentBird.y, Math.random() * 3 + 3);
                    this.endFill();
                }
            }
        }
        else{
            this.start = false;
        }
    }
    scene.addChild(shootLine);
}