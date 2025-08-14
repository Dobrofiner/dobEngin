let engin = new dobEngin;
engin.start();
engin.assets = ["./assets/player.png"];
engin.placeAssetsImgs();
engin.createObjectType("sprite","player","player",1,1,"player.png");
engin.createObjectType("text","text1","text1",100,100,"the sad yexy");
engin.spawnObject("player","sad",100,10,"player.png");
engin.spawnObject("text1","text1",1,100,"the sad ye")
engin.spawnObject("text1","text1",1,100,"the sad yes")

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
engin.startGameLoop();