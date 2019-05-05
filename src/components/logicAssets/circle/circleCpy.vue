<template>
  <g
    class="circle"
    data-type="circle"
    :transform="'translate('+ x +','+ y +')'"
    data-currentBash="24"
    data-currentY="48"
    :id="id"
  >
    <g>
      <path class="st0 out-line" d="M184.2,0H12C5.4,0,0,5.4,0,12v36v24v12c0,6.6,5.4,12,12,12h62c6.6,0,12-5.4,12-12v0c0-6.6-5.4-12-12-12H28
        c-2.2,0-4-1.8-4-4V52c0-2.2,1.8-4,4-4h156.2c13.3,0,24-10.7,24-24v0C208.2,10.7,197.4,0,184.2,0z"/>
      <polygon class="st1 poly" :style="hasCdn ? 'display: none' : 'display: block'" points="172.2,11.4 148.2,11.4 136.2,24.4 148.2,37.4 172.2,37.4 184.2,24.4 	"/>
      <g transform="translate(170,0)" :style="hasCdn ? 'display: block' : 'display: none'" class="extend-line">
        <path class="st0" d="M138,48H12C5.4,48,0,42.6,0,36V12C0,5.4,5.4,0,12,0l126,0c13.3,0,24,10.7,24,24v0C162,37.3,151.3,48,138,48z"	/>
      </g>
      <text transform="matrix(1 0 0 1 23.3337 30.7092)" class="st2 st3 st4">执行命令直到</text>
    </g>
    <noRefFunc
      v-for="item in $data.contain.noRefFunc"
      :key="item.id"
      :y="item.y"
      :x="item.x"
      :id="item.id"
      :value="item.value"
    ></noRefFunc>
    <template v-if="$data.contain.circle.length != 0">
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
    </template>
    <template  v-if="$data.contain.judge.length != 0">
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
    </template>
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
import { componentListMixin } from '../../../utils/shared/listUtils.js'
import noRefFunc from '../noRefFunc/noRefFunc.vue'
import condition from '../condition/condition.vue'
import judge from '../judge/judgeCpy.vue'
import circles from './circle.vue'
import assist from '../assist/assist.vue'
import order from '../order/order.vue'

export default {
  name: 'circleCpy',
  props: ['model', 'y', 'value', 'containObject', 'x', 'id', 'hasCdn'],
  components: {
    noRefFunc,
    condition,
    judge,
    assist,
    order,
    circles
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
      eventMixin(this);
      initMixin.call(this);
      componentListMixin(this.containObject);
      setTimeout(() => {
        this.$data.contain = this.containObject;
        // console.log(this.$data.contain);
      }, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
.st0{fill:#57BFC3;}
.st1{fill:#1B8F8F;}
.st2{fill:#FFFFFF;}
.st3{font-family:'MicrosoftYaHei';}
.st4{font-size:18px;}
</style>
