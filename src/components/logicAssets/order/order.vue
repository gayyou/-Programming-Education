<template>
  <g
    data-type="order"
    class="order"
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     :transform="'translate('+ x +','+ y +')'"
     :id="id">
    <g>
      <path class="st0" d="M130.9,48H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4l126.9,0c13.3,0,24,10.7,24,24v0C154.9,37.3,144.2,48,130.9,48
        z"/>
      <text transform="matrix(1 0 0 1 17.3338 30.5439)" class="st1 st2 st3">{{ value[0][0] }}</text>
      <text transform="matrix(1 0 0 1 107.5838 30.5439)" class="st1 st2 st3">{{ value[0][1] }}</text>
      <path class="st1" d="M88.9,38.1h-14c-7.2,0-13-5.8-13-13v0c0-7.2,5.8-13,13-13h14c7.2,0,13,5.8,13,13v0
        C101.9,32.3,96.1,38.1,88.9,38.1z"/>
    </g>
    <text
      @click="textInput"
      transform="translate(78,30)"
      class="text cls-2"
      id="毫秒"
      style="font-size:16px;font-family:SourceHanSansCN-Regular, 'Microsoft YaHei';fill:#000"
      dominant-baseline="middle"
      dy="-3.7"
      dx="4"
      text-anchor="middle"
      data-index="0"
    >{{ value[1][0] }}</text>
  </g>
</template>

<script>
import { changeInput } from '../../../utils/shared/changeTextUtils.js'
import { eventMixin, initMixin, createModelMixin } from '../../../utils/mixin.js'
import { getTypeAndID, getTransform } from '../../../utils/shared/utils.js';
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
    textInput(event) {
      changeInput.call(this, event);
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
