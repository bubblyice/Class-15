var cloud, cloudImage
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cactus1, obstacle1;
var cactus2, obstacle;
var cactus3, obstacle;
var cactus4, obstacle;
var cactus5, obstacle;
var cactus6, obstacle;
var score = 0;
var play = 1;
var end = 0;
var gamestate = play;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudImage = loadImage("cloud.png");
  groundImage = loadImage("ground2.png")
  cactus1 = loadImage("obstacle1.png")
  cactus2 = loadImage("obstacle2.png")
  cactus3 = loadImage("obstacle3.png")
  cactus4 = loadImage("obstacle4.png")
  cactus5 = loadImage("obstacle5.png")
  cactus6 = loadImage("obstacle6.png")
}

function setup() {
createCanvas(600, 200);

//create a trex sprite
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.scale = 0.5;
  
//create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -4;
  
invisibleGround = createSprite(200,190,400,20);
invisibleGround.visible = false;
}

function draw() {
background("black");
text("SCORE: " + score, 500, 20);

//jump when the space button is pressed

if (gamestate === play) {
  ground.velocityX = -2;
  score = score + Math.round(frameCount / 60);

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (keyDown("space") && trex.y>= 100) {
  trex.velocityY = -10;
  }

  trex.velocityY = trex.velocityY + 0.8

  spawnCloud();
  spawnObstacles();
  


}

else if (gamestate === end) {
  ground.velocityX = 0

}

trex.collide(invisibleGround);
  drawSprites();

}

function spawnCloud() {
  if (frameCount % 80 === 0) {
    cloud = createSprite(600, 100, 40, 10)
    cloud.addImage(cloudImage);
    cloud.y = Math.round(random(10,50));
    cloud.velocityX = -2
    cloud.scale = 0.1
    
    cloud.lifetime = 300

    cloud.depth = trex.depth;
    trex.depth += 1;
}
}
 function spawnObstacles() {
  if (frameCount % 80 === 0) {
    obstacle = createSprite(600,170,10,40)
    obstacle.velocityX = -5

    var r = Math.round(random(1,6));
    switch(r) {
      case 1:obstacle.addImage(cactus1);
      break;

      case 2:obstacle.addImage(cactus2);
      break;

      case 3:obstacle.addImage(cactus3);
      break;

      case 4:obstacle.addImage(cactus4);
      break;

      case 5:obstacle.addImage(cactus5);
      break;

      case 6:obstacle.addImage(cactus6);
      break;
      default: break
    }
  obstacle.scale = 0.05
  obstacle.lifetime = 300

  obstacle.depth = trex.depth
  trex.depth += 1
  }
 }
