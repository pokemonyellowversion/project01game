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
	dx: 0,
	dy: 0
};

player.image.src = 'http://i.imgur.com/aevR7XM.png';

var startNumEnemies = 2;
var enemies = [];
function Enemy (x, y, dx, dy) {
	var img = new Image();
	img.src = 'http://i.imgur.com/QHVh32l.png';
	this.image = img;
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
}

for (var i = 0; i < startNumEnemies; i++) {
	enemies.push(new Enemy(250*(i+1), -200, 1*i, 1));
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
	if (evt.keyCode == 32) { // spacebar
		player.shoot();
	} else if (evt.keyCode == 37) { // left
        player.dx -= 1;
    } else if (evt.keyCode === 39) { // right
    	player.dx += 1;
    }
}

function updatePositions() {
	//update player
	player.x += player.dx;
	player.y += player.dy;
	if (player.x + player.dx > canvas.width) { //bounces off right wall
		player.dx = -player.dx;
	}
	// update enemies
	enemies.forEach(function(enemy) {
 		enemy.x += enemy.dx;
 		enemy.y += enemy.dy;
 	});
}

//Draw everything 	
 function render() {
 	ctx.clearRect(0, 0, canvas.width, canvas.height);
 	updatePositions();
 	ctx.drawImage(player.image, player.x, player.y);
 	enemies.forEach(function(enemy) {
 		ctx.drawImage(enemy.image, enemy.x, enemy.y);
 	});
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

 
 
 