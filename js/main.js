// Link canvas to html
var canvas = document.getElementById('canvas'); //access the canvas
var ctx = canvas.getContext('2d'); // access methods and properties to draw on the canvas

// Make canvas full screen
var w = window.innerWidth;
var h = window.innerHeight;

canvas.height = h;
canvas.width = w;

// Add sounds
var playerFlyingSound = new Audio('http://www.matthewbarr.co.uk/sounds/xwing_flyby.wav');
var enemyFlyingSound = new Audio('http://filmsound.org/starwars/tie.wav');
var enemyExplosion = new Audio('http://www.freesound.org/data/previews/18/18384_71614-lq.mp3');
var beamSound = new Audio('http://www.sa-matra.net/sounds/starwars/XWing-Proton.wav');
var gameOverSound = new Audio('http://www.freesound.org/data/previews/333/333785_5858296-lq.mp3');
var youWinSound = new Audio('http://freesound.org/data/previews/270/270333_5123851-lq.mp3');
playerFlyingSound.loop = false; // plays sound only once
youWinSound.loop = false; 

// Create player X-Wing sprite
var player = {
	image: new Image(),
	x: canvas.width/2 - 50,
	y: canvas.height - 100,
	dx: 0,
	dy: 0,
	width: 100,
	height: 88
};

player.image.src = 'http://i.imgur.com/8eQAmcw.png';
playerFlyingSound.play();

// Create player beam(bullet) sprites
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

// Create player shoot function and push beams
player.shoot = function() {
	if (maxBeams === playerBeams.length) return;
	playerBeams.push(new PlayerBeam(player.midpoint().x, player.midpoint().y));
	beamSound.play();
};

player.midpoint = function() { // beam appears at midpoint of player's (x,y) position coordinates
	return {
		x: this.x + this.width/2 - 61/2,
		y: this.y + this.height/2 - 100
	};
};

// Create enemy TIE Fighter sprite
var enemies = [];
function Enemy (x, y, dx, dy, width, height) {
	var img = new Image();
	img.src = 'http://i.imgur.com/zNUXYdy.png';
	this.image = img;
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.width = 75; 
	this.height = 81; 
}

// Create interval to play enemy sound every x seconds
var enemyIntervalId = self.setInterval(function() { 
	if (enemies.length >= 1);
	enemyFlyingSound.play(); 
	}, 10000
);
	
// Create function to add enemies at random x positions over a random interval
var createEnemiesTimerId;
var maxEnemies = 3;

