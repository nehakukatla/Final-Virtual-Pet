var dog,sadDog,happyDog, garden, washroom, bedroom;
var database;
var foodS,foodStock;
var fedTime, lastFed, addFood;
var foodObj, feed;
var gameState, readState, currentTime;

//preload images
function preload(){
   sadDog=loadImage("Images/Dog.png");
   happyDog=loadImage("Images/happy dog.png");
   bedroom=loadImage("Images/Bed Room.png");
   garden=loadImage("Images/Garden.png");
   washroom=loadImage("Images/Wash Room.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();

  //create canvas
  createCanvas(400,500);

  //create milk bottle
  foodObj = new Food();

  //fetch value of Food
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  //fetch last fed time
  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  //read gameState from database
  readState= database.ref('gameState');
  readState.on("value",function(data){
    gameState= data.val();
  });

  //create dog
  dog=createSprite(250,300,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create "Feed the Dog" button
  feed=createButton("Feed the Dog");
  feed.position(600,95);
  feed.mousePressed(feedDog);

  //create "Add Food" button
  addFood=createButton("Add Food");
  addFood.position(500,95);
  addFood.mousePressed(addFoods);
}

// function to display
function draw() {
  
  //update gameState and backround
  currentTime= hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime==(lastFed+2)){
  update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
    foodObj.washroom();
  }
  else{
  update("Hungry")
  foodObj.display();
  }

 //condition for gameState
if(gameState != "Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove(); 
}
else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog);
}

  //display sprites
  drawSprites();
}

//Function to read foodStock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//add dog's image and update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState: "Hungry"
  })
}

// add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

//function to add gameState in database
function update(state){
  database.ref('/').update({
      gameState: state
  })
}