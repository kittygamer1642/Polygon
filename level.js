var platformColor = '#666';

levels = {
    1: {
        platforms: [
            {x: centerX, y: height - 25, width: 400, height: 25, color: platformColor},
            {x: centerX + 400, y: height - 50, width: 200, height: 25, color: platformColor},
            {x: centerX + 250, y: height - 200, width: 100, height: 25, color: platformColor},
            {x: centerX + 500, y: height - 150, width: 100, height: 25, color: platformColor}
        ],
        spawnPoint: {x: centerX, y: centerY - 20},
        levelEnd: {x: centerX + 500, y: height - 175, width: 50, height: 25, color: '#0f0'}
    },
    2: {
        platforms: [
            {x: centerX, y: height - 25, width: 400, height: 25, color: platformColor},
            {x: centerX + 400, y: height - 50, width: 200, height: 25, color: platformColor},
        ],
        spawnPoint: {x: centerX, y: centerY - 20},
        levelEnd: {x: centerX + 400, y: height - 75, width: 50, height: 25, color: '#0f0'}
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

let currentLevel = 1;
loadLevel(1); // load first level