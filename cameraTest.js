let engin = new dobEngin;
engin.start();
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
    if (event.key = "w") {engin.objects[0].props.y += 1}
   else if (event.key = "a") {engin.objects[0].props.x -= 1}
   else if (event.key = "s") {engin.objects[0].props.y -= 1}
   else if (event.key = "d") {engin.objects[0].props.x += 1}
})
engin.setCameraCoords(engin.objects[0])
engin.gameLoop  = () => {
    engin.drw.fillText(Math.random()*10,0+100,10+100,1000)
    if (engin.fps % 60)engin.drw.fillText(`FPS: ~${engin.fps}`, 10+100, 20+100);
    engin.setCameraCoords(engin.objects[0].props.x,engin.objects[0].props.y)
engin.renderCamera(engin.objects[0]);
}
engin.startGameLoop()