var width, height;
var canvas, ctx;
var numParticles = 50000;
var particleList = [];
var stuckList = [];

function setup() {
    width = 800;
    height = 600;
    canvas = document.getElementById("scrawl");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,width,height);
    interval = setInterval(draw,1);
    //initialize 'stuck' array
    for(i = 0; i < width*height; i++) {
	stuckList[i] = false;
    }
    //initialize particle array
    for(i = 0; i < numParticles; i++) {
	particleList[i] = new Particle(Math.floor(width*Math.random()),Math.floor(height*Math.random()));
    }
    //put a seed in the center
    stuckList[height/2 * width + width/2] = true;
    particleList[particleList.length] = new Particle(width/2,height/2);
    particleList[particleList.length - 1].stuck = true;
    particleList[particleList.length - 1].render();
}
    

function draw() {
    for(i = 0; i < numParticles; i++) {
	if (particleList[i].stuck) {
	    particleList[i].render()
	}
	else {
	    particleList[i].diffuse()
	    particleList[i].aggregate()
	}
    }
}


function Particle(pos_x, pos_y) {
    //properties of the particle
    this.x = pos_x;
    this.y = pos_y;
    //boolean to determine if the particle stucks to the aggregate or not.
    this.stuck = false;

    this.diffuse = function() {
	if (!this.stuck) {
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
    }
    
    this.aggregate = function() {
	var left = this.x - 1;
	var right = this.x + 1;
	var up = this.y + 1;
	var down = this.y - 1;
/*	alert("L: " + left + "\n"
	      + "R: " + right + "\n"
	      + "U: " + up + "\n"
	      + "D: " + down)
*/

	//check cardinal directions
	if(stuckList[up*width + this.x] || stuckList[down*width + this.x] || stuckList[this.y*width + right] || stuckList[this.y*width + left]) {
	    
	    this.stuck = true;
	    stuckList[this.y * width + this.x] = true;
	}

	//check diagonals
	else if(stuckList[up*width + right] || stuckList[up*width + left] || stuckList[down*width + right] || stuckList[down*width + left]) {
	    this.stuck = true;
	    stuckList[this.y * width + this.x] = true;
	}
    }

    //render the particle
    this.render = function() {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(this.x,this.y,2,2);
    }
}