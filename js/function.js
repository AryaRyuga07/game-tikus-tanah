let dirtBefore;
let end;
let score;
let time;

const dirt = document.querySelectorAll('.dirt');
const rat = document.querySelectorAll('.rat');
const pop = document.querySelector('#pop');
const scoreBoard = document.querySelector('#scoreBoard');
const play = document.querySelector('#play');
const restart = document.querySelector('#restart');
const games = document.querySelector('#games');
const total = document.querySelector('#total');
const timer = document.querySelector('#timer');
const timeDown = document.querySelector('#time');
const timerBg = document.querySelector('#timerBg');
const winBg = document.querySelector('#totalScore');

const rand = (dirt) => {
    const time = Math.floor(Math.random() * dirt.length);
    const randomTime = dirt[time];
    if (randomTime == dirtBefore) {
        rand(dirt);
    }
    dirtBefore = randomTime;
    return randomTime;
}

const randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const up = () => {
    const dirtRandom = rand(dirt);
    const time = randomTime(500, 1200);
    dirtRandom.classList.add('up');
    setTimeout(() => {
        dirtRandom.classList.remove('up');
        if (!end) {
            up();
        }
    }, time);
}

const start = () => {
    start_timer();
    end = false;
    score = 0;
    scoreBoard.textContent = 0;
    up();
    setTimeout(() => {
        end = true;
    }, 60000);
}

const smash = (event) => {
    score++;
    event.currentTarget.parentNode.classList.remove('up');
    pop.play();
    scoreBoard.textContent = score;
}

rat.forEach(el => {
    el.addEventListener('click', smash);
});

play.addEventListener('click', () => {
    play.classList.add('hidden');
    games.classList.remove('hidden');
    timerBg.classList.remove('hidden');
    timerBg.classList.add('flex');
    let i = 3;
    let times = setInterval(() => {
        timer.innerHTML = i--;
    }, 1000);
    timer.innerHTML = i--;
    setTimeout(() => {
        clearInterval(times);
        timerBg.classList.add('hidden');
        timerBg.classList.remove('flex');
        start();
    }, 3000);
});

restart.addEventListener('click', () => {
    winBg.classList.remove('flex');
    winBg.classList.add('hidden');
    timerBg.classList.remove('hidden');
    timerBg.classList.add('flex');
    let i = 3;
    let times = setInterval(() => {
        timer.innerHTML = i--;
    }, 1000);
    timer.innerHTML = i--;
    setTimeout(() => {
        clearInterval(times);
        timerBg.classList.add('hidden');
        timerBg.classList.remove('flex');
        start();
    }, 3000);
});

const start_timer = () => {
    var timer = document.getElementById("time").innerHTML;
    var arr = timer.split(":");
    var hour = arr[0];
    var min = arr[1];
    var sec = arr[2];

    if (sec < 10) sec == "0" + sec;
    if (sec == 0) {
        if (min == 0) {
            if (hour == 0) {
                timeDown.innerHTML = "00:01:00"
                winBg.classList.remove("hidden");
                winBg.classList.add("flex");
                total.innerHTML = score;
                return;
            }
            hour--;
            min = 60;
            if (hour < 10) hour = "0" + hour;
        }
        min--;
        if (min < 10) min = "0" + min;
        sec = 59;
    }
    else sec--;

    document.getElementById("time").innerHTML = hour + ":" + min + ":" + sec;
    setTimeout(start_timer, 1000);
}