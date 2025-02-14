const buttons = document.querySelectorAll("button");
const button_reset = document.querySelector(".button_reset");
const txt = document.querySelector(".txt");
const imgGif = document.querySelector(".img-gif");
const heartCanvas = document.getElementById('heartCanvas');
const ctx = heartCanvas.getContext('2d');

const ohyes = {
    text: "我就知道你是我的小笨蛋。",
    image: "./images/cat-yes.gif"
};

const alternatives = [
    { text: "", image: "./images/cat-01.gif" },
    { text: "真的不是吗？", image: "./images/cat-02.gif" },
    { text: "你难道不喜欢我吗？", image: "./images/cat-03.gif" },
    { text: "真的不喜欢我吗？", image: "./images/cat-04.gif" },
    { text: "请给我一次机会吧！", image: "./images/cat-05.gif" }
];

let idx = 0;
let hearts = [];
let animationFrameId;

function updateDisplay(o) {
    imgGif.src = o.image;
    txt.innerHTML = o.text;
}

function drawHeart(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function createHeart() {
    const x = Math.random() * window.innerWidth;
    const y = -20;
    const size = Math.random() * 20 + 10;
    const speed = Math.random() * 3 + 1;
    return { x, y, size, speed };
}

function animateHearts() {
    ctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
    for (let i = 0; i < hearts.length; i++) {
        const heart = hearts[i];
        heart.y += heart.speed;
        drawHeart(heart.x, heart.y, heart.size);
        if (heart.y > window.innerHeight) {
            hearts.splice(i, 1);
            i--;
        }
    }
    if (Math.random() < 0.1) {
        hearts.push(createHeart());
    }
    animationFrameId = requestAnimationFrame(animateHearts);
}

function stopHearts() {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
    hearts = [];
}

window.addEventListener('resize', function () {
    heartCanvas.width = window.innerWidth;
    heartCanvas.height = window.innerHeight;
});
heartCanvas.width = window.innerWidth;
heartCanvas.height = window.innerHeight;

button_reset.addEventListener("click", function () {
    idx = 0;
    updateDisplay(alternatives[idx]);
    buttons.forEach(function (item) {
        item.style.display = "inline-block";
    });
    button_reset.style.display = "none";
    stopHearts();
});

buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        if (btn.id === "y") {
            buttons.forEach(function (item) {
                item.style.display = "none";
            });
            updateDisplay(ohyes);
            const sound = document.getElementById("h");
            sound.volume = 0.3;
            sound.play();
            animateHearts();
        }
        if (btn.id === "n") {
            const sound = document.getElementById("s");
            sound.currentTime = 0;
            sound.volume = 0.3;
            sound.play();
            idx += 1;
            if (idx < alternatives.length) {
                updateDisplay(alternatives[idx]);
            } else {
                buttons.forEach(function (item) {
                    item.style.display = "none";
                });
                button_reset.style.display = "inline-block";
                stopHearts();
            }
        }
    });
});