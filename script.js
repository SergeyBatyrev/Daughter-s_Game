// ПЕРЕМЕННЫЕ
let noclickJ = document.querySelector('.noclickJ');
let noclickH = document.querySelector('.noclickH');
let sobitie = document.querySelector('.sobitie');
let JumpBlock = document.getElementById('jump_block');
let HitBlock = document.getElementById('hit_block');
let canvas = document.getElementById('canvas');
let fsBtn = document.querySelector('#fsBtn');
let restartBtn = document.querySelector('#RestartBtn');
let HeroImg = document.querySelector('.imgHero');
let BG_Img = document.querySelector('.BG_img');
let imgBlock = document.querySelector('.Hero_Container');
let p = document.querySelector('p');
let tileArray = [];
let objectArray = [];
let enemiesArray = [];
let isRightSideBlocked = false;
let isLeftsideBlocked = false;
let wasHeroHit = false;
let f1WallArray = [[-1, 0], [14, 32], [42, 53], [64, 74], [92, 105], [130, 135]];
let f2WallArray = [[53, 63]];
let isWallRight = false;
let isWallLeft = false;
let heroStep = 3;
let finalTimerText = window.document.querySelector('#final-timer-text');


const compStyles = window.getComputedStyle(imgBlock);

let heroX = Math.floor((Number.parseInt(compStyles.getPropertyValue("left")) + 32) / 32);
let heroY = Math.floor((Number.parseInt(compStyles.getPropertyValue("bottom")) / 32) - 5);


let righPosition = 0;
let imgBlockPosition = 0;
let Description = 'right';
let hit = false;
let jump = false;
let fall = false;
let timer = null;
let maxLives = 12;
let lives = 12;
let heartsArray = [];
let x = 0;
let halfWidth = window.screen.width / 2;


// ФУНКЦИИ

const moveWorldLeft = () => {
    objectArray.map((elem, index) => {
        elem.style.left = Number.parseInt(elem.style.left) - 32 + 'px';
    });
    tileArray.map(elem => {
        elem[0] = elem[0] - 1;
    });
    enemiesArray.map(elem => elem.moveLeft());
    f1WallArray.map(elem => {
        elem[0] -= 1;
        elem[1] -= 1;
    });
    f2WallArray.map(elem => {
        elem[0] -= 1;
        elem[1] -= 1;
    });
};
const moveWorldRight = () => {
    objectArray.map((elem, index) => {
        elem.style.left = Number.parseInt(elem.style.left) + 32 + 'px';
    });
    tileArray.map(elem => {
        elem[0] = elem[0] + 1;
    });
    enemiesArray.map(elem => elem.moveRight());
    f1WallArray.map(elem => {
        elem[0] += 1;
        elem[1] += 1;
    });
    f2WallArray.map(elem => {
        elem[0] += 1;
        elem[1] += 1;
    });
};
const updateHeroXY = () => {
    heroX = Math.ceil((Number.parseInt(compStyles.getPropertyValue("left")) + 32) / 32);
    heroY = Math.ceil((Number.parseInt(compStyles.getPropertyValue("bottom")) - 5) / 32);
    p.innerText = `координаты Х:${heroX} координаты Y:${heroY}`;
};
const checkFaling = () => {
    updateHeroXY();
    let isFoling = true;
    for (let i = 0; i < tileArray.length; i++) {
        tileArray[i][0]
        if ((tileArray[i][0]) === heroX && ((tileArray[i][1]) + 1) === heroY) {
            isFoling = false;
        }
    }
    if (isFoling) {
        p.innerText = p.innerText + ', Falling';
        fall = true;

    }
    else {
        p.innerText = p.innerText + ', Not Falling';
        fall = false;


    }
};
const fallHandler = () => {
    isWallRight = false;
    isWallLeft = false;
    // isLeftsideBlocked = false;
    // isRightSideBlocked = false;
    HeroImg.style.top = `-138px`;
    imgBlock.style.bottom = Math.floor(Number.parseInt(compStyles.getPropertyValue("bottom"))) - 32 + 'px';

    // if (Description == 'right') {
    //     imgBlockPosition = imgBlockPosition + 1;
    //     imgBlock.style.left = `${imgBlockPosition * 15}px`;
    // }
    // if (Description == 'left') {
    //     imgBlockPosition = imgBlockPosition - 1;
    //     imgBlock.style.left = `${imgBlockPosition * 15}px`;
    // }

    checkFaling();
};
const checkRightWallCollide = () => {
    isWallLeft = false;
    isWallRight = false;

    if (heroY === 1) {
        f1WallArray.map(elem => {
            if (heroX === elem[0] - 2) {
                isWallRight = true;
            }
        });
    }
    else if (heroY === 5) {
        f2WallArray.map(elem => {
            if (heroX === elem[0] - 2) {
                isWallRight = true;
            }
        });
    }
};
const checkLeftWallCollide = () => {
    isWallLeft = false;
    isWallRight = false;

    if (heroY === 1) {
        f1WallArray.map(elem => {
            if (heroX === elem[1]) {
                isWallLeft = true;
            }
        });
    }
    else if (heroY === 5) {
        f2WallArray.map(elem => {
            if (heroX === elem[1]) {
                isWallLeft = true;
            }
        });
    }
};
const rightHandler = () => {
    // if (!isRightSideBlocked) {
    // console.log(isRightSideBlocked);
    if (!isWallRight) {
        if (fall) {
            fallHandler();
        }
        else {
            Description = "right";
            HeroImg.style.transform = 'scale(1,1)';
            righPosition = righPosition + 1;
            imgBlockPosition = imgBlockPosition + 1;
            if (righPosition > 5) {
                righPosition = 0;
            }
            HeroImg.style.left = `-${righPosition * 126.25}px`;
            imgBlock.style.left = `${imgBlockPosition * heroStep}px`;
            HeroImg.style.top = `0px`;
            checkFaling();
            wasHeroHit = false;
            moveWorldLeft();
            checkRightWallCollide();
            // }
        }
    }

};
const leftHandler = () => {
    // if (!isLeftsideBlocked) {
    if (!isWallLeft) {
        if (fall) {
            fallHandler();
        }
        else {
            Description = 'left';
            HeroImg.style.transform = 'scale(-1,1)';
            righPosition = righPosition + 1;
            imgBlockPosition = imgBlockPosition - 1;
            if (righPosition > 5) {
                righPosition = 0;
            }
            HeroImg.style.left = `-${righPosition * 126.25}px`;
            imgBlock.style.left = `${imgBlockPosition * heroStep}px`;
            HeroImg.style.top = `0px`;
            checkFaling();
            wasHeroHit = false;
            moveWorldRight();
            checkLeftWallCollide();
            // }
        }
    }
};
const stayHandler = () => {
    HeroImg.style.top = `-276px`;
    switch (Description) {
        case 'right': {
            HeroImg.style.left = `0px`;
            break;
        }
        case 'left': {
            HeroImg.style.left = `-630px`;
            break;
        }
        default: break;
    }
    checkFaling();
};
const HitHandler = () => {
    switch (Description) {
        case 'right': {
            HeroImg.style.transform = 'scale(1,1)';
            if (righPosition > 2) {
                righPosition = 2;
                hit = false;
                wasHeroHit = true;
            }
            HeroImg.style.left = `-${righPosition * 126.25}px`;
            break;
        }
        case 'left': {
            HeroImg.style.transform = 'scale(-1,1)';
            if (righPosition > 2) {
                righPosition = 2;
                hit = false;
                wasHeroHit = true;
            }
            HeroImg.style.left = `${-630 + righPosition * 126.25}px`;
            break;
        }
        default: break;
    }
    HeroImg.style.top = `-414px`;
    righPosition = righPosition + 1;
};
const JumpHandler = () => {
    isWallLeft = false;
    isWallRight = false;

    switch (Description) {
        case 'right': {
            HeroImg.style.transform = 'scale(1,1)';
            if (righPosition > 5) {
                righPosition = 0;
                jump = false;
                break;
            }
            HeroImg.style.left = `-${righPosition * 126.25}px`;

            imgBlock.style.bottom = Math.floor(Number.parseInt(compStyles.getPropertyValue("bottom"))) + 32 + 'px';

            imgBlockPosition = imgBlockPosition + 1;
            imgBlock.style.left = `${imgBlockPosition * heroStep}px`;
            moveWorldLeft();

            break;
        }
        case 'left': {
            HeroImg.style.transform = 'scale(-1,1)';
            if (righPosition > 5) {
                righPosition = 0;
                jump = false;
                break;
            }
            HeroImg.style.left = `${-630 + righPosition * 126.25}px`;

            imgBlock.style.bottom = Math.floor(Number.parseInt(compStyles.getPropertyValue("bottom"))) + 32 + 'px';

            imgBlockPosition = imgBlockPosition - 1;
            imgBlock.style.left = `${imgBlockPosition * heroStep}px`;
            moveWorldRight();

            break;
        }
        default: break;
    }
    isLeftsideBlocked = false;
    isRightSideBlocked = false;
    HeroImg.style.top = `-138px`;
    righPosition = righPosition + 1;
};

