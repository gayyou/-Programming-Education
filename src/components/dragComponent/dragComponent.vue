<template>
  <div class="drag-container" id="container"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @mousedown="dragStart"
  >
    <div class="renew" style="display:none" v-if="$store.state.isRenew"></div>
  
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
      <!-- <circles
        v-for="(item) in $store.state.elInfo.circle"
        :value="item.value"
        :y="item.y"
        :key="item.id"
        :model="false"
      ></circles>
      <assist
        v-for="(item) in $store.state.elInfo.assist"
        :value="item.value"
        :y="item.y"
        :key="item.id"
        :model="false"
      ></assist>
      <condition
        v-for="(item) in $store.state.elInfo.condition"
        :value="item.value"
        :y="item.y"
        :key="item.id"
        :model="false"
      ></condition>
      <judge
        v-for="(item) in $store.state.elInfo.judge"
        :value="item.value"
        :y="item.y"
        :key="item.id"
        :model="false"
      ></judge>
      <noRefFunc
        v-for="(item) in $store.state.elInfo.noRefFunc"
        :value="item.value"
        :y="item.y"
        :key="item.id"
        :model="false"
      ></noRefFunc>
      <order
        v-for="(item) in $store.state.elInfo.order"
        :value="item.value"
        :y="item.y"
        :key="item.id"
        :model="false"
      ></order>
      <refFunc
        v-for="(item) in $store.state.elInfo.refFunc"
        :value="item.value"
        :y="item.y"
        :key="item.id"
        :model="false"
      ></refFunc> -->
      <noRefFunc
        v-for="item in $store.state.canvasList.noRefFunc"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></noRefFunc>
      <refFunc
        v-for="item in $store.state.canvasList.refFunc"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></refFunc>
      <circles
        v-for="item in $store.state.canvasList.circle"
        :key="item.id"
        :containObject="item.contain"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
        :hasCdn="item.hasCdn"
      ></circles>
      <judge
        v-for="item in $store.state.canvasList.judge"
        :key="item.id"
        :containObject="item.contain"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
        :hasCdn="item.hasCdn"
      ></judge>
      <assist
        v-for="item in $store.state.canvasList.assist"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></assist>
      <condition
        v-for="item in $store.state.canvasList.condition"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></condition>
      <order
        v-for="item in $store.state.canvasList.order"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></order>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="3.66rem" height="100%" id="model-container"
      v-if="$store.state.leftStatus === 1"
    >
      <g transform="translate(12,0)" display="block" id="move-operate">
        <text class="operate-title" x="20" y="20" text-anchor="middle" dominant-baseline="central" dy="0">功能</text>
      </g>
      <!-- <noRefFunc
        :model="true"
        :value="'向前移动'"
        :y="40"
      ></noRefFunc> -->
      <noRefFunc
        :model="true"
        :value="'向左转'"
        :y="40"
        :x="20"
      ></noRefFunc>
      <noRefFunc
        :model="true"
        :value="'向右转'"
        :y="110"
        :x="20"
      ></noRefFunc>
      <noRefFunc
        :model="true"
        :value="'向后转'"
        :y="180"
        :x="20"
      ></noRefFunc>
      <order
        :model="true"
        :value="['向前', '步', 1]"
        :y="250"
        :x="20"
      ></order>
      <order
        :model="true"
        :value="['向后', '步', 1]"
        :y="320"
        :x="20"
      ></order>
      <order
        :model="true"
        :value="['向左', '步', 1]"
        :y="390"
        :x="20"
      ></order>
      <order
        :model="true"
        :value="['向右', '步', 1]"
        :y="460"
        :x="20"
      ></order>
      <noRefFunc
        id="fake-noRefFunc"
        v-if="$store.state.model.type === 'noRefFunc'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
      ></noRefFunc>
      <order
        id="fake-order"
        v-if="$store.state.model.type === 'order'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
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
        :x="20"
        :value="''"
        :containObject="{}"
      ></circles>
      <judge
        :model="true"
        :y="160"
        :x="20"
        :value="''"
        :containObject="{}"
      ></judge>
      <circles
        id="fake-circle"
        v-if="$store.state.model.type === 'circle'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
      ></circles>
      <judge
        id="fake-judge"
        v-if="$store.state.model.type === 'judge'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
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
        :value="'程序结束'"
        :y="40"
        :x="20"
      ></condition>
      <condition
        :model="true"
        :value="'前方存在障碍物'"
        :y="90"
        :x="20"
      ></condition>
      <condition
        :model="true"
        :value="'左方存在障碍物'"
        :y="140"
        :x="20"
      ></condition>
      <condition
        :model="true"
        :value="'右方存在障碍物'"
        :y="190"
        :x="20"
      ></condition>
      <condition
        :model="true"
        :value="'后方存在障碍物'"
        :y="240"
        :x="20"
      ></condition>
      <condition
        :model="true"
        :value="'重复执行到达1次'"
        :y="290"
        :x="20"
      ></condition>
      <condition
        :model="true"
        :value="'重复执行到达2次'"
        :y="340"
        :x="20"
      ></condition>
      <condition
        :model="true"
        :value="'重复执行到达5次'"
        :y="390"
        :x="20"
      ></condition>
      <condition
        :model="true"
        :value="'重复执行到达10次'"
        :y="440"
        :x="20"
      ></condition>


      <condition
        id="fake-condition"
        v-if="$store.state.model.type === 'condition'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
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
        :x="20"
      ></assist>
      <assist
        :model="true"
        :value="'放下机械臂'"
        :y="110"
        :x="20"
      ></assist>
      <assist
        :model="true"
        :value="'合并机械臂'"
        :y="180"
        :x="20"
      ></assist>
      <assist
        :model="true"
        :value="'松开机械臂'"
        :y="250"
        :x="20"
      ></assist>

      <assist
        id="fake-assist"
        v-if="$store.state.model.type === 'assist'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
      ></assist>
    </svg>

    <div class="global-input">
      <input type="text" @input="inputs">
    </div>
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
import { isCrash } from '../../utils/checkCrash.js'
import { renewList, findList } from '../../utils/listUtils.js'
import { nestWhileOperate, nestJudgeOperate } from '../../utils/drag.js'
import { componentListMixin } from '../../utils/shared/model.js'

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
      mouse: {
        x: 0,
        y: 0
      },
      canvasList: {

      },
    }
  },
  mounted() {
    componentListMixin(this.$store.state.canvasList);
  },
  methods: {
    dragStart(event) {

    },
    dragMove(event) {
      if (!this.$store.state.moveTarget) {
        return ;
      }
      let bashX = this.$store.state.bashX;
      let bashY = this.$store.state.bashY;
      // 算出偏移量为移动时候鼠标的偏移量减去点击时候鼠标的偏移量再加上之前
      let left = event.clientX - this.$store.state.mouse.x + bashX;
      let top = event.clientY - this.$store.state.mouse.y + bashY;
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
        console.log('找元素' ,findList(target, this.$store.state.canvasList));
        let type = target.getAttribute('data-type');
        let result = isCrash(target, this.$store.state.canvasList);
        
        if (result) {
          let type = result.container.getAttribute('data-type');
          switch(type) {
            case 'circle': {
              nestWhileOperate.bind(this)(target, result.container, this.$store.state.canvasList);
              break;
            }
            case 'judge': {
              // 这里会有一个bug，就是先在else语句中添加语句的话，继续添加的if语句中的块，会出差错，原因是else的块没有进行处理
              if (result.dirY == 1) {
                nestJudgeOperate.bind(this)(target, result.container, this.$store.state.canvasList, true);
              } else {
                nestJudgeOperate.bind(this)(target, result.container, this.$store.state.canvasList, false);
              }
              break;
            }
          }

          // target指向容器，重新渲染容器的宽高
          target = result.container;
        }
        
        renewList(this.$store.state.canvasList, target);

        // 更新列表
        
        this.$store.state.moveTarget = null;
      }
      if (this.$store.state.fakeTarget) {
        this.$store.state.fakeTarget = null;
      }
    },
    inputs(event) {
      let type = this.$store.state.isInput.type;
      let id = this.$store.state.isInput.id;
      let list = this.$store.state.canvasList;
      for (let i = 0; i < list[type].length; i++) {
        if (id == list[type][i].id) {
          list[type][i].value[2] = $('.global-input input')[0].value;
        }
      }
      // this.$store.state.isInput.firstChild.nodeValue = $('.global-input input')[0].value;
    }
  },
}
</script>

<style lang="scss" scoped>
.global-input {
  position: absolute;
  display: none;
  z-index: 111;
  width: 0.4rem;
  height: 0.26rem;

  input {
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 12px;
    font-size: 16px;
  }
}
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
