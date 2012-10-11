var width, height;
var canvas, ctx;
var particleList = [];
var stuckList = [];
var maxR = 1;

function setup() {
    width = 80;
    height = 60;
    canvas = document.getElementById("scrawl");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,width,height);
    interval = setInterval(draw,1);
    //initialize 'stuck' array
    for(i = 0; i < width*height; i++) {
	stuckList[i] = false;
    }

    //put a seed in the center
    stuckList[height/2 * width + width/2] = true;
    particleList[particleList.length] = new Particle(width/2,height/2);
    particleList[particleList.length - 1].stuck = true;
    particleList[particleList.length - 1].render();
}
    

function draw() {
    //if the most recent particle isn't part of the aggregate, continue the simulation.
    if (!particleList[particleList.length - 1].stuck) {
	particleList[particleList.length - 1].diffuse();
	particleList[particleList.length - 1].aggregate();
//	particleList[particleList.length - 1].render();
    }
    //if it is part of the aggregate, then create a new one!
    else {
	particleList[particleList.length - 1].render();
	var theta = 2*Math.PI*Math.random();
	particleList[particleList.length] = new Particle(Math.floor(maxR*Math.cos(theta)) + width/2,Math.floor(maxR*Math.sin(theta)) + height/2);
	maxR++;
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

	    //check for if it flows out of our containing circle
	    //compute and compare Rsq to save on square roots
	    var Rsq = (this.x - width/2)*(this.x - width/2) + (this.y - height/2)*(this.y - height/2);
	    if (Rsq >= maxR*maxR) {
		var theta = 2*Math.PI*Math.random();
		this.x = Math.floor(maxR*Math.cos(theta)) + width/2;
		this.y = Math.floor(maxR*Math.sin(theta)) + height/2;
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
	ctx.fillRect(this.x,this.y,1,1);
    }
}