//Create variables here
var dog;
var dogImg;
var happyDog;
var database;
var foodS;
var foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dogImg=loadImage("images/Dog.png")
  happyDog = loadImage("images/happydog.png")
	//load images here
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
}


function draw() {  

  background(46,139,87);

  

  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS)
  //   dog.addImage(happyDog);
  // }

  drawSprites();

  foodObj.display();
  
  noStroke();
  textSize(20)
  fill("white")
  text(foodS, 225, 140)

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
  
  //stroke("black");


  //add styles here

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed % 12 + "PM", 320, 30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed : "+ lastFed + "AM", 320, 30);
  }

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref("/").update({
    Food:x
  });
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStoke(foodObj.getFoodStoke()-1);
  database.ref('/').update({
    Food :  foodObj.getFoodStoke(),
    FeedTime : hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}