// СОБЫТИЯ


HeroImg.onclick = (event) => {
    event.preventDefault();
};
JumpBlock.onclick = () => { jump = true; };
HitBlock.onclick = () => { hit = true; };
fsBtn.onclick = () => {
    if (window.document.fullscreen) {
        window.document.exitFullscreen();
        fsBtn.src = './pictures/fullscreen.png';
    }
    else {
        canvas.requestFullscreen();
        fsBtn.src = './pictures/cancel.png';
    }
};
restartBtn.onclick = () => {
    window.document.location.reload();
};
let onTouchStart = (event) => {
    clearInterval(timer);
    x = (event.type === 'mousedown') ? event.screenX : event.touches[0].screenX;
    timer = setInterval(() => {
        (x > halfWidth) ? rightHandler() : leftHandler();
    }, 100);

    // event.preventDefault();
};

let onTouchEnd = (event) => {
    // event.preventDefault();
    clearInterval(timer);
    righPosition = 0;
    lifeCycle();
};


sobitie.onmousedown = onTouchStart;
sobitie.ontouchstart = onTouchStart;
sobitie.onmouseup = onTouchEnd;
sobitie.ontouchend = onTouchEnd;

window.addEventListener('keydown', (event) => {
    if (!event.repeat) {
        clearInterval(timer);
        timer = setInterval(() => {
            if (event.code === 'KeyD') {
                Description = 'right';
                rightHandler();
            }
            else if (event.code === 'KeyA') {
                Description = 'left';
                leftHandler();
            };
        }, 100);
    }
    // event.preventDefault();
});
window.addEventListener('keyup', (event) => {
    if (event.code === 'KeyW') jump = true;
    if (event.code === 'KeyE') hit = true;
    clearInterval(timer);
    righPosition = 0;
    lifeCycle();
});

