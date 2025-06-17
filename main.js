document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buttonsbx .btn');

    console.log(buttons);

    // 버튼 클릭하면 imgbx:fisrt-of-type url 변경 + active 클래스 부여
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if(button.classList.contains('active')) {
                
            } else {

            }
        })
    });

    // 이미지 시퀀스 기능 추가
    // let idx = 0;

    // function sequenceInit() {
    //    let imgLoad = 0;
    //    let imgCount = 0;
    //    for(let i = 0; i < imgCount; i++){
    //     let imgTemp = new Image();
    //     imgTemp.src = `./assets/frames/lifes-good-campaign-2025-live-human-lgcom-ai-home-frame-thinq-${idx}.png`;

    //     imgCount++;
    //     if(imgCount === imgLoad){
    //         // 
    //     }
    //    }
    // }

    // function sequence(){
    //     setTimeout(() => {

    //     }, 100)
    // }
    
});

