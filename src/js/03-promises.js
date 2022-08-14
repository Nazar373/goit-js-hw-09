import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form')

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay })
        } else {
          reject({ position, delay })
        };
    }, delay)
  })
}

function onFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const resultData = {};

  for (const [key, value] of formData.entries()) {
    resultData[key] = Number(value);
  }
  // console.log(resultData);
  for(let position = 1; position <= resultData.amount; position++){
    createPromise(position, resultData.delay)  
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    resultData.delay += resultData.step
    // console.log(resultData.delay += resultData.step)
  };
  e.currentTarget.reset();
};

form.addEventListener('submit', onFormSubmit);