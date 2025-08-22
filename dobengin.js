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
        this.camera = {
            "x":this.width/2,
            "y":this.height/2,
            "height":this.height,
            "width":this.width,
            "follow":"nothing"
        }
        this.animations = {}
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
        this.assetsForUse[obj.src.match(/\w+.png|\w+.gif/ig)] = obj;
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
                        return engine.assetsForUse[spr]
                            } else{
                             return spr }
                }  
                this.getAnimByName=(anim)=>{
this.props.animations[anim] = engine.animations[anim] || null
                }
                    this.propsDef = {
                        "name":properties[0],
                        "x":properties[1],
                        "y":properties[2],
                        "spriteImage":this.getSprite(properties[3]),
                        "width":properties[4]||100,
                        "height":properties[5]||100,
                        "animations":{}
                }
                this.curAnim = {
                    animName:"",
                    curFrame:0,
                    state:"nothing",
                    speed:5,
                    cycle:0
                }
                this.pause=()=>clearInterval(this.animInterval);this.curAnim.state = "paused";
                this.stop=()=>{
                    clearInterval(this.animInterval);
                    this.curAnim.curFrame = 0;
                    this.curAnim.state = "stopped";
                }
                this.resume=()=>this.play(this.curAnim.animName,this.curAnim.speed,this.curAnim.curFrame,this.curAnim.cycle);
                this.play = (anim,speed=5,start=0,cycle = true) =>{
    this.pause();
    const animation = this.props.animations[anim];
    this.props.spriteImage = animation.animArr[0];
    this.curAnim.speed = speed;
    this.curAnim.animName = anim;
    this.curAnim.cycle = cycle;
    this.curAnim.state = "running";
    if(start > animation.animArr.length-1) start = animation.animArr.length-2;
    this.curAnim.curFrame = start || 0;
    let frameSpeed = 1000/speed;
        this.animInterval = setInterval(()=>{
            this.props.spriteImage = animation.animArr[this.curAnim.curFrame];
             if(this.curAnim.curFrame == animation.animArr.length-1 && cycle == false) {
                clearInterval(this.animInterval);
            }
            console.log(this.curAnim.curFrame);
if(this.curAnim.curFrame == animation.animArr.length-1 && cycle == true) this.curAnim.curFrame = 0; else this.curAnim.curFrame++
        },frameSpeed);
}
                this.objectType = this.propsDef.name;
                this.isCreated = true;
                this.props = {
                    "name":properties[0],
                    "x":properties[1],
                    "y":properties[2],
                    "spriteImage":this.getSprite(properties[3]),
                    "width":properties[4]||100,
                    "height":properties[5]||100,
                    "animations":{}
                }
                this.type="sprite";
                this.dUid = 0;
                this.setProps = (properties) =>{
                    for (let i=0;i<this.props.length;i++){
                        if (properties[i] !== undefined) {  
                            this.props[Object.keys(this.props)[i]] = properties[i];  
                }
            }
        }
            }
        }
        this.text = class text {
            constructor (properties,engine){    
                    this.propsDef = {
                        "name":properties[0]||"def_text",
                        "x":properties[1]||0,
                        "y":properties[2]||0,
                        "text":properties[3]||"default text"
                    }
                this.isCreated = true;    
            this.objectType = this.propsDef.name;
                this.props = {
                "name":properties[0]||"def_text",
                "x":properties[1]||0,
                "y":properties[2]||0,
                "text":properties[3]||"default text"
            } 
            this.type = "text";
            this.dUid = 0;
            this.setProps = (properties) =>{
                        for (let i=0;i<this.props.length;i++){
                            if (properties[i] !== undefined) {  
                                this.props[Object.keys(this.props)[i]] = properties[i];  
                    }
                }
            }
            this.typeInterval = 0;
            this.typewriter = (text="",length=0) =>{
                let oneSymTime = length/text.length;
                let curSymbol = 0;
                this.props.text = "";
                text = text.toString();
                if(length = 0) {this.props.text = text;return;}
                if(text.length <= 0) {this.props.text = "";return;}
                if(this.typeInterval){clearInterval(this.typeInterval)}
                this.typeInterval = setInterval(()=>{
                    this.props.text += text[curSymbol]
                    if(curSymbol==text.length-1) clearInterval(this.typeInterval); 
                    curSymbol++
                },oneSymTime*1000)}
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
            let typeDefProps = this.objectsTypes[type].props;
            let objectType = this.objectsTypes[type].objectType;
            if (this.objectsTypes[type] != undefined) {
                
                newObj = new this.objectsTypes[type].constructor(properties,this)
                newObj.dUid = this.dUid();
                newObj.propsDef = typeDefProps;
                newObj.objectType = objectType;
                if(newObj.type == "sprite") newObj.props.animations = typeDefProps.animations;

                this.objects.push(newObj);
                console.log(`created object.type ${type}.duid on data: ${newObj.dUid}`);
            }
          /*   this.objects[id].dUid = this.dUid(); */
        }
        this.destroyObject = (dUid) => {
            let found = false;
            this.objects.forEach(el=>{
                if (el.dUid == dUid){
                    delete this.objects[this.objects.indexOf(el)];
                    found = true;
                }
            })
            let newObjects = [];
            this.objects.forEach(el=>{
                if(typeof(el)!="undefined") newObjects.push(el);
            });
            this.objects = newObjects;
            return found == 0 ? false : true;
        }
        this.downloadString = (string,mime,name) => {
            const a = document.createElement("a");
            a.href = "data:" + (mime||"text/plain") + "," + string;
            a.setAttribute("download",name||"");
            a.click();
            return a.href;
        }
        this.setCameraCoords = (x,y) =>{
            if(typeof(x) == "number" &&typeof(y) == "number"){
                this.camera.x = x;
                this.camera.y = y;
        }
    }
    this.renderCamera = (objectFollow) => {
        this.setCameraCoords(objectFollow.props.x,objectFollow.props.y)
        this.objects.forEach(el=>{
            if (el.props.x + el.props.width > this.camera.x && 
                el.props.x < this.camera.x + this.camera.width &&  
                el.props.y + el.props.height > this.camera.y && 
                el.props.y < this.camera.y + this.camera.height){
               if(el.type=="sprite"){
                if(el.dUid == objectFollow.dUid){
                    this.drw.drawImage(el.props.spriteImage,this.camera.width/2,this.camera.height/2,el.props.width,el.props.height);
                }else{
                    this.drw.drawImage(el.props.spriteImage,el.props.x-engin.camera.x,el.props.y-engin.camera.y,el.props.width,el.props.height); 
                }
           }else if(el.type =="text"){
              this.drw.fillText(el.props.text,el.props.x-engin.camera.x,el.props.y-engin.camera.y)
           }
            }
         })
    }
    this.addAnim=(arr=[],name=Math.round((Math.random()*10)*100)/100,isGif = false)=>{
        if(!this.isArr(arr)) return "not array. Error: STPD ERROR 197";
        arr = arr.reverse();
        if(arr.length == 0) return new Error("arr is empty. stopped. STPD ERROR 200")
            for (let i = 0; i < arr.length; i++) {
                if (!this.assetsForUse[arr[i]]) continue;
                arr[i] = this.assetsForUse[arr[i]];
            }
            this.animations[name] = {"animArr":arr,'isGif':isGif}
    }
this.isArr=arr=>{try{arr.reverse();return true;}catch(e){return false}};
    this.stop=()=>{clearInterval(this.updateInterval);this.isStarted = false;};
    this.resume=()=>{if(!this.isStarted)this.startGameLoop()};
    this.setFps=(fps)=>{this.stop();this.fps = fps;this.resume()};
        }
    }