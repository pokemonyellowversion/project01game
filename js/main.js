//Link canvas to html
var canvas = document.getElementById('canvas'); //access the rendering context and draw on it
var ctx = canvas.getContext('2d'); //method to obtain rendering context and drawing functions

//Set canvas size to window width and height
var w = window.innerWidth;
var h = window.innerHeight;

canvas.height = h;
canvas.width = w;

//Add sound
var enemyExplosion = new Audio('http://www.freesound.org/data/previews/259/259962_2463454-lq.mp3');
var beamSound = new Audio('http://www.freesound.org/data/previews/344/344310_6199418-lq.mp3');

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
var maxBeams = 5;
var playerBeams = [];
function PlayerBeam(x, y, dx, dy, width, height) {
	var img = new Image();
	img.src = "http://i.imgur.com/ljvSIOr.png";
	this.image = img;
	this.x = x;
	this.y = y;
	this.dx = 0;
	this.dy = -4;
	this.width = 61;
	this.height = 100;
}

//Create player shoot function and push beams
player.shoot = function() {
	if (maxBeams === playerBeams.length) return;
	playerBeams.push(new PlayerBeam(player.midpoint().x, player.midpoint().y));
	beamSound.play();
};

player.midpoint = function() {
	return {
		x: this.x + this.width/2 - 61/2,
		y: this.y + this.height/2 - 100
	};
};

//Create enemy
var enemies = [];
function Enemy (x, y, dx, dy, width, height) {
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
var maxEnemies = 3;
	
//Create function to randomly add enemies over a random interval
function createEnemy() {
	var randX = getRandomBetween(100, canvas.width - 100);
	var randDX = getRandomBetween(-2, 2);
	enemies.push(new Enemy(randX, -150, randDX, enemyAcceleration));
	//audio.play();
}

function startCreateEnemies() {
	createEnemiesTimerId = setTimeout(function() {
		if (enemies.length < maxEnemies) createEnemy();
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

//Create score to start at 0
var score = 0;	
var scoreEl = document.getElementById('score');

//Add event listeners to keyboard controls
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

function beamEnemyDetection(beam, enemy) {
	return (beam.x < enemy.x + enemy.width - 30 &&
		beam.x + beam.width > enemy.x &&
		beam.y < enemy.y + enemy.height - 30 &&
		beam.height + beam.y > enemy.y);
}

function enemyCollisionDetection(enemy) {
	return (player.x < enemy.x + enemy.width - 30 &&
		player.x + player.width > enemy.x &&
		player.y < enemy.y + enemy.height - 30 &&
		player.height + player.y > enemy.y);
}

function checkEnemyPlayerCollision() {
	enemies.forEach(function(enemy) {
		if (enemyCollisionDetection(enemy)) {
			//game over
			console.log('game over');
		}
	});
}

function checkBeamEnemyCollision() {
	playerBeams.forEach(function(beam) {
		enemies.forEach(function(enemy) {
			if (beamEnemyDetection(beam, enemy)) {
				// remove beam
				beam.remove = true;
				// remove enemy
				enemy.remove = true;
				enemyExplosion.play();
				score += 100;
			}
		});
	});
	playerBeams = playerBeams.filter(function(beam) {
		return !beam.remove;
	});
	enemies = enemies.filter(function(enemy) {
		return !enemy.remove;
	});
}

function checkCollisions() {
	checkEnemyPlayerCollision();
	checkBeamEnemyCollision();
}

function checkWinOrLose() {
	if (score === 5000) {
		alert('You win!');
	} else if (collison === true) {
		alert('You lose!');
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
 	playerBeams.forEach(function(beam) {
 		beam.x += beam.dx;
 		beam.y += beam.dy;
 	});
 	playerBeams = playerBeams.filter(function(beam) {
 		return beam.y > -95;
 	});
 	//enemyCollisionDetection();
	//scoreEl.innerHTML = score;
}

//Increase number of enemies and enemy speed every x seconds
var enemyAcceleration = 1.5;
var incEnemiesTickCount = 5;
var tickCounter = 0;
var intervalId = setInterval(handleIntervalTick, 4000);

function handleIntervalTick() {
	enemyAcceleration += 0.2;
	// max acceleration
	enemyAcceleration = Math.min(enemyAcceleration, 7);
	tickCounter++;
}

//Draw everything 	
function render() {
 	ctx.clearRect(0, 0, canvas.width, canvas.height);
 	updatePositions();
 	ctx.drawImage(player.image, player.x, player.y);
 	enemies.forEach(function(enemy) {
 		ctx.drawImage(enemy.image, enemy.x, enemy.y);
 	});
 	playerBeams.forEach(function(beam) {
 		ctx.drawImage(beam.image, beam.x, beam.y);
 	});
 	checkCollisions();
 	ctx.font = "16px Press Start K"; //renders score
 	ctx.fillStyle = "yellow";
 	ctx.fillText("Score " + score, 10, 22);
 	ctx.fillText("Enemy Speed " + enemyAcceleration.toFixed(2), canvas.width - 280, 22);
}

function play() {
	render();
 	requestAnimationFrame(play);
}

requestAnimationFrame(play);

//document.getElementById('start').addEventListener('click', function() {
	startCreateEnemies();
	//document.getElementById('startScreen').style.display=none;
//});