const lifeCycle = () => {
    timer = setInterval(() => {
        if (hit === true) {
            HitHandler();
            noclickJ.style.top = `${window.innerHeight / 2 - 144 / 2}
            px`;
            noclickH.style.top = `${window.innerHeight / 2 - 144 / 2}px`;
            sobitie.onmousedown = null;
            sobitie.ontouchstart = null;
            sobitie.onmouseup = null;
            sobitie.ontouchend = null;

        }
        else if (jump === true) {
            JumpHandler();
            noclickJ.style.top = `${window.innerHeight / 2 - 144 / 2}px`;
            noclickH.style.top = `${window.innerHeight / 2 - 144 / 2}px`;
            sobitie.onmousedown = null;
            sobitie.ontouchstart = null;
            sobitie.onmouseup = null;
            sobitie.ontouchend = null;
        }
        else if (fall) {
            fallHandler();
            noclickJ.style.top = `${window.innerHeight / 2 - 144 / 2}px`;
            noclickH.style.top = `${window.innerHeight / 2 - 144 / 2}px`;
            sobitie.onmousedown = null;
            sobitie.ontouchstart = null;
            sobitie.onmouseup = null;
            sobitie.ontouchend = null;
        }
        else {
            stayHandler();
            righPosition = 0;
            noclickJ.style.top = '-110px';
            noclickH.style.top = '-110px';
            sobitie.onmousedown = onTouchStart;
            sobitie.ontouchstart = onTouchStart;
            sobitie.onmouseup = onTouchEnd;
            sobitie.ontouchend = onTouchEnd;
        }

    },
        100);
}
let createTile = (x, y = 1) => {
    let tile = window.document.createElement('img');
    tile.src = './pictures/1 Tiles/Tile_02.png';
    tile.style.position = 'absolute';
    tile.style.left = x * 32 + 'px';
    tile.style.bottom = y * 32 + 'px';
    // tile.style.border = '1px red solid';
    canvas.appendChild(tile);
    objectArray.push(tile);
    tileArray.push([x, y]);
};

const createTileBlack = (x, y = 0,) => {
    let tileBlack = window.document.createElement('img');
    tileBlack.src = './pictures/1 Tiles/Tile_04.png';
    tileBlack.style.position = 'absolute';
    tileBlack.style.left = x * 32 + 'px';
    tileBlack.style.bottom = y * 32 + 'px';
    canvas.appendChild(tileBlack);
    objectArray.push(tileBlack);
};
const addTiles = (i) => {
    createTile(i);
    createTileBlack(i);
};
let createTilesPlatform = (startX, endX, floor) => {
    for (let x_pos = startX - 1; x_pos < endX; x_pos++) {
        createTile(x_pos, floor)
    }
};
const createTilesBlackBlock = (startX, endX, floor) => {
    for (let y_pos = 0; y_pos < floor; y_pos++) {
        for (let x_pos = startX - 1; x_pos < endX; x_pos++) {
            createTileBlack(x_pos, y_pos)
        }
    }
};

