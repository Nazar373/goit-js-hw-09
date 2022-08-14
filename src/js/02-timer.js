import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('span[data-days]'),
  datahours: document.querySelector('span[data-hours]'),
  dataminutes: document.querySelector('span[data-minutes]'),
  dataSeconds: document.querySelector('span[data-seconds]'),
};


let currentSelectedDate = null;

refs.startBtn.setAttribute('disabled', true);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if(selectedDates[0] < Date.now()){
      Notify.failure("Please choose a date in the future");
      return
    } else {
      refs.startBtn.removeAttribute('disabled');
      currentSelectedDate = selectedDates[0];
    };
  }
};

const fl = flatpickr('input[type="text"]', options);

const timer = {
  intervalId: null,
  start() {
    if(this.isActive){
      return
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = currentSelectedDate - startTime;
      if(deltaTime <= 0){
        clearInterval(this.intervalId);
        this.isActive = false;
        return
      }
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      refs.dataDays.textContent = addLeadingZero(days);
      refs.datahours.textContent = addLeadingZero(hours);
      refs.dataminutes.textContent = addLeadingZero(minutes);
      refs.dataSeconds.textContent = addLeadingZero(seconds);
      console.log(deltaTime);
    }, 1000)
  }
};

refs.startBtn.addEventListener('click', timer.start)

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};
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

