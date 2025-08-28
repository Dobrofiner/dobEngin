/**
 * dobEngin v0.5.0<br>
 * 
 * License:MIT
 * 
 * By Dobrofiner
 */
class dobEngin {
   
    constructor(usePreCreatedCanvas=false,canvasId='') {
        //creating global vars of engine;
        this.config = {
            canvasColor:"#fff",
            bodyColor:"#000",
            physicalCanvasHeight:'100%',
            physicalCanvasWidth:"100%",
            physGameDivHeight:'95vh',
            physGameDivWidth:'75%',
            bodyJustifyContentType:"center",
            bodyDisplay:"flex"
        };
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
        this.curLevel = {
            width:640,
            height:480
        }
        this.mouse = {
            x:0,
            y:0,
            realX:0,
            realY:0
        }
        this.physicalScaleX=1
        this.physicalScaleY=1
        this.animations = {}
        this.canvas = document.createElement("canvas");

        this.normalizeCoordsWithScale=(x,y)=>{
            x=parseFloat(x);
            y=parseFloat(y)
            return [x*this.physicalScaleX,y*this.physicalScaleY]
        }
        this.mouseToCanvasXY=(mousX,mousY)=>{
            mousX = parseFloat(mousX);
            mousY = parseFloat(mousY);
            return [this.camera.x+mousX,this.camera.y+mousY]
        }
        this.updateScales = () => {
            this.physicalScaleX = this.width / this.canvas.clientWidth;
           this.physicalScaleY = this.height / this.canvas.clientHeight;
   };
        //creatung canvas and setting it to work
        this.start = () => {
            if (!this.isStarted){
                if(document.getElementById(canvasId) == null && usePreCreatedCanvas){
                    canvasId='';throw new Error("Канваса не существует!Создаем свой...")
                }
                if(!usePreCreatedCanvas && (canvasId == null || canvasId.trim()=='')){
            this.canvas = document.createElement("canvas");
            this.canvas.height = this.height;
            this.canvas.width = this.width;
            this.drw = this.canvas.getContext("2d");
            document.body.append(this.gameDiv);
            document.body.style.backgroundColor=this.config.bodyColor
            document.body.style.display=this.config.bodyDisplay
            document.body.style.justifyContent=this.config.bodyJustifyContentType
            this.gameDiv.style.width=this.config.physGameDivWidth
            this.gameDiv.style.height=this.config.physGameDivHeight
            this.gameDiv.appendChild(this.canvas);
                        this.canvas.style.width=this.config.physicalCanvasWidth;
            this.canvas.style.height=this.config.physicalCanvasHeight
            this.canvas.style.backgroundColor=this.config.canvasColor
            this.isStarted = true;}
            else{
                this.canvas = document.getElementById(canvasId);
                this.width = this.canvas.width; 
                this.height = this.canvas.height;
                // this.drw = this.canvas.getContext("2d");
            }
            const rect = this.canvas.getBoundingClientRect()
            this.canvas.addEventListener("mousemove",(event)=>{
                [this.mouse.realX,this.mouse.realY]=[event.clientX-rect.left,event.clientY-rect.top];    
            })
        }
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
            this.updateScales();
            [this.mouse.x,this.mouse.y]=this.mouseToCanvasXY(...this.normalizeCoordsWithScale(this.mouse.realX,this.mouse.realY))    
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
                    if(anim.trim()==""||anim.length==0)throw new Error(`Ничего не введено.`)
                    if(engine.animations[anim]==undefined){
                        throw new Error(`Анимация ${anim} не существует. Анимация не получена`)
                    }
                    else {
                        this.props.animations[anim] = engine.animations[anim] || null
                    }
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
                return newObj;
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
            if(!this.curLevel.isInfinite && 
            (el.props.x + el.props.width< 0 || el.props.x>this.curLevel.width
            || el.props.y+el.props.height < 0 || el.props.y > this.curLevel.height)){}
            else{
                if (el.props.x + el.props.width > this.camera.x && 
                    el.props.x < this.camera.x + this.camera.width &&  
                    el.props.y + el.props.height > this.camera.y && 
                    el.props.y < this.camera.y + this.camera.height){
                   if(el.type=="sprite"){
                    
                    const centerX = (this.camera.width - el.props.width) / 2;
                    const centerY =(this.camera.height - el.props.height) / 2;
                    
                    if(el.props.spriteImage instanceof(Image)){
                    if(el.dUid == objectFollow.dUid){
                        this.drw.drawImage(el.props.spriteImage,centerX,centerY,el.props.width,el.props.height);
                    }else{
                        this.drw.drawImage(el.props.spriteImage,el.props.x-this.camera.x,el.props.y-this.camera.y,el.props.width,el.props.height); 
                    }
                }else{
                    if(el.dUid == objectFollow.dUid){
                        this.drw.fillRect(centerX,centerY,el.props.width,el.props.height);
                    }else{
                        this.drw.fillRect(el.props.x-this.camera.x,el.props.y-this.camera.y,el.props.width,el.props.height); 
                    }
                }
               }else if(el.type =="text"){
                  this.drw.fillText(el.props.text,el.props.x-this.camera.x,el.props.y-this.camera.y)
               }
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
    this.levelLoader = class levelLoader{
        constructor(engine){
this.engine = engine;
        }
        loadLevel(lvl){
let xhr = new XMLHttpRequest;
xhr.open("GET",lvl,true);
xhr.onload=()=>{
    if(xhr.status == 200) {
    this.engine.curLevel = JSON.parse(xhr.responseText);
    this.engine.objects = [];
    this.parseLevel(this.engine.curLevel)}
};
xhr.send()
        }
     getSprite(spr){
            if(typeof(spr) == "string"){
                return this.engine.assetsForUse[spr]
            }else{
                return spr }
        }  
        parseLevel(){
if(this.engine.curLevel.isdobEnginLv == false){throw new Error("Это не уровень dobEngin!");}
Object.assign(this.engine.camera,this.engine.curLevel.camera)
this.engine.nextDuid = 0;
for (const obj in this.engine.curLevel.objects){
    const objN =  this.engine.curLevel.objects[obj];
/*     console.log(objN) */
    this.spawnObj(objN.objectType,objN.props);
}
        }
        spawnObj(type,propsObj){
let arr = new Array(propsObj.length).fill(0);
let obj = this.engine.spawnObject(type,arr);
Object.assign(obj.props,propsObj)
if(obj.type == "sprite" && typeof(obj.props.spriteImage) == "string"){
    obj.props.spriteImage =this.getSprite(obj.props.spriteImage)
        }
if(obj.type == "sprite" && Array.isArray(obj.props.animations)){
    let anims = {}
    obj.props.animations.forEach(el=>{
        anims[el] = obj.getAnimByName(el)
    })
    obj.props.animations = anims;
        }
    }
    }
    this.lvlLoader = new this.levelLoader(this);
}
    }