class Lever {
    LeverImg;
    x;
    y;
    updateTimer;
    finalTimer;
    time;
    dir;
    opacity;
    fontanImg;
    constructor() {
        this.x = heroX - 25;
        this.y = heroY;
        // this.x = 5;
        // this.y = 1;
        this.fontanImg = null;
        this.fontanImg = objectArray.filter(elem => elem.outerHTML.split('"')[1] === './pictures/3 Objects/Other/2.gif')[0];


        this.LeverImg = window.document.createElement('img');
        this.LeverImg.src = './pictures/lever.png';
        this.LeverImg.style.position = 'absolute';
        this.LeverImg.style.left = this.x * 32 + 'px';
        this.LeverImg.style.bottom = this.y * 32 + 'px';
        this.LeverImg.style.width = '64px';
        this.LeverImg.style.height = '64px';
        canvas.appendChild(this.LeverImg);

        enemiesArray.push(this);

        this.time = 30;
        this.dir = true;
        this.opacity = 1;
        this.updateTimer = setInterval(() => {
            if (heroX === this.x + 1 && heroY === this.y) {
                this.LeverImg.style.display = 'none';
                clearInterval(this.updateTimer);
                new Cutscene(['Скорее беги к фонтану!']);
            }
            else {
                this.animate();
            }

        }, 100);

        this.finalTimer = setInterval(() => {
            if (this.time <= 0) {
                finalTimerText.innerText = 'Game over';
                clearInterval(this.finalTimer);
            }
            else {
                finalTimerText.innerText = `${this.time}`;
                this.time--;
                console.log(heroX + ' a это лефт --- ' + (Number.parseInt(this.fontanImg.style.left)) / 32);
                if (heroX === (Number.parseInt(this.fontanImg.style.left)) / 32 || heroX === ((Number.parseInt(this.fontanImg.style.left)) / 32) + 1 || heroX === 12) {
                    new Terminal();
                    clearInterval(this.finalTimer);
                }

            }

        }, 1000);
    }
    animate() {
        (this.dir) ? this.opacity += 0.5 : this.opacity -= 0.5;
        this.LeverImg.style.opacity = 1 / this.opacity;
        if (this.opacity <= 0 || this.opacity >= 5) this.dir = !this.dir;
    }
    moveLeft() {
        this.LeverImg.style.left = Number.parseInt(this.LeverImg.style.left) - 32 + 'px';
        this.x -= 1;
    }
    moveRight() {
        this.LeverImg.style.left = Number.parseInt(this.LeverImg.style.left) + 32 + 'px';
        this.x += 1;
    }
}
class Cutscene {
    text;
    block;
    p;
    nextButton;
    scipButton;
    page;
    timer;
    constructor(text) {
        this.page = 0;
        this.text = text;
        this.block = window.document.createElement('div');
        this.block.style.position = 'absolute';
        this.block.style.left = '5%';
        this.block.style.bottom = '5vh';
        this.block.style.width = '90%';
        this.block.style.height = '90%';
        this.block.style.backgroundColor = '#38002c';
        this.block.style.border = '5px solid #8babbf';
        this.block.style.zIndex = '99999';
        this.appendP();
        this.apppendNextButton();
        this.appendSkipButton();
        this.setText(this.text[this.page]);
        canvas.appendChild(this.block);
    }
    appendP() {
        this.p = window.document.createElement('p');
        this.p.style.position = 'absolute';
        this.p.style.left = '10%';
        this.p.style.top = '4vh';
        this.p.style.width = '80%';
        this.p.style.color = '#8babbf';
        this.p.style.fontSize = '15px';
        this.p.style.lineHeight = '1.5';
        this.p.style.fontFamily = "'Press Start 2P', system-ui";

        this.p.onclick = () => {
            this.nextButton.style.display = 'block';
            clearInterval(this.timer);
            this.p.innerText = this.text[this.page];
        }

        this.block.appendChild(this.p);

    }
    apppendNextButton() {
        this.nextButton = window.document.createElement('button');
        this.setButtonStyle(this.nextButton, 'Next');
        this.nextButton.style.right = '0px';
        this.nextButton.style.display = 'none';
        this.nextButton.onclick = () => {
            if (this.page < this.text.length - 1) {
                this.page++;
                this.nextButton.style.display = 'none';
                this.setText(this.text[this.page]);
            }
            else {
                this.block.style.display = 'none';
            }

        };
        this.block.appendChild(this.nextButton);
    }
    appendSkipButton() {
        this.scipButton = window.document.createElement('button');
        this.setButtonStyle(this.scipButton, 'Scip');
        this.scipButton.style.left = '0px';
        this.scipButton.onclick = () => {
            this.block.style.display = 'none';
        };
        this.block.appendChild(this.scipButton);
    }
    setButtonStyle(button, title) {
        button.style.position = 'absolute';
        button.style.bottom = '0px';
        button.style.backgroundColor = '#8babbf';
        button.style.color = '#38002c';
        button.innerText = title;
        button.style.fontSize = '20px';
        button.style.margin = '10px';
        button.style.padding = '10px';
        button.style.border = 'none';
        button.style.fontFamily = "'Press Start 2P', system-ui";
    }
    setText(text) {
        if (this.page == this.text.length - 1) {
            this.nextButton.innerText = 'GO';
        }
        let innerText = '';
        let targetText = text;
        let pos = 0;
        this.timer = setInterval(() => {
            if (pos <= targetText.length - 1) {
                innerText += targetText[pos];
                this.p.innerText = innerText;
                pos++;
            }
            else {
                clearInterval(this.timer);
                this.nextButton.style.display = 'block';
            }
        }, 20);
    }



}
class Terminal extends Cutscene {
    btnBlock;
    mainStrLenght;
    password;
    constructor() {
        let text = 'Скорее вводи пароль :';
        super([text]);
        this.password = '1123';
        this.mainStrLenght = text.length;
        this.btnBlock = window.document.createElement('div');
        this.btnBlock.style.position = 'absolute';
        this.btnBlock.style.left = '33%';
        this.btnBlock.style.bottom = '10vh';
        this.btnBlock.style.width = '33%';
        this.block.appendChild(this.btnBlock);
        this.scipButton.innerText = 'Clear';
        this.nextButton.innerText = 'Enter';
        this.createNumButtons();

        this.scipButton.onclick = () => {
            if (this.p.innerText.length > this.mainStrLenght) {
                let str = '';
                for (let i = 0; i < this.p.innerText.length - 1; i++) {
                    str += this.p.innerText[i];

                }
                this.p.innerText = str;
            }
        }
        this.nextButton.onclick = () => {
            if (this.p.innerText.length === this.mainStrLenght + 4) {
                let str = '';
                for (let i = this.p.innerText.length - 4; i < this.p.innerText.length; i++) {
                    str += this.p.innerText[i];
                }
                if (str == this.password) {
                    this.block.style.display = 'none';
                    finalTimerText.innerText = 'You win!';
                    imgBlock.style.display = 'none';
                }
                else {
                    this.p.innerText = 'Пароль не верный,попробуй еще раз :';
                    this.mainStrLenght = this.p.innerText.length;
                }
            }
        }
    }
    createNumButtons() {
        for (let i = 1; i <= 9; i++) {
            let btn = window.document.createElement('button');
            this.setButtonStyle(btn, `${i}`);
            btn.style.padding = '18px';
            btn.style.left =
                (i <= 3)
                    ? `${(i - 1) * 33}%`
                    : (i <= 6)
                        ? `${(i - 4) * 33}%`
                        : `${(i - 7) * 33}%`;
            btn.style.bottom =
                (i <= 3)
                    ? '36vh'
                    : (i <= 6)
                        ? '18vh'
                        : 0
                ;
            btn.onclick = (event) => {
                if (this.p.innerText.length < this.mainStrLenght + 4) {
                    this.p.innerText += event.target.innerText;
                }

            }
            this.btnBlock.appendChild(btn);
        }
    }
}
class Enemy {
    ATTACK = 'attack';
    DEATH = 'death';
    HURT = 'hurt';
    IDLE = 'idle';
    WALK = 'walk';

    state;
    animateWasChenge;
    lives;

    startX;
    posX;
    posY;
    img;
    block;
    blockSize;
    stritPos;
    spriteMaxPos;
    timer;
    dir;
    stop;


    sourcePath;
    message;
    isLast;

    constructor(x, y, src, message = '', isLast = false) {

        this.isLast = isLast;
        this.message = message;
        this.posX = x + this.getRandomOffset(6);
        this.posY = y;
        this.startX = x;
        this.blockSize = 96 + 48;
        this.stritPos = 0;
        this.spriteMaxPos = 5;
        this.dir = 1;
        this.stop = false;
        this.lives = 60;

        this.sourcePath = src;
        this.state = this.IDLE;
        this.animateWasChenge = false;


        this.createImg();
        this.changeAnimate(this.WALK);
        enemiesArray.push(this);
        this.lifeCycle();

        // this.animate();


    }

