// ハートをクリック文字の回転
document.querySelector('.main-content__subscription__pc__text')?.animate(
    [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(360deg)' }
    ],
    {
        duration: 9000,
        easing: 'linear',
        iterations: Infinity
    }
)
// ハートホバーイベント
function changeColor() {
    let attribute = document.querySelector('.main-content__subscription__pc__heart') as unknown as HTMLElement;
    attribute?.setAttribute('src', 'img/icon_heart_hover.svg');
}
function revertColor() {
    let attribute = document.querySelector('.main-content__subscription__pc__heart') as unknown as HTMLElement;
    attribute?.setAttribute('src', 'img/icon_heart.svg');
}
// メニューボタン
function showMenu() {
    let menu = document.getElementById('menu') as unknown as HTMLElement;
    menu.classList.remove('menu-animation-hide');
    menu.classList.add('menu-animation-show');
}
function hideMenu() {
    let menu = document.getElementById('menu') as unknown as HTMLElement;
    menu.classList.remove('menu-animation-show');
    menu.classList.add('menu-animation-hide');
}
// 掛け声
async function shoutBalloon(from:number, to:number):Promise<void> {
    const innerHeight = window.innerHeight - 300;
    const innerWidth = window.innerWidth - 300;
    let idName = "";
    let shoutBalloonFlag = true;

    while(shoutBalloonFlag) {
        idName = "shoutBalloon" + ( Math.floor(Math.random() * (to - from + 1)) + from );
        const shoutBalloonProc = document.getElementById(idName);
        let left = 0
        while(true) {
            left = Math.floor(Math.random() * innerWidth) + 1;
            if (innerWidth < 640) {
                if (left < (innerWidth * 0.1) || left > (innerWidth * 0.7)) {
                    break
                }
            } else {
                if (left < (innerWidth * 0.3) || left > (innerWidth * 0.6)) {
                    break
                }
            }
        }
        const top = Math.floor(Math.random() * innerHeight) + 1;
        shoutBalloonProc!.style.left = left + "px";
        shoutBalloonProc!.style.top = top + "px";
        await fadeInBalloon(shoutBalloonProc!,left,top);
        await delay(1750).then(() => {
            fadeOutBalloon(shoutBalloonProc!)
        })
    }
}
// 値段コンテンツ高さ調整
function setPriceHeight() {
    const windowWidth = window.innerWidth;
    let price = document.getElementById("price");
    if ( windowWidth <= 1280 && windowWidth >= 640 ) {
        price!.style.height = ( ( windowWidth * 3 ) - ( ( ( windowWidth - 640 ) / 640 ) ) * 1000 ) + "px";
    } else if ( windowWidth < 640 ) {
        price!.style.height = ( ( windowWidth * 3 ) - ( ( ( windowWidth - 640 ) / 640 ) ) * 1000 ) + "px";
    }
}

function delay(time:number) {
    return new Promise(resolve => setTimeout(resolve, time));
}
function fadeInBalloon(shoutBalloon:HTMLElement, left:number, top:number):void {
    let opacity = 0;
    switch (shoutBalloon?.dataset.type) {
        case "emotional":
            const intervalId = setInterval(function() {
                opacity += 0.1;
                shoutBalloon!.style.opacity = String(opacity);
                if (opacity >= 1) {
                    clearInterval(intervalId);
                }
            }, 100);
            break;

        case "vigor":
            shoutBalloon.style.opacity = "1";
            delay(50).then(() => {
                shoutBalloon!.style.top = ( top + 5 ) + "px";
                shoutBalloon!.style.left = ( left + 5 ) + "px";
                delay(50).then(() => {
                    shoutBalloon!.style.top = ( top - 5 ) + "px";
                    shoutBalloon!.style.left = ( left - 5 ) + "px";
                })
            })
            break;
    }
}
function fadeOutBalloon(shoutBalloon:HTMLElement):void {
    let opacity = 1;
    const intervalId1 = setInterval(function() {
        opacity -= 0.1;
        shoutBalloon!.style.opacity = String(opacity);
        if (opacity <= 0) {
            clearInterval(intervalId1);
        }
    }, 100);
}
function vigorMotion(elementIdProc:HTMLElement, num:number) {
    elementIdProc!.style.top = ""
    elementIdProc!.style.left = ""
    elementIdProc!.style.top = num + "px";
    elementIdProc!.style.left = ( num / 2 ) + "px";
}
function scrollAddClass(elementIdProc:HTMLElement, scrollTop:number, addClass:string, fadeInNumber:number) {
    const addClassProc:string[] = [addClass]
    // 要素の先頭までの距離を取得
    const rect = elementIdProc.getBoundingClientRect().top;                   
    // 天井からの距離を取得
    const scroll = window.pageYOffset || document.documentElement.scrollTop;    
    const offset = rect + scroll;
    if( scroll > offset - scrollTop + fadeInNumber ) {
        elementIdProc?.classList.add(addClassProc[0]);
    }
}
function main():void {
    let shoutBalloonId = document.getElementById("shoutBalloon")
    let introductionBalloon = document.getElementById("introductionBalloon");
    let howToBalloon = document.getElementById("howToBalloon");
    let priceBalloon = document.getElementById("priceBalloon");
    let answerBalloon = document.getElementById("answerBalloon");
    // 現在のブラウザの高さを取得
    const windowHeight = window.innerHeight;

    setTimeout(() => {
        shoutBalloon(1,7);
      
        setTimeout(() => {
            shoutBalloon(8,14);

            setTimeout(() => {
                shoutBalloon(15,21);

            }, 500);
        }, 500);
    }, 500);

    setPriceHeight();

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const targetTop = shoutBalloonId!.getBoundingClientRect().top;
        const opacity = 1 - (scrollTop - targetTop) / 1000;
        shoutBalloonId!.style.opacity = String(opacity);

        scrollAddClass(introductionBalloon!,windowHeight,'balloonAnimation',750)
        scrollAddClass(howToBalloon!,windowHeight,'balloonAnimation',750)
        scrollAddClass(priceBalloon!,windowHeight,'balloonAnimation',750)
        scrollAddClass(answerBalloon!,windowHeight,'fadeInAnimation',500)

    });
}
main();