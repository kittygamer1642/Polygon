function centerElements() {
    centerX = window.innerWidth / 2;
    centerY = window.innerHeight / 2;

    title = document.getElementById('title');
    title.style.left = (centerX - title.offsetWidth / 2) + 'px';
    title.style.top = (centerY - 60) + 'px';

    startButton = document.getElementById('startButton');
    startButton.style.left = (centerX - startButton.offsetWidth / 2) + 'px';
    startButton.style.top = (centerY + 80) + 'px';

    instructionsButton = document.getElementById('instructionsButton');
    instructionsButton.style.left = (centerX - instructionsButton.offsetWidth / 2) + 'px';
    instructionsButton.style.top = (centerY + 130) + 'px';
}

centerElements();
window.addEventListener('resize', centerElements);