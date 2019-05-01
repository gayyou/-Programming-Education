import { listPush, findList } from './shared/listUtils.js'
import { getTransform, getTypeAndID, getSvgWH } from './shared/utils'

/**
 * @description 混入模式，将这个可移动的组件添加一个点击事件,点击将全局的拖拽对象moveTarget赋值为这个组件
 * @param {vueComponent} this 组件的对象，即这个组件内部的上下文对象
 */
export function eventMixin(that) {
  that.$el.onmousedown = function(event) {
    event.stopPropagation();
    event.preventDefault();
    that.$store.state.moveTarget = that.$el;
    initContainInfo(that);
    setMouseDownInit(event, that);
  }
}

/**
 * @version 1.0.0
 * @description 得到父容器的宽高
 */
function initContainInfo(that) {
  let target = that.$el;
  let resultList = findList(target, that.$store.state.canvasList);
  if (resultList !== that.$store.state.canvasList) {
    that.$store.state.containInfo.width = getSvgWH($(target).parent()[0]).width;
    that.$store.state.containInfo.height = getSvgWH($(target).parent()[0]).height;
    that.$store.state.containInfo.x = getTransform($(target).parent()[0]).x;
    that.$store.state.containInfo.y = getTransform($(target).parent()[0]).y;
    that.$store.state.containInfo.id = $(target).parent()[0].getAttribute('id');
    that.$store.state.containInfo.isUsed = false;
  }
}

/**
 * @description 初始化的时候，将这个对象进行存入到列表中.
 * @param {DOM} el 组件的
 */
export function initMixin() {
  console.log(this)
}

export function createModelMixin() {
  let target = this.$el;
  
  target.onmousedown = (event) => {
    // 获取信息
    let target = this.$el,
        list = this.$store.state.canvasList,
        { type } = getTypeAndID(target),
        { width, height } = getSvgWH(target),
        { x: targetX, y: targetY } = getTransform(target);

    event.preventDefault();
    // 根据点击的对象，将点击的对象的所有属性都放在$store的model属性中，然后在fake层新添一个svg进行拖拽
    this.$store.state.model.value = this.value;
    this.$store.state.model.y = targetY;
    this.$store.state.model.x = targetX;
    this.$store.state.model.type = type;
    // this.$store.state.elCount++;

    let ID = 'el' + this.$store.state.elCount++;   // 这里只是进行引用id，实际上还没有进行生成组件，只是提前用了，真正生成组件的是调用listPush方法，并且在上面的initMixin方法里面生成并赋值

    // 新节点
    let newItem = {
      x: targetX,
      y: targetY,
      width: width,
      height: height,
      id: ID,
      value: this.value
    };
    
    // 列表的插入 操作
    listPush.bind(this)(list, type, newItem);

    setTimeout(() => {
      // console.log(this)
      let fakeTarget = $('#fake-' + type)[0];
      let targetList = $('#main-svg-container>.' + type);

      // 设置鼠标初始化
      setMouseDownInit(event, this);
      this.$store.state.fakeTarget = fakeTarget;
      this.$store.state.moveTarget = targetList[targetList.length - 1];
    }, 0);
  }
}

function setMouseDownInit(event, that) {
  console.log(that)
  that.$store.state.mouse.x = event.clientX;
  that.$store.state.mouse.y = event.clientY;
  setTimeout(() => {
    // 点击时候赋值，这是本次循环中进行赋值，但是这个store真正有赋值到的是下个事件循环的时候才能拿到。
    // 在每个元素都会混入让movetarget指向一个块，但是这个变量是在本次事件循环赋值，并不知道快慢，所以只有等到下个事件循环的时候才进行判断
    // 所以需要用setTimeout等到下个事件循环的时候进行查询
    if (!that.$store.state.moveTarget) {
      return ;
    }
    let transform = that.$store.state.moveTarget.getAttribute('transform');
    that.$store.state.bashX = parseInt(transform.split('(')[1].split(',')[0]);
    that.$store.state.bashY = parseInt(transform.split(',')[1].split(')')[0]);
  }, 0);
}