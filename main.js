const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;

console.log(canvas.width, canvas.height);

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth - 5;
  canvas.height = window.innerHeight - 5;
  console.log(canvas.width, canvas.height);
  init();
});

const gravity = 0.5;
const friction = 0.95;

function Circle(x, y, radius, color, speedX, speedY) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.speedX = speedX;
  this.speedY = speedY;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = () => {
    if (this.x + this.radius >= canvas.width || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }
    if (
      this.y + this.radius + this.speedY >= canvas.height ||
      this.y - this.radius < 0
    ) {
      this.speedY = -this.speedY * friction;
      this.speedX *= friction + 0.05;
    } else {
      this.speedY += gravity;
    }
    this.x += this.speedX;
    this.y += this.speedY;
    this.draw();
  };
}

let colorArr = ["#0D0D0D", "#D94141", "#F25922", "#419BBF", "#696DBF"];
let arrOfCircles = [];

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < arrOfCircles.length; i++) {
    arrOfCircles[i].update();
  }
}

function init() {
  arrOfCircles = [];
  for (let i = 0; i < 30; i++) {
    let radius = Math.floor(Math.random() * 30 + 5);
    let speedX = (Math.random() - 0.5) * 8; // Random speed in both directions
    let speedY = (Math.random() - 0.5) * 8;
    let x = Math.floor(Math.random() * (canvas.width - radius * 2) + radius);
    let y = Math.floor(Math.random() * (canvas.height - radius * 2) + radius);
    arrOfCircles.push(
      new Circle(
        x,
        y,
        radius,
        colorArr[Math.floor(Math.random() * colorArr.length)],
        speedX,
        speedY
      )
    );
  }
}

init();
animate();
