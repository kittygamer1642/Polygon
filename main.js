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

console.log(centerX);
console.log(centerY);

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

// player
var player = Bodies.rectangle(centerX, centerY - 20, 25, 25, {
    label: 'player',
    render: { fillStyle: '#0000ff' }
});
let spawnPoint = {x: centerX, y: centerY - 20};

// platforms
var platform1 = Bodies.rectangle(centerX, height - 25, 400, 25, {label: 'platform1', isStatic: true});

Composite.add(world, [player, platform1]);

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

setInterval(scroll, 1); // move camera to follow player
