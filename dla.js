var interval;
var width, height;
var canvas, ctx;
var particleList = [];
var stuckList = [];

function setup() {
    width = 50;
    height = 50;
    canvas = document.getElementById("scrawl");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,width,height);
    interval = setInterval(draw,0.001);
    //initialize 'stuck' array
    for(i = 0; i < height; i++) {
	stuckList[i] = []
	for(j = 0; j < width; j++) {
	    stuckList[i][j] = false;
	}
    }	    
    //initialize center particle
    particleList[0] = new Particle(width/2,height/2);
    particleList[0].stick = true;
    stuckList[particleList[0].y][particleList[0].x] = true;
}
    

function draw() {
    //check if all of the particles are stuck.
    if (particleList[particleList.length - 1].stick == true) {
	//if all particles are stuck, draw the particle that just stuck last frame and add a new one.
	particleList[particleList.length - 1].render();
	particleList[particleList.length] = new Particle(width/2 + 5*Math.random(),height/2 + 5*Math.random());
	}

    particleList[particleList.length - 1].diffuse();
    particleList[particleList.length - 1].aggregate();    
}


function Particle(pos_x, pos_y) {
    //properties of the particle
    this.x = pos_x;
    this.y = pos_y;
    this.rad = 1;
    //boolean to determine if the particle sticks to the aggregate or not.
    this.stick = false;

    this.diffuse = function() {
	//compute a probability to determine which direction to move.
	var probability = Math.floor(4*Math.random());	
	switch(probability) {
	case 0:
	    this.x++;
	    break;
	case 1:
	    this.x--;
	    break;
	case 2:
	    this.y++;
	    break;
	case 3:
	    this.y--;
	    break;
	}

	//check for if it flows off the page
	if (this.x > width) {
	    this.x = 0;
	}
	if (this.x < 0) {
	    this.x = width;
	}
	if (this.y > height) {
	    this.y = 0;
	}
	if (this.y < 0) {
	    this.y = height;
	}
    }

    this.aggregate = function() {
	var left = this.x - 1;
	var right = this.x + 1;
	var up = this.y + 1;
	var down = this.y - 1;

	//check cardinal directions
	if(stuckList[up][this.x] ||
	   stuckList[down][this.x] ||
	   stuckList[this.y][right] ||
	   stuckList[this.y][left]) {
	    this.stick = true;
	    stuckList[this.y][this.x] = true;
	}

	//check diagonals
	if(stuckList[up][right] ||
	   stuckList[up][left] ||
	   stuckList[down][right] ||
	   stuckList[down][left]) {
	    this.stick = true;
	    stuckList[this.y][this.x] = true;
	}
    }

    //render the particle
    this.render = function() {
	ctx.beginPath();
	ctx.fillStyle = "rgba(255,255,255,1.0)"
	ctx.arc(this.x,this.y,this.rad,0,2*Math.PI,true);
	ctx.fill();
    }
}