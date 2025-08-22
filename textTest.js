let engin = new dobEngin;
engin.start();
engin.assets = ["./assets/player.png","./assets/player2.png","./assets/player3.png","./assets/player0.png"];
engin.placeAssetsImgs();
engin.addAnim(["player.png","player2.png","player3.png"],"test",false)
engin.createObjectType("text","text1","text1",610,470,"the sad yexy");
engin.createObjectType("sprite","player","player",1,1,"player0.png");
engin.objectsTypes["player"].getAnimByName("test");
engin.spawnObject("text1","text3",540/2,480/2,"the sad yes")
engin.spawnObject("player","sad",320,180,"player0.png");
engin.camera.follow = "sad";
addEventListener("keydown",(event)=>{
    if (event.key = "w") {engin.objects[0].props.y += 1}
   else if (event.key = "a") {engin.objects[0].props.x -= 1}
   else if (event.key = "s") {engin.objects[0].props.y -= 1}
   else if (event.key = "d") {engin.objects[0].props.x += 1}
})
engin.setCameraCoords(engin.objects[0])
engin.gameLoop  = () => {
    engin.drw.fillText(Math.random()*10,0,10,1000)
    engin.drw.fillText(`FPS: ~${engin.fps}`, 10, 20);
 engin.objects.forEach(el=>{
    if(el.type=="sprite"){
        engin.drw.drawImage(el.props.spriteImage,el.props.x,el.props.y,100,100);
 }else if(el.type =="text"){
    engin.drw.fillText(el.props.text,el.props.x,el.props.y)
 }
}) 
}
engin.startGameLoop()