    createImg() {
        this.block = window.document.createElement('div');
        this.block.style.position = 'absolute';
        this.block.style.left = this.posX * 32 + 'px';
        this.block.style.bottom = this.posY * 32 + 'px';
        this.block.style.width = this.blockSize + 'px';
        this.block.style.height = this.blockSize + 'px';
        // this.block.style.border = '1px red solid';
        this.block.style.overflow = 'hidden';


        this.img = window.document.createElement('img');
        this.img.src = this.sourcePath + 'Idle.png';
        this.img.style.position = 'absolute';
        this.img.style.left = 0;
        this.img.style.bottom = 0;
        // this.img.style.width = this.blockSize * (this.spriteMaxPos+1) + 'px';
        this.img.style.height = this.blockSize + 'px';

        this.block.appendChild(this.img);
        canvas.appendChild(this.block);
    }
    lifeCycle() {
        this.timer = setInterval(() => {
            if (this.animateWasChenge) {
                this.animateWasChenge = false;
                switch (this.state) {
                    case this.ATTACK: {
                        this.setAtack();
                        break;
                    }
                    case this.HURT: {
                        this.setHurt();
                        break;
                    }
                    case this.IDLE: {
                        this.setIdle();
                        break;
                    }
                    case this.DEATH: {
                        this.setDeath();
                        break;
                    }
                    case this.WALK: {
                        this.setWalk();
                        break;
                    }
                    default: break;
                }
            }

            this.stritPos++;
            this.checkCollide();
            if (!this.stop) {
                this.move();
            }
            else {
                if (this.state != this.DEATH) {
                    if (this.state != this.HURT) {
                        this.changeAnimate(this.ATTACK);
                    }
                }
            }

            this.animate();
        }, 150)
    }
    animate() {
        if (this.stritPos > this.spriteMaxPos) {
            this.stritPos = 0;
            if (this.state === this.ATTACK) {
                lives--;
                updateHearts();
            }

            if (this.state === this.HURT) {
                this.changeAnimate(this.ATTACK);
                if (this.dir > 0) this.stritPos = 1;
            }
            if (this.state === this.DEATH) {
                clearInterval(this.timer);
                isLeftsideBlocked = false;
                isRightSideBlocked = false;
                if (this.dir > 0) this.stritPos = 5;
                if (this.message) {
                    new Cutscene([this.message]);
                    if (this.isLast) {
                        new Lever();
                    }
                }
            }
        }
        this.img.style.left = -(this.stritPos * this.blockSize) + 'px';
    }
    setAtack() {
        this.img.src = this.sourcePath + 'Attack.png';
        this.spriteMaxPos = 5;
    }
    setDeath() {
        this.img.src = this.sourcePath + 'Death.png';
        this.spriteMaxPos = 5;
    }
    setHurt() {
        this.img.src = this.sourcePath + 'Hurt.png';
        this.spriteMaxPos = 1;
    }
    setIdle() {
        this.img.src = this.sourcePath + 'Idle.png';
        this.spriteMaxPos = 3;
    }
    setWalk() {
        this.img.src = this.sourcePath + 'Walk.png';
        this.spriteMaxPos = 5;
    }
    changeAnimate(stateStr) {
        this.state = stateStr;
        this.animateWasChenge = true;
    }
    move() {
        if (this.posX > this.startX + 6) {
            this.dir *= -1;
            this.img.style.transform = 'scale(-1,1)'
        }
        else if (this.posX <= this.startX) {
            this.dir = Math.abs(this.dir);
            this.img.style.transform = 'scale(1,1)'
        }
        this.posX += this.dir;
        this.block.style.left = this.posX * 32 + 'px';
    }
    checkHurt() {
        if (wasHeroHit) {
            // console.log('сработала чек херт c ударом');
            if (this.lives == 10) {
                wasHeroHit = false;
                this.changeAnimate(this.DEATH);
                // console.log('меньше 10');
            }
            if (this.lives > 10) {
                wasHeroHit = false;
                this.changeAnimate(this.HURT);
                this.showHurt();
                this.lives -= 10;
                // console.log('больше 10');
            }
        }
        // console.log('сработала чек херт но  без удара и ни одного условия');
    }
    checkCollide() {
        if (heroY == this.posY) {

            if (heroX == this.posX) {
                this.checkHurt();
                isRightSideBlocked = true;
                this.stop = true;
            }
            else if ((heroX - 1) == (this.posX + 2)) {
                this.checkHurt();
                isLeftsideBlocked = true;
                this.stop = true;
            }
            else {
                isLeftsideBlocked = false;
                isRightSideBlocked = false;
                this.stop = false;
                this.changeAnimate(this.WALK);
            }
        }
        else {
            isLeftsideBlocked = false;
            isRightSideBlocked = false;
            this.stop = false;
            this.changeAnimate(this.WALK);
        }

    }
    showHurt() {
        let pos = 0;
        let text = window.document.createElement('p');
        text.innerText = '-10';
        text.style.position = 'absolute';
        text.style.left = (this.dir < 0) ? Number.parseInt(this.block.style.left) + 80 + 'px' : Number.parseInt(this.block.style.left) + 20 + 'px';
        text.style.bottom = Number.parseInt(this.block.style.bottom) + 72 + 'px';
        let hurtTimer = setInterval(() => {
            text.style.bottom = Number.parseInt(text.style.bottom) + 16 + 'px';
            if (pos > 3) {
                clearInterval(hurtTimer);
                text.style.display = 'none';
            }
            pos++;
        }, 150)
        canvas.appendChild(text);
    }
    moveRight() {
        this.startX += 1;
        this.posX += 1;
        if (this.stop || this.state === this.DEATH) {
            this.block.style.left = Number.parseInt(this.block.style.left) + 32 + 'px';
        }
    }
    moveLeft() {
        this.startX -= 1;
        this.posX -= 1;
        if (this.stop || this.state === this.DEATH) {
            this.block.style.left = Number.parseInt(this.block.style.left) - 32 + 'px';
        }
    }
    getRandomOffset(max) {
        let rand = Math.round(Math.random() * max);

        return rand;
    }
}
class Enemy1 extends Enemy {
    constructor(x, y, mess) {
        super(x, y, './pictures/Enemies/1/', mess)
    }
};
class Enemy2 extends Enemy {
    constructor(x, y, mess, isLast) {
        super(x, y, './pictures/Enemies/2/', mess, isLast)
    }
    setAtack() {
        this.img.src = this.sourcePath + 'Attack.png';
        this.spriteMaxPos = 8;
    }
    setDeath() {
        this.img.src = this.sourcePath + 'Death.png';
        this.spriteMaxPos = 5;
    }
    setWalk() {
        this.img.src = this.sourcePath + 'Walk.png';
        this.spriteMaxPos = 5;
    }
};
class Enemy3 extends Enemy {
    constructor(x, y, mess) {
        super(x, y, './pictures/Enemies/3/', mess)
    }
    setAtack() {
        this.img.src = this.sourcePath + 'Attack.png';
        this.spriteMaxPos = 3;
    }
    setDeath() {
        this.img.src = this.sourcePath + 'Death.png';
        this.spriteMaxPos = 5;
    }
    setWalk() {
        this.img.src = this.sourcePath + 'Walk.png';
        this.spriteMaxPos = 5;
    }
};
class Enemy6 extends Enemy {
    bullet;
    isShoot;
    bulletX;
    constructor(x, y, mess) {
        super(x, y, './pictures/Enemies/6/', mess);
        this.bullet = window.document.createElement('img');
        this.bullet.src = this.sourcePath + 'Ball1.png';
        this.bullet.style.position = 'absolute';
        this.bullet.style.left = this.block.style.left;
        this.bullet.style.bottom = (Number.parseInt(this.block.style.bottom)) + 32 + 20 + 'px';
        this.bullet.style.transform = 'scale(2,2)'

        canvas.appendChild(this.bullet);
    }
    setAtack() {
        this.img.src = this.sourcePath + 'Attack.png';
        this.spriteMaxPos = 3;
        // console.log('атака');
    }
    setDeath() {
        this.img.src = this.sourcePath + 'Death.png';
        this.spriteMaxPos = 2;
        // console.log('смерть');
    }
    setWalk() {
        this.img.src = this.sourcePath + 'Walk.png';
        this.spriteMaxPos = 3;
        // console.log('прогулка');
    }
    checkCollide() {
        if (heroY == this.posY) {
            // console.log('YYY коллайд');
            // console.log(heroX +'-----'+this.posX);
            this.stop = true;
            if (heroX > this.posX) {
                this.dir = 1;
                this.img.style.transform = 'scale(1,1)';
            }
            else {
                this.dir = -1;
                this.img.style.transform = 'scale(-1,1)';
            }
            if (heroX == (this.posX - 1) || heroX == this.posX) {
                // console.log('XXXX коллайд' + heroX + ' //// ' + this.posX);
                this.checkHurt();
                isRightSideBlocked = true;
                // this.stop = true;
            }
            else if ((heroX - 1) == (this.posX + 1) || (heroX - 1) == (this.posX + 2) || (heroX - 1) == (this.posX)) {
                // console.log('YYYY коллайд');
                this.checkHurt();
                isLeftsideBlocked = true;
                // this.stop = true;
            }
            else {
                // isLeftsideBlocked = false;
                // isRightSideBlocked = false;
                // this.stop = false;
                this.changeAnimate(this.WALK);
            }
        }
        else {
            isLeftsideBlocked = false;
            isRightSideBlocked = false;
            this.stop = false;
            this.changeAnimate(this.WALK);
        }

    }
    animate() {
        if (this.stritPos > this.spriteMaxPos) {
            this.stritPos = 0;

            if (this.state === this.ATTACK) {
                if (!this.isShoot) {
                    this.shoot();
                }


            }

            if (this.state === this.HURT) {
                this.changeAnimate(this.ATTACK);
                if (this.dir > 0) {
                    this.stritPos = 1;
                }

            }
            if (this.state === this.DEATH) {
                clearInterval(this.timer);
                isLeftsideBlocked = false;
                isRightSideBlocked = false;
                this.stritPos = 0;
                if (this.dir > 0) {
                    this.stritPos = 3;
                }
                if (this.message) new Cutscene([this.message]);
            }
        }
        if (this.isShoot && this.state === this.ATTACK) {
            this.bulletFunc();
        }
        else {
            this.bullet.style.display = 'none';
        }
        this.img.style.left = -(this.stritPos * this.blockSize) + 'px';
    }
    shoot() {
        this.isShoot = true;
        this.bullet.style.display = 'block';
        (this.dir > 0) ? this.bulletX = this.posX + 1 : this.bulletX = this.posX + 1;
    }
    bulletFunc() {

        (this.dir > 0) ? this.bulletX += 1 : this.bulletX -= 1;
        this.bullet.style.left = (this.bulletX * 32) + 'px';
        if ((Math.round(this.bulletX)) === heroX && this.posY === heroY) {
            // console.log(' X пули'+ this.bulletX +' X-героя'+ heroX +' Y врага='+  this.posY+' Y героя='+  heroY);
            this.isShoot = false;
            this.bullet.style.display = 'none';
            lives--;
            updateHearts();
        }
        if (this.dir > 0) {
            // console.log(' X пули'+ this.bulletX +' X-героя'+ heroX +' Y врага='+  this.posY+' Y героя='+  heroY);
            if (this.bulletX > (this.posX + 6)) {
                this.isShoot = false;
                this.bullet.style.display = 'none';
            }
        }
        else {
            // console.log(' X пули'+ this.bulletX +' X-героя'+ heroX +' Y врага='+  this.posY+' Y героя='+  heroY);
            if (this.bulletX < (this.posX - 5)) {
                this.isShoot = false;
                this.bullet.style.display = 'none';
            }
        }
    }
}

