let joyX = 0;

let debug = false;

// movement buttons
let left = false;
let right = false;
let jump = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        left = true;
    }
    if (event.key === 'd') {
        right = true;
    }
    if (event.key === 'w') {
        jump = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'a') {
        left = false;
    }
    if (event.key === 'd') {
        right = false;
    }
    if (event.key === 'w') {
        jump = false;
    }
});

function killPlayer() {
    Matter.Body.setPosition(player, spawnPoint);
    Matter.Body.setVelocity(player, {x: 0, y: 0});
}

// move player outside event listeners for smoother movement
function move() {
    // calculate direction of movement
    joyX = 0;
    if (left) {joyX -= 4;} else {joyX += 0;}
    if (right) {joyX += 4;} else {joyX -= 0;}
    
    // apply force to player for horizontal movement
    Matter.Body.setVelocity(player, {x: joyX, y: player.velocity.y});
    Matter.Body.setAngularVelocity(player, 0);
    
    // downward raycast for ground detection
    let startPoint = player.position;
    let direction = {x: 0, y: 26};
    let endPoint = {
        x: startPoint.x + direction.x,
        y: startPoint.y + direction.y
    };
    let standingOn = Matter.Query.ray(engine.world.bodies, startPoint, endPoint, 24.5);
    standingOn = standingOn.filter(body => body.label !== player.label);
    
    if (debug) {
        document.getElementById('collision').innerText = standingOn;
        document.getElementById('position').innerText = player.position.y;
    }
    
    // jump logic
    if (jump) {
        if (standingOn.length > 1) {
            Matter.Body.setVelocity(player, {x: player.velocity.x, y: -8});
            document.getElementById('jumpSound').play();
        }
    }
}

function update() {
    if (player.position.y < 1000) {
        move();
    } else {
        killPlayer();
        console.log('Player fell in void.');
    }
}

function onCollision(event) {
    let pairs = event.pairs;
    
    pairs.forEach(pair => {
        if (pair.bodyA.label === 'player' || pair.bodyB.label === 'player') {
            document.getElementById('impactSound').play();
            console.log('Player collided with ' + (pair.bodyA.label === 'player' ? pair.bodyB.label : pair.bodyA.label));
        }
    });
}

Matter.Events.on(engine, 'collisionStart', onCollision);

setInterval(update, 1);