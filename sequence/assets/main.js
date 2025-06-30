document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buttonsbx .btn');
    const bgCircle = document.querySelector('.bg-circle');
    let idx = 0;

    // 버튼 클릭 이벤트
    buttons.forEach((button) => {
        const container = document.querySelector('.contents-wrapper');
        const imgbx = document.querySelector('.imgbx:first-of-type img');
        const txts = document.querySelectorAll('.txtbx .txt');
        const titles = document.querySelectorAll('.titlebx .title');


        button.addEventListener('click', (e) => {
            const target = e.currentTarget;
            const siblings = target.parentElement.querySelectorAll('.active');
            const index = target.getAttribute('data-index');
            idx = index;

            siblings.forEach((sibling) => {
                sibling.classList.remove('active');
            });

            target.classList.add('active');

            if (index == 0) {
                container.style.backgroundImage = 'url(./assets/images/lifes-good-campaign-2025-live-human-lgcom-ai-home-img-thinq-on-01-desktop.png)';
                imgbx.src = './assets/images/lifes-good-campaign-2025-live-human-lgcom-ai-home-img-thinq-on-tab-icon-01.png';
                bgCircle.classList.remove('active');
                animation.restart();

            } else {
                container.style.backgroundImage = 'url(./assets/images/lifes-good-campaign-2025-live-human-lgcom-ai-home-img-thinq-on-02-desktop.png)';
                imgbx.src = './assets/images/lifes-good-campaign-2025-live-human-lgcom-ai-home-img-thinq-on-tab-icon-02.png';
                bgCircle.classList.add('active');
                animation.restart();
            }

            txts.forEach((txt, i) => {
                txt.classList.toggle('active', i == index);
            });

            titles.forEach((title, i) => {
                title.classList.toggle('active', i == index);
            });
        })
    });

    // GSAP 애니메이션
    const animation = gsap.timeline({
            paused: true,
        })
        .fromTo(bgCircle, {
            opacity: 0,
            scale: 6,
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'linear',
            onComplete: () => {
                bgCircle.style.opacity = 0;
            },
            onStart: () => {
                bgCircle.style.opacity = 1;
            }
        })

    // 이미지 시퀀스
    const targetImg = document.querySelector('.sequence-bx img');
    const frames = [];
    const totalFrames = 38;

    for (let i = 0; i < totalFrames; i++) {
        frames.push(`./assets/frames/lifes-good-campaign-2025-live-human-lgcom-ai-home-frame-thinq-${String(i).padStart(3, '0')}.png`);
    }

    let currentFrame = 0;
    let direction = 1;
    let lastTime = 0;
    const dealyTime = 35;

    function playSequence(currentTime) {
        if (currentTime - lastTime >= dealyTime) {
            targetImg.src = frames[currentFrame];
            currentFrame += direction;

            if (currentFrame >= totalFrames - 1 || currentFrame <= 0) {
                direction *= -1;
            }

            lastTime = currentTime;
        }

        requestAnimationFrame(playSequence);
    }

    requestAnimationFrame(playSequence);
});