//Link canvas to html
var canvas = document.getElementById('canvas'); //access the rendering context and draw on it
var ctx = canvas.getContext('2d'); //method to obtain rendering context and drawing functions

//Set canvas size to window width and height
var w = window.innerWidth;
var h = window.innerHeight;

canvas.height = h;
canvas.width = w;

speed = 5; //speed for player to move at

x = canvas.width / 2; //align to center of the screen
y = canvas.height / 2; //same as above

//Load sprite images
//var player = new Image();
//player.src = "http://i.imgur.com/aevR7XM.png";
  	
//var enemy = new Image();
//Enemy.src = "http://i.imgur.com/QHVh32l.png";
  
var enemyBeam = new Image();
enemyBeam.src = "http://i.imgur.com/DukiQLC.png";
  
var playerBeam = new Image();
playerBeam.src = "http://i.imgur.com/dMUuR5f.png";

///canvas.addEventListener("keypress", update);

//Create score to start at 0
var score = 0;	

//var enemies = [];
//function Enemy (imgUrl, x, y) {
//	this.image = new Image ();
//	//this.src = "http://i.imgur.com/QHVh32l.png";
//	imgUrl = "http://i.imgur.com/QHVh32l.png";
//	x = 500;
//	y = 20;
//}

var player = {
	image: new Image (),
	x: 500,
	y: 20,
	dx: 1,
	dy: 0
};

player.image.src = 'http://i.imgur.com/aevR7XM.png';

 //Add event listeners when keys pressed to move sprites
//var keys = [];//

//document.body.addEventListener('keydown', function(evt) {
//	//keys[evt.keyCode] = true;
//	evt = evt || window.event;
//	if (evt.keyCode === '37') {
//		console.log("left");
//	} else if (evt.keyCode === '39') {
//		console.log("right");
//	}
//});

//document.onkeydown = function(evt) {
//	evt = evt || window.event;	
//	if (evt.keyCode === 37) {
//		// run function to move piece to left
//		x -= speed;
//		render();
//		//move();
//	} else if (evt.keyCode === 39) {
//		// run function to move piece to right
//		x += 10;
//		//move();
//	}
//};

//function move() {
//	ctx.drawImage(player, x += 10, y -= 10);
//}

//function update(evt) {
//	if (evt.keyCode == 37) {
//		x -= speed; //move player left
//	}
//	if (evt.keyCode == 39) {
//		x += speed; //move player right
//	}
//	render();
//}

//document.body.addEventListner('keyup', function(evt) {
//	keys[evt.keyCode] = false;
//});

function updatePositions() {
	//update player
	player.x += player.dx;
	player.y += player.dy;
}

//Draw everything 	
 function render() {
 	updatePositions();
 	//ctxt.clearRect(0, 0, canvas.width, canvas.height);
 	ctx.drawImage(player.image, player.x, player.y);
 	//ctx.drawImage(Enemy.image, Enemy.x, Enemy.y);
 	//ctx.drawImage(enemyBeam, 200, 200);
 	//ctx.drawImage(playerBeam, 300, 300);
 	ctx.font = "16px Press Start K"; //renders score
 	ctx.fillStyle = "yellow";
 	ctx.fillText("Score " +score, 10, 22);
 }

 function init() {
 	render();
 	requestAnimationFrame(init);
 }

 requestAnimationFrame(init);

 
 
 