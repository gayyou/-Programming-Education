<template>
  <g
    data-type="order"
    class="order"
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     :transform="'translate(20,'+ y +')'"
     id="layer1">
    <g
       transform="translate(-195,-441)"
       data-name="组 23"
       id="组_23">
      <path
         transform="translate(194,440)"
         d="m 12,0 h 140 a 24,24 0 0 1 0,48 h -140 a 12,12 0 0 1 -12,-12 v -24 a 12,12 0 0 1 12,-12 z"
         class="cls-1"
         data-name="路径 15"
         id="路径_15"
         inkscape:connector-curvature="0"
         style="fill:#ed5a5a" />
      <text
         transform="translate(236,471)"
         class="cls-2"
         id="延迟"
         style="font-size:18px;font-family:MicrosoftYaHei, 'Microsoft YaHei';fill:#ffffff">
        <tspan
           id="tspan15"
           y="0"
           x="-18">{{ value[0] }}</tspan>
      </text>
      <text
         transform="translate(338,471)"
         class="cls-2"
         id="毫秒"
         style="font-size:18px;font-family:MicrosoftYaHei, 'Microsoft YaHei';fill:#ffffff">
        <tspan
           id="tspan18"
           y="0"
           x="-18">{{ value[1] }}</tspan>
      </text>
      <rect
         transform="translate(267,451)"
         rx="13"
         height="26"
         width="40"
         class="cls-3"
         data-name="矩形 26"
         id="矩形_26"
         x="0"
         y="0"
         style="fill:#ffffff" />
          <text
            transform="translate(282,470)"
            class="cls-2"
            id="毫秒"
            style="font-size:16px;font-family:MicrosoftYaHei, 'Microsoft YaHei';fill:#000"
            dominant-baseline="middle"
            dy="-3.7"
            dx="4"
            text-anchor="middle"
          >1</text>
      <!-- <input type="text"> -->
    </g>
  </g>
</template>

<script>
import { eventMixin, initMixin, createModelMixin } from '../../../utils/mixin.js'
export default {
  props: ['value', 'model', 'y'],
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
.cls-2 {
  text-align: center;
}
</style>
