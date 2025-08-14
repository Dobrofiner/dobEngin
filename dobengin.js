class dobEngin {
   
    constructor() {
        //creating global vars of engine;
        this.config = {};
        this.objects = [];
        this.objectsTypes = {};
        this.isStarted = false;
        this.width = 640;
        this.height = 480;
        this.updatesLastSecond = 0;
        this.fps = 60;
        this.assets = [];
        this.assetsForUse = {};
        this.gameDiv = document.createElement("div");
        this.gameDiv.id = "game";
        this.nextDuid = 0;
        //creatung canvas and setting it to work
        this.start = () => {
            if (!this.isStarted){
            this.canvas = document.createElement("canvas");
            this.canvas.height = this.height;
            this.canvas.width = this.width;
            this.drw = this.canvas.getContext("2d");
            document.body.append(this.gameDiv);
            this.gameDiv.appendChild(this.canvas);
            this.isStarted = true;}
        }
        this.placeAssetsImgs = () =>{
    this.assets.forEach(el=>{
        let obj = new Image(10,10);
        obj.src = el;
        obj.style.display = "none";
        this.assetsForUse[obj.src.match(/\w+.png/ig)] = obj;
    })
}
        this.startGameLoop = () => {
        clearInterval(this.updateInterval);
       this.updateInterval = setInterval(() => {
            this.drw.clearRect(0,0,this.width,this.height)
            this.gameLoop();
            this.fps++;
        },1000/this.fps)
        this.fpsCounter = setInterval(()=>{this.fps = 0;},1000)
        }
        this.gameLoop = ()=> {
            //переопределите на свой код
        }
        this.sprite = class sprite {
            constructor(properties,engine) {
                this.getSprite = (spr) => {
                    if(typeof(spr) == "string"){
                        return engin.assetsForUse[spr]
                            } else{
                             return spr }
                }
                this.props = {
                    "name":properties[0],
                    "x":properties[1],
                    "y":properties[2],
                    "spriteImage":this.getSprite(properties[3])
                }
                this.type="sprite";
                this.dUid = 0;
                this.setProps = (properties) =>{
                    for (let i;i<this.props.length;i++){
                        if (newProps[i] !== undefined) {  
                            this.props[Object.keys(this.props)[i]] = properties[i];  
                }
            }
        }
            }
        }
        this.text = class text {
            constructor (properties,engine){
                this.props = {
                "name":properties[0]||"def_text",
                "x":properties[1]||0,
                "y":properties[2]||0,
                "text":properties[3]||"default text"
            }
            this.type = "text";
            this.dUid = 0;
            this.setProps = (properties) =>{
                        for (let i;i<this.props.length;i++){
                            if (newProps[i] !== undefined) {  
                                this.props[Object.keys(this.props)[i]] = properties[i];  
                    }
                }
            }
        }
    }
        this.createObjectType = (type,name,...properties) => {
            if(type == "sprite"){
            this.objectsTypes[name] = new this.sprite(properties,this)
        }else if (type=="text"){
            this.objectsTypes[name] = new this.text(properties,this)
        }
        
        }
        this.dUid = () => {return this.nextDuid++}
        this.spawnObject = (type,...properties) => {
/*             let id;
            let prevousId = this.objects.length-1;
            id=this.objects.length - prevousId - 2; */
            let newObj;
            if (this.objectsTypes[type] != undefined) {
                newObj = new this.objectsTypes[type].constructor(properties,this)
                newObj.dUid = this.dUid();
                this.objects.push(newObj);
                console.log(`created object.type ${type}.duid on data: ${newObj.dUid}`);
            }
          /*   this.objects[id].dUid = this.dUid(); */
        }
        this.destroyObject = () => {}
        this.downloadString = (string,mime,name) => {
            const a = document.createElement("a");
            a.href = "data:" + (mime||"text/plain") + "," + string;
            a.setAttribute("download",name||"");
            a.click();
            return a.href;
        }
    }
}