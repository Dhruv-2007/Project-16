var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground;
var survivalTime = 0;
var gamestate = 1;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {

  createCanvas(400, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  Foodgroup = new Group();
  Obstaclegroup = new Group();
}

function draw() {

  background("white");

  if (gamestate == 1) {

    stroke("black");
    textSize(15);
    fill("black");
    survivalTime = survivalTime + (Math.round(getFrameRate() / 60));
    text("Survival Time: " + survivalTime, 20, 50);

    text("Bananas Collected: " + score, 230, 50);

    spawnFood();

    spawnObstacle();


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y >= 310) {
      monkey.velocityY = -17;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(ground);

    drawSprites();

    if (Foodgroup.isTouching(monkey)) {
      Foodgroup.destroyEach();
      score = score + 1;
    }

    if (Obstaclegroup.isTouching(monkey) && gamestate == 1) {
      gamestate = 2;
    }
  }

  if (gamestate == 2) {
    
    obstacle.lifetime = -1;
    
    EndScreen();
    if (keyDown("r")) {
      Reset();
    }
  }
}

function spawnFood() {
  if (frameCount % 110 === 0) {
    banana = createSprite(430, 200, 20, 20);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;

    banana.lifetime = 150;

    Foodgroup.add(banana);
  }
}

function spawnObstacle() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(430, 350, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;

    obstacle.lifetime = 150;

    Obstaclegroup.add(obstacle);
  }
}

function EndScreen() {
  background("red");
  ground.velocityX = 0;
  banana.velocityX = 0;
  obstacle.velocityX = 0;
  monkey.y = 315;

  stroke("black");
  fill("black");
  textSize("50");
  text("You lose ! Press 'R' to restart", 125, 200);
}

function Reset() {
  gamestate = 1;
  obstacle.destroy();
  banana.destroy();
  ground.velocityX = -4;
  score = 0;
  survivalTime = 0;

}