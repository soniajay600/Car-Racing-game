class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      background(backgroundImg);
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("c1",car1Img);
    car2 = createSprite(300,200);
    car2.addImage("c2",car2Img);
    car3 = createSprite(500,200);
    car3.addImage("c3",car3Img);
    car4 = createSprite(700,200);
    car4.addImage("c4",car4Img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
   player.getCarsAtEnd(); 
    if(allPlayers !== undefined){
      //var display_position = 100;
     background(groundImg); 
     image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          //strokeWeight(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
if(player.distance>3800){
  gameState = 2;  
  player.rank+=1;
  Player.updateCarsAtEnd(player.rank);
}
    drawSprites();
  }
  End(){
    console.log("gameEnd");
    console.log(player.rank);
    var img=createImg("images/Cup.jpg");
    img.position(displayWidth/2,displayHeight/2-100);
    img.size(350,400);
    var rankHead=createElement('h2');
    rankHead.html("YOUR RANK IS "+player.rank+"st");
    rankHead.style('color',"red");
    rankHead.position(displayWidth/2,displayHeight/2-100);
    
  }
}
