//Link canvas to html
var canvas = document.getElementById('canvas'); //access the rendering context and draw on it
var ctx = canvas.getContext('2d'); //method to obtain rendering context and drawing functions

//Set canvas size to window width and height
var w = window.innerWidth;
var h = window.innerHeight;

canvas.height = h;
canvas.width = w;

//Create sprites
var player = {
	image: new Image (),
	x: 500,
	y: 520,
	dx: 1,
	dy: 0
};

player.image.src = 'http://i.imgur.com/aevR7XM.png';

var enemies = [];
function Enemy (imgUrl, x, y, dx, dy) {
	this.image = new Image ('http://i.imgur.com/QHVh32l.png');
	this.x = 500;
	this.y = 20;
	this.dx = 0;
	this.dy = 0;
} 

//var enemyBeam = new Image();
//enemyBeam.src = "http://i.imgur.com/DukiQLC.png";
//  
//var playerBeam = new Image();
//playerBeam.src = "http://i.imgur.com/dMUuR5f.png";

//Create score to start at 0
var score = 0;	

document.addEventListener("keydown", keyPressed);
 
function keyPressed(evt) {
	if (evt.keyCode == 32) {
		player.shoot();
	}
    if (evt.keyCode == 37) {
        player.x -= player.dx;
    }
    if (evt.keyCode === 39) {
    	player.x += player.dx;
    }
    render();
}

//function updatePositions() {
//	//update player
//	player.x += player.dx;
//	player.y += player.dy;
//}

//Draw everything 	
 function render() {
 	ctx.clearRect(0, 0, canvas.width, canvas.height);
 	//updatePositions();
 	ctx.drawImage(player.image, player.x, player.y);
 	ctx.drawImage(Enemy.image, Enemy.x, Enemy.y);
 	//ctx.drawImage(enemyBeam, 200, 200);
 	//ctx.drawImage(playerBeam, 300, 300);
 	ctx.font = "16px Press Start K"; //renders score
 	ctx.fillStyle = "yellow";
 	ctx.fillText("Score " +score, 10, 22);
 }

 function init() {
 	render();
 	//requestAnimationFrame(init);
 }

 //requestAnimationFrame(init);

 
 
 