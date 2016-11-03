var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var stars = [{LOCATION: {X: 100, Y: 100}, RADIUS: 25}];
var planets = [{LOCATION: {X: 15, Y: 25}, VELOCITY: {X: 1, Y: 0}, RADIUS: 5}];

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
    clearCanvas();

    for(var p = 0; p < planets.length; p++){
        var planet = planets[p];

        context.beginPath();
        context.fillStyle = 'green';
        context.arc(planet.LOCATION.X, planet.LOCATION.Y, planet.RADIUS, 0 , 2 * Math.PI);
        context.fill();
        context.stroke();

        planet.LOCATION.X += planet.VELOCITY.X;
        planet.LOCATION.Y += planet.VELOCITY.Y;

        console.log(calculateForce(planet, stars[0]));
    }

    for(var s = 0; s < stars.length; s++){
        var star = stars[s];

        context.beginPath();
        context.fillStyle = 'red';
        context.arc(star.LOCATION.X, star.LOCATION.Y, star.RADIUS, 0 , 2 * Math.PI);
        context.fill();
        context.stroke();
    }


    console.log(calculateDistance(planets[0].LOCATION, stars[0].LOCATION));
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
}

function update(){

}

const GRAVITY = 9.8;
function calculateForce(planet, star){
    return GRAVITY * calculateMass(star.RADIUS) * calculateMass(planet.RADIUS) / Math.pow(calculateDistance(planet.LOCATION, star.LOCATION), 2);
}

function calculateMass(radius){
    return Math.abs(Math.pow(Math.pow(radius, 5), 1/4));
}

function calculateDistance(locOne, locTwo){
    return Math.sqrt(Math.pow(locTwo.X - locOne.X, 2) + Math.pow(locTwo.Y - locOne.Y, 2));
};


requestAnimationFrame(render);