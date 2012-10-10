

var interval;
var width, height;
var canvas, ctx;
var minRadius = 3;
var maxAdditionalRadius = 10;
var particleList = new Array();
var particleNo1;

function setup() {
    width = 800;
    height = 600;
    canvas = document.getElementById("scrawl");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,width,height);
    interval = setInterval(draw,50);
    particleList[0] = new Particle(width/2,height/2);
    particleList[0].render();
}
    

function draw() {
    
    particleList[particleList.length] = new Particle(width*Math.random(),height*Math.random());
    
}


function Particle(pos_x, pos_y) {
    //properties of the particle
    this.x = pos_x;
    this.y = pos_y;
    this.rad = minRadius; //+ maxAdditionalRadius*Math.random();

    //diffuse the particle, detect if we've hit the 
    this.diffuse = function() {
    }

    //decide if the particle sticks
    this.stick = function() {
    }

    //render the particle
    this.render = function() {
	ctx.beginPath();
	ctx.fillStyle = "rgba(255,255,255,1.0)"
	ctx.arc(this.x,this.y,this.rad,0,2*Math.PI,true);
	ctx.fill();
    }
}