//creation of game elements
var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  //loading images and animations
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Moving background
  path = createSprite(width / 2, 200);
  path.addImage(pathImg);
  path.velocityY = 4;

  //creating boy running
  boy = createSprite(70, 580, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;

  //game element group
  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
}

function draw() {
  //conditions if game state =play
  if (gameState === PLAY) {
    background(0);
    boy.x = World.mouseX;
    edges = createEdgeSprites();
    boy.collide(edges);

    //code to reset the background
    if (path.y > 400) {
      path.y = height / 2;
    }

    //creating game elements
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    //scoring conditions
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;
    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;
    }
    //obstacle for game end
    else {
      if (swordGroup.isTouching(boy)) {
        gameState = END;

        //creating boy
        boy.addAnimation("SahilRunning", endImg);
        boy.x = 200;
        boy.y = 300;
        boy.scale = 0.6;

        //creating elements
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();

        //setting velocity for elements
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
      }
    }

    drawSprites();
    //text
    textSize(20);
    fill(255);
    text("Treasure: " + treasureCollection, 150, 30);
  }
}

//creating cash
function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(width / 2, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

//creating diamond
function createDiamonds() {
  if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(Math.round(random(width / 2, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

//creating jwellery
function createJwellery() {
  if (World.frameCount % 410 == 0) {
    var jwellery = createSprite(Math.round(random(width / 2, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

//creating sword
function createSword() {
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(width / 2, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}
