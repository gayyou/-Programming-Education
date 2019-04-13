<template>
  <div class="drag-container" id="container"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @mousedown="dragStart"
  >
    
    <svg
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      width="100%"
      height="100%"
      version="1.1"
      id="main-svg-container"
      
      inkscape:version="0.92.3 (2405546, 2018-03-11)"
      sodipodi:docname="绘图.svg">
      <defs
        id="defs2">
        <inkscape:path-effect
          effect="bspline"
          id="path-effect18"
          is_visible="true"
          weight="33.333333"
          steps="2"
          helper_size="0"
          apply_no_weight="true"
          apply_with_weight="true"
          only_selected="false" />
      </defs>
      <sodipodi:namedview
        id="base"
        pagecolor="#ffffff"
        bordercolor="#666666"
        borderopacity="1.0"
        inkscape:pageopacity="0.0"
        inkscape:pageshadow="2"
        inkscape:zoom="0.35"
        inkscape:cx="-98.571429"
        inkscape:cy="560"
        inkscape:document-units="mm"
        inkscape:current-layer="layer1"
        showgrid="false"
        inkscape:window-width="1920"
        inkscape:window-height="1001"
        inkscape:window-x="-9"
        inkscape:window-y="-9"
        inkscape:window-maximized="1" />
      <metadata
        id="metadata5">
        <rdf:RDF>
          <cc:Work
            rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type
              rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <circles
        v-for="(item, index) in $store.state.elInfo.circle"
        :value="item.value"
        :y="item.y"
        :model="false"
      ></circles>
      <assist
        v-for="(item, index) in $store.state.elInfo.assist"
        :value="item.value"
        :y="item.y"
        :model="false"
      ></assist>
      <condition
        v-for="(item, index) in $store.state.elInfo.condition"
        :value="item.value"
        :y="item.y"
        :model="false"
      ></condition>
      <judge
        v-for="(item, index) in $store.state.elInfo.judge"
        :value="item.value"
        :y="item.y"
        :model="false"
      ></judge>
      <noRefFunc
        v-for="(item, index) in $store.state.elInfo.noRefFunc"
        :value="item.value"
        :y="item.y"
        :model="false"
      ></noRefFunc>
      <order
        v-for="(item, index) in $store.state.elInfo.order"
        :value="item.value"
        :y="item.y"
        :model="false"
      ></order>
      <refFunc
        v-for="(item, index) in $store.state.elInfo.refFunc"
        :value="item.value"
        :y="item.y"
        :model="false"
      ></refFunc>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="3.66rem" height="100%" id="model-container"
      v-if="$store.state.leftStatus === 1"
    >
      <g transform="translate(12,0)" display="block" id="move-operate">
        <text class="operate-title" x="20" y="20" text-anchor="middle" dominant-baseline="central" dy="0">功能</text>
      </g>
      <noRefFunc
        :model="true"
        :value="'向前移动'"
        :y="40"
      ></noRefFunc>
      <noRefFunc
        :model="true"
        :value="'向后移动'"
        :y="110"
      ></noRefFunc>
      <noRefFunc
        :model="true"
        :value="'向左移动'"
        :y="180"
      ></noRefFunc>
      <noRefFunc
        :model="true"
        :value="'向右移动'"
        :y="250"
      ></noRefFunc>
      <order
        :model="true"
        :value="['向前', '步']"
        :y="320"
      ></order>
      <order
        :model="true"
        :value="['向后', '步']"
        :y="390"
      ></order>
      <order
        :model="true"
        :value="['向左', '步']"
        :y="460"
      ></order>
      <order
        :model="true"
        :value="['向右', '步']"
        :y="530"
      ></order>


      <noRefFunc
        id="fake-noRefFunc"
        v-if="$store.state.model.type === 'noRefFunc'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
      ></noRefFunc>
      <order
        id="fake-order"
        v-if="$store.state.model.type === 'order'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
      ></order>


    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="3.66rem" height="100%" id="model-container"
      v-if="$store.state.leftStatus === 2"
    >
      <g transform="translate(12,0)" display="block" id="move-operate">
        <text class="operate-title" x="20" y="20" text-anchor="middle" dominant-baseline="central" dy="0">逻辑</text>
      </g>
      <circles
        :model="true"
        :y="40"
      ></circles>
      <judge
        :model="true"
        :y="160"
      ></judge>


      <circles
        id="fake-circle"
        v-if="$store.state.model.type === 'circle'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
      ></circles>
      <judge
        id="fake-judge"
        v-if="$store.state.model.type === 'judge'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
      ></judge>


    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="3.66rem" height="100%" id="model-container"
      v-if="$store.state.leftStatus === 3"
    >
      <g transform="translate(12,0)" display="block" id="move-operate">
        <text class="operate-title" x="20" y="20" text-anchor="middle" dominant-baseline="central" dy="0">判断</text>
      </g>
      <condition
        :model="true"
        :value="'前方遇到障碍物'"
        :y="40"
      ></condition>


      <condition
        id="fake-condition"
        v-if="$store.state.model.type === 'condition'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
      ></condition>


    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="3.66rem" height="100%" id="model-container"
      v-if="$store.state.leftStatus === 4"
    >
      <g transform="translate(12,0)" display="block" id="move-operate">
        <text class="operate-title" x="20" y="20" text-anchor="middle" dominant-baseline="central" dy="0">辅助</text>
      </g>
      <assist
        :model="true"
        :value="'抬起机械臂'"
        :y="40"
      ></assist>
      <assist
        :model="true"
        :value="'放下机械臂'"
        :y="110"
      ></assist>
      <assist
        :model="true"
        :value="'拾起东西'"
        :y="180"
      ></assist>
      <assist
        :model="true"
        :value="'松开东西'"
        :y="250"
      ></assist>


      <assist
        id="fake-assist"
        v-if="$store.state.model.type === 'assist'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
      ></assist>


    </svg>
  </div>
