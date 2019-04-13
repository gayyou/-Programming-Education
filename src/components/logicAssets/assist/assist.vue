<template>
  <g
      data-type="assist"
      class="assist"
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     :transform="'translate(20,'+ y +')'"
     id="layer1">
    <g
       transform="translate(-236,-481)"
       data-name="组 4"
       id="组_4">
    <path
         d="m 246.35714,480 h 90 a 24,24 0 0 1 24,24 v 0 a 24,24 0 0 1 -24,24 h -90 a 12,12 0 0 1 -12,-12 v -24 a 12,12 0 0 1 12,-12 z"
         data-name="矩形 20"
         id="矩形_20"
         inkscape:connector-curvature="0"
         style="fill:#FEDB4C" />
      <text
         font-size="18"
         transform="translate(297,510)"
         id="向左旋转"
         style="font-size:18px;font-family:'.PingFang-SC-Medium';fill:#ffffff" >
         <tspan
         id="tspan12"
         y="0"
         x="-38.700001">{{ value }}</tspan>
      </text>
   </g>
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

</style>
