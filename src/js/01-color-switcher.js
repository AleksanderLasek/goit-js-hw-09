function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const $startBtn = document.querySelector('button[data-start]');

const $stopBtn = document.querySelector('button[data-stop]');
$stopBtn.disabled = true;

const $body = document.querySelector('body');

let changingColorId = null;

function changeBg() {
  $startBtn.disabled = true;
  $stopBtn.disabled = false;
  changingColorId = setInterval(() => {
    const newColor = getRandomHexColor();
    $body.style.backgroundColor = newColor;
  }, 1000);
}

$startBtn.addEventListener('click', changeBg);

function stopChangingBg() {
  $startBtn.disabled = false;
  $stopBtn.disabled = true;
  clearInterval(changingColorId);
}

$stopBtn.addEventListener('click', stopChangingBg);
