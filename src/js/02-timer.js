// Opisany w dokumentacji
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const $startBtn = document.querySelector('button');
$startBtn.disabled = true;
const $days = document.querySelector('span[data-days]');
// console.log($days);
const $hours = document.querySelector('span[data-hours]');
// console.log($hours);
const $minutes = document.querySelector('span[data-minutes]');
// console.log($minutes);
const $seconds = document.querySelector('span[data-seconds]');
// console.log($seconds);

let countdownId = null;
let timeLeft = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const target = selectedDates[0].getTime();
    let now = options.defaultDate.getTime();

    if (target > now) {
      $startBtn.disabled = false;

      function countdown() {
        countdownId = setInterval(() => {
          $startBtn.disabled = true;
          now = new Date().getTime();
          timeLeft = target - now;
          timeLeft = convertMs(timeLeft);

          if (timeLeft.days < 10) {
            $days.textContent = '0' + `${timeLeft.days}`;
          } else {
            $days.textContent = `${timeLeft.days}`;
          }
          if (timeLeft.hours < 10) {
            $hours.textContent = '0' + `${timeLeft.hours}`;
          } else {
            $hours.textContent = `${timeLeft.hours}`;
          }
          if (timeLeft.minutes < 10) {
            $minutes.textContent = '0' + `${timeLeft.minutes}`;
          } else {
            $minutes.textContent = `${timeLeft.minutes}`;
          }
          if (timeLeft.seconds < 10) {
            $seconds.textContent = '0' + `${timeLeft.seconds}`;
          } else {
            $seconds.textContent = `${timeLeft.seconds}`;
          }

          if (
            $days.textContent === '00' &&
            $hours.textContent === '00' &&
            $minutes.textContent === '0' &&
            $seconds.textContent === '0'
          ) {
            clearInterval(countdownId);
          }
        }, 1000);
      }

      $startBtn.addEventListener('click', countdown);
    } else {
      window.alert('Please choose a date in the future');
    }
  },
};

const $input = document.querySelector('#datetime-picker');
flatpickr($input, options);
