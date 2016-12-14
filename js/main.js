//Link canvas to html
var canvas = document.getElementById('canvas'); //access the rendering context and draw on it
var ctx = canvas.getContext('2d'); //method to obtain rendering context and drawing functions

//Set canvas size to window width and height
var w = window.innerWidth;
var h = window.innerHeight;

canvas.height = h;
canvas.width = w;

//Create player
var player = {
	image: new Image(),
	x: w/2 - 50,
	y: 570,
	dx: 0,
	dy: 0,
	width: 100,
	height: 73
};

player.image.src = 'http://i.imgur.com/L8LDa4F.png';

//Create player beam
var playerBeam = [];
var playerBeam = {
	image: new Image(),
	dx: 0,
	dy: 0
};

playerBeam.image.src = "http://i.imgur.com/dMUuR5f.png";

//Create player shoot function
player.shoot = function() {
	var beamPosition = this.midpoint();//

playerBeam.push(new Beam({
		x: beamPosition.x,
		y: beamPosition.y
	}));
};

player.midpoint = function() {
	return {
		x: this.x + this.width/2,
		y: this.y + this.height/2
	};
};

//Create enemy
var startNumEnemies = 3;
var enemies = [];
function Enemy (x, y, dx, dy) {
	var img = new Image();
	img.src = 'http://i.imgur.com/Frun8cP.png';
	this.image = img;
	this.id = Date.now();
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.width = 75;
	this.height = 95;

}

var createEnemiesTimerId;
var MAX_ENEMIES = 5;
	

//Create function to randomly add enemies over a random interval

function createEnemy() {
	var randX = getRandomBetween(100, canvas.width - 100);
	var randDX = getRandomBetween(-2, 2);
	enemies.push(new Enemy(randX, -150, randDX, 1));
}

//check number of enemies, if less than max enemies, create an enemy
//setTimout

function startCreateEnemies() {
	createEnemiesTimerId = setTimeout(function() {
		if (enemies.length < MAX_ENEMIES) createEnemy();
		startCreateEnemies();
	}, getRandomBetween(1000, 3000));
}

function stopCreateEnemies() {
	clearTimeout(createEnemiesTimerId);
}

function getRandomBetween(min, max) {
	return min + Math.floor(Math.random() * (max - min));
}

//var enemyBeam = new Image();
//enemyBeam.src = "http://i.imgur.com/DukiQLC.png";
//  

//Create score to start at 0
var score = 0;	

document.addEventListener("keydown", keyPressed);
 
function keyPressed(evt) {
	if (evt.keyCode == 32) { // spacebar
		player.shoot();
	} else if (evt.keyCode == 37) { // left
        player.dx -= 0.5;
    } else if (evt.keyCode === 39) { // right
    	player.dx += 0.5;
    } else if (evt.keyCode == 40) { // down
        player.dx = 0;
    }    
}

//Update everything to move sprites
function updatePositions() {
	//update player
	player.x += player.dx;
	player.y += player.dy;
	//bounces player off left and right walls
	if (player.x + player.dx > canvas.width - player.width || player.x + player.dx < 0) { 
		player.dx = -player.dx;
	}
	// update enemies
	enemies.forEach(function(enemy) {
		enemy.x += enemy.dx;
	 	enemy.y += enemy.dy;
	//bounces enemy off left and right walls
	if (enemy.x + enemy.dx > canvas.width - enemy.width || enemy.x + enemy.dx < 0) { 
		enemy.dx = -enemy.dx;
	}
 	});
 	enemies = enemies.filter(function(enemy) {
 		return enemy.y < canvas.height;
	});
 	//update beams
// 	playerBeam.forEach(function(beam) {
// 		beamPosition.x += beamPosition.dx;
// 		beamPosition.y += beamPosition.dy;
// 	});
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
 	//playerBeam.forEach(function(beam) {
// 		ctx.drawImage(playerBeam.image, beamPosition.x, beamPosition.y);
// 	});
 	ctx.font = "16px Press Start K"; //renders score
 	ctx.fillStyle = "yellow";
 	ctx.fillText("Score " + score, 10, 22);
 }

 function play() {
 	render();
 	requestAnimationFrame(play);
 }

 requestAnimationFrame(play);
 startCreateEnemies();