//Create the canvas
 var canvas = document.getElementById('canvas'); //access the rendering context and draw on it
 var ctx = canvas.getContext('2d'); //method to obtain rendering context and drawing functions
  
 //Create sprites
 var player = new Image();
 player.src = "http://i.imgur.com/aevR7XM.png";
  	
 var enemy = new Image();
 enemy.src = "http://i.imgur.com/QHVh32l.png";
  
 var enemyBeam = new Image();
 enemyBeam.src = "http://i.imgur.com/DukiQLC.png";
  
 var playerBeam = new Image();
 playerBeam.src = "http://i.imgur.com/dMUuR5f.png";

 var score = 0;
  	
 var render = function() {
 	ctx.drawImage(player, 40,40);
 	ctx.drawImage(enemy, 150,150);
 	ctx.drawImage(enemyBeam, 200, 200);
 	ctx.drawImage(playerBeam, 300, 300);
 
 	ctx.font = "16px Press Start K";
 	ctx.fillStyle = "yellow";
 	ctx.fillText("Score "+score, 10, 22);
 };

 var main = function() {
 	render();
 };

 main();
 
  
 
 
 