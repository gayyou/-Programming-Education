<template>
  <div class="recommand">
    <el-scrollbar class="recommand-list-container">
      <div class="container" 
        @click="choiceRec"
      >
        <rec-list
          :index="'2'"
          :name="'把物品放后面'"
          :point="9.5"
          :svgList="$data.list2"
        ></rec-list>
        <rec-list
          :index="$data.index"
          :name="'向前移动后向后移动'"
          :point="8"
          :svgList="$data.list"
        ></rec-list>
        <rec-list
          :index="'3'"
          :name="'举起物品后放下'"
          :point="9"
          :svgList="$data.list3"
        ></rec-list>
        <!-- <rec-list
          :name="'拾起物品'"
          :point="9.5"
          :svgList="$data.list"
        ></rec-list>
        <rec-list
          :name="'放下物品'"
          :point="9"
          :svgList="$data.list"
        ></rec-list>
        <rec-list
          :name="'拾起物品后后转放下'"
          :point="9"
          :svgList="$data.list"
        ></rec-list> -->
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { nestWhileOperate } from '../../utils/drag.js';
import { cloneList } from '../../utils/listUtils.js';
import PubSub from 'pubsub-js'
import recList from './recList/recList.vue';
export default {
  components: {
    'rec-list': recList
  },
  data() {
    return {
      eventTarget: null,
      index: 1,
      option: null,
      list: {
          assist: [],
          circle: [{
            hasCdn: true,
            height: 120,
            id: "el993",
            value: "",
            width: 208.1999969482422,
            x: 1,
            y: 1,
            contain: {
              assist: [],
              circle: [],
              condition: [],
              judge: [],
              noRefFunc: [],
              order: [],
              refFunc: [],
            }
          }],
          condition: [],
          judge: [],
          noRefFunc: [],
          order: [],
          refFunc: [],
      },
      list2: {
        assist: [],
          circle: [{
            hasCdn: true,
            height: 120,
            id: "el118",
            value: "",
            width: 208.1999969482422,
            x: 1,
            y: 1,
            contain: {
              assist: [],
              circle: [],
              condition: [],
              judge: [],
              noRefFunc: [],
              order: [],
              refFunc: [],
            }
          }],
          condition: [],
          judge: [],
          noRefFunc: [],
          order: [],
          refFunc: [],
      },
      list3: {
        assist: [],
          circle: [{
            hasCdn: true,
            height: 120,
            id: "el128",
            value: "",
            width: 208.1999969482422,
            x: 1,
            y: 1,
            contain: {
              assist: [],
              circle: [],
              condition: [],
              judge: [],
              noRefFunc: [],
              order: [],
              refFunc: [],
            }
          }],
          condition: [],
          judge: [],
          noRefFunc: [],
          order: [],
          refFunc: [],
      }
    }
  },
  mounted() {
      let container = $('#el993')[0];
      this.$data.list.circle[0].contain.order.push({
        height: 48,
        id: "el991",
        value: ["向前", '步', 10],
        width: 154.9,
        x: 24.2,
        y: 48,
      },
      {
        height: 48,
        id: "el994",
        value: ["向前", '步', 10],
        width: 154.9,
        x: 24.2,
        y: 144,
      });
      this.$data.list.circle[0].contain.noRefFunc.push({
        height: 48,
        id: "el999",
        value: '向后转',
        width: 126,
        x: 24.2,
        y: 96,
      });
      this.$data.list.circle[0].contain.condition.push({
        x: 140,
        y: 7.5,
        id: "el997",
        width: 174,
        height: 34,
        value: "重复执行到达一次"
      })



      this.$data.list2.circle[0].contain.assist.push(
      {
        height: 48,
        id: "el119",
        value: "合并机械臂",
        width: 126,
        x: 24.2,
        y: 48,
      },
      {
        height: 48,
        id: "el1110",
        value: "抬起机械臂",
        width: 126,
        x: 24.2,
        y: 96,
      });
      this.$data.list2.circle[0].contain.noRefFunc.push({
        height: 48,
        id: "el1111",
        value: "向右转",
        width: 126,
        x: 24.2,
        y: 144,
      });
      this.$data.list2.circle[0].contain.condition.push({
        x: 140,
        y: 7.5,
        id: "el1112",
        width: 174,
        height: 34,
        value: "重复执行到达一次"
      })
      this.$data.list2.circle[0].contain.assist.push(
        {
          height: 48,
          id: "el1113",
          value: "放下机械臂",
          width: 126,
          x: 24.2,
          y: 192,
        },
        {
          height: 48,
          id: "el1114",
          value: "松开机械臂",
          width: 126,
          x: 24.2,
          y: 240,
      });




      this.$data.list3.circle[0].contain.assist.push(
      {
        height: 48,
        id: "el129",
        value: "合并机械臂",
        width: 126,
        x: 24.2,
        y: 48,
      },
      {
        height: 48,
        id: "el1120",
        value: "抬起机械臂",
        width: 126,
        x: 24.2,
        y: 96,
      });
      this.$data.list3.circle[0].contain.condition.push({
        x: 140,
        y: 7.5,
        id: "el1122",
        width: 174,
        height: 34,
        value: "重复执行到达一次"
      })
      this.$data.list3.circle[0].contain.assist.push(
        {
          height: 48,
          id: "el1123",
          value: "放下机械臂",
          width: 126,
          x: 24.2,
          y: 144,
        },
        {
          height: 48,
          id: "el1124",
          value: "松开机械臂",
          width: 126,
          x: 24.2,
          y: 192,
      });






      let option;
      setTimeout(() => {
        let target = $('#el991')[0];
        let target4 = $('#el994')[0];
        let target7 = $('#el997')[0];
        let target8 = $('#el999')[0]
        // let target5 = $('#el5')[0];
        nestWhileOperate.bind(this)(target8, container, this.$data.list, true);
        nestWhileOperate.bind(this)(target, container, this.$data.list, true);
        nestWhileOperate.bind(this)(target7, container, this.$data.list, true);
        option = nestWhileOperate.bind(this)(target4, container, this.$data.list, true);
        this.$data.option = option;
        // nestWhileOperate.bind(this)(target5, container, this.$data.list);
      }, 0);
      

      setTimeout(() => {
        let target9 = $('#el119')[0];
        let target10 = $('#el1110')[0];
        let target11 = $('#el1111')[0];
        let target12 = $('#el1112')[0];
        let target13 = $('#el1113')[0];
        let target14 = $('#el1114')[0];
        // let target5 = $('#el5')[0];
        let container = $('#el118')[0]
        nestWhileOperate.bind(this)(target9, container, this.$data.list, true);
        nestWhileOperate.bind(this)(target10, container, this.$data.list, true);
        nestWhileOperate.bind(this)(target11, container, this.$data.list, true);
        nestWhileOperate.bind(this)(target12, container, this.$data.list, true);
        nestWhileOperate.bind(this)(target13, container, this.$data.list, true);
        nestWhileOperate.bind(this)(target14, container, this.$data.list, true);
        // nestWhileOperate.bind(this)(target5, container, this.$data.list);
      }, 0);


    setTimeout(() => {
        let target9 = $('#el129')[0];
        let target10 = $('#el1120')[0];
        // let target11 = $('#el1121')[0];
        let target12 = $('#el1122')[0];
        let target13 = $('#el1123')[0];
        let target14 = $('#el1124')[0];
        // let target5 = $('#el5')[0];
        let container = $('#el128')[0]
        nestWhileOperate.bind(this)(target9, container, this.$data.list, true);
        nestWhileOperate.bind(this)(target10, container, this.$data.list, true);
        // nestWhileOperate.bind(this)(target11, container, this.$data.list, true);
        nestWhileOperate.bind(this)(target12, container, this.$data.list, true);
        nestWhileOperate.bind(this)(target13, container, this.$data.list, true);
        nestWhileOperate.bind(this)(target14, container, this.$data.list, true);
        // nestWhileOperate.bind(this)(target5, container, this.$data.list);
      }, 0);




    PubSub.subscribe('checkRecommand', (e, data) => {
      if (data.confirm) {
        let $container = $('#container');
        let width = $container.width();
        this.$data.list.circle[0].x = width / 2;
        this.$data.list.circle[0].y = 50;
        let index = this.$data.eventTarget.getAttribute('index');
        this.$store.state.isCode = true;

        // 将推荐页面中的列表复制到编码模式中，从而实现编码过程
        cloneList(this.$data.list, this.$store.state.canvasList);

        setTimeout(() => {
          this.$store.state.isRenew = !this.$store.state.isRenew;
          setTimeout(() => {
            let target = $('#main-svg-container #' + this.$data.option.target + ' .out-line')[0];
            target.setAttribute('d', this.$data.option.nextD);
          }, 10);
        }, 0);
        return ;
      }
      if (data.cancel) {
        // 点击取消时候发生的事情
      }
    });
  },
  methods: {
    choiceRec(event) {
      if (event.target == event.currentTarget) {
        return ;
      }
      this.$store.state.showConfirm = true;
      this.$data.eventTarget = event.target;
      let name = event.target.getAttribute('data-name')
      this.$store.state.confirmMes = '系统不会保存您之前在编程页面所组件的命令块，是否要继续使用推荐方案:' + name + '？'
    }
  }
}
</script>

<style lang="scss">
$bgColor: #f5f1ef;

%clear-float::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
}
%flex-center {
  display: flex;
  // justify-content: center;
}

.recommand {
  background-color: $bgColor;

  div {
    overflow-x: hidden!important;
  }
  .container {
    @extend %clear-float;
    @extend %flex-center;

    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 0.46rem;
  }
}
.recommand {
  flex: 1;
}
.recommand-list-container {
  height: 100%;
}
.el-scrollbar__wrap, .container{
  overflow-x: hidden;
}
.el-scrollbar__thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgba(0,0,0,.3)!important;
  -webkit-transition: .3s background-color;
  transition: .3s background-color;
}
</style>
