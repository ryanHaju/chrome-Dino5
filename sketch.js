//line 2-line17 has global or public variable
var PLAY=1;
var END=0;
var gameState=PLAY;
var iground;
var trex ,trex_running;
var trex_collided,trex_running;
var groundImage;
var ground;
var cloud,cloudImage;
var cloudGroup;
var o1,o2,o3,o4,o5,obstacleGroup;
var score;
var gameOverimg,restartImg;
var gameOver,restart;
var jumpSound,dieSound,checkpointSound;
var m="hello ryan";
var sun,sunAnimation;

function preload(){
  trex_running=loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided=loadAnimation("trex_collided.png");
 groundImage=loadImage("ground2.png");
 cloudImage=loadImage("cloud.png");
 o1=loadImage("obstacle1.png");
 o2=loadImage("obstacle2.png");
 o3=loadImage("obstacle3.png");
 o4=loadImage("obstacle4.png");
 o5=loadImage("obstacle5.png");
 restartImg=loadImage("trex_restart.png");
 gameOverimg=loadImage("gameOver.png");
 jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkpoint.mp3");
  sunAnimation = loadImage("sun.png");
}

function setup(){
  //createCanvas(600,200);
  createCanvas(windowWidth,windowHeight);
  //create a trex sprite
  sun= createSprite(width-60,50,10,10);
  sun.addAnimation("sun",sunAnimation);
  sun.scale = 0.15;

 trex=createSprite(50,180,20,50);
 trex.addAnimation("running",trex_running);
 trex.addAnimation("collided",trex_collided);
 trex.scale=0.5;

 //ground=createSprite(200,180,400,20);
 ground=createSprite(width/2,height,width,20);
 ground.addImage("ground",groundImage);
 ground.x=ground.width/2;
 //iground=createSprite(200,190,400,10);
 iground=createSprite(width/2,height-10,width,125);
 iground.visible=false;

 //trex.visible=false;
 gameOver=createSprite(width/2,height/2-50);
 gameOver.addImage(gameOverimg);
 restart=createSprite(width/2,height/2);
 restart.addImage(restartImg);

 // restart.depth=cloudGroup;
 //cloudGroup.depth=cloudGroup.depth+1;
 restart.scale=0.5;
 gameOver.scale=0.5;
 cloudGroup=new Group();
 obstacleGroup=new Group();
 score=0;
 //trex.debug=true;
 trex.setCollider("circle",0,0,30);
 //var m ="hello ryan";// is a local variable 
 console.log(m);
}

function draw(){
  background(255)
 fill("blue");
text("score:" + score,1750,50);




  if(gameState === PLAY){
    gameOver.visible=false;
    restart.visible=false;
score=score+Math.round(getFrameRate()/60);
//ground.velocityX=-(6+3*score/100)
if(score>0 && score%100===0){
  checkpointSound.play();
  ground.velocityX=ground.velocityX-2;
  //ground.velocityX=-(6+3*score/100)
}
  ground.velocityX=-7;
  if(ground.x<0){
    ground.x=ground.width/2;
  }

  if((touches.length>0 || keyDown("SPACE")) && trex.y>=height-120){
  trex.velocityY=-10;
  jumpSound.play();
  touches = [];
  }
  trex.velocityY=trex.velocityY+0.6;
  
  spawnClouds();
spawnObstacle();

if(obstacleGroup.isTouching(trex)){
  gameState=END;
  
}
}
else if(gameState === END){
  dieSound.play();
  gameOver.visible=true;
    restart.visible=true;
  trex.velocityY=0;
  ground.velocityX=0;
  trex.changeAnimation("collided",trex_collided);
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  cloudGroup.setLifetimeEach(-1);
  cloudGroup.setVelocityXEach(0);
  if(mousePressedOver(restart) || keyDown("SPACE") || touches.length>0){
    reset();
    touches=[];
  }
 /* if(keyDown("SPACE")){
    reset();
  }*/
}

trex.collide(iground);
drawSprites();

}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  score=0;
}

function spawnClouds(){
  if(frameCount % 60===0){
    cloud=createSprite(width+20,height-300,40,10);
    cloud.addImage(cloudImage);
    cloud.y=Math.round(random(100,250));
    cloud.velocityX=-3;
    cloud.scale=0.8;
    cloud.lifetime=800;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudGroup.add(cloud);
   }
}

function spawnObstacle(){
  if(frameCount % 60===0){
    var obi = createSprite(1900,height-95,20,30);
    obi.velocityX=-4;
    var r = Math.round(random(1,5));
    switch(r){
      case 1:obi.addImage(o1);
      break;
      case 2:obi.addImage(o2);
      break;
      case 3:obi.addImage(o3);
      break;
      case 4:obi.addImage(o4);
      break;
      case 5:obi.addImage(o5);
      break;
      default:
      break;
    }
    obi.scale=0.5;
    obi.lifetime=800;
    obstacleGroup.add(obi);
  }

}