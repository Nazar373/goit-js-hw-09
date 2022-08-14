const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
}

refs.startBtn.addEventListener('click', () => {
  timer.start()
})
refs.stopBtn.addEventListener('click', () => {
  timer.stop()
})

const timer = {
  intervalId: null,
  start() {
    if(this.isActive){
      return
    }
    const startTime = Date.now();
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
  },
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}