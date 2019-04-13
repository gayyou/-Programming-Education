<template>
  <g
      data-type="noRefFunc"
      class="noRefFunc"
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     :transform="'translate(20,'+ y +')'"
     id="layer1">
	<path class="st0" d="M102,48H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4h98c13.3,0,24,10.7,24,24v0C126,37.3,115.3,48,102,48z"/>
	<text transform="matrix(1 0 0 1 21.2504 29.4182)" class="st1 st2 st3">向左旋转</text>
  </g>
</template>

<script>
import { eventMixin, initMixin, createModelMixin } from '../../../utils/mixin.js'
export default {
  props: ['model', 'value', 'y'],
  mounted() {
    if (this.model) {
      createModelMixin(this)
    } else {
      eventMixin(this);
      initMixin(this);
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
