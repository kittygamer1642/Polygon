var platformColor = '#666';

levels = {
    1: {
        platforms: [
            {x: 0, y: -25, width: 400, height: 25, color: platformColor},
        ],
        spawnPoint: {x: 0, y: 25},
        levelEnd: {x: 400, y: -25, width: 200, height: 25, color: '#0f0'}
    },
    2: {
        platforms: [
            {x: 0, y: -12, width: 400, height: 25, color: platformColor},
            {x: 350, y: -25, width: 200, height: 25, color: platformColor},
            {x: 250, y: 110, width: 100, height: 25, color: platformColor},
            {x: 500, y: 60, width: 100, height: 25, color: platformColor}
        ],
        spawnPoint: {x: 0, y: 25},
        levelEnd: {x: 150, y: 150, width: 50, height: 25, color: '#0f0'}
    },
    3: {
        platforms: [
            {x: 0, y: 0, width: 100, height: 25, color: platformColor},
        ],
        lava: [
            {x: 150, y: 25, width: 100, height: 25, color: '#f00'},
        ],
        spawnPoint: {x: 0, y: 25},
        levelEnd: {x: 250, y: 25, width: 50, height: 25, color: '#0f0'}
    },
    end: {
        platforms: [
            {x: 0, y: 0, width: 100, height: 25, color: platformColor},
        ],
        spawnPoint: {x: 0, y: 25},
        levelEnd: {x: 0, y: 1000, width: 200, height: 25, color: '#0f0'}

    }
}

function loadLevel(level) {
    if (levels[level]) {
        Matter.Body.setPosition(player, levels[level].spawnPoint);
        Matter.Body.setVelocity(player, {x: 0, y: 0});

        // platforms
        platforms = [];
        levels[level].platforms.forEach(p => {
            let platform = createPlatform(centerX + p.x, centerY - p.y, p.width, p.height, p.color);
            platforms.push(platform);
            Composite.add(world, platform);
        });

        // hazards
        if (levels[level].lava) {
            levels[level].lava.forEach(h => {
                let hazard = Bodies.rectangle(centerX + h.x, centerY - h.y, h.width, h.height, {
                    label: 'hazard',
                    isStatic: true,
                    render: { fillStyle: h.color }
                });
                Composite.add(world, hazard);
            });
        }
        
        spawn = levels[level].spawnPoint;
        spawnPoint = {x: centerX + spawn.x, y: centerY - spawn.y};

        // level end
        let end = levels[level].levelEnd;
        let levelEnd = Bodies.rectangle(centerX + end.x, centerY - end.y, end.width, end.height, {
            label: 'levelEnd',
            isStatic: true,
            render: { fillStyle: end.color }
        });

        Composite.add(world, levelEnd);
        Matter.Body.setPosition(player, spawnPoint);
        console.log('Loaded level ' + level);
        document.getElementById('levelText').innerText = 'Level ' + level;
    } else {
        throw new Error('Level not found: ' + level);
    }
}

function lastLevel() {
    if (currentLevel > 1) {
        Composite.clear(world); // clear world of all bodies
        Composite.add(world, [player]); // add player back to world
        currentLevel--;
        loadLevel(currentLevel);
    }
}

function nextLevel() {
    if (currentLevel < highestLevel || debug) {
        Composite.clear(world); // clear world of all bodies
        Composite.add(world, [player]); // add player back to world
        currentLevel++;

        try {
            loadLevel(currentLevel);
            document.getElementById('levelText').innerText = 'Level ' + currentLevel;
        } catch (error) {
            console.log('loaded end level, no more levels to load');
            loadLevel('end');
            currentLevel = 'end';
            document.getElementById('levelText').innerText = 'The End';
        }
    }
}

let highestLevel = 1; // track highest level reached for nextLevel function
let currentLevel = 1; // track current level for UI and level loading

loadLevel(1); // load first level