class Game {
  constructor(){}

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
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers!==undefined){

      var pos=100
      for(var i in allPlayers){
        if(i==="player"+player.index){
          fill("blue")
        }
        else{
          fill("red")
        }
        pos=pos+50
        textSize(20)
        text(allPlayers[i].name+" : "+allPlayers[i].distance,150,pos)
      }
    }
    
    if(keyIsDown(UP_ARROW)&&player.index!==null){
      player.distance+=26
      player.update()
    }

    
  }
}
