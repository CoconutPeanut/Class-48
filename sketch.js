var bg
var gameState = "start"
var bird
var obstacles
var restart
var gameOver
var score = 0
var count = 100






function preload(){
 
  bgImage = loadImage("flappy bird-background.webp")
  birdImage = loadImage("flappy bird-character.png");
  obstaclesImage1 = loadImage("Flappy Bird-bar 1.png");
  obstaclesImage2 = loadImage("Flappy Bird-bar 2.png");
  obstaclesImage3 = loadImage("Flappy Bird-bar 3.png");
  obstaclesImage4 = loadImage("Flappy Bird-bar 4.png");
  restartImage = loadImage("flappy bird-restart button.png");
  gameOverImage = loadImage("flappy bird-game over.png");
  
}

function setup() {

  createCanvas(510,600);

  bg = createSprite(300, 300);
  bg.addImage(bgImage); 

  bird = createSprite(250, 300);
  bird.addImage(birdImage);
  bird.scale = 0.2;
  //bird.debug = true;
  bird.setCollider("circle", 0, 0,  100);

  Obstacles = new Group()

  edge = createEdgeSprites();

  restart = createSprite(255, 300);
  restart.addImage(restartImage);
  restart.scale = 0.4;
  restart.visible = false;



}

function draw() {
  
  background(180);
    bird.collide(edge[3]);
    bird.collide(edge[2]);

     // bird.velocityY += 0.3;

     if(gameState == "play") {
      bg.velocityX = -2
      if(bg.x < 0) {
          bg.x = 200
      }
      bird.velocityY += 0.3;
      if(keyDown("space")) {
        bird.velocityY = -5  
      }
      //count-=0.5;
      restart.visible = false;
      score = Math.round(frameCount / 20);

      spawnObstacles()

      if(bird.isTouching(Obstacles) || bird.y > 600) {

        //gameState = "end"; 
        bird.velocityY = -5;

      }
  } 

  else if(gameState =="end") {
    bird.velocityY += 0.5;
    bg.velocityX = 0;
   // bird.velocityY = 0;
    Obstacles.setVelocityXEach(0);
    restart.visible = true;
    if(mousePressedOver(restart)) {
      gameState = "play";
      bird.x = 255;
      bird.y = 300;
      Obstacles.destroyEach();

      
    }

 }
  
  
  drawSprites();

  textSize(25);
  fill("red");
  text("score :"+score, 50, 100)

  if(gameState == "start") {

    fill("white");
    textSize(30);
    text("Press space bar to start", 50, 50)

    if(keyDown("space")) {
        gameState = "play";
    }
  }  
}

function spawnObstacles() {

  if(frameCount%100 == 0) {
      console.log(frameCount);
    var rand = Math.round(random(1,2))

    if(rand === 1) {
      obstacles2 = createSprite(510, 535)
      obstacles2.addImage(obstaclesImage3);
      obstacles2.velocityX = -(2+score/30);
      //obstacles2.debug = true;
      obstacles2.scale = 1.5;

      obstacles1 = createSprite(510, 120)
      obstacles1.addImage(obstaclesImage1);
      obstacles1.velocityX = -(2+score/30);
      //obstacles1.debug = true;
      obstacles1.scale = 1.5;
    }

    else if(rand === 2) {
      obstacles2 = createSprite(510, 475)
      obstacles2.addImage(obstaclesImage2);
      obstacles2.velocityX = -(2+score/30);
      //obstacles2.debug = true;
      obstacles2.scale = 1.5;

      obstacles1 = createSprite(510, 65)
      obstacles1.addImage(obstaclesImage4);
      obstacles1.velocityX = -(2+score/30);
      //obstacles1.debug = true;
      obstacles1.scale = 1.5;
      
    }
    
    Obstacles.add(obstacles1);
    Obstacles.add(obstacles2);

    

  }
}




 




