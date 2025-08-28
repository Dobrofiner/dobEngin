let engin = new dobEngin;
engin.start();
engin.curLevel.isInfinite="true"
engin.assets = ["./assets/player.png"];
engin.placeAssetsImgs();
engin.createObjectType("sprite","player","player",1,1,"player.png");
engin.createObjectType("text","text1","text1",610,470,"the sad yexy");
engin.spawnObject("player","sad",640,480,"player.png");
engin.spawnObject("text1","text1",1,100,"the sad ye")
engin.spawnObject("text1","text1",1,100,"the sad yes")
engin.spawnObject("text1","text3",1000,1000,"the sad yes")
engin.camera.follow = "sad";
addEventListener("keydown",(event)=>{
    let key = event.key
    if (key == "w"||key=="ц" || key =='W' || key=='Ц') {engin.objects[0].props.y -= 1;}
    if (key == "a"||key == "ф"||key == "A"||key == "Ф") {engin.objects[0].props.x -= 1;}
    if (key == "s"||key == "ы"||key == "S"||key == "Ы") {engin.objects[0].props.y += 1;}
    if (key == "d"||key == "в"||key == "D"||key == "В") {engin.objects[0].props.x += 1;}
    else{}
    console.log(key)
})
addEventListener("keypress",(event)=>{
    console.log(event.key)
})
engin.createObjectType("sprite","mouse","mouse",640/2,480/2,100,100)
const mouse = engin.spawnObject("mouse","mouse",640/2,480/2,"player.png",10,10)

engin.setCameraCoords(engin.objects[0])
engin.gameLoop  = () => {
    
    engin.drw.fillText(`Mouse x:${engin.mouse.x}
        Mouse y:${engin.mouse.y}`,100,10)
        mouse.props.x = engin.mouse.x
        mouse.props.y = engin.mouse.y
    engin.drw.fillText(Math.random()*10,0+100,10+100,1000)
    if (engin.fps % 60)engin.drw.fillText(`FPS: ~${engin.fps}`, 10+100, 20+100);
    engin.setCameraCoords(engin.objects[0].props.x,engin.objects[0].props.y)
engin.renderCamera(engin.objects[0]);
}
engin.canvas.addEventListener("click",()=>{
    const [x,y]= [engin.mouse.x,engin.mouse.y]
    engin.spawnObject("player","plr",x,y)
})
engin.startGameLoop()
