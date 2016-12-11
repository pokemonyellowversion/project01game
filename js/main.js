//Create the canvas
 var canvas = document.getElementById('canvas'); //access the rendering context and draw on it
 var ctx = canvas.getContext('2d'); //method to obtain rendering context and drawing functions

 var w = window.innerWidth;
 var h = window.innerHeight;

canvas.height = h;
canvas.width = w;

 //Load sprite images
 var player = new Image();
 player.src = "http://i.imgur.com/aevR7XM.png";
  	
 var enemy = new Image();
 enemy.src = "http://i.imgur.com/QHVh32l.png";
  
 var enemyBeam = new Image();
 enemyBeam.src = "http://i.imgur.com/DukiQLC.png";
  
 var playerBeam = new Image();
 playerBeam.src = "http://i.imgur.com/dMUuR5f.png";

//Create score
 var score = 0;	

 //Draw everything 	
 var render = function() {
 	ctx.drawImage(player, 500,520);
 	ctx.drawImage(enemy, 500,20);
 	//ctx.drawImage(enemyBeam, 200, 200);
 	//ctx.drawImage(playerBeam, 300, 300);
 	ctx.font = "16px Press Start K"; //renders score
 	ctx.fillStyle = "yellow";
 	ctx.fillText("Score " +score, 10, 22);
 };

 var init = function() {
 	render();
 };

 init();

 
 
 