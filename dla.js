var width, height;
var canvas, ctx;

var particleList = [];
var minParticleRadius = 2;
var maxParticleRadius = 2;
var maxR = 5*maxParticleRadius;

function setup() {
    width = 400;
    height = 400;
    canvas = document.getElementById("scrawl");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,width,height);
    //update loop, as fast as possible
    setInterval(draw,1);
    //rendering loop, at 30 fps
    setInterval(drawMaxR,34);

    //put a seed in the center
    particleList[particleList.length] = new Particle(width/2,height/2);
    particleList[particleList.length - 1].stuck = true;
}
    

function draw() {
    while (!particleList[particleList.length - 1].stuck) {
	particleList[particleList.length - 1].diffuse();
	particleList[particleList.length - 1].intersect();
    }
    //if it is part of the aggregate, then create a new one!
    particleList[particleList.length - 1].render();
    var currentMaximumDistance = computeR(particleList[particleList.length - 1].x, particleList[particleList.length - 1].y, particleList[particleList.length - 1].rad);
    maxR = Math.max(maxR,1.2*currentMaximumDistance);
    var theta = 2*Math.PI*Math.random();
    particleList[particleList.length] = new Particle(Math.floor(maxR*Math.cos(theta)) + width/2,Math.floor(maxR*Math.sin(theta)) + height/2);
}


function Particle(pos_x, pos_y) {
    //properties of the particle
    this.x = pos_x;
    this.y = pos_y;
    this.rad = maxParticleRadius*Math.random() + minParticleRadius;
    //boolean to determine if the particle stucks to the aggregate or not.
    this.stuck = false;
}
    

Particle.prototype.diffuse = function() {
    this.x += Math.random() - 0.5;
    this.y += Math.random() - 0.5;    
    
    //check for if it flows out of our containing circle
    //compute and compare Rsq to save on square roots
    var Rsq = (this.x - width/2)*(this.x - width/2) + (this.y - height/2)*(this.y - height/2);
    if (Rsq >= 2*maxR*maxR) {
	var theta = 2*Math.PI*Math.random();
	this.x = Math.floor(maxR*Math.cos(theta)) + width/2;
	this.y = Math.floor(maxR*Math.sin(theta)) + height/2;
    }
		
}
    
Particle.prototype.intersect = function() {
    for(i = 0; i < particleList.length - 1; i++) {
	//compute the total radius of the active particle the one chosen from the aggregate
	var radSum = (this.rad + particleList[i].rad)*(this.rad + particleList[i].rad);
	//compute the distance between their centers
	var dist = (this.x - particleList[i].x)*(this.x - particleList[i].x) + (this.y - particleList[i].y)*(this.y - particleList[i].y);
	if(dist <= radSum) {
	    //if the distance between them is less than their radii, they intersect
//	    console.log("Sum of radii: " + radSum);
//	    console.log("Distance between particles: " + dist);
	    console.log("Intersection at " + i + " !");
	    this.stuck = true;
	}
    }
}

    //render the particle
Particle.prototype.render = function() {
    ctx.beginPath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.arc(this.x,this.y,this.rad,0,2*Math.PI,true);
    ctx.stroke();

}

function computeR(pos_x, pos_y, particleRadius) {
    var rr = Math.sqrt((pos_x - width/2)*(pos_x - width/2) + (pos_y - height/2)*(pos_y - height/2)) + particleRadius;
    return rr;
}
    
function drawMaxR() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,width,height);
    
    for(i = 0; i < particleList.length - 1; i++) {
	particleList[i].render();
    }

    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.arc(width/2,height/2,maxR,0,2*Math.PI,true);
    ctx.stroke();
}