const curtain = document.getElementById('curtain');
const music = document.getElementById('bgMusic');

function openInvitation() {

    curtain.classList.add('open');

    document.body.classList.remove('lock');

    music.play()
        .then(() => {
            console.log('Music started');
        })
        .catch(err => {
            console.error(err);
        });

    setTimeout(() => {
        curtain.remove();
    }, 1400);
}

document
    .getElementById('seal')
    .addEventListener('click', openInvitation);

const musicBtn = document.getElementById('musicBtn');

musicBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicBtn.textContent = '🔊';
    } else {
        music.pause();
        musicBtn.textContent = '🔇';
    }
});