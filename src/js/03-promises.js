import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const delay = refs.form.elements.delay.value;
  const step = refs.form.elements.step.value;
  const amount = refs.form.elements.amount.value;
  for (let i = 1; i <= amount; i += 1) {
    const currentDelay = Number(delay) + step * (i - 1);
    createPromise(i, currentDelay)
      .then(result => {
        Notify.success(`✅ Fulfilled promise ${i} in ${currentDelay}ms`);
      })
      .catch(result => {
        Notify.failure(`❌ Rejected promise ${i} in ${currentDelay}ms`);
      });
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
