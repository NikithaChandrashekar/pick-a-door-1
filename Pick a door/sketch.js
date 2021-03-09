var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running, player_collided;
var ground, invisibleGround, groundImage;
var doorAnimation,door1,door2,door3,closedDoor,openDoor;

var playerLife=3;
var text;
var score=0;
var gameOver, restart;
var button,question;
var playIMG,questionImage;
var obstacle1,obstacle2,obstacle3;
var fireIMG,acidRainIMG,bearIMG;
var life1,life2,life3;
var fullHeart,emptyHeartAnimation;
var tryAgain,tryAgainIMG,retryButton,retryButtonIMG;
var congrats , congratsImage;
var start, startIMG;
var lifeCount=2;
var gameOver,gameOverIMG;
var win , winImg;





localStorage["HighestScore"] = 0;

function preload(){

  player_running =loadImage("images/boy.png");
  closedDoor=loadImage("images/door1.png");
  openDoor=loadImage("images/door4.png");
  doorAnimation=loadAnimation("images/door1.png","images/door2.png","images/door3.png","images/door4.png")
  playIMG=loadImage("images/playButton.png");
  questionImage=loadImage("images/Question.png");
  fireIMG=loadImage("images/fire.png");
  acidRainIMG=loadImage("images/acidRain.png");
  bearIMG=loadImage("images/bear.png");
  fullHeart=loadImage("images/heart.png");
  emptyHeartAnimation=loadAnimation("images/emptyHeart.png");
  tryAgainIMG=loadImage("images/tryAgain.png");
  retryButtonIMG=loadImage("images/retry.png");
  startIMG=loadImage("images/start.png");
  congratsIMG=loadImage("images/youDidIt.png")
  gameOverIMG=loadImage("images/gameOver.jpg")
  winImg=loadImage("images/winMessage.png");
  
}

function setup() {
  createCanvas(windowWidth-10,windowHeight-10);

  ground = createSprite(width/2,height-10,displayWidth-10);
  ground.shapeColor="brown";
  
  player = createSprite(200,670,10,10);
  player.addImage("player",player_running);
  player.scale = 0.3;

  door1= createSprite(200,200);
  door1.addAnimation("closed door",closedDoor);
  door1.addAnimation("opening",doorAnimation);
  door1.addAnimation("opened",openDoor);
  
  door2= createSprite(700,200);
  door2.addAnimation("closed door",closedDoor);
  door2.addAnimation("opening",doorAnimation);
  door2.addAnimation("opened",openDoor);

  door3= createSprite(1100,200);
  door3.addAnimation("closed door",closedDoor);
  door3.addAnimation("opening",doorAnimation);
  door3.addAnimation("opened",openDoor);


  invisibleGround = createSprite(width/2,ground.y,width,20);
  invisibleGround.visible = false;
  door1.visible=false;
  door2.visible=false;
  door3.visible=false;
  player.visible=false;

  button=createSprite(450,40,20,20);
  button.addImage(playIMG);
  button.scale=0.5

  question = createSprite(door2.x,35,20,20);
  question.addImage(questionImage);
  question.visible=false;

  obstacle1=createSprite(door1.x+12,door1.y+35,door1.width,door1.height);
  obstacle1.addImage(fireIMG);
   
  obstacle1.depth=door1.depth;
  obstacle1.depth-=1;
  obstacle1.visible=false;


  obstacle2=createSprite(door2.x+10,door2.y,door2.width,door2.height);
  obstacle2.addImage(acidRainIMG);
  
  obstacle2.depth=door2.depth;
  obstacle2.depth-=1;
  obstacle2.visible=false;

  obstacle3=createSprite(door3.x+12,door3.y,door3.width,door3.height);
  obstacle3.addImage(bearIMG);
 
  obstacle3.depth=door3.depth;
  obstacle3.depth-=1;
  obstacle3.visible=false;

  

  life2=createSprite(1300,50,20,20);
  life2.addImage(fullHeart);
  life2.addAnimation("empty",emptyHeartAnimation);
  life2.scale=0.4;

  life1=createSprite(1200,50,20,20);
  life1.addImage(fullHeart);
  life1.addAnimation("empty",emptyHeartAnimation);
  life1.scale=0.4;

  tryAgain=createSprite(800,300,20,20);
  tryAgain.addImage(tryAgainIMG);
  tryAgain.scale=3;
  tryAgain.visible=false;
  
  retryButton=createSprite(800,450,20,20);
  retryButton.addImage(retryButtonIMG);
  retryButton.scale=0.5;
  retryButton.visible=false;

  start=createSprite(800,400,20,20);
  start.addImage(startIMG);

  congrats=createSprite(800,100,20,20);
  congrats.addImage(congratsIMG);
  congrats.visible=false;

  gameOver=createSprite(755,400,20,20)
  gameOver.addImage(gameOverIMG);
  gameOver.scale=2.6;
  gameOver.visible=false;

  win=createSprite(650,400,20,20);
  win.addImage(winImg);
  win.visible=false;


  

}

