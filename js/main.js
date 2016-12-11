
	var canvas = document.getElementById('board'); //access the rendering context and draw on it
	var ctx = canvas.getContext('2d'); //method to obtain rendering context and drawing functions
	
	var img = new Image();
	img.src = "http://i.imgur.com/aevR7XM.png";
	
	var imgEnemy = new Image();
	imgEnemy.src = "http://i.imgur.com/QHVh32l.png";
	img.onload = function() {
		ctx.drawImage(img, 40,40);
		ctx.drawImage(imgEnemy, 150,150);
	};


	

	
