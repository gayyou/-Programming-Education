<template>
  <div class="container" 
    @mousedown="moveStart"
    @mousemove="moveIng"
    @mouseup="moveEnd"
  >
    <!-- <div class="move">
    </div> -->
    <order></order>
    <judge></judge>
    <circles></circles>
  </div>
</template>

<script>
import circles from '../logicAssets/circle/circle.vue'
import judge from '../logicAssets/judge/judge.vue'
import order from '../logicAssets/order/order.vue'

export default {
  components: {
    circles,
    judge,
    order
  },
  data() {
    return {
      isMoving: false,
      mouse: {
        x: 0,
        y: 0
      },
    }
  },
  methods: {
    moveStart(event) {
      this.$data.isMoving = true;
      this.$data.mouse.x = event.clientX;
      this.$data.mouse.y = event.clientY;
    },
    moveIng(event) {
      if (this.$data.isMoving) {
        return ;
      }
      let x = event.clientX;
      let y = event.clientY;
      let oldX = this.$data.mouse.x;
      let oldY = this.$data.mouse.y;
      let container = document.getElementsByClassName('container')[0];
      container.scrollTop = container.scrollTop + x - oldX;
      container.scrollTop = container.scrollTop + x - oldX;
    },
    moveEnd(event) {
      this.$data.isMoving = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 500px;
  height: 500px;
  border: 1px solid #000;
  overflow-x: hidden;
  overflow-y: hidden;
  .move {
    cursor: pointer;
    width: 1000px;
    height: 1000px;
  }
}
</style>
