var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var planets = [{X: 100, Y: 100, RADIUS: 25}];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = function(event){
    canvas.width = event.srcElement.innerWidth;
    canvas.height = event.srcElement.innerHeight;
};

var globalID;
var lastTime = new Date().getTime(), tick = new Date().getTime();
var delta = 0, targetUps = 1000 / 60, frames = 0, updates = 0;

function render() {
    var now = new Date().getTime();
    delta += (now - lastTime) / targetUps;
    lastTime = now;

    if (delta >= 1) {
        updates++;
        delta--;

        update();
    }

    draw();
    frames++;

    if (now - tick > 1000) {
        tick = now;
        frames = 0;
        updates = 0;
    }

    globalID = requestAnimationFrame(render);
}

function draw(){
    for(var p = 0; p < planets.length; p++){
        var planet = planets[p];

        console.log("HERE");

        context.beginPath();
        context.fillStyle = 'green';
        context.arc(planet.X, planet.Y, planet.RADIUS, 0 , 2 * Math.PI);
        context.fill();
        context.stroke();
    }
}

function update(){

}

const GRAVITY = 9.8;
function calculateForce(pRadius, sRadius){
    return GRAVITY * calculateMass(pRadius) * calculateMass(sRadius) / (sRadius * pRadius);
}

function calculateMass(radius){
    return Math.abs(Math.pow(Math.pow(radius, 5), 1/4));
}

console.dir(calculateForce(5, 25 ));
console.dir(calculateMass(25));

requestAnimationFrame(render);