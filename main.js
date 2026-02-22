var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

var engine = Engine.create();
var world = engine.world;

let width = window.innerWidth;
let height = window.innerHeight;

let centerX = (width / 2);
let centerY = (height / 2);

console.log('Polygon v1.0');

console.log(width, height);
console.log(centerX, centerY);

var render = Render.create({
    canvas: document.getElementById('game'),
    engine: engine,
    options: {
        width: width,
        height: height,
        backplatform1: '#fafafa',
        hasBounds: true,
        wireframes: false,
        showAngleIndicator: false
    }
});

Render.run(render);

var runner = Runner.create();
Runner.run(runner, engine);

// platforms
function createPlatform(x, y, width, height, color, label='platform') {
    let platform = Bodies.rectangle(x, y, width, height, {
        label: label,
        isStatic: true,
        render: { fillStyle: color }
    });
    platforms.push(platform);
    return platform;
}

// player
var player = Bodies.rectangle(centerX, centerY - 20, 25, 25, {
    label: 'player',
    render: { fillStyle: '#0000ff' }
});

Composite.add(world, [player]); // add player to world

let camX = 0;
let camY = 0;
let camSpeed = 0.1;

function scroll() {
    let newCamX = player.position.x - centerX;
    let newCamY = player.position.y - centerY;
    
    camX += (newCamX - camX) * camSpeed;
    camY += (newCamY - camY) * camSpeed;
    
    Matter.Bounds.shift(render.bounds, { x: camX, y: camY });
}

addEventListener('resize', function(event) {
    width = window.innerWidth;
    height = window.innerHeight;
    centerX = (width / 2);
    centerY = (height / 2);

    render.canvas.width = width;
    render.canvas.height = height;

    Render.run(render);

});

setInterval(scroll, 1); // move camera to follow player
