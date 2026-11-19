const physics = { size: 20, walk: 85, gravity: 700, limit: 360, step: 1 / 120, frameCap: 0.1 };
const exit = { x: 670, y: 0, width: 50, height: 54 };
const directions = { ArrowDown: [0, 1, '↓'], ArrowUp: [0, -1, '↑'], ArrowLeft: [-1, 0, '←'], ArrowRight: [1, 0, '→'] };
const room = document.querySelector('#room');
const brush = room.getContext('2d');
const statusLine = document.querySelector('#status');
const half = physics.size / 2;
let lemming, direction, remaining, previous;

function reset() {
  lemming = { x: 80, y: 80, facing: 1, fall: 0, won: false };
  direction = directions.ArrowDown;
  remaining = 0;
  previous = null;
  statusLine.textContent = 'Gravity: ↓';
}

function tick() {
  if (lemming.won) return;
  const [gravityX, gravityY] = direction;
  lemming.fall = Math.min(physics.limit, lemming.fall + physics.gravity * physics.step);
  const walk = lemming.facing * physics.walk;
  const nextX = lemming.x + (gravityX * lemming.fall + gravityY * walk) * physics.step;
  const nextY = lemming.y + (gravityY * lemming.fall - gravityX * walk) * physics.step;
  lemming.x = Math.max(half, Math.min(room.width - half, nextX));
  lemming.y = Math.max(half, Math.min(room.height - half, nextY));
  const hitX = nextX !== lemming.x;
  const hitY = nextY !== lemming.y;
  if (gravityX ? hitX : hitY) lemming.fall = 0;
  if (gravityX ? hitY : hitX) lemming.facing *= -1;
  if (lemming.x + half >= exit.x && lemming.x - half <= exit.x + exit.width &&
      lemming.y + half >= exit.y && lemming.y - half <= exit.y + exit.height) {
    lemming.won = true;
    statusLine.textContent = 'Exit reached! Press R to restart.';
  }
}

function frame(now) {
  remaining += Math.min(physics.frameCap, (now - (previous ?? now)) / 1000);
  previous = now;
  while (remaining >= physics.step) {
    tick();
    remaining -= physics.step;
  }
  brush.clearRect(0, 0, room.width, room.height);
  brush.fillStyle = '#72dfa6';
  brush.fillRect(exit.x, exit.y, exit.width, exit.height);
  brush.fillStyle = '#ffcf63';
  brush.fillRect(lemming.x - half, lemming.y - half, physics.size, physics.size);
  requestAnimationFrame(frame);
}

window.addEventListener('keydown', event => {
  if (event.ctrlKey || event.altKey || event.metaKey) return;
  if (event.key.toLowerCase() === 'r') return reset();
  if (!Object.hasOwn(directions, event.key)) return;
  event.preventDefault();
  const next = directions[event.key];
  if (!lemming.won && direction !== next) {
    direction = next;
    lemming.fall = 0;
    statusLine.textContent = `Gravity: ${next[2]}`;
  }
});

reset();
requestAnimationFrame(frame);
