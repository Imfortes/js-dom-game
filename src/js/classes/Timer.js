export default class Timer {
  constructor() {
    this.remainingTime = 0;
    this.intervalId = null;
    this.onTickCallback = null;
    this.onTimeUpCallback = null;
  }

  start(duration) {
    this.remainingTime = duration;
    this.intervalId = setInterval(() => {
      this.remainingTime--;
      if (this.onTickCallback) {
        this.onTickCallback(this.remainingTime);
      }
      if (this.remainingTime <= 0) {
        this.stop();
        if (this.onTimeUpCallback) {
          this.onTimeUpCallback();
        }
      }
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  onTick(callback) {
    this.onTickCallback = callback;
  }

  onTimeUp(callback) {
    this.onTimeUpCallback = callback;
  }
}