function createEnemy() {
	var randX = getRandomBetween(100, canvas.width - 100);
	var randDX = getRandomBetween(-2, 2);
	enemies.push(new Enemy(randX, -150, randDX, enemyAcceleration));
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

function getRandomBetween(min, max) { // generates a random number between two numbers
	return min + Math.floor(Math.random() * (max - min));
} 

// Create score and enemy counters
var score = 0;	
var numEnemiesDestroyed = 0;

// Add event listeners to keyboard controls when keys are pressed down
document.addEventListener('keydown', keyPressed);
 
function keyPressed(evt) {
	if (evt.keyCode == 32) { // spacebar
		player.shoot();
	} else if (evt.keyCode == 37) { // left
        player.dx -= 0.5;
    } else if (evt.keyCode == 39) { // right
    	player.dx += 0.5;
    } else if (evt.keyCode == 40) { // down
        player.dx = 0;
    } else if (evt.keyCode == 13) { // shift
	    location.reload(); // refreshes the page and restarts game
	}  
}

// Create functions to detect collisions
function beamEnemyDetection(beam, enemy) { // checks if beam collided with enemy
	return (beam.x < enemy.x + enemy.width - 20 &&
		beam.x + beam.width > enemy.x &&
		beam.y < enemy.y + enemy.height - 44 &&
		beam.height + beam.y > enemy.y);
}

function enemyCollisionDetection(enemy) { // checks if enemy collided with player
	return (player.x < enemy.x + enemy.width - 20 &&
		player.x + player.width > enemy.x &&
		player.y < enemy.y + enemy.height - 44 &&
		player.height + player.y > enemy.y);
}

function checkEnemyPlayerCollision() { // checks each enemy if collided with player
	enemies.forEach(function(enemy) {
		if (enemyCollisionDetection(enemy)) {
			gameOver();
		}
	});
}

function checkBeamEnemyCollision() { // if beam collided with enemy, removes both and increases score
	playerBeams.forEach(function(beam) {
		enemies.forEach(function(enemy) {
			if (beamEnemyDetection(beam, enemy)) {
				beam.remove = true; // removes beam
				enemy.remove = true; // removes enemy
				enemyExplosion.play();
				score += 100;
				numEnemiesDestroyed++;
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
	checkScore();
}

// Create functions to check for winner or game over
function checkScore() {
	if (numEnemiesDestroyed == 10) {
		youWinSound.play();
		endGame();
		ctx.textBaseline = 'middle'; 
		ctx.textAlign = 'center'; 
		ctx.font = '90px press_start_kregular'; 
		ctx.fillText('YOU WIN', canvas.width/2, canvas.height - 420);
		ctx.font = '30px press_start_kregular'; 
		ctx.fillText('Your score: ' +score, canvas.width/2, canvas.height - 310);
		ctx.font = '30px press_start_kregular'; 
		ctx.fillText('Press enter to play again', canvas.width/2, canvas.height - 220);
		player.remove();
		enemy.remove();
	}
}

function endGame() {
	clearInterval(enemyIntervalId);
	stopCreateEnemies();
	clearInterval(intervalId);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameOver() {
	gameOverSound.play();
	endGame();
	ctx.textBaseline = 'middle'; 
	ctx.textAlign = 'center'; 
	ctx.font = '90px press_start_kregular'; 
	ctx.fillText('GAME OVER', canvas.width/2, canvas.height - 420);
	ctx.font = '30px press_start_kregular'; 
	ctx.fillText('Your score: ' +score, canvas.width/2, canvas.height - 310);
	ctx.font = '30px press_start_kregular'; 
	ctx.fillText('Press enter to play again', canvas.width/2, canvas.height - 220);
	player.remove();
	enemy.remove();
}

// Update everything to move sprites
function updatePositions() {
	player.x += player.dx; // updates player
	player.y += player.dy;
	if (player.x + player.dx > canvas.width - player.width || player.x + player.dx < 0) { 
		player.dx = -player.dx; // bounces player off left and right walls
	}
	enemies.forEach(function(enemy) { // updates enemies
		enemy.x += enemy.dx;
	 	enemy.y += enemy.dy;
	if (enemy.x + enemy.dx > canvas.width - enemy.width || enemy.x + enemy.dx < 0) { 
		enemy.dx = -enemy.dx; // bounces enemy off left and right walls
	}
 	});
 	var numEnemies = enemies.length;
 	enemies = enemies.filter(function(enemy) { // removes enemies if they go off bottom of screen  			
 		return enemy.y < canvas.height;
	});
	numEnemiesDestroyed -= (numEnemies - enemies.length);
 	playerBeams.forEach(function(beam) { // updates beams
 		beam.x += beam.dx;
 		beam.y += beam.dy;
 	});
 	playerBeams = playerBeams.filter(function(beam) { // removes beams if they go off top of screen
 		return beam.y > -95;
 	});
}

// Increase enemy speed (dy) every x seconds
var enemyAcceleration = 1.5;
var incEnemiesTickCount = 5;
var tickCounter = 0;
var intervalId = setInterval(handleIntervalTick, 4000);

function handleIntervalTick() {
	enemyAcceleration += 0.2;
	enemyAcceleration = Math.min(enemyAcceleration, 7); // last number is max acceleration
	tickCounter++;
}

// Draw everything on the canvas	
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
	ctx.textAlign = 'left';
 	ctx.font = '16px press_start_kregular'; // renders score
 	ctx.fillStyle = 'yellow';
 	ctx.fillText('Score: ' + score, 20, 30);
 	ctx.fillText('Targets destroyed: ' + numEnemiesDestroyed,  20, 50);
 	ctx.textAlign = 'right';
 	ctx.fillText('Enemy Speed ' + enemyAcceleration.toFixed(2), canvas.width - 20, 30);
}

// Create main game loop
function play() {
	render();
 	requestAnimationFrame(play);
}

requestAnimationFrame(play);
startCreateEnemies();