<template>
  <div class="container">
    <div class="timer">{{ timeout }} секунд</div>
    <div class="traffic">
      <div
        class="circle"
        :class="{
          active: current === 'red',
          animated: current === 'red' && timeout < 4
        }"
      ></div>
      <div
        class="circle"
        :class="{
          active: current === 'yellow',
          animated: current === 'yellow' && timeout < 4
        }"
      ></div>
      <div
        class="circle"
        :class="{
          active: current === 'green',
          animated: current === 'green' && timeout < 4
        }"
      ></div>
    </div>
  </div>
</template>

<script>
class State {
  constructor(name, sec, next) {
    this.name = name
    this.sec = sec
    this.next = next
  }
}

class Controller {
  change(state, fn) {
    fn(state)
    setTimeout(() => {
      this.change(state.next, fn)
    }, state.sec * 1000)
  }
}
export default {
  props: ['timerStart'],
  data() {
    return {
      current: 'red',
      timeout: ''
    }
  },
  methods: {
    timerToChange(sec) {
      this.timeout = sec
      let interval = setInterval(() => {
        this.timeout--
      }, 1000)

      setTimeout(() => {
        clearInterval(interval)
      }, sec * 1000)
    },

    changeLight(color) {
      const controller = new Controller()

      controller.change(color, (state) => {
        this.current = state.name
        this.timerToChange(state.sec)
        if (this.$route.name !== state.name) {
          this.$router.push(state.name)
        }
      })
    }
  },
  mounted() {
    let red = new State('red', 10)
    let changeRed = new State('yellow', 3)
    let changeYellow = new State('yellow', 3)
    let green = new State('green', 15)

    red.next = changeRed
    changeRed.next = green
    green.next = changeYellow
    changeYellow.next = red

    if (this.timerStart === 'red') {
      this.changeLight(red)
    } else if (this.timerStart === 'yellow') {
      this.changeLight(changeRed)
    } else if (this.timerStart === 'green') {
      this.changeLight(green)
    }
  }
}
</script>

<style lang="scss" scoped>
.timer {
  margin: 30px 0;
  font-weight: 700;
}
.traffic {
  position: relative;
  background: black;
  width: 200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
}

.circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 10px;
  opacity: 0.3;

  &:nth-child(1) {
    background-color: red;
  }
  &:nth-child(2) {
    background-color: yellow;
  }
  &:nth-child(3) {
    background-color: green;
  }
}
.active {
  opacity: 1;
}
.animated {
  animation: blink 1s linear 3;
}
@keyframes blink {
  from {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  to {
    opacity: 0.3;
  }
}
</style>
