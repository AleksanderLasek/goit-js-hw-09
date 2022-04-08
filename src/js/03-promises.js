function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    setTimeout(() => {
      const promiseFulfilled = new Promise(resolve => {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }).then(value => console.log(value));
    }, delay);
  } else {
    // Reject
    setTimeout(() => {
      const promiseRejected = new Promise((resolve, reject) => {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }).catch(error => console.log(error));
    }, delay);
  }
}

const $form = document.querySelector('form');
const $firstDelay = document.querySelector('input[name=delay]');
const $delayStep = document.querySelector('input[name=step]');
const $amount = document.querySelector('input[name=amount]');

function formSubmit(event) {
  event.preventDefault();
  let amount = parseInt($amount.value);
  let delay = parseInt($delayStep.value);
  let firstDelay = parseInt($firstDelay.value);

  for (let i = 0; i < amount; i++) {
    let finalDelay = firstDelay + i * delay;
    let position = i + 1;
    createPromise(position, finalDelay);
  }
}
$form.addEventListener('submit', formSubmit);
