class Food{
    //create variables and preload images along with creating the Food class object
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage("Images/Milk.png");
   }

   //update food stock
   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   //get the last fed time
   getFedTime(lastFed){
    this.lastFed=lastFed;  
   }

   //removing milk bottles
   deductFoodStock(){
    if(this.foodStock>0){
        this.foodStock=this.foodStock-1;
    }
   }

   //food stock
   getFoodStock(){
    return this.foodStock;
   }

   //display
   display(){

       //background
       background(46,139,87);

       // text properties
       fill(255,255,254);
       textSize(15);
       //stroke("black");

       //function to create last fed time
       if(lastFed>=12){
        text("Last Feed : "+ lastFed%12 + " PM", 50,30);
       }
       else if(lastFed==0){
        text("Last Feed : 12 AM",50,30);
       }
       else{
        text("Last Feed : "+ lastFed + " AM", 50,30);
       }

      //display milk bottles
       var x=45, y=50;

       imageMode(CENTER);
       if(this.foodStock !== 0){
           for(var i=0; i<this.foodStock; i++){
               if(i%5 === 0){
                   x=45;
                   y=y+50;
               }
               image(this.image,x,y,50,50);
               x=x+30;
           }
       }
    }

//functions for respective backgrounds
   bedroom(){
    background(bedroom, 500,500);
   }
   garden(){
    background(garden, 500,500);
   }
   washroom(){
    background(washroom, 500,500);
   }
}