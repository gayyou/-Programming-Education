<template>
  <g
     data-type="judge"
     data-currentY="48"
     data-currentSecondY="120"
     data-firstBash="24"
     data-secondBash="-16"
     data-textBash="100"
     data-firstTime="1"
     class="judge"
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     :transform="'translate('+ x +','+ y +')'"
     :id="id">
    <g>
      <path class="st0 out-line" d="M140,24L140,24c0-13.3-10.7-24-24-24L12,0C5.4,0,0,5.4,0,12v36v24v48v24v12c0,6.6,5.4,12,12,12h46
        c6.6,0,12-5.4,12-12v0c0-6.6-5.4-12-12-12H28c-2.2,0-4-1.8-4-4v-16c0-2.2,1.8-4,4-4h88c13.3,0,24-10.7,24-24v0
        c0-13.3-10.7-24-24-24H28c-2.2,0-4-1.8-4-4V52c0-2.2,1.8-4,4-4h88C129.3,48,140,37.3,140,24z"/>
      <text transform="matrix(1 0 0 1 24.3335 30.3763)" class="st1 st2 st3">如果</text>
      <text transform="matrix(1 0 0 1 24.3335 100.3763)" class="st1 st2 st3 else">否则</text>
      <polygon class="st4" :style="hasCdn ? 'display: none' : 'display: block'" points="106,12.3 82,12.3 70,25.3 82,38.3 106,38.3 118,25.3 	"/>
      <g transform="translate(170,0)" :style="hasCdn ? 'display: block' : 'display: none'" class="extend-line">
        <path class="st0" d="M138,48H12C5.4,48,0,42.6,0,36V12C0,5.4,5.4,0,12,0l126,0c13.3,0,24,10.7,24,24v0C162,37.3,151.3,48,138,48z"	/>
      </g>
    </g>
    <noRefFunc
      v-for="item in $data.contain.noRefFunc"
      :key="item.id"
      :y="item.y"
      :x="item.x"
      :id="item.id"
      :value="item.value"
    ></noRefFunc>
    <circles
      v-for="item in $data.contain.circle"
      :key="item.id"
      :containObject="item.contain"
      :y="item.y"
      :x="item.x"
      :id="item.id"
      :value="item.value"
      :hasCdn="item.hasCdn"
    ></circles>
    <judge
      v-for="item in $data.contain.judge"
      :key="item.id"
      :containObject="item.contain"
      :y="item.y"
      :x="item.x"
      :id="item.id"
      :value="item.value"
      :hasCdn="item.hasCdn"
    ></judge>
    <assist
      v-for="item in $data.contain.assist"
      :key="item.id"
      :y="item.y"
      :x="item.x"
      :id="item.id"
      :value="item.value"
    ></assist>
    <condition
      
      v-for="item in $data.contain.condition"
      :key="item.id"
      :y="item.y"
      :x="item.x"
      :id="item.id"
      :value="item.value"
    ></condition>
    <order
      v-for="item in $data.contain.order"
      :key="item.id"
      :y="item.y"
      :x="item.x"
      :id="item.id"
      :value="item.value"
    ></order>
    <div v-if="$store.state.isRenew"></div>
    <!-- <noRefFunc
      :model="false"
      :y="120"
      :value="'123'"
    ></noRefFunc>-->
  </g>
</template>

<script>
import { eventMixin, initMixin, createModelMixin } from '../../../utils/mixin.js'
import { componentListMixin } from '../../../utils/listUtils.js'
import noRefFunc from '../noRefFunc/noRefFunc.vue'
import condition from '../condition/condition.vue'
import judge from '../judge/judgeCpy.vue'
import circles from '../circle/circleCpy.vue'
import assist from '../assist/assist.vue'
import order from '../order/order.vue'

export default {
  props: ['model', 'y', 'value', 'containObject', 'x', 'id' , 'hasCdn'],
  components: {
    noRefFunc,
    circles,
    condition,
    judge,
    assist,
    order
  },
  data() {
    return {
      contain: {
        order: [],
        judge: [],
        condition: [],
        order: [],
        assist: [],
        noRefFunc: [],
        circle: []
      }
    }
  },
  mounted() {
    if (this.model) {
      createModelMixin.call(this)
    } else {
      componentListMixin(this.containObject);
      setTimeout(() => {
        this.$data.contain = this.containObject;
      }, 0);
      eventMixin(this);
      initMixin.call(this);
    }
  }
}
</script>

<style lang="scss" scoped>
	.st0{fill:#57BFC3;}
	.st1{fill:#FFFFFF;}
	.st2{font-family:'MicrosoftYaHei';}
	.st3{font-size:18px;}
	.st4{fill:#1B8F8F;}
</style>