</template>

<script>
import circles from '../logicAssets/circle/circle.vue'
import judge from '../logicAssets/judge/judge.vue'
import order from '../logicAssets/order/order.vue'
import condition from '../logicAssets/condition/condition.vue'
import noRefFunc from '../logicAssets/noRefFunc/noRefFunc.vue'
import assist from '../logicAssets/assist/assist.vue'
import Vue from 'vue';
import { toContainer, deleteDom } from '../../utils/domOperate.js'
import { isCrash } from '../../utils/checkCrash.js'
import { renewList, removeFromList } from '../../utils/listUtils.js'
import { nestWhileOperate } from '../../utils/drag.js'

export default {
  components: {
    circles,
    judge,
    order,
    condition,
    noRefFunc,
    assist
  },
  data() {
    return {
      CircleCtr: null,
      JudgeCtr: null,
      OrderCtr: null,
      mouse: {
        x: 0,
        y: 0
      },
    }
  },
  mounted() {
    // this.$data.CircleCtr = Vue.extend(circles);
    // this.$data.JudgeCtr = Vue.extend(judge);
    // this.$data.OrderCtr = Vue.extend(order);
    // console.log($('#container')[0])
  },
  methods: {
    dragStart(event) {
      // 得到点击时候的鼠标的坐标
      this.$data.mouse.x = event.clientX;
      this.$data.mouse.y = event.clientY;
      setTimeout(() => {
        // 点击时候赋值，这是本次循环中进行赋值，但是这个store真正有赋值到的是下个事件循环的时候才能拿到。
        // 在每个元素都会混入让movetarget指向一个块，但是这个变量是在本次事件循环赋值，并不知道快慢，所以只有等到下个事件循环的时候才进行判断
        // 所以需要用setTimeout等到下个事件循环的时候进行查询
        if (!this.$store.state.moveTarget) {
          return ;
        }
        let transform = this.$store.state.moveTarget.getAttribute('transform');
        this.$store.state.bashX = parseInt(transform.split('(')[1].split(',')[0]);
        this.$store.state.bashY = parseInt(transform.split(',')[1].split(')')[0]);
      }, 0);
      
    },
    dragMove(event) {
      if (!this.$store.state.moveTarget) {
        return ;
      }
      let bashX = this.$store.state.bashX;
      let bashY = this.$store.state.bashY;
      // 算出偏移量为移动时候鼠标的偏移量减去点击时候鼠标的偏移量再加上之前
      let left = event.clientX - this.$data.mouse.x + bashX;
      let top = event.clientY - this.$data.mouse.y + bashY;
      let target = this.$store.state.moveTarget;
      let fakeTarget = this.$store.state.fakeTarget;
      let num = 'translate(' 
                + left
                + ','
                + top
                + ')';
      target.setAttribute('transform', num);
      if (fakeTarget) {
        fakeTarget.setAttribute('transform', num);
      }
    },
    dragEnd(event) {
      if (this.$store.state.moveTarget) {
        let target = this.$store.state.moveTarget;
        let crashTarget = isCrash(target, this.$store.state.canvasList);
        if (crashTarget) {
          nestWhileOperate(target, crashTarget);
          removeFromList(this.$store.state.canvasList, target);
        } else {
          renewList(this.$store.state.canvasList, target);
        }

        // 更新列表
        
        this.$store.state.moveTarget = null;
      }
      if (this.$store.state.fakeTarget) {
        // let type = this.$store.state.fakeTarget.getAttribute('data-type');
        // deleteDom(this.$store.state.fakeTarget);  // 删除节点
        // this.$store.state.model[type + 'Num']--;
        this.$store.state.fakeTarget = null;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.drag-container {
  position: relative;
  width: 1000px;
  height: 1000px;
  border: 1px solid rgba($color: #000000, $alpha: .3);
  .drag-div {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: red;
  }
}
#main-svg-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  background-color: #fff;
}
#model-container {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 11;
  background-color: #F5F1EF;

  .operate-title {
    // font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 0.18rem;
    fill: #9E9898;
    font-weight: bold;
  }
}
</style>