class Heart {
    img;
    x;
    constructor(x, src) {
        this.x = x + 1;
        this.img = window.document.createElement('img');
        this.img.src = src;
        this.img.style.position = 'absolute';
        this.img.style.zIndex = '6';
        this.img.style.left = this.x * 32 + 'px';
        this.img.style.bottom = ((window.screen.height / 32) - 2) * 32 + 'px';
        this.img.style.width = '32px';
        this.img.style.height = '32px';

        canvas.appendChild(this.img);
    }
}
class HeartEmpty extends Heart {
    constructor(x) {
        super(x, './pictures/hearts/heart_empty.png')
    }
}
class HeartRed extends Heart {
    constructor(x) {
        super(x, './pictures/hearts/heart_red.png')
    }
}
const addHearts = () => {
    // это все для примера
    // let heartEmpty = new HeartEmpty(0);
    // let heartRed = new HeartRed(1);
    // for (let i = 0; i < lives; i++) {
    //     let heartRed = new HeartRed(i);
    // }
    // for (let i = (maxLives - lives); (i + maxLives) > 6; i--) {
    //     let heartEmpty = new HeartEmpty(maxLives - i);
    // }
    // тут рабочий варик
    for (let i = 0; i < maxLives; i++) {
        let heartEmpty = new HeartEmpty(i);
        let heartRed = new HeartRed(i);
        heartsArray.push(heartRed);
    }
};
const updateHearts = () => {
    if (lives <= 0) {
        finalTimerText.innerText = 'Game over';
        imgBlock.style.display = 'none';
    }
    for (let i = 0; i < lives; i++) {
        heartsArray[i].img.style.display = 'block';
    }
    for (let i = lives; i < maxLives; i++) {
        heartsArray[i].img.style.display = 'none';
    }
}
const createBackImg = (i = 0) => {
    let img = window.document.createElement('img');
    img.classList.add("BG_img");
    img.src = './pictures/2 Background/Day/Background.png';
    img.style.left = (i * window.screen.width) - 32 + 'px';
    img.style.bottom = '32px';
    img.style.width = window.screen.width + 'px';
    canvas.appendChild(img);
    objectArray.push(img);

};
const addBackgroundImg = () => {
    for (let i = 0; i < 7; i++) {
        createBackImg(i);
    }
};
const createImgEl = (src, x, y) => {
    let img = window.document.createElement('img');
    img.src = src;
    img.style.position = 'absolute';
    img.style.left = x * 32 + 'px';
    img.style.bottom = y * 32 + 'px';
    img.style.height = '80px';
    img.style.width = 'auto';
    canvas.appendChild(img);
    objectArray.push(img);
};
const addDecorationElement = (f1, f2, f3) => {
    let basePath = './pictures/3 Objects/gif/';
    let basePath2 = './pictures/3 Objects/Other/';
    createImgEl(basePath + '1.gif', 10, f1);
    createImgEl(basePath + '2.gif', 80, f3);
    createImgEl(basePath + '3.gif', 6, f2);
    createImgEl(basePath + '4.gif', 15, f2);
    createImgEl(basePath + '5.gif', 35, f1);
    createImgEl(basePath + '6.gif', 89, f3);
    createImgEl(basePath + '7.gif', 58, f3);


    createImgEl(basePath2 + 'box.png', 12, f3);
    createImgEl(basePath2 + 'box.png', 105, f3);
    createImgEl(basePath2 + 'box.png', 76, f3);
    createImgEl(basePath2 + 'box.png', 47, f2);

    createImgEl(basePath2 + '2.gif', 126, f1);
};



