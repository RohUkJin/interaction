document.addEventListener('DOMContentLoaded', () => {
    let scale = 2.1;

    const mediaQueries = {
        mobile: window.matchMedia("(max-width: 768px)"),
        tablet: window.matchMedia("(min-width: 769px) and (max-width: 1440px)"),
        desktop: window.matchMedia("(min-width: 1441px)")
    };

    function updateScale() {
        if (mediaQueries.desktop.matches) {
            scale = 2
        } else if (mediaQueries.tablet.matches) {
            scale = 2
        } else {
            scale = 1
        }
    }

    updateScale();

    gsap.registerPlugin(ScrollTrigger);

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

    const productSections = document.querySelectorAll('.sc-product');

    productSections.forEach((section, index) => {
        const productImgbx = section.querySelector('.imgbx');
        const productInner = section.querySelector('.inner');
        const productImgbxText = section.querySelector('.imgbx .after p');
        const hasVideo = section.querySelector('video');

        const productTl = gsap.timeline({})

        productTl
            .fromTo(productImgbx, {
                scale: scale,
            }, {
                scale: 1,
                scrollTrigger: {
                    trigger: section,
                    start: '55% 100%',
                    end: '+=1200',
                    scrub: true,
                    // markers: true,
                    onUpdate: (e) => {
                        if (e.progress >= 0.5) {
                            if (hasVideo) {
                                hasVideo.play();
                            }
                        } else {
                            if (hasVideo) {
                                hasVideo.pause();
                            }
                        }
                    }
                },
                onStart: () => {
                    productImgbx.classList.add('active');
                    productInner.classList.add('active');
                },
                onReverseComplete: () => {
                    productImgbx.classList.remove('active');
                    productInner.classList.remove('active');

                    if (hasVideo) {
                        hasVideo.currentTime = 0;
                        hasVideo.pause();
                    }
                },
            })
            .to(productImgbxText, {
                yPercent: 100,
                opacity: 0,
                scrollTrigger: {
                    trigger: section,
                    start: '50% 100%',
                    end: '55% 100%',
                    scrub: true,
                }
            }, "<")

        const upAnimationEl = section.querySelectorAll('[data-animation]');

        const txtAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: '65% 50%',
                end: '90% 80%',
                scrub: true,
                // markers: true,
            }
        });

        txtAnimation
            .fromTo(upAnimationEl, {
                opacity: 0,
                yPercent: 20,
            }, {
                duration: 1,
                yPercent: 0,
                opacity: 1,
                stagger: 1,
            })
    });

    const exploreSwiper = document.querySelector(".swiper");

    if (exploreSwiper) {
        const swiperOptions = {
            slidesPerView: 'auto',
            spaceBetween: 15,
        }
        const swiperInstance = new Swiper(exploreSwiper, swiperOptions);
    }

    // 모달
    const modal = document.getElementById('imageModal');
    const modalSwiperWrapper = document.getElementById('modalSwiperWrapper');
    const modalClose = document.querySelector('.modal-close');
    let modalSwiperInstance = null;
    let modalThumbnailInstance = null;

    // 제품별 슬라이드 데이터
    const productSlideData = {
        oled: [{
                title: "LG OLED",
                subTitle: "Complete your AI experience with AI Magic Remote featuring a dedicated AI button.",
                description: "Control your TV easily with AI magic remote - no extra device needed! Simple but powerful click, drag and drop functions make using webOS intuitive and easy to operate.",
                image: "./assets/images/lifes-good-campaign-2025-live-human-lgcom-ai-home-img-img-01-01.png"
            },
            {
                title: "LG OLED",
                subTitle: "AI Voice ID with My Profile syncs to you",
                description: "LG AI Voice ID knows each user’s unique voice signature and offers personalized recommendations the moment you turn it on and speak.",
                image: "./assets/images/lifes-good-campaign-2025-live-human-lgcom-ai-home-img-img-01-02.png"
            },
            {
                title: "LG OLED",
                subTitle: "Speak to your remote, find what you’re looking for with AI Search",
                description: "Ask your TV anything. Built-in AI recognizes your voice and swiftly provides personalized recommendations to your requests. You can also get additional results and solutions with Microsoft Copilot.",
                image: "./assets/images/lifes-good-campaign-2025-live-human-lgcom-ai-home-img-img-01-03.png"
            },
            {
                title: "LG OLED",
                subTitle: "Solve requests in real-time with AI Chatbot",
                description: "Have your own AI Chatbot actively resolve and help you with your requests. Simply speak to your TV as it can classify your intentions and respond accordingly.",
                image: "./assets/images/lifes-good-campaign-2025-live-human-lgcom-ai-home-img-img-01-04.png"
            },
            {
                title: "LG OLED",
                subTitle: "Enjoy one-click personalized recommendations with AI Concierge",
                description: "One short press on the AI button on your remote opens up your AI Concierge which provides customized keywords and recommendations based on your search and watching history.",
                image: "./assets/images/lifes-good-campaign-2025-live-human-lgcom-ai-home-img-img-01-05.png"
            }
        ],
        washtower: [{
                title: "LG WashTower",
                subTitle: "AI Wash",
                description: "AI Wash optimizes washing motions based on the laundry type. It can help achieve improved fabric care and energy savings with soft fabrics.",
                image: "./assets/images/lifes-good-campaign-2025-live-human-lgcom-ai-home-img-img-02-01.png"
            },
            {
                title: "LG WashTower",
                subTitle: "LG AI Washing machine",
                description: "For 26 years, LG’s washing machines have pushed the boundaries of innovation. Experience the future of laundry, where AI reaches the very core of home appliances. AI to the Core, Easy Laundry.",
                image: "./assets/images/lifes-good-campaign-2025-live-human-lgcom-ai-home-img-img-02-02.png"
            }
        ]
    };

    // 현재 활성화된 제품 데이터
    let currentSlideData = productSlideData.oled;

    // 썸네일 스와이퍼 생성 함수
    function createThumbnailSwiper() {
        const modalContent = document.querySelector('.modal-content');

        // 기존 썸네일 스와이퍼가 있다면 제거
        const existingThumbnail = modalContent.querySelector('.modal-thumbnail-swiper');
        if (existingThumbnail) {
            existingThumbnail.remove();
        }

        // 썸네일 스와이퍼 컨테이너 생성
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.classList.add('modal-thumbnail-swiper');

        const thumbnailWrapper = document.createElement('div');
        thumbnailWrapper.classList.add('swiper-wrapper');
        thumbnailWrapper.id = 'modalThumbnailWrapper';

        // 현재 제품의 데이터로 썸네일 스와이퍼 생성
        currentSlideData.forEach((data, index) => {
            const thumbnailSlide = document.createElement('div');
            thumbnailSlide.classList.add('swiper-slide');
            thumbnailSlide.innerHTML = `
                <button class="thumbnail-btn" data-index="${index}">
                    <img src="${data.image}" alt="썸네일 ${index + 1}">
                </button>
            `;
            thumbnailWrapper.appendChild(thumbnailSlide);
        });

        thumbnailContainer.appendChild(thumbnailWrapper);
        modalContent.appendChild(thumbnailContainer);

        return thumbnailWrapper;
    }

    // 모달 스와이퍼 슬라이드 생성 함수
    function createModalSlides() {
        modalSwiperWrapper.innerHTML = '';

        currentSlideData.forEach((data, index) => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `
                <div class="slide-info">
                    <h3 class="slide-title">${data.title}</h3>
                    <div class="slide-content">
                        <p class="slide-subtitle">${data.subTitle}</p>
                        <p class="slide-description">${data.description}</p>
                    </div>
                    <img src="${data.image}" alt="${data.title}" class="slide-image">
                </div>
                
            `;
            modalSwiperWrapper.appendChild(slide);
        });
    }

    // 썸네일 스와이퍼 초기화 함수
    function initThumbnailSwiper() {
        if (modalThumbnailInstance) {
            modalThumbnailInstance.destroy(true, true);
        }

        modalThumbnailInstance = new Swiper('.modal-thumbnail-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 10,
            grabCursor: true,
            freeMode: true,
            watchSlidesProgress: true,
        });

        // 썸네일 클릭 이벤트
        const thumbnailBtns = document.querySelectorAll('.thumbnail-btn');
        thumbnailBtns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetIndex = parseInt(btn.dataset.index);

                if (modalSwiperInstance) {
                    modalSwiperInstance.slideTo(targetIndex);
                }
                updateThumbnailActive(targetIndex);
            });
        });
    }

    // 썸네일 활성화 상태 업데이트
    function updateThumbnailActive(activeIndex) {
        const thumbnailBtns = document.querySelectorAll('.thumbnail-btn');
        thumbnailBtns.forEach((btn, index) => {
            if (index === activeIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // 모달 스와이퍼 초기화 함수
    function initModalSwiper(initialSlide = 0) {
        if (modalSwiperInstance) {
            modalSwiperInstance.destroy(true, true);
        }

        modalSwiperInstance = new Swiper('.modal-swiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            initialSlide: initialSlide,
            loop: false,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            centeredSlides: true,
            keyboard: {
                enabled: true,
            },
            touchRatio: 1,
            touchAngle: 45,
            grabCursor: true,
            speed: 700,
            autoHeight: false,
            on: {
                slideChange: function () {
                    updateThumbnailActive(this.activeIndex);
                    if (modalThumbnailInstance) {
                        modalThumbnailInstance.slideTo(this.activeIndex);
                    }
                }
            }
        });
    }

    // 모달 열기 함수
    function openModal(index, productType = 'oled') {
        currentSlideData = productSlideData[productType] || productSlideData.oled;

        createModalSlides();
        createThumbnailSwiper();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            initModalSwiper(index);
            initThumbnailSwiper();
            updateThumbnailActive(index);
        }, 300);
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';

        if (modalSwiperInstance) {
            modalSwiperInstance.destroy(true, true);
            modalSwiperInstance = null;
        }
        if (modalThumbnailInstance) {
            modalThumbnailInstance.destroy(true, true);
            modalThumbnailInstance = null;
        }
    }

    // 슬라이드 클릭 이벤트
    const swiperSlides = document.querySelectorAll('.swiper-slide');
    swiperSlides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
            const productSection = slide.closest('.sc-product');
            const productType = productSection ? productSection.dataset.product : 'oled';

            // 해당 섹션 내에서의 슬라이드 인덱스 계산
            const sectionSlides = productSection.querySelectorAll('.swiper-slide');
            const sectionIndex = Array.from(sectionSlides).indexOf(slide);

            openModal(sectionIndex, productType);
        });
    });

    // 모달 닫기 이벤트들
    modalClose.addEventListener('click', closeModal);

    // 오버레이 클릭 시 모달 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 리사이즈 함수
    function handleResize() {
        updateScale();
    }

    // 디바운스 함수
    function debounce(func, delay = 100) {
        let timer;
        return function (...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        }
    }

    window.addEventListener('resize', debounce(handleResize));
});