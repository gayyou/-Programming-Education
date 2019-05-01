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
        :value="'循环'"
        :containObject="{}"
      ></circles>
      <judge
        :model="true"
        :y="160"
        :x="20"
        :value="'判断'"
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
import { isCrash } from '../../utils/svgOperate/checkCrash.js'
import { renewList, findList, componentListMixin } from '../../utils/shared/listUtils.js'
import { nestOperate, spiltOperate, deleteOperate } from '../../utils/svgOperate/drag.js'
import { getTransform, getTypeAndID } from '../../utils/shared/utils.js'
import { adjustOperate } from '../../utils/svgOperate/drag.js'
import { isSvgContainer } from '../../utils/shared/typeCheck.js'

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
      let mousePayload = {
        x: event.clientX,
        y: event.clientY
      }
      if (this.$store.state.moveTarget) {
        let target = this.$store.state.moveTarget;
        let clickList;
        let conList = clickList = findList(target, this.$store.state.canvasList);
        let conTarget = $(target).parent()[0]; // 容器
        let { id: conID, type: conType } = getTypeAndID(conTarget);
        
        let bashX = 0, bashY = 0, tempTar = target, isNest = false;
        let { x: preX, y: preY } = getTransform(target), crashPayload = null;
        // 当发现这个点击的块并不是canvasList最外层的内容的时候，必须得到它的在最外部的坐标
        while(clickList !== this.$store.state.canvasList) {
          isNest = true;
          let { x, y } = getTransform(tempTar);
          bashX += x;
          bashY += y;
          tempTar = $(tempTar).parent()[0];
          clickList = findList(tempTar, this.$store.state.canvasList);
        }

        // if (!deleteOperate(target, clickList)) {
        if (isNest) {
          // 拖拽块是嵌入的操作，拖出去的时候先定位
          crashPayload = this.$store.state.containInfo;  // 嵌入后拖出来的时候，这个containInfo的作用是记住拖出来的时候容器的大小宽度
          target.setAttribute('transfrom', 'translate(' + bashX + ',' + bashY + ')');
        }

        let { type } = getTypeAndID(target);
        let result = isCrash(target, this.$store.state.canvasList, crashPayload);
        
        if (result && isSvgContainer(result.container)) {
          // result有东西，说明是发生了碰撞
          // 寻找target所在的列表
          let targetList = findList(target, this.$store.state.canvasList);

          // 如果这个列表是canvasList的话，说明还没有嵌入这个块中
          if (targetList == this.$store.state.canvasList) {
            nestOperate.call(this, target, result, targetList, this.$store.state.canvasList);
          } else {
            //进行调整恢复到原来的位置
            adjustOperate.call(this, target, result.container, targetList);
          }

          // target指向容器，重新渲染容器的宽高
          target = result.container;
        } else {
          let targetList = findList(target, this.$store.state.canvasList);

          // 没有发生碰撞，并且当这个拖拽的块并不是在基础List中的时候
          if (targetList !== this.$store.state.canvasList) {
            let conTarget = $(target).parent()[0];
            spiltOperate.call(this, target, conTarget, targetList, this.$store.state.canvasList, mousePayload)
            
            setTimeout(() => {
              renewList(this.$store.state.canvasList, conTarget);  // 容器也要修改大小
            }, 0);
          }
        }
        this.$nextTick(() => {
          // 寻找并进行删除处于左侧的积木块
          deleteOperate(this.$store.state.canvasList)
        })

        renewList(this.$store.state.canvasList, target);
        
        setTimeout(() => {
          this.$store.state.isRenew = !this.$store.state.isRenew;
        })
        // 更新列表
        this.$store.state.containInfo.isUsed = true;
        this.$store.state.moveTarget = null;
      }
      if (this.$store.state.fakeTarget) {
        this.$store.state.fakeTarget.setAttribute('transform', 'translate(-500, -500)');
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