const addEnemies = () => {
    let enimi1 = new Enemy1(9, 9, 'стала известна первая цифра пароля -- "1"');
    let enimi2 = new Enemy6(20, 5);
    let enimi3 = new Enemy2(44, 5, 'вторая цифра пароля --"1"');
    let enimi4 = new Enemy1(65, 5);
    let enimi5 = new Enemy1(79, 1);
    let enimi6 = new Enemy3(73, 9, 'третья цифра пароля --"2"');
    let enimi7 = new Enemy2(100, 9, 'последняя цифра пароля --"3"\n\n Скорее ищи рычаг у тебя 15сек.', true);
};
const buildLevel = () => {
    let flor1 = 0;
    let flor2 = 4;
    let flor3 = 8;

    addDecorationElement(flor1 + 1, flor2 + 1, flor3 + 1);

    createTilesPlatform(0, 145, flor1);
    createTilesPlatform(33, 41, flor1);
    createTilesPlatform(76, 91, flor1);
    createTilesPlatform(106, 119, flor1);

    createTilesPlatform(15, 32, flor2);
    createTilesPlatform(42, 53, flor2);
    createTilesPlatform(64, 75, flor2);
    createTilesPlatform(92, 105, flor2);

    createTilesPlatform(8, 20, flor3);
    createTilesPlatform(54, 63, flor3);
    createTilesPlatform(75, 87, flor3);
    createTilesPlatform(99, 111, flor3);


    createTilesBlackBlock(15, 32, flor2);
    createTilesBlackBlock(42, 53, flor2);
    createTilesBlackBlock(64, 75, flor2);
    createTilesBlackBlock(92, 105, flor2);

    createTilesBlackBlock(54, 63, flor3);

    addEnemies();
};
const addStartScreen = () => {
    let div = window.document.createElement('div');
    div.style.position = 'absolute';
    div.style.left = '0px';
    div.style.bottom = '0px';
    div.style.width = '100%';
    div.style.height = '100vh';
    div.style.backgroundColor = '#38002c';
    div.style.zIndex = '999';
    div.style.display = 'grid';
    div.style.alignContent = 'center';
    div.style.justifyContent = 'center';
    canvas.appendChild(div);
    let btn = window.document.createElement('button');
    btn.innerText = 'PLAY';
    btn.style.fontFamily = "'Press Start 2P', cursive";
    btn.style.fontSize = '25px';
    btn.style.backgroundColor = '#8babbf';
    btn.style.color = '#38002c';
    btn.style.padding = '20px 30px';
    btn.style.border = 'none';
    btn.addEventListener('click', () => {
        div.style.display = 'none';
        fsBtn.src = './pictures/cancel.png';
        canvas.requestFullscreen();
        let cutscene = new Cutscene(
            ["После неудачной попытки выследить похитетелей своей девушки, Адам был пойман недображелателями. Они решили протестировать на герое недавно украденную сверхсекретную разработку. В результате - сознание Адама было заключено в виртуальный плен.Все это время друзья героя искали его и спустя несколько дней, наконец-то смогли выйти с ним на связь.\n \n",
                "Оказалось, что из виртуального мира можно сбежать - дверь находиться за одним из фонтанов в конце первого уровня. Но, чтобы ее открыть нужно найти спрятанный рычаг и ввести код пароля. Пароль состоит из 4 чисел. Цифры пароля находятся внутри тщательно охраняемых деревянных ящиков (по одной в каждом). Что касается рычага - он спрятан на втором уровне, куда у Адама нет доступа.\n \n ",
                "К счастью друзья нашли способ похитить его. Но, поскольку опасность слышком велика, они передадут рычаг, только когда станут известны все цифры пароля. Когда появится рычаг у Адама будет 30 секунд чтобы найти его, подбежать к фонтану и ввести пароль. Если герой не успеет - местонохождение его друзей будет обнаружено недоброжелателями."
            ]);


    });
    div.appendChild(btn);
};





