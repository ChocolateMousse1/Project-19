var path,girl,sweets,Barrier;
var pathImg,girlImg,sweetsImg,BarrierImg;
var sweetsCollection = 0;
var sweetsG,BarrierGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.jpg");
  girlImg = loadAnimation("Runner-1.png","Runner-2.png");
  sweetsImg = loadImage("sweets.png");
  BarrierImg = loadImage("Barrier.jpg");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
//create a canvas

// createCanvas(window,window);
createCanvas(windowWidth,windowHeight);
// createCanvas(width,height);
// createCanvas(200,200);

// Moving background

path=createSprite(width/2,200);
path.scale = 8.9;
path.addImage(pathImg);
path.velocityY = 4;


//creating girl running
girl = createSprite(width/2,height-20,20,20);
girl.addAnimation("runner",girlImg);
girl.scale=0.09;
  
  
sweetsG=new Group();
BarrierGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  girl.x = World.mouseX;
  
  edges= createEdgeSprites();
  girl.collide(edges);

  if(path.y > height ){
     path.y = height/2;
   }
  
    createSweets();
    createBarrier();
    
      if(BarrierGroup.isTouching(girl)) {
        gameState=END;
        
        girl.addAnimation("runner",endImg);
        girl.x=width/2;
        girl.y=height/2;
        girl.scale=0.9;
        
        sweetsG.destroyEach();
        BarrierGroup.destroyEach();
        
        sweetsG.setVelocityYEach(0);
        BarrierGroup.setVelocityYEach(0);
     
    }
  
  
  drawSprites();
  textSize(20);
  fill(255);
  text("sweets: "+ sweetsCollection,width-150,30);
  }

}

function createSweets() {
  if (World.frameCount % 200 == 0) {
  var sweets = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sweets.addImage(sweetsImg);
  sweets.scale=0.12;
  sweets.velocityY = 5;
  sweets.lifetime = 200;
  sweetsG.add(sweets);
  }
}

function createBarrier(){
  if (World.frameCount % 530 == 0) {
  var Barrier = createSprite(Math.round(random(50, width-50),40, 10, 10));
  Barrier.addImage(BarrierImg);
  Barrier.scale=0.1;
  Barrier.velocityY = 4;
  Barrier.lifetime = 200;
  BarrierGroup.add(Barrier);
  }
}