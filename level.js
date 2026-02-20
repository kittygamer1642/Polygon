var platformColor = '#666';

levels = {
    1: {
        platforms: [
            {x: centerX, y: height - 25, width: 400, height: 25, color: platformColor},
        ],
        spawnPoint: {x: centerX, y: centerY - 20},
        levelEnd: {x: centerX + 400, y: height - 50, width: 200, height: 25, color: '#0f0'}
    },
    2: {
        platforms: [
            {x: centerX, y: height - 25, width: 400, height: 25, color: platformColor},
            {x: centerX + 400, y: height - 50, width: 200, height: 25, color: platformColor},
            {x: centerX + 250, y: height - 200, width: 100, height: 25, color: platformColor},
            {x: centerX + 500, y: height - 130, width: 100, height: 25, color: platformColor}
        ],
        spawnPoint: {x: centerX, y: centerY + 20},
        levelEnd: {x: centerX + 150, y: height - 300, width: 50, height: 25, color: '#0f0'}
    },
    3: {
        platforms: [
            {x: centerX, y: height - 25, width: 400, height: 25, color: platformColor},
        ],
        lava: [
            {x: centerX + 100, y: height - 50, width: 100, height: 25, color: '#f00'},
        ],
        spawnPoint: {x: centerX, y: centerY - 20},
        levelEnd: {x: centerX + 400, y: height - 50, width: 200, height: 25, color: '#0f0'}
    }
}

function loadLevel(level) {
    if (levels[level]) {
        Matter.Body.setPosition(player, levels[level].spawnPoint);
        Matter.Body.setVelocity(player, {x: 0, y: 0});

        // platforms
        platforms = [];
        levels[level].platforms.forEach(p => {
            let platform = createPlatform(p.x, p.y, p.width, p.height, p.color);
            platforms.push(platform);
            Composite.add(world, platform);
        });

        // hazards
        if (levels[level].lava) {
            levels[level].lava.forEach(h => {
                let hazard = Bodies.rectangle(h.x, h.y, h.width, h.height, {
                    label: 'hazard',
                    isStatic: true,
                    render: { fillStyle: h.color }
                });
                Composite.add(world, hazard);
            });
        }

        spawnPoint = levels[level].spawnPoint;

        // level end
        let end = levels[level].levelEnd;
        let levelEnd = Bodies.rectangle(end.x, end.y, end.width, end.height, {
            label: 'levelEnd',
            isStatic: true,
            render: { fillStyle: end.color }
        });

        Composite.add(world, levelEnd);
    } else {
        console.error('Level not found:', level);
    }
}

function lastLevel() {
    if (currentLevel > 1) {
        Composite.clear(world); // clear world of all bodies
        Composite.add(world, [player]); // add player back to world
        currentLevel--;
        loadLevel(currentLevel);

        document.getElementById('levelText').innerText = 'Level ' + currentLevel;
        console.log('Loaded level ' + currentLevel);
    }
}

function nextLevel() {
    if (currentLevel < highestLevel || debug) {
        Composite.clear(world); // clear world of all bodies
        Composite.add(world, [player]); // add player back to world
        currentLevel++;
        loadLevel(currentLevel);

        document.getElementById('levelText').innerText = 'Level ' + currentLevel;
        console.log('Loaded level ' + currentLevel);
    }
}

let highestLevel = 1; // track highest level reached for nextLevel function
let currentLevel = 1; // track current level for UI and level loading
loadLevel(1); // load first level