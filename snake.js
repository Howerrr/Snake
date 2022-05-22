let wall = document.querySelector('.wall');
let remind = document.querySelector('.remind');
let ground = document.querySelector('.ground');
let target = document.querySelector('.target');
let head = document.querySelector('.head');
let newBody = document.createElement('div');
let allBody = document.querySelector('.allBody');
let body = allBody.querySelectorAll('.body');
let newBarrier = document.createElement('div');
let allBarrier = document.querySelector('.allBarrier');
let barrier = allBarrier.querySelectorAll('.barrier');
let bodyX = head.offsetLeft;
let bodyY = head.offsetTop;
let targetX = randomX();
let targetY = randomY();
let headX = randomX();
let headY = randomY();
let barrierX = randomX();
let barrierY = randomY();
let time = 0;
let times = 0;
let score = 0;
let flag = true;
let turnUp = true;
let turnLeft = true;
let turnDown = true;
let turnRight = true;
let single = true;

function randomX() {
  return Math.round(Math.random() * (wall.offsetWidth / 50 - 4) + 1) * 50;
}

function randomY() {
  return Math.round(Math.random() * (wall.offsetHeight / 50 - 4) + 1) * 50;
}

function setTarget() {
  targetX = randomX();
  targetY = randomY();
  for (let i = 0; i < body.length; i++) {
    body = allBody.querySelectorAll('.body');
    for (let j = 0; j < barrier.length; j++) {
      barrier = allBarrier.querySelectorAll('.barrier');
      if (targetX === body[i].offsetLeft && targetY === body[i].offsetTop ||
        targetX === barrier[j].offsetLeft && targetY === barrier[j].offsetTop) {
        targetX = randomX();
        targetY = randomY();
        i = 0;
        j = 0;
      }
    }
  }
  target.style.left = targetX + 'px';
  target.style.top = targetY + 'px';
}

function setHead() {
  headX = randomX();
  headY = randomY();
  head.style.left = headX + 'px';
  head.style.top = headY + 'px';
}

function setBarrier() {
  newBarrier = document.createElement('div');
  allBarrier.appendChild(newBarrier);
  newBarrier.classList.add('barrier');
  barrierX = randomX();
  barrierY = randomY();
  for (let i = 0; i < body.length; i++) {
    body = allBody.querySelectorAll('.body');
    for (let j = 0; j < barrier.length; j++) {
      barrier = allBarrier.querySelectorAll('.barrier');
      if (barrierX === body[i].offsetLeft && barrierY === body[i].offsetTop ||
        barrierX === barrier[j].offsetLeft && barrierY === barrier[j].offsetTop ||
        Math.abs((barrierX - head.offsetLeft)) < 200 ||
        Math.abs((barrierX - head.offsetLeft)) < 200 ||
        barrierX === target.offsetLeft && barrierY === target.offsetTop) {
        barrierX = randomX();
        barrierY = randomY();
        i = 0;
        j = 0;
      }
    }
  }
  newBarrier.style.left = barrierX + 'px';
  newBarrier.style.top = barrierY + 'px';
}

function setBody(dir) {
  newBody = document.createElement('div');
  allBody.appendChild(newBody);
  newBody.classList.add('body');
  if (dir === 'left') {
    newBody.style.left = head.offsetLeft + 50 + 'px';
    newBody.style.top = head.offsetTop + 'px';
  }
  if (dir === 'right') {
    newBody.style.left = head.offsetLeft - 50 + 'px';
    newBody.style.top = head.offsetTop + 'px';
  }
  if (dir === 'up') {
    newBody.style.left = head.offsetLeft + 'px';
    newBody.style.top = head.offsetTop + 50 + 'px';
  }
  if (dir === 'down') {
    newBody.style.left = head.offsetLeft + 'px';
    newBody.style.top = head.offsetTop - 50 + 'px';
  }
}

function gameBegin() {
  ground.style.width = wall.offsetWidth - 100 + 'px';
  ground.style.height = wall.offsetHeight - 100 + 'px';
  setTarget();
  setHead();
}

function isGetTarget(dir) {
  if (targetX === head.offsetLeft && targetY === head.offsetTop) {
    single = false;
    times++;
    setTarget();
    setBody(dir);
  }
}

function followHead() {
  body = allBody.querySelectorAll('.body');
  if (body.length !== 0) {
    for (let i = body.length - 1; i >= 0; i--) {
      if (i === 0) {
        body[i].style.left = head.offsetLeft + 'px';
        body[i].style.top = head.offsetTop + 'px';
      }
      else {
        body[i].style.left = body[i - 1].offsetLeft + 'px';
        body[i].style.top = body[i - 1].offsetTop + 'px';
      }
    }
  }
}

function isDead(dir) {
  switch (dir) {
    case 'up': if (head.offsetTop < 0) gameOver(); break;
    case 'left': if (head.offsetLeft < 0) gameOver(); break;
    case 'down': if (head.offsetTop > ground.offsetHeight) gameOver(); break;
    case 'right': if (head.offsetLeft > ground.offsetWidth) gameOver(); break;
    default: break;
  }
  for (let i = 0; i < body.length; i++) {
    if (body[i].offsetLeft === head.offsetLeft &&
      body[i].offsetTop === head.offsetTop)
      gameOver();
  }
  for (let j = 0; j < barrier.length; j++) {
    if (barrier[j].offsetLeft === head.offsetLeft &&
      barrier[j].offsetTop === head.offsetTop)
      gameOver();
  }
}

function gameOver() {
  clearInterval(head.timer);
  score = Math.round(times * 3.5 * (1 + 2 / (time + 1)));
  if (score > 100) score = 100;
  alert('本次你坚持了' + time + '秒，吃到了' + times + '次红方块，系统评分为' + score + '分，再来一次吧~');
  setHead();
  setTarget();
  window.location.reload();
}

function judge(dir) {
  body = allBody.querySelectorAll('.body');
  barrier = allBarrier.querySelectorAll('.barrier');
  followHead();
  // animate(head, dir, 50);
  switch (dir) {
    case 'up': head.style.top = head.offsetTop - 50 + 'px'; break;
    case 'left': head.style.left = head.offsetLeft - 50 + 'px'; break;
    case 'down': head.style.top = head.offsetTop + 50 + 'px'; break;
    case 'right': head.style.left = head.offsetLeft + 50 + 'px'; break;
    default: break;
  }
  isGetTarget(dir);
  isDead(dir);
}

function go(dir) {
  turn(dir);
  clearInterval(head.timer);
  judge(dir);
  head.timer = setInterval(function () {
    judge(dir);
  }, 100);
}

gameBegin();

function turn(dir) {
  turnUp = true;
  turnLeft = true;
  turnDown = true;
  turnRight = true;
  switch (dir) {
    case 'up': turnDown = false; break;
    case 'left': turnRight = false; break;
    case 'down': turnUp = false; break;
    case 'right': turnLeft = false; break;
    default: break;
  }
}

document.addEventListener('keydown', function (e) {
  if (flag) {
    setInterval('setBarrier()', 1000);
    setInterval(function () {
      time++;
    }, 1000);
    flag = false;
  }
  if ((single ? true : turnUp) && (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp'))
    go('up');
  else if ((single ? true : turnLeft) && (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft'))
    go('left');
  else if ((single ? true : turnDown) && (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown'))
    go('down');
  else if ((single ? true : turnRight) && (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight'))
    go('right');
})

remind.addEventListener('click', function () {
  alert('贪吃蛇，wasd控制方向，要躲开随机生成的障碍哦！加油~ ');
})