function draw() {
  
  background("lightyellow");
  
  
  player.collide(invisibleGround);
  
  if (gameState===PLAY  ){

   if(keyDown("UP_ARROW") ) {
      player.y+=-2;
    }
    if(keyDown("DOWN_ARROW") ) {
      player.y+=2;
    }
    if(keyDown("LEFT_ARROW") ) {
      player.x+=-2;
    }
    if(keyDown("RIGHT_ARROW") ) {
      player.x+=2;
    }

  
  
    if(player.isTouching(door1)){
      door1.changeAnimation("opening",doorAnimation);
      door1.changeAnimation("opened",openDoor);
    }

    if(player.isTouching(door2)){
      door2.changeAnimation("opening",doorAnimation);
      door2.changeAnimation("opened",openDoor);
    }

    if(player.isTouching(door3)){
      door3.changeAnimation("opening",doorAnimation);
      door3.changeAnimation("opened",openDoor);
    }

    if(mousePressedOver(button)){
      player.visible=true;
      door1.visible=true;
      door2.visible=true;
      door3.visible=true;
      button.visible=false;
      question.visible=true;
      obstacle1.visible=true;
      obstacle2.visible=true;
      obstacle3.visible=true;
      start .visible=false ;
      start.scale=0.1;
      start.x=1700;
      start.y=50;
      
    
    }

    if (mousePressedOver(obstacle1)){

      player.visible=false;
      door1.visible=false;
      door2.visible=false;
      door3.visible=false
      question.visible=false;
      obstacle1.visible=false;
      obstacle2.visible=false;
      obstacle3.visible=false;
      gameState=END;
      life1.changeAnimation("empty",emptyHeartAnimation);
      lifeCount=lifeCount-1;

    }

    if (mousePressedOver(obstacle2)){

      player.visible=false;
      door1.visible=false;
      door2.visible=false;
      door3.visible=false
      question.visible=false;
      obstacle1.visible=false;
      obstacle2.visible=false;
      obstacle3.visible=false;
      gameState=END;
      life2.changeAnimation("empty",emptyHeartAnimation);
      lifeCount=lifeCount-1;


    }


    if( mousePressedOver(obstacle3)){


      player.visible=false;
      door1.visible=false;
      door2.visible=false;
      door3.visible=false
      question.visible=false;
      obstacle1.visible=false;
      obstacle2.visible=false;
      obstacle3.visible=false;
      obstacle1.x=1700;
      obstacle1.y=50;
      obstacle2.x=1700;
      obstacle2.y=50;
      obstacle3.x=1700;
      obstacle3.y=50;
      win.visible=true;

      
    }

    if(lifeCount===0){

      player.visible=false;
      door1.visible=false;
      door2.visible=false;
      door3.visible=false
      question.visible=false;
      obstacle1.visible=false;
      obstacle2.visible=false;
      obstacle3.visible=false;
      obstacle1.x=1700;
      obstacle1.y=50;
      obstacle2.x=1700;
      obstacle2.y=50;
      obstacle3.x=1700;
      obstacle3.y=50;
      gameOver.visible=true;

    }
    
     

  }

  else if (gameState === END) {

    tryAgain.visible=true;
    retryButton.visible=true; 
    button.visible=false;
    button.x=1700;
    if(mousePressedOver(retryButton)){

      button.visible=false;
      tryAgain.visible=false;
      player.visible=true;
      door1.visible=true;
      door2.visible=true;
      door3.visible=true;
      question.visible=true;
      obstacle1.visible=true;
      obstacle2.visible=true;
      obstacle3.visible=true;
      player.x=200;
      player.y=670;
      retryButton.visible=false;
      button.x=1700;
      gameState=PLAY;
      
     
    }
    
  }

  drawSprites();
}



