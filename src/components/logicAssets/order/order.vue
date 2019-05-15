<template>
  <g
    @click="inputText"
    data-type="order"
    class="order"
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     :transform="'translate('+ x +','+ y +')'"
     :id="id">
    <g>
      <path class="st0" d="M130.9,48H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4l126.9,0c13.3,0,24,10.7,24,24v0C154.9,37.3,144.2,48,130.9,48
        z"/>
      <text transform="matrix(1 0 0 1 17.3338 30.5439)" class="st1 st2 st3">{{ value[0] }}</text>
      <text transform="matrix(1 0 0 1 107.5838 30.5439)" class="st1 st2 st3">{{ value[1] }}</text>
      <path class="st1" d="M88.9,38.1h-14c-7.2,0-13-5.8-13-13v0c0-7.2,5.8-13,13-13h14c7.2,0,13,5.8,13,13v0
        C101.9,32.3,96.1,38.1,88.9,38.1z"/>
    </g>
    <text
      transform="translate(78,30)"
      class="text cls-2"
      id="毫秒"
      style="font-size:16px;font-family:MicrosoftYaHei, 'Microsoft YaHei';fill:#000"
      dominant-baseline="middle"
      dy="-3.7"
      dx="4"
      text-anchor="middle"
    >{{ value[2] }}</text>
  </g>
</template>

<script>
import { eventMixin, initMixin, createModelMixin } from '../../../utils/mixin.js'
export default {
  props: ['value', 'model', 'y', 'x', 'id', 'func'],
  mounted() {
    if (this.model) {
      createModelMixin.call(this)
    } else {
      eventMixin(this);
    }
  },
  methods: {
    inputText(event) {
      if (this.model) {
        return;
      }
      event.stopPropagation();
      this.$store.state.isInput = {
        id: event.currentTarget.getAttribute('id'),
        type: event.currentTarget.getAttribute('data-type')
      }
      let targetTrans = event.currentTarget.getAttribute('transform'),
      targetX = parseInt(targetTrans.split('(')[1].split(',')[0]),
      targetY = parseInt(targetTrans.split(',')[1].split(')')[0]);
      let text = event.currentTarget.getElementsByClassName('text')[0].getAttribute('transform');
      let textX = parseInt(text.split('(')[1].split(',')[0]),
      textY = parseInt(text.split(',')[1].split(')')[0]);
      let container = $('#container')[0];
      let x = targetX + textX - 12.5;
      let y = targetY + textY - 16.5;
      $('.global-input')[0].style.display = 'block';
      $('.global-input')[0].style.left = x + 'px';
      $('.global-input')[0].style.top = y + 'px';
      // event.currentTarget.getElementsByClassName('text')[0].nodeVlue = $('.global-input')[0].value;
    }
  }
}
</script>

<style lang="scss" scoped>
.st0{fill:#E05857;}
.st1{fill:#FFFFFF;}
.st2{font-family:'MicrosoftYaHei';}
.st3{font-size:18px;}
</style>