let start = () => {
    let blockGame = window.document.createElement('div');
    blockGame.style.position = 'absolute';
    blockGame.style.display = 'none';
    blockGame.style.width = '100%';
    blockGame.style.height = '100vh';
    blockGame.style.zIndex = '10000';
    blockGame.style.backgroundColor = '#38002c';
    // blockGame.style.display = 'grid';
    blockGame.style.alignContent = 'center';
    blockGame.style.justifyContent = 'center';
    canvas.appendChild(blockGame);
    let btn = window.document.createElement('button');
    btn.innerText = 'Переверни экран ну че ты так в игры не играют';
    btn.style.fontFamily = "'Press Start 2P', cursive";
    btn.style.fontSize = '25px';
    btn.style.backgroundColor = '#8babbf';
    btn.style.color = '#38002c';
    btn.style.padding = '20px 30px';
    btn.style.border = 'none';
    blockGame.appendChild(btn);


    if (screen.height > screen.width) {

        blockGame.style.display = 'grid';

        window.addEventListener("orientationchange", function (event) {

            if (screen.height < screen.width) {
                blockGame.style.display = 'none';
                addBackgroundImg();
                buildLevel();
                lifeCycle();
                addHearts();
                updateHearts();

                let fontanImg2 = objectArray.filter(elem => elem.outerHTML.split('"')[1] === './pictures/3 Objects/Other/2.gif')[0];
                fontanImg2.style.transform = 'translate(0px, -50px)scale(2.5)';

                addStartScreen();

                JumpBlock.style.top = `${canvas.offsetWidth / 2 - 144 / 2}px`;
                HitBlock.style.top = `${canvas.offsetWidth / 2 - 144 / 2}px`;

            }
            else  {
                blockGame.style.display = 'grid';
            }
        }, false);
    }


    else {
        JumpBlock.style.top = `${window.innerHeight / 2 - 144 / 2}px`;
        HitBlock.style.top = `${window.innerHeight / 2 - 144 / 2}px`;
        addBackgroundImg();
        buildLevel();
        lifeCycle();
        addHearts();
        updateHearts();

        let fontanImg2 = objectArray.filter(elem => elem.outerHTML.split('"')[1] === './pictures/3 Objects/Other/2.gif')[0];
        fontanImg2.style.transform = 'translate(0px, -50px)scale(2.5)';

        addStartScreen();


        window.addEventListener("orientationchange", function (event) {

            if (screen.height < screen.width) {
                blockGame.style.display = 'none';
                addBackgroundImg();
                buildLevel();
                lifeCycle();
                addHearts();
                updateHearts();

                let fontanImg2 = objectArray.filter(elem => elem.outerHTML.split('"')[1] === './pictures/3 Objects/Other/2.gif')[0];
                fontanImg2.style.transform = 'translate(0px, -50px)scale(2.5)';

                addStartScreen();

                JumpBlock.style.top = `${canvas.offsetWidth / 2 - 144 / 2}px`;
                HitBlock.style.top = `${canvas.offsetWidth / 2 - 144 / 2}px`;

            }
            else  {
                blockGame.style.display = 'grid';
            }
        }, false);




    }
}




start();



// JumpBlock.style.top = `${window.innerHeight / 2 - 144 / 2}px`;
// HitBlock.style.top = `${window.innerHeight / 2 - 144 / 2}px`;