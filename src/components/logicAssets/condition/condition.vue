<template>
  <g
    data-type="condition"
    class="condition"
    inkscape:label="Layer 1"
    inkscape:groupmode="layer"
    :transform="'translate('+ x +','+ y +')'"
    :id="id">
    <polygon class="st0" points="159,0 15,0 0,17 15,34 159,34 174,17 	"/>
	  <text transform="matrix(1 0 0 1 24.0002 22.4186)" class="st1 st2 st3"
      dominant-baseline="middle"
      dy="-4"
      dx="62"
      text-anchor="middle"
    >{{ value }}</text>
  </g>
</template>

<script>
import { eventMixin, initMixin, createModelMixin } from '../../../utils/mixin.js'
export default {
  props: ['model', 'value', 'y', 'x', 'id'],
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
	.st0{fill:#5CBB87;}
	.st1{fill:#FFFFFF;}
	.st2{font-family:'MicrosoftYaHei';}
	.st3{font-size:18px;}
</style>
