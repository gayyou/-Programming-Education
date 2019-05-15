<template>
  <g
    data-type="doubleRef"
    :id="id"
    class="order"
    :transform="'translate('+ x +','+ y +')'"
  >
    <path class="st0" d="M224,48H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4h220c13.3,0,24,10.7,24,24v0C248,37.3,237.3,48,224,48z"/>
    <text transform="matrix(1 0 0 1 11.2505 29.4182)" class="st1 st2 st3">{{ value[0][0] }}</text>
    <text transform="matrix(1 0 0 1 157.8338 29.4182)" class="st1 st2 st3">{{ value[0][1] }}</text>
    <text transform="matrix(1 0 0 1 135.2505 29.4178)" class="st1 st2 st3">{{ value[0][2] }}</text>
    <path class="st1" transform="translate(-45, 0)" d="M160.9,37h-14c-7.1,0-13-5.8-13-13v0c0-7.1,5.8-13,13-13h14c7.1,0,13,5.8,13,13v0C173.9,31.2,168,37,160.9,37z"
      />
    <path class="st1" transform="translate(-53, 0)" d="M277.9,37h-14c-7.1,0-13-5.8-13-13v0c0-7.1,5.9-13,13-13h14c7.1,0,13,5.8,13,13v0C290.9,31.2,285,37,277.9,37z"
      />
    <text
      transform="translate(78,30)"
      class="text cls-2"
      id="毫秒"
      style="font-size:16px;font-family:MicrosoftYaHei, 'Microsoft YaHei';fill:#000"
      dominant-baseline="middle"
      dy="-3.9"
      dx="30"
      text-anchor="middle"
    >{{ value[1][0] }}</text>
    <text
      transform="translate(78,30)"
      class="text cls-2"
      id="毫秒"
      style="font-size:16px;font-family:MicrosoftYaHei, 'Microsoft YaHei';fill:#000"
      dominant-baseline="middle"
      dy="-3.9"
      dx="140"
      text-anchor="middle"
    >{{ value[1][1] }}</text>
  </g>
</template>

<script>
import { eventMixin, initMixin, createModelMixin } from '../../../utils/mixin.js'
export default {
  props: ['model', 'value', 'y', 'x', 'id', 'func'],
  mounted() {
    if (this.model) {
      createModelMixin.call(this)
    } else {
      eventMixin(this);
      if (!this.id) {
         initMixin.call(this);
      }
    }
  }
}
</script>

<style scoped>
	.st0{fill:#E05857;}
	.st1{fill:#FFFFFF;}
	.st2{font-family:'MicrosoftYaHei';}
	.st3{font-size:18px;}
</style>
