//Link canvas to html
var canvas = document.getElementById('canvas'); //access the rendering context and draw on it
var ctx = canvas.getContext('2d'); //method to obtain rendering context and drawing functions

//Set canvas size to window width and height
var w = window.innerWidth;
var h = window.innerHeight;

canvas.height = h;
canvas.width = w;

//Load sprite images
function Image(src) {
	this.src = src;
}

var player = new Image("http://i.imgur.com/aevR7XM.png");

//var player = new Image();
//player.src = "http://i.imgur.com/aevR7XM.png";
  	
var enemy = new Image();
enemy.src = "http://i.imgur.com/QHVh32l.png";
  
var enemyBeam = new Image();
enemyBeam.src = "http://i.imgur.com/DukiQLC.png";
  
var playerBeam = new Image();
playerBeam.src = "http://i.imgur.com/dMUuR5f.png";

//Create score to start at 0
var score = 0;	

 //Add event listeners when keys pressed to move sprites
//var keys = [];//

//document.body.addEventListner('keydown', function(evt) {
//	keys[evt.keyCode] = true;
//});//

//document.body.addEventListner('keyup', function(evt) {
//	keys[evt.keyCode] = false;
//});

//Create player
//function player() {
//	this.speed = 10;
//	this.friction = 0.7;
//	this.vel_x = this.vel_y = 0;
//}

//Create load method to render player
//player.prototype.load = function() {
//	ctx.drawImage(player, 500,520);
//};

//Draw everything 	
 function render() {
 	ctx.drawImage(player, 500,520);
 	ctx.drawImage(enemy, 500,20);
 	//ctx.drawImage(enemyBeam, 200, 200);
 	//ctx.drawImage(playerBeam, 300, 300);
 	ctx.font = "16px Press Start K"; //renders score
 	ctx.fillStyle = "yellow";
 	ctx.fillText("Score " +score, 10, 22);
 	//player.load();
 }

 function init() {
 	render();
 	requestAnimationFrame(init);
 }

 requestAnimationFrame(init);

 
 
 