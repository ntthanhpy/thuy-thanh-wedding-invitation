const curtain = document.getElementById('curtain');
const music = document.getElementById('bgMusic');

curtain.addEventListener('click', async () => {
    curtain.classList.add('open');

    document.body.classList.remove('lock');

    try {
        await music.play();
    } catch (error) {
        console.error('Không thể phát nhạc:', error);
    }

    setTimeout(() => {
        curtain.remove();
    }, 1400);
});